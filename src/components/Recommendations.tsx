import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/CarCard";
import { Car, UserPreferences } from "@/lib/carData";
import { ArrowLeft, LayoutGrid, Columns, Sparkles, RotateCcw, Mail } from "lucide-react"; // Import Mail icon

interface RecommendationsProps {
  cars: Car[];
  preferences: UserPreferences;
  onBack: () => void;
  onReset: () => void;
  onContactUs: (prefs: UserPreferences, cars: Car[]) => void; // New prop for contact
}

export function Recommendations({ cars, preferences, onBack, onReset, onContactUs }: RecommendationsProps) {
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Matches</span>
          </motion.div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Your Perfect <span className="gradient-text">Matches</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Based on your preferences, we've found {cars.length} exceptional vehicles 
            that match your criteria perfectly.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <Button variant="ghost" onClick={onBack} className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Adjust Preferences
          </Button>

          <div className="flex items-center gap-2">
            <div className="glass-card rounded-xl p-1 flex">
              <button
                onClick={() => setView('grid')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  view === 'grid' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('comparison')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  view === 'comparison' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>
            <Button variant="outline" onClick={onReset} className="group">
              <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-[-90deg] transition-transform" />
              Start Over
            </Button>
          </div>
        </motion.div>

        {/* Grid View */}
        <AnimatePresence mode="wait">
          {view === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {cars.map((car, index) => (
                <CarCard
                  key={car.id}
                  car={car}
                  index={index}
                  isSelected={selectedCars.includes(car.id)}
                  onSelect={() => toggleCarSelection(car.id)}
                />
              ))}
            </motion.div>
          )}

          {view === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card rounded-3xl p-8 overflow-x-auto"
            >
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-display font-semibold">Feature</th>
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
                    <td className="p-4 text-muted-foreground">Price</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center font-semibold gradient-text">
                        {formatPrice(car.price)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">Rating</td>
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
                    <td className="p-4 text-muted-foreground">Power</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">{car.specs.power}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">0-60 mph</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">{car.specs.acceleration}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">Range</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">{car.specs.range}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">Annual Cost</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">${car.costOfOwnership.annual}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-muted-foreground">Maintenance</td>
                    {cars.slice(0, 4).map((car) => (
                      <td key={car.id} className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          car.costOfOwnership.maintenance === 'Very Low' 
                            ? 'bg-green-500/20 text-green-400'
                            : car.costOfOwnership.maintenance === 'Low'
                              ? 'bg-green-500/10 text-green-300'
                              : car.costOfOwnership.maintenance === 'Medium'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                        }`}>
                          {car.costOfOwnership.maintenance}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selection hint and Contact button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {view === 'grid' && (
            <p className="text-muted-foreground">
              Click on cards to select up to 3 vehicles for comparison
              {selectedCars.length > 0 && (
                <span className="ml-2 text-primary">({selectedCars.length}/3 selected)</span>
              )}
            </p>
          )}
          <Button 
            variant="default" 
            onClick={handleContactClick} 
            className="group"
            disabled={selectedCars.length === 0 && view === 'grid'} // Disable if no cars selected in grid view
          >
            Contact Us About Selection
            <Mail className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}