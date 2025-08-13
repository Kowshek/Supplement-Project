"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  ExternalLink,
  Download,
  House,
  Share2,
  CheckCircle,
  Clock,
  Sun,
  Moon,
  AlertCircle,
} from "lucide-react";

interface Supplement {
  name: string;
  icon: string;
  reason: string;
  timing: string;
  link: string;
  category: "morning" | "pre-workout" | "post-workout" | "evening";
}

interface Recommendations {
  summary?: string;
  steps?: string[];
  supplements?: Supplement[];
}

interface ResultsPageProps {
  recommendations: Recommendations;
}

export default function ResultsPage({ recommendations }: ResultsPageProps) {
  // Provide default values to prevent undefined errors
  const summary =
    recommendations?.summary ||
    "We've created a personalized supplement plan based on your responses.";
  const steps = recommendations?.steps || [];
  const supplements = recommendations?.supplements || [];

  // const handleDownload = async () => {
  //   try {
  //     window.scrollTo(0, 0);

  //     // ✅ Remove any problematic OKLCH colors
  //     const allElements = document.querySelectorAll("*");
  //     allElements.forEach((el) => {
  //       const computedStyle = window.getComputedStyle(el);
  //       const bgColor = computedStyle.backgroundColor;
  //       const color = computedStyle.color;

  //       if (bgColor.includes("oklch")) {
  //         (el as HTMLElement).style.backgroundColor = "#ffffff";
  //       }
  //       if (color.includes("oklch")) {
  //         (el as HTMLElement).style.color = "#000000";
  //       }
  //     });

  //     const canvas = await html2canvas(document.body, {
  //       scale: 2,
  //       useCORS: true,
  //       windowWidth: document.documentElement.scrollWidth,
  //       windowHeight: document.documentElement.scrollHeight,
  //     });

  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();
  //     const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     while (heightLeft > 0) {
  //       position -= pageHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     pdf.save("supplement-plan.pdf");
  //   } catch (error) {
  //     console.error("PDF generation failed:", error);
  //     alert("Something went wrong while generating the PDF. Check console.");
  //   }
  // };
  // If no supplements are provided, show a fallback message
  if (!supplements.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Generate Recommendations
          </h3>
          <p className="text-gray-600 mb-4">
            We encountered an issue generating your personalized plan. Please
            try again.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  const morningSupplements = supplements.filter(
    (s) => s.category === "morning"
  );
  const preWorkoutSupplements = supplements.filter(
    (s) => s.category === "pre-workout"
  );
  const postWorkoutSupplements = supplements.filter(
    (s) => s.category === "post-workout"
  );
  const eveningSupplements = supplements.filter(
    (s) => s.category === "evening"
  );

  const handleShare = async () => {
    // Check if Web Share API is supported and available
    if (navigator.share && navigator.canShare) {
      try {
        await navigator.share({
          title: "My Personalized Supplement Plan",
          text: "Check out my personalized supplement recommendations!",
          url: window.location.href,
        });
      } catch (error) {
        // If sharing fails, fall back to copying to clipboard
        handleCopyToClipboard();
      }
    } else {
      // Fallback to copying URL to clipboard
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const shareText = `Check out my personalized supplement plan! ${window.location.href}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
        // You could add a toast notification here
        alert("Link copied to clipboard!");
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          alert("Link copied to clipboard!");
        } catch (err) {
          console.error("Fallback: Oops, unable to copy", err);
          alert("Unable to copy link. Please copy manually: " + shareText);
        }
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Unable to share. Please copy the URL manually.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Plan Generated Successfully
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Personalized Supplement Plan 💪
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{summary}</p>
        </div>

        {/* Action Steps */}
        {steps.length > 0 && (
          <Card className="max-w-4xl mx-auto p-6 mb-8 bg-white/90 backdrop-blur">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Your Health Optimization Steps
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg"
                >
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-700 min-w-fit"
                  >
                    {index + 1}
                  </Badge>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Supplement Schedule */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Morning Routine */}
          {morningSupplements.length > 0 && (
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-500" />
                Morning Routine 🌅
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {morningSupplements.map((supplement, index) => (
                  <SupplementCard key={index} supplement={supplement} />
                ))}
              </div>
            </Card>
          )}

          {/* Pre-Workout */}
          {preWorkoutSupplements.length > 0 && (
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Pre-Workout 💥
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {preWorkoutSupplements.map((supplement, index) => (
                  <SupplementCard key={index} supplement={supplement} />
                ))}
              </div>
            </Card>
          )}

          {/* Post-Workout */}
          {postWorkoutSupplements.length > 0 && (
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Post-Workout 🏋️
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {postWorkoutSupplements.map((supplement, index) => (
                  <SupplementCard key={index} supplement={supplement} />
                ))}
              </div>
            </Card>
          )}

          {/* Evening Routine */}
          {eveningSupplements.length > 0 && (
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5 text-purple-500" />
                Evening Routine 🌙
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {eveningSupplements.map((supplement, index) => (
                  <SupplementCard key={index} supplement={supplement} />
                ))}
              </div>
            </Card>
          )}

          {/* Show all supplements if no categories are assigned */}
          {morningSupplements.length === 0 &&
            preWorkoutSupplements.length === 0 &&
            postWorkoutSupplements.length === 0 &&
            eveningSupplements.length === 0 &&
            supplements.length > 0 && (
              <Card className="p-6 bg-white/90 backdrop-blur">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Your Recommended Supplements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {supplements.map((supplement, index) => (
                    <SupplementCard key={index} supplement={supplement} />
                  ))}
                </div>
              </Card>
            )}
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button
              size="lg"
              onClick={handleDownload}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Plan (PDF)
            </Button> */}

            <Button size="lg" variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Plan
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              <House className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            💡 Consult with a personal trainer before starting any new
            supplement regimen
          </p>
        </div>
      </div>
    </div>
  );
}

function SupplementCard({ supplement }: { supplement: Supplement }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{supplement.icon || "💊"}</span>
          <div>
            <h4 className="font-semibold text-gray-900">
              {supplement.name || "Supplement"}
            </h4>
            <p className="text-sm text-gray-500">
              {supplement.timing || "As directed"}
            </p>
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3">
        {supplement.reason || "Supports overall health"}
      </p>
      <Button
        size="sm"
        className="w-full bg-emerald-600 hover:bg-emerald-700"
        onClick={() => window.open(supplement.link || "#", "_blank")}
      >
        View Product
      </Button>
    </div>
  );
}
