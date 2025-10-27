import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface QuestionScreenProps {
  step: number;
  title: string;
  subtext?: string;
  options: string[];
  onSelect: (option: string, index: number) => void;
  onBack?: () => void;
}

export const QuestionScreen = ({ 
  step, 
  title, 
  subtext, 
  options, 
  onSelect,
  onBack
}: QuestionScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-fade-in">
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-[3.75rem] left-4 z-10 p-2 rounded-full hover:bg-accent transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" style={{ color: '#F05A26' }} />
        </button>
      )}
      <div className="w-full max-w-[360px] md:max-w-[520px] lg:max-w-[640px] space-y-8 md:space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
            {title}
          </h1>
          {subtext && (
            <p className="text-base md:text-lg font-medium" style={{ color: '#2788A0' }}>
              {subtext}
            </p>
          )}
        </div>

        <div className="space-y-5 md:space-y-6">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onSelect(option, index)}
              className="w-full h-auto min-h-[60px] py-5 px-6 text-base md:text-lg font-medium rounded-2xl
                       bg-card text-foreground border-2 border-border 
                       shadow-sm hover:shadow-lg hover:scale-[1.02] hover:border-primary/50
                       active:scale-[0.98] transition-all duration-200
                       focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                       leading-relaxed"
              data-step={step}
              data-question={`q${step}`}
              data-option-index={index}
              data-option-text={option}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
