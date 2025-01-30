"use client"

import { useState } from "react"
import QuizList from "./QuizList"
import QuizTaker from "./QuizTaker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuizSection({ quizData }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null)

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Quizzes</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedQuiz ? (
          <QuizTaker quiz={selectedQuiz} onComplete={() => setSelectedQuiz(null)} />
        ) : (
          <QuizList quizzes={quizData} onSelectQuiz={setSelectedQuiz} />
        )}
      </CardContent>
    </Card>
  )
}

