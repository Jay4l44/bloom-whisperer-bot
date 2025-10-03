import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import bloomBotCharacter from "@/assets/bloombot-character.png";

interface ChatHeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const ChatHeader = ({ onMenuToggle, isMenuOpen }: ChatHeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="hover:bg-muted"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-background border-2 border-primary/20">
              <img 
                src={bloomBotCharacter} 
                alt="BloomBot" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">BloomBot</h1>
              <p className="text-xs text-muted-foreground">Your plant learning companion</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
