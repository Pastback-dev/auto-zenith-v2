import { motion } from "framer-motion";
import { Car, Brain, Lightbulb, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AboutSection() {
  const { t } = useTranslation();

  const stats = [
    { value: "100K+", label: t('about.stat1_label') },
    { value: "99%", label: t('about.stat2_label') },
    { value: "50+", label: t('about.stat3_label') },
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-secondary/10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t('about.title').split('AutoGenius')[0]}
            <span className="gradient-text-accent">AutoGenius</span>
            {t('about.title').split('AutoGenius')[1]}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-lg text-foreground leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.p2')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="text-center"
                >
                  <div className="font-display text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl opacity-50" />
            <div className="glass-card rounded-3xl p-8 relative z-10 max-w-md w-full">
              <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3 text-center">{t('about.mission_title')}</h3>
              <p className="text-muted-foreground text-center">
                {t('about.mission_desc')}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" /> KI-gestützte Präzision
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" /> Transparente Einblicke
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> Nutzerzentriertes Design
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}