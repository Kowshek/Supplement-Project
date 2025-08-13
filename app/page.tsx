"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Target, Clock, Heart } from "lucide-react";

export default function WelcomePage() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <QuestionFlow />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Personalized Health Assessment
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Let's Build Your{" "}
              <span className="text-emerald-600">Personalized</span> Supplement
              Plan
            </h1>
            <p className="text-xl text-gray-600 mb-8 mx-auto">
              Answer a few quick questions about your health, lifestyle, and
              goals. We'll generate a supplement stack tailored specifically to
              your body and needs.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur transform transition duration-300 hover:-translate-y-1">
              <Target className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Personalized</h3>
              <p className="text-gray-600 text-sm">
                Tailored to your unique health profile and goals
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur transform transition duration-300 hover:-translate-y-1">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Quick & Easy</h3>
              <p className="text-gray-600 text-sm">
                Takes less than 2 minutes to complete
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur transform transition duration-300 hover:-translate-y-1">
              <Heart className="w-8 h-8 text-rose-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Science-Based
              </h3>
              <p className="text-gray-600 text-sm">
                Recommendations based on latest research
              </p>
            </Card>
          </div>

          <Button
            onClick={() => setStarted(true)}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Let's Start Your Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            ✨ Free • No email required • Instant results
          </p>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}

// Import the QuestionFlow component
import QuestionFlow from "./components/question-flow";
