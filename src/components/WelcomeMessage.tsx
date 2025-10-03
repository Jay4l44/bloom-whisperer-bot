import bloomBotCharacter from "@/assets/bloombot-character.png";

export const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in fade-in zoom-in duration-700">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-card border-4 border-primary/20 shadow-lg">
        <img 
          src={bloomBotCharacter} 
          alt="BloomBot" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-2 max-w-md">
        <h2 className="text-3xl font-bold text-foreground">
          What's on your mind?
        </h2>
        <p className="text-muted-foreground text-lg">
          I'm here to help you learn about Egyptian plants and flora! 🌱
        </p>
      </div>
    </div>
  );
};
