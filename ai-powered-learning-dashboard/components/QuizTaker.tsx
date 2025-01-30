"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuizTaker({ quiz, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(null)

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      submitQuiz()
    }
  }

  const submitQuiz = async () => {
    try {
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: quiz.id,
          answers: Object.values(answers),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit quiz")
      }

      const result = await response.json()
      setScore(result.score)
      setShowResults(true)
    } catch (error) {
      console.error("Error submitting quiz:", error)
      // Handle error (show error message to user)
    }
  }

  if (showResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Complete!</CardTitle>
          <CardDescription>Here's how you did:</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-center">Your score: {score.toFixed(2)}%</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onComplete}>Return to Quiz List</Button>
        </CardFooter>
      </Card>
    )
  }

  const question = quiz.questions[currentQuestion]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {quiz.questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg">{question.text}</p>
        <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion]}>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} disabled={!answers[currentQuestion]} className="w-full">
          {currentQuestion < quiz.questions.length - 1 ? "Next" : "Finish"}
        </Button>
      </CardFooter>
    </Card>
  )
}

