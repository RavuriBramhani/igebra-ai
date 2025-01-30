import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function QuizList({ quizzes, onSelectQuiz }) {
  return (
    <div className="grid gap-4">
      {quizzes.map((quiz) => (
        <Card key={quiz.id}>
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">Questions: {quiz.questions.length}</p>
            <Button onClick={() => onSelectQuiz(quiz)}>Start Quiz</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

