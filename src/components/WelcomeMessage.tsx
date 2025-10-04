import bloomBotCharacter from "@/assets/bloombot-character.png";

export const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in fade-in zoom-in duration-700">
      <img 
        src={bloomBotCharacter} 
        alt="BloomBot" 
        className="w-32 h-32 object-contain"
      />
      
      <div className="space-y-2 max-w-md">
        <h2 className="text-3xl font-bold text-foreground" style={{ color: 'hsl(25, 40%, 25%)' }}>
          What's on your mind?
        </h2>
      </div>
    </div>
  );
};
