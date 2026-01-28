import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

interface CallToActionSectionProps {
  onGetStarted: () => void;
}

export function CallToActionSection({ onGetStarted }: CallToActionSectionProps) {
  return (
    <section className="py-20 md:py-32 px-6 bg-primary/10">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your <span className="gradient-text">Dream Car</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            Stop guessing and start driving. Let AutoGenius guide you to your perfect vehicle today.
          </p>
          <Button 
            variant="hero" 
            size="xl"
            onClick={onGetStarted}
            className="group glow-primary"
          >
            Get Personalized Recommendations
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}