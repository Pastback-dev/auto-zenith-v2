import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPreferences } from "@/lib/carData";
import { ArrowLeft, ArrowRight, Sparkles, Car, Zap, Leaf, Gauge, Gem, Users, Briefcase, MapPin, Fuel, Wrench } from "lucide-react";

interface PreferencesSummarySectionProps {
  preferences: UserPreferences;
  onGetRecommendations: (preferences: UserPreferences) => void;
  onProceedToContact: (preferences: UserPreferences) => void;
  onBack: () => void;
}

const carTypeIcons: Record<string, React.ElementType> = {
  suv: Car,
  sedan: Car,
  electric: Zap,
  hybrid: Leaf,
  sport: Gauge,
  luxury: Gem,
};

const usageIcons: Record<string, React.ElementType> = {
  city: MapPin,
  'long-trips': MapPin,
  family: Users,
  business: Briefcase,
  performance: Gauge,
};

export function PreferencesSummarySection({ 
  preferences, 
  onGetRecommendations, 
  onProceedToContact, 
  onBack 
}: PreferencesSummarySectionProps) {

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderPreferenceItem = (label: string, value: string | string[], icon: React.ElementType) => (
    <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}><icon className="w-4 h-4" /></motion.div>}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground capitalize">
          {Array.isArray(value) && value.length === 0 ? 'Any' : Array.isArray(value) ? value.join(', ') : value}
        </p>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Your Preferences</span>
          </motion.div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Looks <span className="gradient-text">Great!</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Here's a summary of your selections. Confirm these details or adjust them if needed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
            {renderPreferenceItem('Budget', `${formatPrice(preferences.budget[0])} - ${formatPrice(preferences.budget[1])}`, DollarSign)}
            {renderPreferenceItem('Car Type', preferences.carType, Car)}
            {renderPreferenceItem('Usage', preferences.usage, Users)}
            {renderPreferenceItem('Fuel Preference', preferences.fuelPreference, Fuel)}
            {renderPreferenceItem('Maintenance Priority', preferences.maintenancePriority, Wrench)}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => onGetRecommendations(preferences)}
              className="group"
            >
              Get Recommendations
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onProceedToContact(preferences)}
              className="group"
            >
              Contact Us
              <Mail className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={onBack}
            className="group mt-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back to Preferences
          </Button>
        </div>
      </motion.div>
    </section>
  );
}