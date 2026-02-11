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
import { useTranslation } from "react-i18next";

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  onComplete: (preferences: UserPreferences) => void;
  onBack: () => void;
}

const carTypes = [
  { id: 'suv', icon: Car },
  { id: 'sedan', icon: Car },
  { id: 'electric', icon: Zap },
  { id: 'hybrid', icon: Leaf },
  { id: 'sport', icon: Gauge },
  { id: 'luxury', icon: Gem },
];

const usageOptions = [
  { id: 'city', icon: MapPin },
  { id: 'long-trips', icon: MapPin },
  { id: 'family', icon: Users },
  { id: 'business', icon: Briefcase },
  { id: 'performance', icon: Gauge },
];

export function PreferencesForm({ onSubmit, onComplete, onBack }: PreferencesFormProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState<[number, number]>([30000, 150000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedUsage, setSelectedUsage] = useState<string[]>([]);
  const [fuelPreference, setFuelPreference] = useState('any');
  const [maintenancePriority, setMaintenancePriority] = useState('balanced');

  const fuelOptions = [
    { id: 'any', label: t('common.any') },
    { id: 'electric', label: t('preferences.fuel.electric') },
    { id: 'hybrid', label: t('preferences.fuel.hybrid') },
    { id: 'gas', label: t('preferences.fuel.gas') },
  ];

  const maintenanceOptions = [
    { id: 'low', label: t('preferences.low_cost') },
    { id: 'balanced', label: t('preferences.balanced') },
    { id: 'performance', label: t('preferences.performance_first') },
  ];

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
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
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
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${s <= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                    }`}
                  animate={{ scale: s === step ? 1.1 : 1 }}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </motion.div>
                {s < 3 && (
                  <div className={`w-24 md:w-32 h-1 mx-2 rounded-full transition-colors duration-300 ${s < step ? 'bg-primary' : 'bg-muted'
                    }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground">
            {t('preferences.step')} {step} {t('preferences.of')} 3: {step === 1 ? t('preferences.step1_title') : step === 2 ? t('preferences.step2_title') : t('preferences.step3_title')}
          </p>
        </div>

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
                <h2 className="font-display text-3xl font-bold mb-2">{t('preferences.budget_title')}</h2>
                <p className="text-muted-foreground mb-10">{t('preferences.budget_desc')}</p>

                <div className="mb-12">
                  <div className="flex justify-between mb-6">
                    <div>
                      <span className="text-sm text-muted-foreground">Min</span>
                      <div className="font-display text-2xl font-bold gradient-text">{formatPrice(budget[0])}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Max</span>
                      <div className="font-display text-2xl font-bold gradient-text">{formatPrice(budget[1])}</div>
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

                <h3 className="font-display text-xl font-semibold mb-4">{t('preferences.type_title')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {carTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedTypes.includes(type.id);
                    const label = t(`preferences.types.${type.id}`);
                    return (
                      <motion.button
                        key={type.id}
                        onClick={() => toggleType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>{label}</span>
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
                <h2 className="font-display text-3xl font-bold mb-2">{t('preferences.usage_title')}</h2>
                <p className="text-muted-foreground mb-10">{t('preferences.usage_desc')}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                  {usageOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedUsage.includes(option.id);
                    const label = t(`preferences.usage.${option.id.replace('-', '_')}`);
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => toggleUsage(option.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>{label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                  <Fuel className="w-5 h-5" />
                  {t('preferences.fuel_title')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {fuelOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setFuelPreference(option.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${fuelPreference === option.id ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'
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
                <h2 className="font-display text-3xl font-bold mb-2">{t('preferences.final_title')}</h2>
                <p className="text-muted-foreground mb-10">{t('preferences.final_desc')}</p>

                <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  {t('preferences.maintenance_title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {maintenanceOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setMaintenancePriority(option.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${maintenancePriority === option.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                        }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`font-medium ${maintenancePriority === option.id ? 'text-primary' : ''}`}>{option.label}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-secondary/50 mb-8">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {t('preferences.summary_title')}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">{t('contact.budget_label')}</span>
                      <span className="ml-2 font-medium">{formatPrice(budget[0])} - {formatPrice(budget[1])}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('contact.types_label')}</span>
                      <span className="ml-2 font-medium">{selectedTypes.length ? selectedTypes.map(id => t(`preferences.types.${id}`)).join(', ') : t('common.any')}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('contact.usage_label')}</span>
                      <span className="ml-2 font-medium">{selectedUsage.length ? selectedUsage.map(id => t(`preferences.usage.${id.replace('-', '_')}`)).join(', ') : t('common.any')}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('contact.fuel_label')}</span>
                      <span className="ml-2 font-medium capitalize">{fuelPreference === 'any' ? t('common.any') : t(`preferences.fuel.${fuelPreference}`)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={() => step === 1 ? onBack() : setStep(step - 1)} className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('common.back')}
            </Button>

            {step < 3 ? (
              <Button variant="default" onClick={() => setStep(step + 1)} className="group">
                {t('common.continue')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button variant="hero" onClick={handleReady} className="group">
                {t('common.ready')}
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}