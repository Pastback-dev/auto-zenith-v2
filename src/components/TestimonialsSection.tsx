import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t('testimonials.t1_quote'),
      name: "Sarah J.",
      title: t('testimonials.t1_title'),
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SJ",
    },
    {
      quote: t('testimonials.t2_quote'),
      name: "Michael T.",
      title: t('testimonials.t2_title'),
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MT",
    },
    {
      quote: t('testimonials.t3_quote'),
      name: "Emily R.",
      title: t('testimonials.t3_title'),
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ER",
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-accent">{t('testimonials.title')}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-8 flex flex-col items-center text-center premium-card"
            >
              <p className="text-lg text-foreground mb-6 italic">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}