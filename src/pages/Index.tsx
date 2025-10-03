import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { SuggestedPrompts } from "@/components/SuggestedPrompts";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('bloombot-chat', {
        body: { message: content },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error.message?.includes('429')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (error.message?.includes('402')) {
        errorMessage = 'Service temporarily unavailable. Please try again later.';
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Hidden on mobile by default */}
      <aside
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 z-40 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out h-full`}
      >
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-lg text-foreground">BloomSphere</h2>
          <p className="text-xs text-muted-foreground mt-1">Learn about plants worldwide</p>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)] p-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Quick tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Ask about specific plants</li>
                <li>• Learn about bloom seasons</li>
                <li>• Get care instructions</li>
                <li>• Discover regional flora</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main chat area */}
      <main className="flex-1 flex flex-col h-screen">
        <ChatHeader onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-3xl mx-auto">
            {messages.length === 0 ? (
              <div className="space-y-8">
                <WelcomeMessage />
                <SuggestedPrompts onSelectPrompt={handleSendMessage} />
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    message={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Index;
