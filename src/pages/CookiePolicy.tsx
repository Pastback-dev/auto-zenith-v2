"use client";

import React from 'react';
import { LegalLayout } from "@/components/LegalLayout";

const CookiePolicy = () => {
  return (
    <LegalLayout title="Cookie Policy">
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">1. What Are Cookies</h2>
          <p>Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the service or a third-party to recognize you and make your next visit easier and the service more useful to you.</p>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">2. How We Use Cookies</h2>
          <p>When you use and access AutoGenius, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To enable certain functions of the service.</li>
            <li>To provide analytics.</li>
            <li>To store your preferences (such as language and theme).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">3. Types of Cookies We Use</h2>
          <p>We use both session and persistent cookies on the service and we use different types of cookies to run the service:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential cookies:</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
            <li><strong>Preference cookies:</strong> We use these to remember your settings and preferences.</li>
            <li><strong>Analytics cookies:</strong> We use these to track information how the service is used so we can make improvements.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground text-xl font-bold mb-3">4. Your Choices Regarding Cookies</h2>
          <p>If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.</p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default CookiePolicy;