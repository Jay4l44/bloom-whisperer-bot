import { cn } from "@/lib/utils";
import bloomBotCharacter from "@/assets/bloombot-character.png";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export const ChatBubble = ({ message, isUser, timestamp }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {!isUser && (
        <img 
          src={bloomBotCharacter} 
          alt="BloomBot" 
          className="flex-shrink-0 w-10 h-10 object-contain"
        />
      )}
      
      <div className={cn(
        "flex flex-col max-w-[75%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-sm" 
            : "bg-card text-card-foreground rounded-tl-sm border border-border"
        )}>
          <div 
            className="text-sm leading-relaxed whitespace-pre-wrap font-medium"
            dangerouslySetInnerHTML={{ 
              __html: message.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') 
            }}
          />
        </div>
        
        {timestamp && (
          <span className="text-xs text-muted-foreground mt-1 px-2">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};
