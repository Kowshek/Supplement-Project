import { type NextRequest, NextResponse } from "next/server"

// Mock AI service that generates personalized recommendations
function generateMockRecommendations(userAnswers: any) {
  const { feeling, workout, goals, sleep, diet, age } = userAnswers

  // Generate personalized summary
  let summary = "Based on your responses, "
  if (feeling === "tired") {
    summary += "you're experiencing low energy levels and could benefit from targeted nutritional support. "
  } else if (feeling === "anxious") {
    summary += "you're dealing with stress and could benefit from calming nutrients and adaptogens. "
  } else if (feeling === "energetic") {
    summary += "you're in good health and we can optimize your nutrition for peak performance. "
  } else {
    summary += "you're in decent health and we can enhance your wellness routine. "
  }

  if (goals === "muscle") {
    summary += "Your muscle-building goals require specific protein and recovery support."
  } else if (goals === "weight_loss") {
    summary += "Your weight loss goals can be supported with metabolism-boosting nutrients."
  } else if (goals === "endurance") {
    summary += "Your endurance goals need cardiovascular and energy support."
  } else {
    summary += "Your general health goals can be supported with foundational nutrition."
  }

  // Generate personalized steps
  const steps = []

  if (sleep < 5) {
    steps.push("Prioritize sleep hygiene and consider natural sleep aids like magnesium")
  }

  if (workout === "high") {
    steps.push("Take protein within 30 minutes post-workout for optimal recovery")
    steps.push("Stay hydrated with electrolytes during intense training sessions")
  } else if (workout === "none") {
    steps.push("Start with light daily movement like walking or stretching")
  }

  if (feeling === "tired") {
    steps.push("Consider B-complex vitamins to support natural energy production")
  }

  if (diet === "vegan") {
    steps.push("Focus on B12, iron, and complete protein supplementation")
  }

  steps.push("Take supplements consistently at the same time each day for best results")
  steps.push("Stay hydrated with at least 8 glasses of water daily")

  // Generate personalized supplements
  const supplements = []

  // Base supplements for everyone
  supplements.push({
    name: "Premium Multivitamin",
    icon: "💊",
    reason: "Covers essential vitamins and minerals for foundational health",
    timing: "Take with breakfast",
    category: "morning",
    link: "https://shop.example.com/multivitamin",
  })

  // Conditional supplements based on responses
  if (feeling === "tired" || sleep < 5) {
    supplements.push({
      name: "B-Complex Energy",
      icon: "⚡",
      reason: "Supports natural energy production and reduces fatigue in your body",
      timing: "Take with breakfast",
      category: "morning",
      link: "https://shop.example.com/b-complex",
    })
  }

  if (feeling === "anxious") {
    supplements.push({
      name: "Ashwagandha",
      icon: "🧘",
      reason: "Adaptogen that helps manage stress, lowers blood pressure and promote calm",
      timing: "Take with dinner",
      category: "evening",
      link: "https://shop.example.com/ashwagandha",
    })
  }

  if (workout === "high" || workout === "moderate") {
    if (goals === "muscle") {
      supplements.push({
        name: "Whey Protein Isolate",
        icon: "💪",
        reason: "High-quality protein for muscle building, recovery and meet your protein needs",
        timing: "Take within 30 minutes post-workout",
        category: "post-workout",
        link: "https://www.myprotein.co.in/p/sports-nutrition/impact-whey-isolate/11654647/",
      })

      supplements.push({
        name: "Creatine Monohydrate",
        icon: "🏋️",
        reason: "Being the most researched supplement, it increases strength, power, and muscle mass",
        timing: "Take 30 minutes before workout",
        category: "pre-workout",
        link: "https://shop.example.com/creatine",
      })
    }

    if (goals === "endurance") {
      supplements.push({
        name: "Beetroot Extract",
        icon: "🍠",
        reason: "Improves blood flow, endurance performance and potential cancer prevention",
        timing: "Take 30 minutes before workout",
        category: "pre-workout",
        link: "https://shop.example.com/beetroot",
      })
    }
  }

  if (diet === "vegan") {
    supplements.push({
      name: "Vitamin B12",
      icon: "🌱",
      reason: "Essential for vegans to prevent B12 deficiency which can lead to anemia and neurological issues",
      timing: "Take with breakfast",
      category: "morning",
      link: "https://shop.example.com/b12",
    })
  }

  // Omega-3 for most people
  if (diet !== "high-fish") {
    supplements.push({
      name: "Omega-3 Fish Oil",
      icon: "🐟",
      reason: "Supports heart health, brain function, and reduces inflammation",
      timing: "Take with lunch",
      category: "morning",
      link: "https://shop.example.com/omega-3",
    })
  }

  // Sleep support
  if (sleep < 5) {
    supplements.push({
      name: "Magnesium Glycinate",
      icon: "🌙",
      reason: "Promotes relaxation, improves sleep quality, regulated nerve and muscle function",
      timing: "Take 30 minutes before bed",
      category: "evening",
      link: "https://shop.example.com/magnesium",
    })
  }

  // Vitamin D for most people
  supplements.push({
    name: "Vitamin D3",
    icon: "☀️",
    reason: "Supports immune function, bone health, mood and improves metabolism",
    timing: "Take with breakfast",
    category: "morning",
    link: "https://shop.example.com/vitamin-d3",
  })

  // Weight loss support
  if (goals === "weight_loss") {
    supplements.push({
      name: "Green Tea Extract",
      icon: "🍵",
      reason: "Boosts metabolism and supports healthy weight management",
      timing: "Take between meals",
      category: "morning",
      link: "https://shop.example.com/green-tea",
    })
  }

  return {
    summary,
    steps: steps.slice(0, 6), // Limit to 6 steps
    supplements: supplements.slice(0, 8), // Limit to 8 supplements
  }
}

export async function POST(request: NextRequest) {
  try {
    const userAnswers = await request.json()

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock recommendations
    const recommendations = generateMockRecommendations(userAnswers)

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error generating plan:", error)

    // Return fallback response
    const fallbackResponse = {
      summary: "We've created a basic supplement plan based on general health principles.",
      steps: [
        "Focus on a balanced diet with whole foods",
        "Stay hydrated with adequate water intake",
        "Maintain regular physical activity",
        "Prioritize 7-9 hours of quality sleep",
      ],
      supplements: [
        {
          name: "Daily Multivitamin",
          icon: "💊",
          reason: "Covers essential daily nutritional needs which might lack in diet",
          timing: "Take with breakfast",
          category: "morning",
          link: "https://shop.example.com/multivitamin",
        },
        {
          name: "Omega-3 Fish Oil",
          icon: "🐟",
          reason: "Supports heart, brain health and reduces inflammation",
          timing: "Take with meals",
          category: "morning",
          link: "https://shop.example.com/omega-3",
        },
      ],
    }

    return NextResponse.json(fallbackResponse)
  }
}
