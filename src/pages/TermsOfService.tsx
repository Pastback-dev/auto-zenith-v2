"use client";

import React from 'react';
import { LegalLayout } from "@/components/LegalLayout";

const TermsOfService = () => {
  return (
    <LegalLayout title="Terms of Service">
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">1. Agreement to Terms</h2>
          <p>By accessing or using AutoGenius, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">2. Use of Service</h2>
          <p>AutoGenius provides AI-powered car recommendations. The information provided is for informational purposes only and does not constitute financial or professional advice.</p>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">3. User Responsibilities</h2>
          <p>You are responsible for ensuring that any information you provide to us is accurate and up-to-date. You agree not to use the service for any unlawful purpose.</p>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">4. Intellectual Property</h2>
          <p>The service and its original content, features, and functionality are and will remain the exclusive property of AutoGenius and its licensors.</p>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">5. Limitation of Liability</h2>
          <p>In no event shall AutoGenius be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">6. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes.</p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;