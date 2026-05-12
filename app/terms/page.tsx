"use client";

import React from "react";
import Link from "next/link";

export default function TermsPage() {
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

        {/* Main Container */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-5 sm:p-8 md:p-12">

          {/* Header */}
          <header className="text-center border-b border-zinc-800 pb-8 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Terms & Conditions
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-400">
              Effective Date: {new Date().toLocaleDateString()}
            </p>

            <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-3xl mx-auto leading-relaxed">
              These Terms & Conditions govern your access to and use of Companio,
              including its website, platform, services, and related features.
              By using Companio, you agree to these legally binding terms.
            </p>
          </header>

          {/* Terms Content */}
          <div className="space-y-10 text-zinc-300 text-sm sm:text-base leading-7">

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                1. Platform Nature
              </h2>
              <p>
                Companio is a technology-enabled marketplace platform that facilitates
                user discovery, communication, and booking between independent users.
                Companio does not directly provide companionship, personal, escort,
                relationship, or in-person services.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                2. Eligibility
              </h2>
              <p>
                Users must be legally competent adults (18+) under applicable law.
                By registering, you represent that all information provided is accurate
                and lawful.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                3. Account Responsibility
              </h2>
              <p>
                Users are solely responsible for account credentials, activities,
                profile content, communications, and compliance with applicable laws.
                Companio may suspend accounts suspected of fraud, abuse, or policy
                violations.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                4. Independent User Relationship
              </h2>
              <p>
                All service providers, companions, or participants on Companio act
                independently and are not employees, agents, contractors, or legal
                representatives of Companio.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                5. Booking & Payments
              </h2>
              <p>
                Companio may facilitate payments, escrow, subscriptions, or commissions
                through integrated third-party processors. Processing fees, taxes,
                deductions, or commissions may apply.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                6. No Guarantee of Outcomes
              </h2>
              <p>
                Companio does not guarantee compatibility, conduct, safety,
                professionalism, legality, availability, or outcomes of user
                interactions, bookings, or engagements.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                7. User Conduct Standards
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Fraud or deceptive conduct</li>
                <li>Harassment, abuse, or coercion</li>
                <li>Illegal activities</li>
                <li>Exploitation or trafficking</li>
                <li>Payment circumvention</li>
                <li>Platform misuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                8. Safety Disclaimer
              </h2>
              <p>
                Users assume full responsibility for personal decisions, meetings,
                communications, and off-platform conduct. Companio encourages users
                to exercise independent caution and judgment.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                9. Disputes & Refunds
              </h2>
              <p>
                Companio may review disputes for platform integrity purposes but is
                not obligated to mediate, arbitrate, or enforce user agreements
                unless legally required.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                10. Intellectual Property
              </h2>
              <p>
                All platform branding, software, UI, design, systems, and proprietary
                content remain the exclusive property of Companio unless otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                11. Suspension & Termination
              </h2>
              <p>
                Companio reserves the right to restrict, suspend, or terminate
                access without notice where risk, policy violations, or legal
                concerns arise.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                12. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Companio shall not be liable
                for direct, indirect, incidental, consequential, reputational,
                financial, emotional, physical, or legal damages arising from platform use.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                13. Indemnification
              </h2>
              <p>
                Users agree to indemnify and hold Companio harmless from claims,
                liabilities, losses, damages, and legal expenses resulting from
                misuse, unlawful conduct, or policy breaches.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                14. Policy Changes
              </h2>
              <p>
                Companio may revise these Terms periodically. Continued platform
                usage after updates constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                15. Governing Law
              </h2>
              <p>
                These Terms shall be governed by the laws of India. Jurisdiction
                shall lie with competent courts in India, subject to applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                16. Contact
              </h2>
              <p>
                For legal, compliance, or policy concerns:
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