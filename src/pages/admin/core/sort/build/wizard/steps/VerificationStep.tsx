import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check, X } from "lucide-react";

interface VerificationStepProps {
  initialData: any;
  onComplete: (data: any) => void;
}

const verificationQuestions = [
  {
    id: "safety_measures",
    question: "Have you implemented all necessary safety measures?",
  },
  {
    id: "tested_functionality",
    question: "Have you tested all functionality of the build?",
  },
  {
    id: "documentation_complete",
    question: "Is the build documentation complete and accurate?",
  },
  {
    id: "parts_listed",
    question: "Have you listed all required parts and tools?",
  },
  {
    id: "quality_checked",
    question: "Have you performed a final quality check?",
  },
];

export const VerificationStep = ({ initialData, onComplete }: VerificationStepProps) => {
  const [responses, setResponses] = useState(
    initialData.verification_responses || []
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleResponse = (response: boolean) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = {
      question_id: verificationQuestions[currentQuestion].id,
      response,
      notes: "",
    };
    setResponses(updatedResponses);

    if (currentQuestion < verificationQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleNotesChange = (notes: string) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = {
      ...updatedResponses[currentQuestion],
      notes,
    };
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    if (responses.length !== verificationQuestions.length) {
      return;
    }
    onComplete({ verification_responses: responses });
  };

  const isComplete = responses.length === verificationQuestions.length;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {verificationQuestions[currentQuestion].question}
            </h3>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {verificationQuestions.length}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              className="w-32"
              onClick={() => handleResponse(true)}
            >
              <Check className="w-4 h-4 mr-2" />
              Yes
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-32"
              onClick={() => handleResponse(false)}
            >
              <X className="w-4 h-4 mr-2" />
              No
            </Button>
          </div>

          {responses[currentQuestion] && (
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={responses[currentQuestion].notes || ""}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Add any additional notes or explanations..."
              />
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        {isComplete ? (
          <Button onClick={handleSubmit}>Next Step</Button>
        ) : (
          <div className="flex items-center text-muted-foreground">
            <AlertCircle className="w-4 h-4 mr-2" />
            Please answer all questions
          </div>
        )}
      </div>
    </div>
  );
};