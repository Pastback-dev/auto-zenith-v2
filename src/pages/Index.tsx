import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PreferencesForm } from "@/components/PreferencesForm";
import { PreferencesSummarySection } from "@/components/PreferencesSummarySection";
import { Recommendations } from "@/components/Recommendations";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactFormSection } from "@/components/ContactFormSection";
import { Footer } from "@/components/Footer";
import { Car, UserPreferences, getRecommendations } from "@/lib/carData";
import { DollarSign, Mail } from "lucide-react";

type Step = 'hero' | 'preferences' | 'summary' | 'results' | 'contact';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('hero');
  const [recommendations, setRecommendations] = useState<Car[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [selectedCarsForContact, setSelectedCarsForContact] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Current application step:", currentStep);
  }, [currentStep]);

  const handleGetStarted = useCallback(() => {
    setCurrentStep('preferences');
  }, []);

  // When PreferencesForm is 'Ready', go directly to contact form
  const handlePreferencesComplete = useCallback((prefs: UserPreferences) => {
    console.log("Preferences completed:", prefs);
    setPreferences(prefs);
    setSelectedCarsForContact([]); // Clear any previous selections if coming from preferences
    setCurrentStep('contact'); // Go directly to contact form
  }, []);

  // This handler is for when user clicks 'Get Recommendations' from summary
  const handleGetRecommendationsFromSummary = useCallback(async (prefs: UserPreferences) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing
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
    } else if (currentStep === 'summary') {
      setCurrentStep('preferences');
    } else if (currentStep === 'results') {
      setCurrentStep('summary');
    } else if (currentStep === 'contact') {
      // If coming from results, go back to results.
      // If coming from preferences (via handlePreferencesComplete), go back to preferences.
      // If coming from header/footer contact button, go back to hero.
      if (recommendations.length > 0) {
        setCurrentStep('results');
      } else if (preferences) { // If preferences exist, assume came from preferences form
        setCurrentStep('preferences');
      } else {
        setCurrentStep('hero');
      }
    }
  }, [currentStep, recommendations.length, preferences]);

  const handleReset = useCallback(() => {
    setCurrentStep('hero');
    setRecommendations([]);
    setPreferences(null);
    setSelectedCarsForContact([]);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden scrollbar-premium">
      <Header onContactClick={() => handleContactUs(null)} />
      
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
              onSubmit={handleGetRecommendationsFromSummary} // This is not used directly by PreferencesForm anymore
              onComplete={handlePreferencesComplete} // Now goes directly to contact
              onBack={handleBack}
            />
          </motion.div>
        ) : currentStep === 'summary' ? ( // This step is now only reachable from 'results' if user wants to go back
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-16"
          >
            {preferences ? (
              <PreferencesSummarySection
                preferences={preferences}
                onGetRecommendations={handleGetRecommendationsFromSummary}
                onProceedToContact={handleContactUs}
                onBack={handleBack}
              />
            ) : (
              <div className="text-center text-red-500 pt-20">
                <h2 className="font-display text-3xl font-bold mb-4">Error Loading Preferences</h2>
                <p className="text-lg text-muted-foreground">Please go back and re-enter your preferences.</p>
                <Button onClick={handleBack} className="mt-8">Go Back</Button>
              </div>
            )}
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
              onContactUs={handleContactUs}
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

      <Footer onContactClick={() => handleContactUs(null)} />
    </div>
  );
};

export default Index;