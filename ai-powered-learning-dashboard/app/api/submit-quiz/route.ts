import { NextResponse } from "next/server"
import { submitQuiz } from "@/lib/data-store"

export async function POST(request: Request) {
  try {
    const { quizId, answers } = await request.json()
    const result = submitQuiz(quizId, answers)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error submitting quiz:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

