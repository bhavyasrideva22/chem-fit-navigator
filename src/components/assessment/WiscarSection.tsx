import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Zap, Heart, Wrench, Brain, TrendingUp, Target } from "lucide-react";
import { AssessmentData } from "../Assessment";

interface WiscarSectionProps {
  data: AssessmentData;
  onNext: (data: Partial<AssessmentData>) => void;
  onPrev?: () => void;
}

interface Question {
  id: string;
  text: string;
  dimension: "will" | "interest" | "skill" | "cognitiveReadiness" | "abilityToLearn" | "realWorldAlignment";
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: "will1",
    text: "You fail at a chemical engineering task 3 times in a row. What do you do?",
    dimension: "will",
    options: [
      { value: "1", label: "Give up and try something else" },
      { value: "2", label: "Take a break and maybe try again later" },
      { value: "3", label: "Ask for help and try a different approach" },
      { value: "4", label: "Analyze what went wrong and persistently try again" },
      { value: "5", label: "See it as a challenge and work even harder to succeed" },
    ],
  },
  {
    id: "interest1",
    text: "Which of these topics excites you most?",
    dimension: "interest",
    options: [
      { value: "1", label: "Social media and marketing trends" },
      { value: "2", label: "Art and creative expression" },
      { value: "3", label: "How chemical processes work in industry" },
      { value: "4", label: "Environmental sustainability and green technology" },
      { value: "5", label: "Optimizing complex chemical reactions and systems" },
    ],
  },
  {
    id: "skill1",
    text: "How would you rate your current mathematical problem-solving abilities?",
    dimension: "skill",
    options: [
      { value: "1", label: "Basic arithmetic only" },
      { value: "2", label: "Comfortable with algebra" },
      { value: "3", label: "Can handle calculus problems" },
      { value: "4", label: "Strong in advanced mathematics" },
      { value: "5", label: "Expert in mathematical modeling" },
    ],
  },
  {
    id: "cognitive1",
    text: "When faced with a complex technical problem, you typically:",
    dimension: "cognitiveReadiness",
    options: [
      { value: "1", label: "Feel overwhelmed and avoid it" },
      { value: "2", label: "Try to find someone else to solve it" },
      { value: "3", label: "Break it down into smaller parts" },
      { value: "4", label: "Systematically analyze all variables" },
      { value: "5", label: "Create multiple solution strategies and test them" },
    ],
  },
  {
    id: "learn1",
    text: "How do you respond to constructive criticism about your work?",
    dimension: "abilityToLearn",
    options: [
      { value: "1", label: "Take it personally and feel discouraged" },
      { value: "2", label: "Listen but don't usually change my approach" },
      { value: "3", label: "Consider the feedback and make some adjustments" },
      { value: "4", label: "Actively seek out feedback to improve" },
      { value: "5", label: "Use feedback as fuel for continuous improvement" },
    ],
  },
  {
    id: "realworld1",
    text: "Which activity would you find most engaging?",
    dimension: "realWorldAlignment",
    options: [
      { value: "1", label: "Planning social events" },
      { value: "2", label: "Writing creative stories" },
      { value: "3", label: "Optimizing a chemical reactor's efficiency" },
      { value: "4", label: "Designing waste reduction systems" },
      { value: "5", label: "Developing new sustainable chemical processes" },
    ],
  },
  {
    id: "will2",
    text: "How many hours would you dedicate to learning a challenging new concept?",
    dimension: "will",
    options: [
      { value: "1", label: "1-2 hours until I understand basics" },
      { value: "2", label: "3-5 hours spread over a few days" },
      { value: "3", label: "5-10 hours until I'm comfortable" },
      { value: "4", label: "10-20 hours until I'm proficient" },
      { value: "5", label: "As many hours as needed to master it" },
    ],
  },
  {
    id: "skill2",
    text: "Your experience with laboratory work or experimental procedures:",
    dimension: "skill",
    options: [
      { value: "1", label: "No experience at all" },
      { value: "2", label: "Basic high school lab work" },
      { value: "3", label: "Some college-level experiments" },
      { value: "4", label: "Comfortable with various lab techniques" },
      { value: "5", label: "Extensive hands-on experimental experience" },
    ],
  },
];

const WiscarSection = ({ onNext, onPrev }: WiscarSectionProps) => {
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
      // Calculate WISCAR scores
      const wiscarScores = {
        will: 0,
        interest: 0,
        skill: 0,
        cognitiveReadiness: 0,
        abilityToLearn: 0,
        realWorldAlignment: 0,
      };

      // Count questions per dimension
      const dimensionCounts = {
        will: 0,
        interest: 0,
        skill: 0,
        cognitiveReadiness: 0,
        abilityToLearn: 0,
        realWorldAlignment: 0,
      };

      questions.forEach(q => {
        const answer = answers[q.id];
        if (answer) {
          wiscarScores[q.dimension] += parseInt(answer);
          dimensionCounts[q.dimension]++;
        }
      });

      // Convert to 0-100 scale
      Object.keys(wiscarScores).forEach(dim => {
        const dimension = dim as keyof typeof wiscarScores;
        if (dimensionCounts[dimension] > 0) {
          wiscarScores[dimension] = Math.round(
            (wiscarScores[dimension] / (dimensionCounts[dimension] * 5)) * 100
          );
        }
      });

      onNext({ wiscar: wiscarScores });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (onPrev) {
      onPrev();
    }
  };

  const getDimensionIcon = (dimension: string) => {
    switch (dimension) {
      case "will": return <Zap className="w-5 h-5" />;
      case "interest": return <Heart className="w-5 h-5" />;
      case "skill": return <Wrench className="w-5 h-5" />;
      case "cognitiveReadiness": return <Brain className="w-5 h-5" />;
      case "abilityToLearn": return <TrendingUp className="w-5 h-5" />;
      case "realWorldAlignment": return <Target className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getDimensionColor = (dimension: string) => {
    switch (dimension) {
      case "will": return "text-accent";
      case "interest": return "text-primary";
      case "skill": return "text-success";
      case "cognitiveReadiness": return "text-warning";
      case "abilityToLearn": return "text-primary";
      case "realWorldAlignment": return "text-accent";
      default: return "text-primary";
    }
  };

  const getDimensionName = (dimension: string) => {
    switch (dimension) {
      case "will": return "Will & Perseverance";
      case "interest": return "Interest & Curiosity";
      case "skill": return "Current Skills";
      case "cognitiveReadiness": return "Cognitive Readiness";
      case "abilityToLearn": return "Ability to Learn";
      case "realWorldAlignment": return "Real-World Alignment";
      default: return "Assessment";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card backdrop-blur-sm shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            WISCAR Framework Assessment
          </CardTitle>
          <p className="text-muted-foreground">
            Comprehensive evaluation across six key dimensions
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
                <div className={`${getDimensionColor(question.dimension)} mt-1`}>
                  {getDimensionIcon(question.dimension)}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium mb-2">{question.text}</p>
                  <p className="text-sm text-muted-foreground">
                    {getDimensionName(question.dimension)}
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
              {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WiscarSection;