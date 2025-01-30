import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RecommendedResources({ recommendations }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recommended Resources</h2>
      <div className="grid gap-4">
        {recommendations.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

