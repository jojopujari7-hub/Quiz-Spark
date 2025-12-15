import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  Home,
  Loader2,
  PartyPopper,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  funFact?: string;
}

interface Quiz {
  id: string;
  topic: string;
  generatedQuestions: QuizQuestion[];
}

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const { data: quiz, isLoading, error } = useQuery<Quiz>({
    queryKey: ["quiz", id],
    queryFn: async () => {
      const { getQuiz } = await import("@/lib/supabase");
      const quiz = await getQuiz(id);
      if (!quiz) throw new Error("Quiz not found");
      return quiz;
    },
  });

  const questions = quiz?.generatedQuestions;

  useEffect(() => {
    if (questions) {
      setAnswers(new Array(questions.length).fill(null));
    }
  }, [questions]);

  if (isLoading) {
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"><div className="text-center"><Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" /><p className="text-muted-foreground">Loading your quiz...</p></div></div>);
  }

  if (error || !questions || questions.length === 0) {
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4"><Card className="max-w-md w-full text-center" data-testid="card-quiz-error"><CardContent className="pt-8 pb-6"><XCircle className="w-16 h-16 text-destructive mx-auto mb-4" /><h2 className="text-2xl font-bold mb-2">Quiz Not Found</h2><p className="text-muted-foreground mb-6">This quiz doesn't exist or has been removed.</p><Button onClick={() => setLocation("/")} data-testid="button-go-home"><Home className="w-4 h-4 mr-2" />Create a New Quiz</Button></CardContent></Card></div>);
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    if (showResult || !question) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);

    if (index === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
    setIsFinished(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions!.length) * 100;
    if (percentage === 100) return "Perfect Score! You're a genius!";
    if (percentage >= 80) return "Amazing! You really know your stuff!";
    if (percentage >= 60) return "Great job! You're getting there!";
    if (percentage >= 40) return "Not bad! Keep learning!";
    return "Keep trying! Practice makes perfect!";
  };

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12">
        <Card className="max-w-lg w-full border-2 border-border/50 shadow-xl" data-testid="card-quiz-results">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              {score >= questions!.length * 0.8 ? (
                <PartyPopper className="w-10 h-10 text-primary" />
              ) : (
                <Trophy className="w-10 h-10 text-primary" />
              )}
            </div>
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                {score}/{questions!.length}
              </div>
              <p className="text-lg text-muted-foreground">{getScoreMessage()}</p>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {answers.map((answer, index) => {
                const currentQ = questions![index];
                const isCorrect = answer === currentQ.correctIndex;
                return (
                  <div
                    key={index}
                    className={cn("h-3 rounded-full", isCorrect ? "bg-green-500" : "bg-destructive")}
                    data-testid={`result-indicator-${index}`}
                  />
                );
              })}
            </div>
            <div className="space-y-3 pt-4">
              <Button onClick={restartQuiz} className="w-full h-12" data-testid="button-restart-quiz">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" onClick={() => setLocation("/")} className="w-full h-12" data-testid="button-new-quiz">
                <Sparkles className="w-4 h-4 mr-2" />
                Create New Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-sm" data-testid="badge-topic">
              {quiz?.topic || "Quiz"}
            </Badge>
            <span className="text-sm text-muted-foreground" data-testid="text-progress">
              Question {currentQuestion + 1} of {questions?.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {question && (
        <Card className="border-2 border-border/50 shadow-xl" data-testid="card-question">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg">
                {currentQuestion + 1}
              </div>
              <CardTitle className="text-xl leading-relaxed pt-2" data-testid="text-question">
                {question.question}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isCorrect = index === question.correctIndex;
                const isSelected = selectedAnswer === index;

                return (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showResult}
                        className={cn(
                            "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex items-center justify-between",
                            !showResult
                                ? "bg-white hover:bg-gray-100 border-gray-200"
                                : isCorrect
                                ? "bg-green-100 border-green-500 text-green-700"
                                : isSelected
                                ? "bg-red-100 border-red-500 text-red-700 opacity-50"
                                : "bg-white border-gray-200 opacity-50"
                        )}
                        data-testid={`button-option-${index}`}
                    >
                        <span>{option}</span>
                        {showResult &&
                            (isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                                isSelected && (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                )
                            ))}
                    </button>
                )
              })}
            </div>

            {showResult && (
              <div className="space-y-4 pt-4">
                {question.funFact && (
                  <div className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800" data-testid="fun-fact">
                    <Lightbulb className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{question.funFact}</p>
                  </div>
                )}
                <Button 
                  onClick={nextQuestion} 
                  className="w-full h-12"
                  data-testid="button-next-question"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
}
