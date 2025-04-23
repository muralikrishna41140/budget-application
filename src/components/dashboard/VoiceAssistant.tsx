
import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [voiceResponse, setVoiceResponse] = useState<string | null>(null);

  const toggleVoiceAssistant = () => {
    if (listening) {
      setListening(false);
      setVoiceResponse(null);
    } else {
      setListening(true);
      
      setTimeout(() => {
        const responses = [
          "Your current savings are ₹42,500",
          "Based on your budget, you can spend ₹8,200 this week",
          "You've saved 12% more this month compared to last month"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setVoiceResponse(randomResponse);
        
        toast.success("Voice Assistant", {
          description: randomResponse,
          duration: 5000
        });
        
        setListening(false);
      }, 2000);
    }
  };

  return (
    <>
      <Button
        onClick={toggleVoiceAssistant}
        variant="outline"
        size="lg"
        className={`hover:bg-primary/10 ${listening ? 'bg-red-500/10 animate-pulse' : ''}`}
      >
        {listening ? (
          <MicOff className="h-5 w-5 text-finance-coral mr-2" />
        ) : (
          <Mic className="h-5 w-5 text-finance-teal mr-2" />
        )}
        {listening ? "Stop Listening" : "Ask AI Assistant"}
      </Button>

      {voiceResponse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <p className="text-sm">{voiceResponse}</p>
        </motion.div>
      )}
    </>
  );
};

export default VoiceAssistant;
