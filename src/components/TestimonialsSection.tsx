import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "AutoGenius made finding my dream car incredibly easy. The recommendations were spot-on and saved me hours of research!",
      name: "Sarah J.",
      title: "Happy Customer",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SJ",
    },
    {
      quote: "I was overwhelmed by choices, but AutoGenius narrowed it down perfectly. The AI insights into cost of ownership were invaluable.",
      name: "Michael T.",
      title: "First-time Buyer",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MT",
    },
    {
      quote: "The comparison feature is a game-changer! I could easily see the pros and cons side-by-side. Highly recommend!",
      name: "Emily R.",
      title: "Car Enthusiast",
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
            What Our <span className="gradient-text-accent">Users Say</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it – hear from satisfied customers who found their perfect ride.
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
              <Quote className="w-10 h-10 text-primary mb-6" />
              <p className="text-lg text-foreground mb-6 italic">"{testimonial.quote}"</p>
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