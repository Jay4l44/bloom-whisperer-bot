import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const prompts = [
  "What plants bloom in spring?",
  "Tell me about Date Palms",
  "How do I care for Jasmine?",
  "What plants grow in the Sinai?",
];

export const SuggestedPrompts = ({ onSelectPrompt }: SuggestedPromptsProps) => {
  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4" />
        <span>Try asking about:</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start text-left h-auto py-3 px-4 bg-card hover:bg-muted border-border hover:border-primary transition-all"
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};
