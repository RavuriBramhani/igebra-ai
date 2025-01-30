import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudyPlan({ studyPlan }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">AI-Generated Study Plan</h2>
      <div className="grid gap-4">
        {studyPlan.map((day, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{day.day}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {day.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="text-sm text-gray-600">
                    {task}
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

