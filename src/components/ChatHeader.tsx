import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import bloomBotCharacter from "@/assets/bloombot-character.png";

interface ChatHeaderProps {
  onMenuToggle: () => void;
  onMenuClose: () => void;
  isMenuOpen: boolean;
}

export const ChatHeader = ({ onMenuToggle, onMenuClose, isMenuOpen }: ChatHeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={isMenuOpen ? onMenuClose : onMenuToggle}
            className="hover:bg-muted"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-3">
            <img 
              src={bloomBotCharacter} 
              alt="BloomBot" 
              className="w-10 h-10 object-contain"
            />
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
