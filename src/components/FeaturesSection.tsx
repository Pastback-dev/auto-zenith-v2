import { motion } from "framer-motion";
import { Sparkles, DollarSign, Wrench, ShieldCheck, Zap, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Sparkles,
      title: t('features.f1_title'),
      description: t('features.f1_desc'),
    },
    {
      icon: DollarSign,
      title: t('features.f2_title'),
      description: t('features.f2_desc'),
    },
    {
      icon: Wrench,
      title: t('features.f3_title'),
      description: t('features.f3_desc'),
    },
    {
      icon: ShieldCheck,
      title: t('features.f4_title'),
      description: t('features.f4_desc'),
    },
    {
      icon: Zap,
      title: t('features.f5_title'),
      description: t('features.f5_desc'),
    },
    {
      icon: Users,
      title: t('features.f6_title'),
      description: t('features.f6_desc'),
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-gradient-hero">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t('features.title').split('AutoGenius')[0]}
            <span className="gradient-text">AutoGenius</span>
            {t('features.title').split('AutoGenius')[1]}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-3xl p-8 text-center premium-card"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}