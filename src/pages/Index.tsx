import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PreferencesForm } from "@/components/PreferencesForm";
import { Recommendations } from "@/components/Recommendations";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactFormSection } from "@/components/ContactFormSection"; // Import the new ContactFormSection
import { Footer } from "@/components/Footer";
import { Car, UserPreferences, getRecommendations } from "@/lib/carData";

type Step = 'hero' | 'preferences' | 'results' | 'contact'; // Add 'contact' step

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('hero');
  const [recommendations, setRecommendations] = useState<Car[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [selectedCarsForContact, setSelectedCarsForContact] = useState<Car[]>([]); // New state for selected cars
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = useCallback(() => {
    setCurrentStep('preferences');
  }, []);

  const handlePreferencesSubmit = useCallback(async (prefs: UserPreferences) => {
    setPreferences(prefs);
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = getRecommendations(prefs);
    setRecommendations(results);
    setIsLoading(false);
    setCurrentStep('results');
  }, []);

  const handleContactUs = useCallback((prefs: UserPreferences | null, cars: Car[] = []) => {
    setPreferences(prefs);
    setSelectedCarsForContact(cars);
    setCurrentStep('contact');
  }, []);

  const handleBack = useCallback(() => {
    if (currentStep === 'preferences') {
      setCurrentStep('hero');
    } else if (currentStep === 'results') {
      setCurrentStep('preferences');
    } else if (currentStep === 'contact') {
      // If coming from results, go back to results. Otherwise, go back to hero/preferences.
      if (recommendations.length > 0) { // Check if recommendations were generated
        setCurrentStep('results');
      } else {
        setCurrentStep('hero'); // Or 'preferences' if we want to allow direct contact from preferences
      }
    }
  }, [currentStep, recommendations.length]);

  const handleReset = useCallback(() => {
    setCurrentStep('hero');
    setRecommendations([]);
    setPreferences(null);
    setSelectedCarsForContact([]);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden scrollbar-premium">
      <Header onContactClick={() => handleContactUs(null)} /> {/* Pass handler for header contact link */}
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-primary border-t-transparent"
              />
              <h2 className="font-display text-2xl font-bold mb-2">
                Analyzing Your Preferences
              </h2>
              <p className="text-muted-foreground">
                Our AI is finding your perfect matches...
              </p>
            </div>
          </motion.div>
        ) : currentStep === 'hero' ? (
          <motion.div
            key="hero-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection onGetStarted={handleGetStarted} />
            <div id="how-it-works" className="scroll-mt-24">
              <FeaturesSection />
            </div>
            <div id="our-selection" className="scroll-mt-24">
              <TestimonialsSection />
            </div>
            <div id="about" className="scroll-mt-24">
              <AboutSection />
            </div>
            <div id="contact" className="scroll-mt-24">
              <CallToActionSection onGetStarted={handleGetStarted} />
            </div>
          </motion.div>
        ) : currentStep === 'preferences' ? (
          <motion.div
            key="preferences"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-16"
          >
            <PreferencesForm 
              onSubmit={handlePreferencesSubmit}
              onBack={handleBack}
            />
          </motion.div>
        ) : currentStep === 'results' ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Recommendations 
              cars={recommendations}
              preferences={preferences!}
              onBack={handleBack}
              onReset={handleReset}
              onContactUs={handleContactUs} // Pass the new handler
            />
          </motion.div>
        ) : ( // currentStep === 'contact'
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-16"
          >
            <ContactFormSection 
              initialPreferences={preferences}
              selectedCars={selectedCarsForContact}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onContactClick={() => handleContactUs(null)} /> {/* Pass handler for footer contact link */}
    </div>
  );
};

export default Index;