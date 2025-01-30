"use client"

import { useState } from "react"
import Dashboard from "../components/Dashboard"
import Auth from "../components/Auth"
import { getCurrentUser, loginUser, registerUser, logoutUser } from "../lib/data-store"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [user, setUser] = useState(getCurrentUser())

  const handleLogin = (email: string, password: string) => {
    const loggedInUser = loginUser(email, password)
    if (loggedInUser) {
      setUser(loggedInUser)
    } else {
      alert("Invalid credentials")
    }
  }

  const handleRegister = (name: string, email: string, password: string) => {
    const newUser = registerUser(name, email, password)
    if (newUser) {
      setUser(newUser)
    } else {
      alert("Registration failed. Email might already be in use.")
    }
  }

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  if (!user) {
    return <Auth onLogin={handleLogin} onRegister={handleRegister} />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">AI-Powered Learning Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user.name}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Dashboard />
        </div>
      </main>
    </div>
  )
}

