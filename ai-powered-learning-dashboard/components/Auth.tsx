"use client"

import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

interface AuthProps {
  onLogin: (email: string, password: string) => void
  onRegister: (name: string, email: string, password: string) => void
}

export default function Auth({ onLogin, onRegister }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isLogin ? (
        <LoginForm onLogin={onLogin} onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onRegister={onRegister} onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  )
}

