import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import AssessmentIntro from "./assessment/AssessmentIntro";
import PsychometricSection from "./assessment/PsychometricSection";
import AptitudeSection from "./assessment/AptitudeSection";
import WiscarSection from "./assessment/WiscarSection";
import ResultsDashboard from "./assessment/ResultsDashboard";
import { ArrowRight, CheckCircle } from "lucide-react";

export interface AssessmentData {
  psychometricFit: number;
  technicalReadiness: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitiveReadiness: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
  recommendation: "Yes" | "Maybe" | "No";
  confidenceScore: number;
}

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometricFit: 0,
    technicalReadiness: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitiveReadiness: 0,
      abilityToLearn: 0,
      realWorldAlignment: 0,
    },
    recommendation: "Maybe",
    confidenceScore: 0,
  });

  const steps = [
    { title: "Introduction", component: AssessmentIntro },
    { title: "Psychometric Assessment", component: PsychometricSection },
    { title: "Technical Readiness", component: AptitudeSection },
    { title: "WISCAR Framework", component: WiscarSection },
    { title: "Results & Recommendations", component: ResultsDashboard },
  ];

  const currentStepComponent = steps[currentStep]?.component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = (data?: Partial<AssessmentData>) => {
    if (data) {
      setAssessmentData(prev => ({ ...prev, ...data }));
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              Skills Readiness Assessment
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover your potential in Chemical Engineering
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="bg-card/50 backdrop-blur-sm shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <Badge variant="outline" className="bg-primary/10">
                  {Math.round(progress)}% Complete
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-4">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`flex items-center text-xs ${
                      index <= currentStep
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <div
                        className={`w-4 h-4 rounded-full mr-1 ${
                          index === currentStep
                            ? "bg-primary"
                            : "bg-muted border-2"
                        }`}
                      />
                    )}
                    <span className="hidden md:block">{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Step Content */}
        <div className="mb-8">
          {currentStep === 0 && (
            <AssessmentIntro onNext={nextStep} />
          )}
          {currentStep === 1 && (
            <PsychometricSection
              data={assessmentData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 2 && (
            <AptitudeSection
              data={assessmentData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 3 && (
            <WiscarSection
              data={assessmentData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 4 && (
            <ResultsDashboard
              data={assessmentData}
              onPrev={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;