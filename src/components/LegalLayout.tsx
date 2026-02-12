"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header onContactClick={() => navigate('/#contact')} />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)} 
              className="mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </Button>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 gradient-text">
              {title}
            </h1>

            <div className="glass-card rounded-3xl p-8 md:p-12 prose prose-invert max-w-none">
              {children}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer onContactClick={() => navigate('/#contact')} />
    </div>
  );
}