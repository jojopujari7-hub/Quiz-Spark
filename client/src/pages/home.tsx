import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Zap, Brain, Plus, X, Loader2 } from "lucide-react";
import type { Quiz } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([""]);

  const createQuizMutation = useMutation({
    mutationFn: async (data: { topic: string; seedQuestions: string[] }) => {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create quiz");
      }
      
      return response.json() as Promise<Quiz>;
    },
    onSuccess: (quiz) => {
      setLocation(`/quiz/${quiz.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Oops!",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 6) {
      setQuestions([...questions, ""]);
    }
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filledQuestions = questions.filter(q => q.trim().length > 0);
    
    if (topic.trim().length < 3) {
      toast({
        title: "Topic too short",
        description: "Please enter a topic with at least 3 characters",
        variant: "destructive",
      });
      return;
    }
    
    
    createQuizMutation.mutate({
      topic: topic.trim(),
      seedQuestions: filledQuestions,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Quiz Generator</span>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            QuizBot
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Give us your quiz idea with a few example questions, and we'll create a fun 10-question quiz for you!
          </p>
        </div>

        <Card className="border-2 border-border/50 shadow-xl backdrop-blur-sm" data-testid="card-quiz-form">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Brain className="w-6 h-6 text-primary" />
              Create Your Quiz
            </CardTitle>
            <CardDescription>
              Enter a topic to get started. Add example questions to personalize your quiz!
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-base font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  Quiz Topic
                </Label>
                <Input
                  id="topic"
                  data-testid="input-topic"
                  placeholder="e.g., Space Exploration, 90s Movies, World Cuisines..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Example Questions (optional)
                </Label>
                
                {questions.map((question, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <Textarea
                      data-testid={`input-question-${index}`}
                      placeholder={`Question ${index + 1}...`}
                      value={question}
                      onChange={(e) => updateQuestion(index, e.target.value)}
                      className="min-h-[60px] resize-none"
                    />
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(index)}
                        className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                        data-testid={`button-remove-question-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                
                {questions.length < 6 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addQuestion}
                    className="w-full border-dashed"
                    data-testid="button-add-question"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Question
                  </Button>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-lg h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                disabled={createQuizMutation.isPending}
                data-testid="button-generate-quiz"
              >
                {createQuizMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Quiz...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate My Quiz!
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Your quiz will have 10 fun questions based on your topic and examples!</p>
        </div>
      </div>
    </div>
  );
}
