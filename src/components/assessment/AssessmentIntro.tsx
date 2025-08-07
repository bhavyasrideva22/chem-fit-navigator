import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Beaker, Factory, Lightbulb, Target, Users, TrendingUp } from "lucide-react";

interface AssessmentIntroProps {
  onNext: () => void;
}

const AssessmentIntro = ({ onNext }: AssessmentIntroProps) => {
  const careers = [
    { title: "Process Engineer", icon: Factory },
    { title: "R&D Engineer", icon: Lightbulb },
    { title: "Environmental Consultant", icon: Target },
    { title: "Quality Assurance Specialist", icon: Beaker },
  ];

  const traits = [
    "Analytical thinking",
    "Problem-solving",
    "Persistence",
    "Curiosity",
    "Attention to detail",
    "Strong math/science background",
  ];

  const industries = [
    "Energy & Petroleum",
    "Pharmaceuticals",
    "Materials Science",
    "Food Processing",
    "Environmental Engineering",
    "Nanotechnology",
  ];

  return (
    <div className="space-y-6">
      {/* Main Introduction */}
      <Card className="bg-gradient-card backdrop-blur-sm shadow-large border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Is Chemical Engineering Right for You?
          </CardTitle>
          <p className="text-xl text-muted-foreground mt-2">
            A Personalized Readiness & Fit Assessment
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold mb-3 text-primary">Assessment Purpose</h3>
            <p className="text-muted-foreground">
              This comprehensive assessment will help you determine whether Chemical Engineering
              aligns with your interests, abilities, and career goals through scientifically-backed
              psychometric evaluation, aptitude testing, and career alignment analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Beaker className="w-5 h-5 mr-2 text-accent" />
                What is Chemical Engineering?
              </h3>
              <p className="text-muted-foreground text-sm">
                Chemical Engineering applies chemistry, physics, biology, and mathematics to
                convert raw materials into valuable products sustainably and safely. It bridges
                science and industry to solve complex problems.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-success" />
                Assessment Duration
              </h3>
              <p className="text-muted-foreground text-sm">
                This assessment takes approximately 25-30 minutes to complete and includes
                psychometric evaluation, technical readiness testing, and personalized
                recommendations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" />
            Career Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {careers.map((career, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 hover:shadow-soft transition-all duration-300"
              >
                <career.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">{career.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industries and Traits */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Key Industries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-accent/10 hover:bg-accent/20 transition-colors"
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">Successful Traits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {traits.map((trait, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-success rounded-full mr-3" />
                  {trait}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Start Assessment Button */}
      <div className="text-center">
        <Button
          onClick={onNext}
          size="lg"
          className="bg-gradient-primary hover:bg-gradient-accent shadow-glow hover:shadow-large transition-all duration-300 px-8 py-6 text-lg"
        >
          Start Assessment
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentIntro;