import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Car, 
  Zap, 
  Leaf, 
  Gauge, 
  Gem, 
  Users, 
  Briefcase, 
  MapPin, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Fuel,
  Wrench,
  Check
} from "lucide-react";
import { UserPreferences } from "@/lib/carData";

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void; // This will now be for getting recommendations
  onComplete: (preferences: UserPreferences) => void; // New prop for completing the form to show summary
  onBack: () => void;
}

const carTypes = [
  { id: 'suv', label: 'SUV', icon: Car },
  { id: 'sedan', label: 'Sedan', icon: Car },
  { id: 'electric', label: 'Electric', icon: Zap },
  { id: 'hybrid', label: 'Hybrid', icon: Leaf },
  { id: 'sport', label: 'Sport', icon: Gauge },
  { id: 'luxury', label: 'Luxury', icon: Gem },
];

const usageOptions = [
  { id: 'city', label: 'City Commute', icon: MapPin },
  { id: 'long-trips', label: 'Long Trips', icon: MapPin },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'performance', label: 'Performance', icon: Gauge },
];

const fuelOptions = [
  { id: 'any', label: 'Any' },
  { id: 'electric', label: 'Electric Only' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'gas', label: 'Gas/Petrol' },
];

const maintenanceOptions = [
  { id: 'low', label: 'Low Cost Priority' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'performance', label: 'Performance First' },
];

export function PreferencesForm({ onSubmit, onComplete, onBack }: PreferencesFormProps) {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState<[number, number]>([30000, 150000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedUsage, setSelectedUsage] = useState<string[]>([]);
  const [fuelPreference, setFuelPreference] = useState('any');
  const [maintenancePriority, setMaintenancePriority] = useState('balanced');

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleUsage = (usage: string) => {
    setSelectedUsage(prev => 
      prev.includes(usage) 
        ? prev.filter(u => u !== usage)
        : [...prev, usage]
    );
  };

  const handleReady = () => {
    onComplete({
      budget,
      carType: selectedTypes,
      usage: selectedUsage,
      fuelPreference,
      maintenancePriority,
    });
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    s <= step 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                  animate={{ scale: s === step ? 1.1 : 1 }}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </motion.div>
                {s < 3 && (
                  <div className={`w-24 md:w-32 h-1 mx-2 rounded-full transition-colors duration-300 ${
                    s < step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground">
            Step {step} of 3: {step === 1 ? 'Budget & Type' : step === 2 ? 'Usage & Fuel' : 'Preferences'}
          </p>
        </div>

        {/* Form content */}
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-display text-3xl font-bold mb-2">
                  What's your budget?
                </h2>
                <p className="text-muted-foreground mb-10">
                  Set your price range to find the perfect match
                </p>

                {/* Budget slider */}
                <div className="mb-12">
                  <div className="flex justify-between mb-6">
                    <div>
                      <span className="text-sm text-muted-foreground">Min</span>
                      <div className="font-display text-2xl font-bold gradient-text">
                        {formatPrice(budget[0])}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Max</span>
                      <div className="font-display text-2xl font-bold gradient-text">
                        {formatPrice(budget[1])}
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={budget}
                    onValueChange={(value) => setBudget(value as [number, number])}
                    min={20000}
                    max={250000}
                    step={5000}
                    className="mb-4"
                  />
                </div>

                {/* Car types */}
                <h3 className="font-display text-xl font-semibold mb-4">
                  What type of car interests you?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {carTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedTypes.includes(type.id);
                    return (
                      <motion.button
                        key={type.id}
                        onClick={() => toggleType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>
                          {type.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-display text-3xl font-bold mb-2">
                  How will you use it?
                </h2>
                <p className="text-muted-foreground mb-10">
                  Select all that apply to get better recommendations
                </p>

                {/* Usage options */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                  {usageOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedUsage.includes(option.id);
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => toggleUsage(option.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>
                          {option.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Fuel preference */}
                <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                  <Fuel className="w-5 h-5" />
                  Fuel Preference
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {fuelOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setFuelPreference(option.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                        fuelPreference === option.id 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-display text-3xl font-bold mb-2">
                  Final preferences
                </h2>
                <p className="text-muted-foreground mb-10">
                  Help us fine-tune your recommendations
                </p>

                {/* Maintenance priority */}
                <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Maintenance Priority
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {maintenanceOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setMaintenancePriority(option.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        maintenancePriority === option.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`font-medium ${maintenancePriority === option.id ? 'text-primary' : ''}`}>
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Summary */}
                <div className="p-6 rounded-2xl bg-secondary/50 mb-8">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Your Preferences Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="ml-2 font-medium">{formatPrice(budget[0])} - {formatPrice(budget[1])}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Types:</span>
                      <span className="ml-2 font-medium">
                        {selectedTypes.length ? selectedTypes.join(', ') : 'Any'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Usage:</span>
                      <span className="ml-2 font-medium">
                        {selectedUsage.length ? selectedUsage.join(', ') : 'Any'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fuel:</span>
                      <span className="ml-2 font-medium capitalize">{fuelPreference}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={() => step === 1 ? onBack() : setStep(step - 1)}
              className="group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </Button>
            
            {step < 3 ? (
              <Button
                variant="default"
                onClick={() => setStep(step + 1)}
                className="group"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleReady} // Changed to handleReady
                className="group"
              >
                Ready
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}