import { NextResponse } from "next/server"
import { getStudentData } from "@/lib/data-store"

export async function GET() {
  try {
    const studentData = getStudentData()
    return NextResponse.json(studentData)
  } catch (error) {
    console.error("Error fetching student data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

