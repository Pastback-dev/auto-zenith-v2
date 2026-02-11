import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/CarCard";
import { Car, UserPreferences } from "@/lib/carData";
import { ArrowLeft, LayoutGrid, Columns, Sparkles, RotateCcw, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RecommendationsProps {
  cars: Car[];
  preferences: UserPreferences;
  onBack: () => void;
  onReset: () => void;
  onContactUs: (prefs: UserPreferences, cars: Car[]) => void;
}

export function Recommendations({ cars, preferences, onBack, onReset, onContactUs }: RecommendationsProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<'grid' | 'comparison'>('grid');
  const [selectedCars, setSelectedCars] = useState<string[]>([]);

  const toggleCarSelection = (carId: string) => {
    setSelectedCars(prev => 
      prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : prev.length < 3
          ? [...prev, carId]
          : prev
    );
  };

  const handleContactClick = () => {
    const carsToContact = cars.filter(car => selectedCars.includes(car.id));
    onContactUs(preferences, carsToContact);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{t('recommendations.ai_badge')}</span>
          </motion.div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t('recommendations.title').split('Treffer')[0]}
            <span className="gradient-text">Treffer</span>
            {t('recommendations.title').split('Treffer')[1]}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('recommendations.subtitle', { count: cars.length })}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('recommendations.adjust')}
          </Button>

          <div className="flex items-center gap-2">
            <div className="glass-card rounded-xl p-1 flex">
              <button onClick={() => setView('grid')} className={`px-4 py-2 rounded-lg transition-all ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setView('comparison')} className={`px-4 py-2 rounded-lg transition-all ${view === 'comparison' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <Columns className="w-4 h-4" />
              </button>
            </div>
            <Button variant="outline" onClick={onReset} className="group">
              <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-[-90deg] transition-transform" />
              {t('common.reset')}
            </Button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'grid' && (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} isSelected={selectedCars.includes(car.id)} onSelect={() => toggleCarSelection(car.id)} />
              ))}
            </motion.div>
          )}

          {view === 'comparison' && (
            <motion.div key="comparison" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card rounded-3xl p-8 overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-display font-semibold">Merkmal</th>
                    {cars.slice(0, 4).map((car) => (
                      <th key={car.id} className="p-4 text-center">
                        <div className="font-display font-bold">{car.name}</div>
                        <div className="text-sm text-muted-foreground">{car.brand}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">Preis</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center font-semibold gradient-text">{formatPrice(car.price)}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">Bewertung</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-secondary px-3 py-1 rounded-lg">
                          <span className="font-semibold">{car.rating}</span>
                          <span className="text-accent">/10</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">Leistung</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">{car.specs.power}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">0-100 km/h</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">{car.specs.acceleration}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">Reichweite</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">{car.specs.range}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">Jährliche Kosten</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">{formatPrice(car.costOfOwnership.annual)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {view === 'grid' && (
            <p className="text-muted-foreground">
              {t('recommendations.selection_hint')}
              {selectedCars.length > 0 && (
                <span className="ml-2 text-primary">{t('recommendations.selected_count', { count: selectedCars.length })}</span>
              )}
            </p>
          )}
          <Button variant="default" onClick={handleContactClick} className="group" disabled={selectedCars.length === 0 && view === 'grid'}>
            {t('recommendations.contact_selection')}
            <Mail className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}