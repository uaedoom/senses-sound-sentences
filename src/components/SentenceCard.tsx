
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, Ear, Music, Hand, Apple, SkipForward, Waves } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SentenceCardProps {
  text: string;
  category: string;
  onListen: () => void;
  onSpeak: () => void;
  onSkip: () => void;
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
  onSkip,
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
            <Icon className="w-8 h-8 text-lesson-text" />
          </div>
        </div>
        <p className="text-center text-xl font-medium mb-6 text-lesson-text">
          {text}
        </p>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex justify-center space-x-4 w-full">
            <Button
              onClick={handleListenClick}
              disabled={isPlaying}
              variant="outline"
              className="bg-lesson-primary hover:bg-lesson-primary/90 text-white text-lg py-6 px-8 h-auto"
            >
              {isPlaying ? "Playing..." : "Listen"}
            </Button>
            <Button
              onClick={onSpeak}
              disabled={isListening}
              className="bg-lesson-secondary hover:bg-lesson-secondary/90 text-lesson-text text-lg py-6 px-8 h-auto relative"
            >
              {isListening ? (
                <div className="flex items-center gap-2">
                  <span>Listening</span>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <Waves className="w-6 h-6" />
                  </motion.div>
                </div>
              ) : (
                "Speak"
              )}
            </Button>
          </div>
          <Button
            onClick={onSkip}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            <SkipForward className="w-5 h-5 mr-2" />
            Skip
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
