
import { useState, useEffect } from "react";
import { SentenceCard } from "@/components/SentenceCard";
import { sentences } from "@/data/sentences";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const currentSentence = sentences[currentSentenceIndex].text.toLowerCase();
        
        if (transcript.includes(currentSentence) || currentSentence.includes(transcript)) {
          toast({
            title: "Great job!",
            description: "Your pronunciation was correct!",
            duration: 3000,
          });
          
          // Move to next sentence after a brief delay
          setTimeout(() => {
            if (currentSentenceIndex < sentences.length - 1) {
              setCurrentSentenceIndex(prev => prev + 1);
            }
          }, 1500);
        } else {
          toast({
            title: "Try again",
            description: "Let's practice this sentence one more time!",
            duration: 3000,
          });
        }
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition.",
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
