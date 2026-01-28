import { motion } from "framer-motion";
import { Car, Brain, Lightbulb, Users } from "lucide-react";

export function AboutSection() {
  const stats = [
    { value: "100K+", label: "Users Helped" },
    { value: "99%", label: "Accuracy Rate" },
    { value: "50+", label: "Brands Covered" },
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
            About <span className="gradient-text-accent">AutoGenius</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing the car buying experience with intelligent, personalized recommendations.
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
              At AutoGenius, we believe finding your next car should be an exciting and effortless journey, not a daunting task. We leverage cutting-edge artificial intelligence to understand your unique preferences, lifestyle, and budget, then meticulously match you with vehicles that truly resonate with your needs.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform goes beyond basic filters, providing deep insights into performance, cost of ownership, and user reviews. We're committed to transparency, accuracy, and empowering you to make informed decisions with confidence.
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
              <h3 className="font-display text-2xl font-bold mb-3 text-center">Our Mission</h3>
              <p className="text-muted-foreground text-center">
                To simplify the car discovery process, making it enjoyable and efficient for everyone.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" /> AI-driven precision
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" /> Transparent insights
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> User-centric design
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}