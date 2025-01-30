"use client"

import { useState, useEffect } from "react"
import ProgressChart from "./ProgressChart"
import RecommendedResources from "./RecommendedResources"
import PerformanceReport from "./PerformanceReport"
import StudyPlan from "./StudyPlan"
import QuizSection from "./QuizSection"
import LearningPath from "./LearningPath"

export default function Dashboard() {
  const [studentData, setStudentData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/student-data")
        if (!response.ok) {
          throw new Error("Failed to fetch student data")
        }
        const data = await response.json()
        setStudentData(data)
      } catch (error) {
        console.error("Error fetching student data:", error)
        setError("Failed to load dashboard data. Please try again later.")
      }
    }

    fetchStudentData()
  }, [])

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!studentData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProgressChart data={studentData.progressData} />
      <PerformanceReport performanceData={studentData.performanceData} />
      <RecommendedResources recommendations={studentData.recommendations} />
      <StudyPlan studyPlan={studentData.studyPlan} />
      <QuizSection quizData={studentData.quizData} />
      <LearningPath paths={studentData.learningPaths} />
    </div>
  )
}

