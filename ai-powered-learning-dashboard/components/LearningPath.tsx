import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle } from "lucide-react"

export default function LearningPath({ paths }) {
  return (
    <div className="col-span-2 bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Your Learning Paths</h2>
      <div className="grid gap-4">
        {paths.map((path) => (
          <Card key={path.id}>
            <CardHeader>
              <CardTitle>{path.title}</CardTitle>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {path.modules.map((module) => (
                  <li key={module.id} className="flex items-center">
                    {module.completed ? (
                      <CheckCircle className="text-green-500 mr-2" />
                    ) : (
                      <Circle className="text-gray-300 mr-2" />
                    )}
                    <span className={module.completed ? "text-gray-700" : "text-gray-500"}>{module.title}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

