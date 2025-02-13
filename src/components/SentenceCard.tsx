
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, Ear, Music, Hand, Apple } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SentenceCardProps {
  text: string;
  category: string;
  onListen: () => void;
  onSpeak: () => void;
  isListening: boolean;
}

const iconMap = {
  sight: Eye,
  hearing: Ear,
  smell: Music,
  touch: Hand,
  taste: Apple,
};

export const SentenceCard = ({
  text,
  category,
  onListen,
  onSpeak,
  isListening,
}: SentenceCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();
  const Icon = iconMap[category as keyof typeof iconMap];

  const handleListenClick = () => {
    setIsPlaying(true);
    onListen();
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-lesson-secondary">
            <Icon className="w-6 h-6 text-lesson-text" />
          </div>
        </div>
        <p className="text-center text-lg font-medium mb-6 text-lesson-text">
          {text}
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleListenClick}
            disabled={isPlaying}
            variant="outline"
            className="bg-lesson-primary hover:bg-lesson-primary/90 text-white"
          >
            {isPlaying ? "Playing..." : "Listen"}
          </Button>
          <Button
            onClick={onSpeak}
            disabled={isListening}
            className="bg-lesson-secondary hover:bg-lesson-secondary/90 text-lesson-text"
          >
            {isListening ? "Listening..." : "Speak"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
