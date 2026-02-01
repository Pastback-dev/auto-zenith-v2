"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { Car, UserPreferences } from "@/lib/carData";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message cannot exceed 500 characters.",
  }),
});

interface ContactFormSectionProps {
  initialPreferences?: UserPreferences | null;
  selectedCars?: Car[];
  onBack: () => void;
}

export function ContactFormSection({ initialPreferences, selectedCars, onBack }: ContactFormSectionProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Contact form submitted:", values);
    console.log("Initial Preferences:", initialPreferences);
    console.log("Selected Cars:", selectedCars);

    toast.success("Your message has been sent!", {
      description: "We'll get back to you shortly.",
    });
    form.reset();
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold mb-2 text-center">
            <span className="gradient-text">Contact Us</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-center">
            Have questions or need more details? Send us a message!
          </p>

          {/* Display Preferences if available */}
          {(initialPreferences || selectedCars && selectedCars.length > 0) && (
            <div className="p-6 rounded-2xl bg-secondary/50 mb-8">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your Inquiry Details
              </h4>
              {initialPreferences && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="ml-2 font-medium">{formatPrice(initialPreferences.budget[0])} - {formatPrice(initialPreferences.budget[1])}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Types:</span>
                    <span className="ml-2 font-medium">
                      {initialPreferences.carType.length ? initialPreferences.carType.join(', ') : 'Any'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="ml-2 font-medium">
                      {initialPreferences.usage.length ? initialPreferences.usage.join(', ') : 'Any'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fuel:</span>
                    <span className="ml-2 font-medium capitalize">{initialPreferences.fuelPreference}</span>
                  </div>
                </div>
              )}
              {selectedCars && selectedCars.length > 0 && (
                <div className="mt-4">
                  <span className="text-muted-foreground">Selected Cars:</span>
                  <ul className="list-disc list-inside ml-2 text-sm font-medium">
                    {selectedCars.map(car => (
                      <li key={car.id}>{car.brand} {car.name} ({formatPrice(car.price)})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between mt-8">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back
                </Button>
                <Button type="submit" variant="hero" className="group">
                  Send Message
                  <Mail className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
}