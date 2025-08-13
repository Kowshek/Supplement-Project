export const questions = [
  {
    id: "feeling",
    question: "How are you feeling lately?",
    subtitle: "Help us understand your current energy and mood levels",
    icon: "🌟",
    options: [
      { label: "Tired & Low Energy", value: "tired", icon: "😴", description: "Often feeling drained" },
      { label: "Anxious & Stressed", value: "anxious", icon: "😰", description: "High stress levels" },
      { label: "Pretty Good", value: "good", icon: "😊", description: "Generally feeling well" },
      { label: "Energetic & Great", value: "energetic", icon: "⚡", description: "High energy levels" },
    ],
  },
  {
    id: "workout",
    question: "Do you work out regularly?",
    subtitle: "This helps us tailor supplements to your activity level",
    icon: "🏋️",
    options: [
      { label: "Yes, 4+ times per week", value: "high", icon: "💪", description: "Very active lifestyle" },
      { label: "Yes, 2-3 times per week", value: "moderate", icon: "🏃", description: "Moderately active" },
      { label: "Occasionally", value: "low", icon: "🚶", description: "Light activity" },
      { label: "No, rarely exercise", value: "none", icon: "🛋️", description: "Sedentary lifestyle" },
    ],
  },
  {
    id: "goals",
    question: "What are your main fitness goals?",
    subtitle: "Select your primary objective",
    icon: "🎯",
    options: [
      { label: "Build Muscle", value: "muscle", icon: "💪", description: "Increase muscle mass" },
      { label: "Lose Weight", value: "weight_loss", icon: "⚖️", description: "Reduce body fat" },
      { label: "Improve Endurance", value: "endurance", icon: "🏃", description: "Better stamina" },
      { label: "General Health", value: "health", icon: "❤️", description: "Overall wellness" },
    ],
  },
  {
    id: "sleep",
    question: "How would you rate your sleep quality?",
    subtitle: "Quality sleep is crucial for recovery and health",
    icon: "🛌",
    options: [
      { label: "Poor (1-2)", value: 1, icon: "😴", description: "Trouble sleeping, not restful" },
      { label: "Fair (3-4)", value: 3, icon: "😐", description: "Some sleep issues" },
      { label: "Good (5-6)", value: 5, icon: "🙂", description: "Generally sleep well" },
      { label: "Excellent (7+)", value: 7, icon: "💤", description: "Deep, restful sleep" },
    ],
  },
  {
    id: "diet",
    question: "What best describes your diet?",
    subtitle: "This helps us recommend compatible supplements",
    icon: "🥗",
    options: [
      { label: "Standard Diet", value: "standard", icon: "🍽️", description: "Mixed foods, no restrictions" },
      { label: "Vegetarian", value: "vegetarian", icon: "🥬", description: "No meat" },
      { label: "Vegan", value: "vegan", icon: "🌱", description: "Plant-based only" },
      { label: "Keto/Low-Carb", value: "keto", icon: "🥑", description: "High fat, low carb" },
    ],
  },
  {
    id: "age",
    question: "What's your age range?",
    subtitle: "Nutritional needs vary by age group",
    icon: "🎂",
    options: [
      { label: "18-25", value: "18-25", icon: "🧑", description: "Young adult" },
      { label: "26-35", value: "26-35", icon: "👨", description: "Adult" },
      { label: "36-50", value: "36-50", icon: "👨‍💼", description: "Middle-aged" },
      { label: "50+", value: "50+", icon: "👨‍🦳", description: "Mature adult" },
    ],
  },
]
