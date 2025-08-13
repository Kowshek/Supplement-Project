"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Loader2 } from "lucide-react"
import { questions } from "./questions-data"
import ResultsPage from "./results-page"

interface UserAnswers {
  [key: string]: string | number
}

export default function QuestionFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<UserAnswers>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState(null)

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (value: string | number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      generateRecommendations(newAnswers)
    }
  }

  const generateRecommendations = async (userAnswers: UserAnswers) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAnswers),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Validate the response structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response format")
      }

      setRecommendations(data)
      setShowResults(true)
    } catch (error) {
      console.error("Error generating recommendations:", error)

      // Provide fallback recommendations
      const fallbackRecommendations = {
        summary:
          "We've created a basic supplement plan based on your responses. For more personalized recommendations, please try again.",
        steps: [
          "Start with a high-quality multivitamin to cover basic nutritional needs",
          "Stay hydrated throughout the day with plenty of water",
          "Consider adding omega-3 fatty acids for heart and brain health",
          "Ensure adequate protein intake to support your fitness goals",
        ],
        supplements: [
          {
            name: "Daily Multivitamin",
            icon: "💊",
            reason: "Covers essential vitamins and minerals for overall health",
            timing: "Take with breakfast",
            category: "morning",
            link: "https://shop.example.com/multivitamin",
          },
          {
            name: "Omega-3 Fish Oil",
            icon: "🐟",
            reason: "Supports heart health and reduces inflammation",
            timing: "Take with meals",
            category: "morning",
            link: "https://shop.example.com/omega-3",
          },
          {
            name: "Vitamin D3",
            icon: "☀️",
            reason: "Supports bone health and immune function",
            timing: "Take with breakfast",
            category: "morning",
            link: "https://shop.example.com/vitamin-d3",
          },
          {
            name: "Magnesium",
            icon: "🌙",
            reason: "Promotes relaxation and better sleep quality",
            timing: "Take before bedtime",
            category: "evening",
            link: "https://shop.example.com/magnesium",
          },
        ],
      }

      setRecommendations(fallbackRecommendations)
      setShowResults(true)
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (showResults && recommendations) {
    return <ResultsPage recommendations={recommendations} />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Personal Plan</h3>
          <p className="text-gray-600">
            Our AI is analyzing your responses and crafting personalized recommendations...
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="max-w-2xl mx-auto p-8 shadow-xl border-0 bg-white/90 backdrop-blur">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{currentQuestion.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentQuestion.question}</h2>
            {currentQuestion.subtitle && <p className="text-gray-600">{currentQuestion.subtitle}</p>}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full p-4 h-auto text-left justify-start hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 bg-transparent"
                onClick={() => handleAnswer(option.value)}
              >
                <span className="text-2xl mr-4">{option.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{option.label}</div>
                  {option.description && <div className="text-sm text-gray-500">{option.description}</div>}
                </div>
              </Button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={goBack} disabled={currentStep === 0} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="text-sm text-gray-500">Press any option to continue</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
