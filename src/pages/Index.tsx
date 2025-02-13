
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

  const initializeRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const currentSentence = sentences[currentSentenceIndex].text.toLowerCase().trim();
        const confidence = event.results[0][0].confidence;
        
        // Remove punctuation and normalize spaces for comparison
        const normalizedTranscript = transcript.replace(/[.,!?]/g, '').replace(/\s+/g, ' ');
        const normalizedSentence = currentSentence.replace(/[.,!?]/g, '').replace(/\s+/g, ' ');

        console.log('Transcript:', normalizedTranscript);
        console.log('Expected:', normalizedSentence);
        console.log('Confidence:', confidence);
        
        if (normalizedTranscript === normalizedSentence) {
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
        } else if (
          normalizedTranscript.includes(normalizedSentence) || 
          normalizedSentence.includes(normalizedTranscript) ||
          confidence > 0.8
        ) {
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

      recognitionInstance.onend = () => {
        setIsListening(false);
        // Clean up and reinitialize for next use
        recognitionInstance.abort();
        setRecognition(null);
        setTimeout(() => {
          initializeRecognition();
        }, 100);
      };

      setRecognition(recognitionInstance);
    } else {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition. Try using Chrome!",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    initializeRecognition();
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const handleListen = () => {
    const utterance = new SpeechSynthesisUtterance(sentences[currentSentenceIndex].text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    if (!recognition) {
      initializeRecognition();
    }
    setTimeout(() => {
      if (recognition) {
        setIsListening(true);
        recognition.start();
      }
    }, 100);
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
