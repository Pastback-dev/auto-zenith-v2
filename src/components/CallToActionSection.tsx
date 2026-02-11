import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CallToActionSectionProps {
  onGetStarted: () => void;
}

export function CallToActionSection({ onGetStarted }: CallToActionSectionProps) {
  const { t } = useTranslation();

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
            {t('cta.title').split('Traumauto')[0]}
            <span className="gradient-text">Traumauto</span>
            {t('cta.title').split('Traumauto')[1]}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            {t('cta.subtitle')}
          </p>
          <Button 
            variant="hero" 
            size="xl"
            onClick={onGetStarted}
            className="group glow-primary"
          >
            {t('cta.button')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}