import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Brain, Heart, Target } from "lucide-react";
import { AssessmentData } from "../Assessment";

interface PsychometricSectionProps {
  data: AssessmentData;
  onNext: (data: Partial<AssessmentData>) => void;
  onPrev?: () => void;
}

interface Question {
  id: string;
  text: string;
  category: "interest" | "personality" | "motivation";
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: "q1",
    text: "I enjoy solving technical problems using formulas and data analysis",
    category: "interest",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: "q2", 
    text: "I like conducting experiments and analyzing results",
    category: "interest",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: "q3",
    text: "I am naturally detail-oriented and methodical in my approach",
    category: "personality",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: "q4",
    text: "I remain calm and focused under pressure",
    category: "personality", 
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: "q5",
    text: "I am driven by curiosity and the desire to understand how things work",
    category: "motivation",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: "q6",
    text: "I persist through challenges even when solutions aren't immediately obvious",
    category: "motivation",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: "q7",
    text: "I enjoy working with mathematical models and equations",
    category: "interest",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: "q8",
    text: "I prefer structured environments with clear procedures",
    category: "personality",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
];

const PsychometricSection = ({ onNext, onPrev }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate psychometric fit score
      const totalScore = Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0);
      const maxScore = questions.length * 5;
      const psychometricFit = Math.round((totalScore / maxScore) * 100);
      
      onNext({ psychometricFit });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (onPrev) {
      onPrev();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "interest": return <Heart className="w-5 h-5" />;
      case "personality": return <Brain className="w-5 h-5" />;
      case "motivation": return <Target className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "interest": return "text-accent";
      case "personality": return "text-primary";
      case "motivation": return "text-success";
      default: return "text-primary";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card backdrop-blur-sm shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Psychometric Assessment
          </CardTitle>
          <p className="text-muted-foreground">
            Understanding your personality, interests, and motivations
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
                    {question.category} Assessment
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
                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/5 transition-colors"
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
                    </Label>
                  </div>
                ))}
              </RadioGroup>
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

export default PsychometricSection;