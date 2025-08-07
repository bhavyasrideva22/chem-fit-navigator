import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Calculator, Beaker, Cog } from "lucide-react";
import { AssessmentData } from "../Assessment";

interface AptitudeSectionProps {
  data: AssessmentData;
  onNext: (data: Partial<AssessmentData>) => void;
  onPrev?: () => void;
}

interface Question {
  id: string;
  text: string;
  category: "math" | "chemistry" | "physics";
  options: { value: string; label: string; correct?: boolean }[];
  explanation?: string;
}

const questions: Question[] = [
  {
    id: "math1",
    text: "If a chemical reaction has a rate constant of 0.05 min⁻¹, what is the half-life of the reaction?",
    category: "math",
    options: [
      { value: "a", label: "10.4 minutes" },
      { value: "b", label: "13.9 minutes", correct: true },
      { value: "c", label: "20.0 minutes" },
      { value: "d", label: "25.5 minutes" },
    ],
    explanation: "For a first-order reaction, half-life = ln(2)/k = 0.693/0.05 = 13.9 minutes"
  },
  {
    id: "chem1", 
    text: "What is the molarity of a solution containing 58.5g of NaCl in 2L of solution?",
    category: "chemistry",
    options: [
      { value: "a", label: "0.25 M" },
      { value: "b", label: "0.5 M", correct: true },
      { value: "c", label: "1.0 M" },
      { value: "d", label: "2.0 M" },
    ],
    explanation: "Molarity = moles/volume. Moles of NaCl = 58.5g / 58.5g/mol = 1 mol. M = 1 mol / 2L = 0.5 M"
  },
  {
    id: "phys1",
    text: "In a heat exchanger, what is the driving force for heat transfer?",
    category: "physics", 
    options: [
      { value: "a", label: "Pressure difference" },
      { value: "b", label: "Temperature difference", correct: true },
      { value: "c", label: "Concentration difference" },
      { value: "d", label: "Velocity difference" },
    ],
    explanation: "Heat transfer occurs due to temperature differences between hot and cold fluids"
  },
  {
    id: "math2",
    text: "A cylindrical reactor has a diameter of 2m and height of 5m. What is its volume?",
    category: "math",
    options: [
      { value: "a", label: "10π m³" },
      { value: "b", label: "15π m³" },
      { value: "c", label: "5π m³", correct: true },
      { value: "d", label: "20π m³" },
    ],
    explanation: "Volume = πr²h = π(1)²(5) = 5π m³"
  },
  {
    id: "chem2",
    text: "What type of process is distillation?",
    category: "chemistry",
    options: [
      { value: "a", label: "Chemical reaction" },
      { value: "b", label: "Physical separation", correct: true },
      { value: "c", label: "Heat generation" },
      { value: "d", label: "Pressure reduction" },
    ],
    explanation: "Distillation is a physical separation process based on differences in boiling points"
  },
  {
    id: "phys2",
    text: "What happens to pressure in a fluid flowing through a pipe with decreasing diameter?",
    category: "physics",
    options: [
      { value: "a", label: "Pressure increases" },
      { value: "b", label: "Pressure decreases", correct: true },
      { value: "c", label: "Pressure remains constant" },
      { value: "d", label: "Pressure fluctuates" },
    ],
    explanation: "According to Bernoulli's principle, as velocity increases (smaller diameter), pressure decreases"
  },
];

const AptitudeSection = ({ onNext, onPrev }: AptitudeSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      // Calculate technical readiness score
      let correctAnswers = 0;
      questions.forEach(q => {
        const userAnswer = answers[q.id];
        const correctOption = q.options.find(opt => opt.correct);
        if (correctOption && userAnswer === correctOption.value) {
          correctAnswers++;
        }
      });
      
      const technicalReadiness = Math.round((correctAnswers / questions.length) * 100);
      onNext({ technicalReadiness });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowExplanation(false);
    } else if (onPrev) {
      onPrev();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "math": return <Calculator className="w-5 h-5" />;
      case "chemistry": return <Beaker className="w-5 h-5" />;
      case "physics": return <Cog className="w-5 h-5" />;
      default: return <Calculator className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "math": return "text-primary";
      case "chemistry": return "text-accent";
      case "physics": return "text-success";
      default: return "text-primary";
    }
  };

  const isCorrectAnswer = (optionValue: string) => {
    return question.options.find(opt => opt.value === optionValue)?.correct;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card backdrop-blur-sm shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Technical Readiness Assessment
          </CardTitle>
          <p className="text-muted-foreground">
            Testing your foundational knowledge in math, chemistry, and physics
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <Card className="border-l-4 border-l-primary shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className={`${getCategoryColor(question.category)} mt-1`}>
                  {getCategoryIcon(question.category)}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium mb-2">{question.text}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {question.category} Question
                  </p>
                </div>
              </div>

              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {question.options.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                      showExplanation && answers[question.id]
                        ? option.correct
                          ? "bg-success/10 border border-success/30"
                          : answers[question.id] === option.value
                          ? "bg-destructive/10 border border-destructive/30"
                          : "hover:bg-primary/5"
                        : "hover:bg-primary/5"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="text-primary"
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {option.label}
                      {showExplanation && option.correct && (
                        <span className="ml-2 text-success font-medium">✓ Correct</span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Explanation */}
              {showExplanation && question.explanation && (
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">Explanation:</h4>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevQuestion}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentQuestion === 0 ? "Back" : "Previous"}
            </Button>

            <Button
              onClick={nextQuestion}
              disabled={!answers[question.id]}
              className="bg-gradient-primary hover:bg-gradient-accent shadow-medium transition-all duration-300 flex items-center"
            >
              {currentQuestion === questions.length - 1 ? "Complete Section" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AptitudeSection;