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
import { useTranslation } from "react-i18next";

interface ContactFormSectionProps {
  initialPreferences?: UserPreferences | null;
  selectedCars?: Car[];
  onBack: () => void;
}

export function ContactFormSection({ initialPreferences, selectedCars, onBack }: ContactFormSectionProps) {
  const { t } = useTranslation();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: t('contact.validation.name_min'),
    }),
    email: z.string().email({
      message: t('contact.validation.email_invalid'),
    }),
    message: z.string().min(10, {
      message: t('contact.validation.message_min'),
    }).max(500, {
      message: t('contact.validation.message_max'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(t('contact.success'), {
      description: t('contact.success_desc'),
    });
    form.reset();
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 pt-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-3xl">
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold mb-2 text-center">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-center">{t('contact.subtitle')}</p>

          {(initialPreferences || (selectedCars && selectedCars.length > 0)) && (
            <div className="p-6 rounded-2xl bg-secondary/50 mb-8">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {t('contact.details_title')}
              </h4>
              {initialPreferences && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">{t('contact.budget_label')}</span>
                    <span className="ml-2 font-medium">{formatPrice(initialPreferences.budget[0])} - {formatPrice(initialPreferences.budget[1])}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('contact.types_label')}</span>
                    <span className="ml-2 font-medium">{initialPreferences.carType.length ? initialPreferences.carType.join(', ') : t('common.any')}</span>
                  </div>
                </div>
              )}
              {selectedCars && selectedCars.length > 0 && (
                <div className="mt-4">
                  <span className="text-muted-foreground">{t('contact.selected_cars_label')}</span>
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
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.name_label')}</FormLabel>
                  <FormControl><Input placeholder={t('contact.placeholder_name')} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.email_label')}</FormLabel>
                  <FormControl><Input type="email" placeholder={t('contact.placeholder_email')} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.message_label')}</FormLabel>
                  <FormControl><Textarea placeholder={t('contact.placeholder_message')} className="min-h-[120px]" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={onBack} className="group">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  {t('common.back')}
                </Button>
                <Button type="submit" variant="hero" className="group">
                  {t('common.send')}
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