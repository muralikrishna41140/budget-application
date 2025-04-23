
import { useState } from "react";
import { Smile, Meh, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const MoodTracker = () => {
  const [mood, setMood] = useState<string | null>(null);

  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood);
    let advice = "";
    switch (selectedMood) {
      case "happy":
        advice = "That's great! Your finances look strong. Want to explore some investment opportunities?";
        break;
      case "neutral":
        advice = "Good day for balanced decisions. Consider reviewing your budget allocations.";
        break;
      case "stressed":
        advice = "Let's focus on financial stability today. Here are some stress-free savings tips.";
        break;
      default:
        advice = "How can I help with your finances today?";
    }
    toast.success(`Mood updated: ${selectedMood}`, {
      description: advice,
      duration: 5000
    });
  };

  return (
    <Card className="p-4 overflow-hidden">
      <h2 className="text-lg font-semibold mb-3">How are you feeling?</h2>
      <div className="grid grid-cols-3 gap-2">
        <Button 
          onClick={() => handleMoodSelect("happy")} 
          variant={mood === "happy" ? "default" : "outline"} 
          className="flex flex-col items-center gap-1 p-2 h-auto"
        >
          <Smile className="h-5 w-5 text-finance-teal" />
          <span className="text-xs sm:text-sm">Happy</span>
        </Button>
        <Button 
          onClick={() => handleMoodSelect("neutral")} 
          variant={mood === "neutral" ? "default" : "outline"} 
          className="flex flex-col items-center gap-1 p-2 h-auto"
        >
          <Meh className="h-5 w-5 text-finance-gold" />
          <span className="text-xs sm:text-sm">Neutral</span>
        </Button>
        <Button 
          onClick={() => handleMoodSelect("stressed")} 
          variant={mood === "stressed" ? "default" : "outline"} 
          className="flex flex-col items-center gap-1 p-2 h-auto"
        >
          <Frown className="h-5 w-5 text-finance-coral" />
          <span className="text-xs sm:text-sm">Stressed</span>
        </Button>
      </div>
    </Card>
  );
};

export default MoodTracker;
