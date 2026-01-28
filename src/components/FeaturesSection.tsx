import { motion } from "framer-motion";
import { Car, Sparkles, DollarSign, Wrench, ShieldCheck, Zap, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Matching",
      description: "Our advanced AI analyzes your unique needs to find cars that truly fit your lifestyle.",
    },
    {
      icon: DollarSign,
      title: "Cost-Effective Choices",
      description: "Get recommendations that consider not just price, but also long-term ownership costs.",
    },
    {
      icon: Wrench,
      title: "Maintenance Insights",
      description: "Understand the maintenance profile of each vehicle before you make a decision.",
    },
    {
      icon: ShieldCheck,
      title: "Safety & Reliability",
      description: "We prioritize vehicles with high safety ratings and proven reliability records.",
    },
    {
      icon: Zap,
      title: "Eco-Friendly Options",
      description: "Explore a wide range of electric and hybrid vehicles tailored to your green preferences.",
    },
    {
      icon: Users,
      title: "Family & Lifestyle Fit",
      description: "Whether for daily commute or family adventures, find a car that suits every aspect of your life.",
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
            Why Choose <span className="gradient-text">AutoGenius</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We go beyond basic filters to provide you with personalized, data-driven car recommendations.
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