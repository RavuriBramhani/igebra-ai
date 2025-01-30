// Mock data store
const studentData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  progressData: [
    { date: "2023-01-01", score: 65 },
    { date: "2023-02-01", score: 70 },
    { date: "2023-03-01", score: 75 },
    { date: "2023-04-01", score: 80 },
    { date: "2023-05-01", score: 85 },
  ],
  performanceData: {
    Mathematics: 85,
    "Computer Science": 92,
    Physics: 78,
    "Data Science": 88,
    "Web Development": 95,
  },
  studyPlan: [
    {
      day: "Monday",
      tasks: ["Review calculus concepts", "Practice Python coding", "Watch ML video lecture"],
    },
    {
      day: "Tuesday",
      tasks: ["Study linear algebra", "Work on web development project", "Read CS research paper"],
    },
    {
      day: "Wednesday",
      tasks: ["Practice data structures problems", "Review physics formulas", "Attend online AI workshop"],
    },
  ],
  recommendations: [
    {
      title: "Introduction to Machine Learning",
      description: "A beginner-friendly course on ML fundamentals",
      url: "https://example.com/ml-intro",
    },
    {
      title: "Advanced Data Structures",
      description: "Deep dive into complex data structures",
      url: "https://example.com/adv-ds",
    },
    {
      title: "Web Development with React",
      description: "Build modern web apps with React",
      url: "https://example.com/react-dev",
    },
  ],
}

const quizzes = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Test your knowledge of ML basics",
    questions: [
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
  {
    id: 2,
    title: "Web Development Fundamentals",
    description: "Check your understanding of web dev basics",
    questions: [
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
]

const learningPaths = [
  {
    id: 1,
    title: "Web Development Mastery",
    description: "Master the art of web development from frontend to backend",
    modules: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        completed: true,
      },
      {
        id: 2,
        title: "JavaScript Essentials",
        completed: true,
      },
      {
        id: 3,
        title: "React Framework",
        completed: false,
      },
      {
        id: 4,
        title: "Backend with Node.js",
        completed: false,
      },
      {
        id: 5,
        title: "Database Management",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Data Science Journey",
    description: "Explore the world of data science and machine learning",
    modules: [
      {
        id: 1,
        title: "Python Programming",
        completed: true,
      },
      {
        id: 2,
        title: "Data Analysis with Pandas",
        completed: false,
      },
      {
        id: 3,
        title: "Machine Learning Basics",
        completed: false,
      },
      {
        id: 4,
        title: "Deep Learning and Neural Networks",
        completed: false,
      },
    ],
  },
]

interface User {
  id: number
  name: string
  email: string
  password: string // In a real app, this would be hashed
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
]

let currentUser: User | null = null

export function loginUser(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email && u.password === password)
  if (user) {
    currentUser = user
    return user
  }
  return null
}

export function registerUser(name: string, email: string, password: string): User | null {
  if (users.some((u) => u.email === email)) {
    return null // User already exists
  }
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password,
  }
  users.push(newUser)
  currentUser = newUser
  return newUser
}

export function getCurrentUser(): User | null {
  return currentUser
}

export function logoutUser() {
  currentUser = null
}

export function getStudentData() {
  if (!currentUser) {
    throw new Error("No user logged in")
  }
  return {
    ...studentData,
    quizData: quizzes,
    learningPaths,
    name: currentUser.name,
    email: currentUser.email,
  }
}

export function submitQuiz(quizId: number, answers: string[]) {
  const quiz = quizzes.find((q) => q.id === quizId)
  if (!quiz) {
    throw new Error("Quiz not found")
  }

  let score = 0
  quiz.questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      score++
    }
  })

  const percentageScore = (score / quiz.questions.length) * 100

  // Update progress data
  const today = new Date().toISOString().split("T")[0]
  studentData.progressData.push({ date: today, score: percentageScore })

  return { score: percentageScore }
}

