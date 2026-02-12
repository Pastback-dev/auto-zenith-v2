"use client";

import React from 'react';
import { LegalLayout } from "@/components/LegalLayout";

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">1. Introduction</h2>
          <p>Welcome to AutoGenius. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">2. Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
            <li><strong>Preference Data:</strong> includes your car preferences, budget, and usage patterns.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">3. How We Use Your Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide you with personalized car recommendations.</li>
            <li>To contact you regarding your inquiries.</li>
            <li>To improve our website and AI recommendation engine.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">4. Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">5. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us via our contact form.</p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;