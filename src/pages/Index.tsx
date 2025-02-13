
import { useState, useEffect } from "react";
import { SentenceCard } from "@/components/SentenceCard";
import { sentences } from "@/data/sentences";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

// Add TypeScript types for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const Index = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [completedSentences] = useState<Set<number>>(new Set());

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const currentSentence = sentences[currentSentenceIndex].text.toLowerCase();
        const confidence = event.results[0][0].confidence;
        
        if (transcript === currentSentence) {
          // Perfect match
          toast({
            title: "Excellent! 🎉",
            description: "Perfect pronunciation!",
            duration: 3000,
          });
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          setTimeout(() => handleNext(), 1500);
        } else if (transcript.includes(currentSentence) || currentSentence.includes(transcript)) {
          // Partial match
          toast({
            title: "Good try! 👍",
            description: "Almost perfect! Try one more time.",
            duration: 3000,
          });
        } else {
          // No match
          toast({
            title: "Let's try again! 💪",
            description: "Listen carefully and try to repeat the sentence.",
            duration: 3000,
          });
        }
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        toast({
          title: "Oops!",
          description: "There was an error with the speech recognition. Please try again.",
          duration: 3000,
        });
      };

      setRecognition(recognitionInstance);
    } else {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition. Try using Chrome!",
        duration: 5000,
      });
    }
  }, []);

  const handleListen = () => {
    const utterance = new SpeechSynthesisUtterance(sentences[currentSentenceIndex].text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const handleNext = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <div className="min-h-screen bg-lesson-background py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-lesson-heading mb-2">
          The Five Senses
        </h1>
        <p className="text-center text-lesson-text mb-12">
          Listen and repeat the sentences to learn about our five senses!
        </p>
        
        <div className="space-y-8">
          <SentenceCard
            text={sentences[currentSentenceIndex].text}
            category={sentences[currentSentenceIndex].category}
            onListen={handleListen}
            onSpeak={handleSpeak}
            onSkip={handleSkip}
            isListening={isListening}
          />
          
          <div className="text-center text-lesson-text">
            <p className="text-sm">
              Sentence {currentSentenceIndex + 1} of {sentences.length}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
