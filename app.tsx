import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Wand2, FileText, Sparkles, Download, Send } from "lucide-react";

export const ApplicationGenerator = () => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedApplication, setGeneratedApplication] = useState("");

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please paste the job description to generate a personalized application.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedApplication("");

    // Simulate AI generation with progress
    const steps = [
      "Analyzing job requirements...",
      "Matching your skills...",
      "Crafting personalized content...",
      "Optimizing for ATS systems...",
      "Finalizing application..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress((i + 1) * 20);

      toast({
        title: steps[i],
        description: `Step ${i + 1} of ${steps.length}`,
      });
    }

    // Simulate generated content
    const mockApplication = `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at your company. With my extensive background in full-stack development and proven track record of delivering scalable solutions, I am confident I would be a valuable addition to your team.

Key qualifications that align with your requirements:
• 5+ years of experience in React, Node.js, and TypeScript
• Led development of applications serving 100K+ users
• Strong problem-solving skills and collaborative mindset
• Experience with cloud platforms (AWS, Azure)

I am particularly excited about this opportunity because it aligns perfectly with my passion for building innovative solutions that make a real impact. Your company's commitment to cutting-edge technology and user-centric design resonates with my professional values.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's success. Thank you for considering my application.

Best regards,
[Your Name]`;

    setGeneratedApplication(mockApplication);
    setIsGenerating(false);

    toast({
      title: "Application Generated Successfully!",
      description: "Your personalized application is ready for review.",
    });
  };

  const handleSend = () => {
    toast({
      title: "Application Sent",
      description: "Your application has been submitted successfully!",
    });
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-card">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Wand2 className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold">AI Application Generator</h3>
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Job Description
            </label>
            <Textarea
              placeholder="Paste the job description here to generate a personalized application..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[120px] resize-none" />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            variant="premium"
            size="lg"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 animate-pulse" />
                Generating Application...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate Personalized Application
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="space-y-2">
              <Progress value={generationProgress} className="[&>div]:bg-gradient-primary" />
              <p className="text-sm text-muted-foreground text-center">
                {generationProgress}% complete
              </p>
            </div>
          )}

          {generatedApplication && (
            <div className="space-y-4">
              <div className="border border-border/50 rounded-lg p-4 bg-card/50">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Generated Application</span>
                  <Badge variant="success" className="ml-auto">
                    Ready to Send
                  </Badge>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                  {generatedApplication}
                </pre>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button onClick={handleSend} variant="success" className="flex-1">
                  <Send className="h-4 w-4" />
                  Send Application
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}