import { motion } from "framer-motion";
import { Car } from "@/lib/carData";
import { Star, Check, X, Trophy, Gem, DollarSign, Zap, Gauge, MapPin } from "lucide-react";

import carElectricSedan from "@/assets/car-electric-sedan.jpg";
import carSport from "@/assets/car-sport.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carLuxurySedan from "@/assets/car-luxury-sedan.jpg";

const imageMap: Record<string, string> = {
  '/car-electric-sedan.jpg': carElectricSedan,
  '/car-sport.jpg': carSport,
  '/car-suv.jpg': carSuv,
  '/car-luxury-sedan.jpg': carLuxurySedan,
};

interface CarCardProps {
  car: Car;
  index: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onCompare?: () => void;
}

const badgeConfig = {
  'best-overall': { 
    label: 'Best Overall', 
    icon: Trophy, 
    className: 'bg-primary text-primary-foreground' 
  },
  'best-value': { 
    label: 'Best Value', 
    icon: DollarSign, 
    className: 'bg-accent text-accent-foreground' 
  },
  'premium-choice': { 
    label: 'Premium Choice', 
    icon: Gem, 
    className: 'bg-secondary text-secondary-foreground border border-primary/20' 
  },
};

export function CarCard({ car, index, isSelected, onSelect, onCompare }: CarCardProps) {
  const badge = car.badge ? badgeConfig[car.badge] : null;
  const BadgeIcon = badge?.icon;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative glass-card rounded-3xl overflow-hidden premium-card cursor-pointer ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      {/* Badge */}
      {badge && BadgeIcon && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className={`absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${badge.className}`}
        >
          <BadgeIcon className="w-3.5 h-3.5" />
          {badge.label}
        </motion.div>
      )}

      {/* Car image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={imageMap[car.image] || carSuv}
          alt={car.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Glow effect */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-3xl rounded-full" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{car.brand}</p>
            <h3 className="font-display text-xl font-bold">{car.name}</h3>
          </div>
          <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-semibold">{car.rating}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <span className="text-sm text-muted-foreground">Starting at</span>
          <div className="font-display text-2xl font-bold gradient-text">
            {formatPrice(car.price)}
          </div>
        </div>

        {/* Specs quick view */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{car.specs.power}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{car.specs.acceleration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{car.specs.range}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">${car.costOfOwnership.annual}/yr</span>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <span className="text-sm text-muted-foreground">{car.pros[0]}</span>
          </div>
          <div className="flex items-start gap-2">
            <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <span className="text-sm text-muted-foreground">{car.cons[0]}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {car.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
