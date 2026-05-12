"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm sm:text-base border border-zinc-700 px-4 py-2 rounded-full hover:bg-zinc-900 transition"
          >
            ← Back
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-5 sm:p-8 md:p-12">
          
          {/* Header */}
          <header className="text-center border-b border-zinc-800 pb-8 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-400">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-3xl mx-auto leading-relaxed">
              This Privacy Policy governs the collection, processing, storage,
              disclosure, and protection of personal information by Companio
              through its website, platform, applications, and related services.
            </p>
          </header>

          {/* Content */}
          <div className="space-y-10 text-zinc-300 text-sm sm:text-base leading-7">
            
            {/* 1 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                1. Scope & Acceptance
              </h2>
              <p>
                By accessing or using Companio, you acknowledge that you have
                read, understood, and agreed to this Privacy Policy. If you do
                not agree, you should discontinue use of the platform.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Identity information (name, phone number, email address)</li>
                <li>Account credentials and profile details</li>
                <li>Booking, communication, and transaction records</li>
                <li>Payment and billing metadata via third-party processors</li>
                <li>Location and device information for safety and optimization</li>
                <li>Cookies, analytics, and technical logs</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                3. Purpose of Data Usage
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Account creation and identity verification</li>
                <li>Facilitating bookings and platform interactions</li>
                <li>Fraud prevention, moderation, and platform security</li>
                <li>Customer support and dispute resolution</li>
                <li>Regulatory and legal compliance</li>
                <li>Product improvement and operational analytics</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                4. Platform Role Limitation
              </h2>
              <p>
                Companio operates primarily as a technology platform facilitating
                independent user interactions and service discovery. Companio is
                not directly responsible for the conduct, statements, actions,
                agreements, or off-platform behavior of users unless explicitly
                required under applicable law.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                5. Information Sharing & Disclosure
              </h2>
              <p>We do not sell personal information. Data may be shared with:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Payment gateways and financial processors</li>
                <li>Identity/KYC verification vendors</li>
                <li>Legal, regulatory, or law enforcement agencies</li>
                <li>Operational vendors under confidentiality obligations</li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                6. Cookies, Tracking & Analytics
              </h2>
              <p>
                We may use cookies, browser storage, analytics tools, and
                performance technologies to enhance security, personalize
                experiences, and improve platform efficiency.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                7. Data Security
              </h2>
              <p>
                We implement commercially reasonable safeguards including
                encryption, authentication layers, and restricted internal
                access. However, no online system can guarantee absolute
                security, and users acknowledge inherent internet risks.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                8. User Rights
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Request access to personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion subject to compliance obligations</li>
                <li>Withdraw certain permissions where legally permitted</li>
              </ul>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                9. Third-Party Services
              </h2>
              <p>
                Companio may integrate third-party payment, hosting, analytics,
                communication, or verification providers. Their independent
                privacy practices may apply separately.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                10. Age Restriction
              </h2>
              <p>
                Companio is intended only for individuals legally eligible to
                use such services under applicable laws. Underage access is
                prohibited.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                11. Policy Updates
              </h2>
              <p>
                We may revise this Privacy Policy periodically. Continued use of
                the platform after updates constitutes acceptance of revised
                terms.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                12. Contact
              </h2>
              <p>
                For privacy, compliance, or legal concerns:
                <br />
                <span className="text-white font-medium break-all">
                  companio.support@gmail.com
                </span>
              </p>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-zinc-800">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 text-sm text-zinc-400">
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
              <Link href="/refund-policy" className="hover:text-white transition">
                Refund Policy
              </Link>
              <Link href="/return-policy" className="hover:text-white transition">
                Return Policy
              </Link>
            </div>

            <p className="text-center text-xs text-zinc-500 mt-6">
              © {new Date().getFullYear()} Companio. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}