import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Download, 
  Share2, 
  BookOpen, 
  TrendingUp,
  Users,
  DollarSign,
  MapPin
} from "lucide-react";
import { AssessmentData } from "../Assessment";

interface ResultsDashboardProps {
  data: AssessmentData;
  onPrev?: () => void;
}

const ResultsDashboard = ({ data, onPrev }: ResultsDashboardProps) => {
  // Calculate overall confidence score
  const wiscarAverage = Object.values(data.wiscar).reduce((sum, score) => sum + score, 0) / 6;
  const confidenceScore = Math.round(
    (data.psychometricFit * 0.3) + 
    (data.technicalReadiness * 0.3) + 
    (wiscarAverage * 0.4)
  );

  // Determine recommendation
  let recommendation: "Yes" | "Maybe" | "No" = "Maybe";
  if (confidenceScore >= 75) recommendation = "Yes";
  else if (confidenceScore <= 45) recommendation = "No";

  const getRecommendationIcon = () => {
    switch (recommendation) {
      case "Yes": return <CheckCircle className="w-6 h-6 text-success" />;
      case "Maybe": return <AlertCircle className="w-6 h-6 text-warning" />;
      case "No": return <XCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (recommendation) {
      case "Yes": return "bg-success/10 border-success/30 text-success";
      case "Maybe": return "bg-warning/10 border-warning/30 text-warning";
      case "No": return "bg-destructive/10 border-destructive/30 text-destructive";
    }
  };

  const getRecommendationText = () => {
    switch (recommendation) {
      case "Yes": return "Chemical Engineering is an excellent fit for you! You show strong alignment across all key areas.";
      case "Maybe": return "Chemical Engineering could be a good fit with some preparation. Focus on strengthening key areas.";
      case "No": return "You might be better suited for a related field. Consider exploring alternative paths.";
    }
  };

  const wiscarDimensions = [
    { key: "will", label: "Will & Perseverance", color: "bg-accent" },
    { key: "interest", label: "Interest & Curiosity", color: "bg-primary" },
    { key: "skill", label: "Current Skills", color: "bg-success" },
    { key: "cognitiveReadiness", label: "Cognitive Readiness", color: "bg-warning" },
    { key: "abilityToLearn", label: "Ability to Learn", color: "bg-primary" },
    { key: "realWorldAlignment", label: "Real-World Alignment", color: "bg-accent" },
  ];

  const careerPaths = [
    {
      title: "Process Engineer",
      description: "Design and optimize manufacturing processes",
      salary: "$75,000 - $95,000",
      growth: "High",
      match: Math.max(data.technicalReadiness, data.wiscar.skill)
    },
    {
      title: "R&D Engineer", 
      description: "Research and develop new chemical products",
      salary: "$80,000 - $110,000",
      growth: "Very High",
      match: Math.max(data.psychometricFit, data.wiscar.interest)
    },
    {
      title: "Environmental Engineer",
      description: "Develop solutions for environmental challenges",
      salary: "$70,000 - $90,000", 
      growth: "High",
      match: data.wiscar.realWorldAlignment
    },
    {
      title: "Quality Assurance Specialist",
      description: "Ensure product quality and regulatory compliance",
      salary: "$65,000 - $85,000",
      growth: "Moderate",
      match: Math.max(data.technicalReadiness, data.wiscar.cognitiveReadiness)
    }
  ];

  const learningPath = [
    { phase: "Phase 1", title: "Foundations", duration: "3-4 weeks", topics: ["Chemistry Basics", "Math Review", "Introduction to Engineering"] },
    { phase: "Phase 2", title: "Core Concepts", duration: "6-8 weeks", topics: ["Thermodynamics", "Fluid Mechanics", "Mass Transfer"] },
    { phase: "Phase 3", title: "Applications", duration: "8-10 weeks", topics: ["Process Design", "Reaction Engineering", "Control Systems"] },
    { phase: "Phase 4", title: "Practice", duration: "12+ weeks", topics: ["Internships", "Projects", "Industry Exposure"] }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Results */}
      <Card className="bg-gradient-card backdrop-blur-sm shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Your Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Confidence Score */}
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">{confidenceScore}%</div>
            <p className="text-xl text-muted-foreground mb-4">Overall Confidence Score</p>
            <Progress value={confidenceScore} className="h-3 mb-4" />
          </div>

          {/* Recommendation */}
          <Card className={`border-2 ${getRecommendationColor()}`}>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3">
                {getRecommendationIcon()}
              </div>
              <h3 className="text-xl font-bold mb-2">
                Recommendation: {recommendation === "Yes" ? "Start Learning" : recommendation === "Maybe" ? "Explore Further" : "Consider Alternatives"}
              </h3>
              <p className="text-sm">{getRecommendationText()}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Psychometric Fit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">{data.psychometricFit}%</div>
            <Progress value={data.psychometricFit} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              Personality and interest alignment
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Technical Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent mb-2">{data.technicalReadiness}%</div>
            <Progress value={data.technicalReadiness} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              Current knowledge foundation
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">WISCAR Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success mb-2">{Math.round(wiscarAverage)}%</div>
            <Progress value={wiscarAverage} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              Six-dimensional readiness
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Breakdown */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>WISCAR Framework Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {wiscarDimensions.map((dimension) => (
              <div key={dimension.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{dimension.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {data.wiscar[dimension.key as keyof typeof data.wiscar]}%
                  </span>
                </div>
                <Progress 
                  value={data.wiscar[dimension.key as keyof typeof data.wiscar]} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Career Opportunities Ranked by Fit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerPaths
              .sort((a, b) => b.match - a.match)
              .map((career, index) => (
              <div key={career.title} className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex-1">
                  <h4 className="font-medium">{career.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {career.salary}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {career.growth} Growth
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{career.match}%</div>
                  <div className="text-xs text-muted-foreground">Match</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Pathway */}
      {recommendation !== "No" && (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Recommended Learning Pathway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningPath.map((phase, index) => (
                <div key={phase.phase} className="relative">
                  {index < learningPath.length - 1 && (
                    <div className="absolute left-4 top-8 w-0.5 h-12 bg-primary/20" />
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{phase.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{phase.duration}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="outline" className="flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" className="flex items-center">
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
        {onPrev && (
          <Button variant="outline" onClick={onPrev}>
            Retake Assessment
          </Button>
        )}
        <Button className="bg-gradient-primary hover:bg-gradient-accent shadow-medium">
          {recommendation === "Yes" ? "Start Learning Path" : "Explore Alternatives"}
        </Button>
      </div>
    </div>
  );
};

export default ResultsDashboard;