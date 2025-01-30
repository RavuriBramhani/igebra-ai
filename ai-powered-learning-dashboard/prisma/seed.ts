import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create a student
  const student = await prisma.student.create({
    data: {
      email: "student@example.com",
      name: "John Doe",
    },
  })

  // Create some quizzes
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "Introduction to Machine Learning",
      description: "Test your knowledge of ML basics",
      questions: {
        create: [
          {
            text: "What is supervised learning?",
            options: [
              "Learning without labeled data",
              "Learning with labeled data",
              "Learning without any data",
              "Learning only from textbooks",
            ],
            correctAnswer: "Learning with labeled data",
          },
          {
            text: "Which of these is not a type of machine learning?",
            options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Quantum Learning"],
            correctAnswer: "Quantum Learning",
          },
        ],
      },
    },
  })

  const quiz2 = await prisma.quiz.create({
    data: {
      title: "Web Development Fundamentals",
      description: "Check your understanding of web dev basics",
      questions: {
        create: [
          {
            text: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Tech Modern Language",
              "Hyper Transfer Markup Language",
              "Home Tool Markup Language",
            ],
            correctAnswer: "Hyper Text Markup Language",
          },
          {
            text: "Which language is used for styling web pages?",
            options: ["HTML", "Java", "Python", "CSS"],
            correctAnswer: "CSS",
          },
        ],
      },
    },
  })

  // Create some progress data
  await prisma.progress.createMany({
    data: [
      { date: new Date("2023-01-01"), score: 65, studentId: student.id },
      { date: new Date("2023-02-01"), score: 70, studentId: student.id },
      { date: new Date("2023-03-01"), score: 75, studentId: student.id },
      { date: new Date("2023-04-01"), score: 80, studentId: student.id },
      { date: new Date("2023-05-01"), score: 85, studentId: student.id },
    ],
  })

  console.log("Seed data created successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

