"use client";

import React from "react";
import Link from "next/link";

export default function RefundPolicy() {
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
              Refund Policy
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-400">
              Effective Date: {new Date().toLocaleDateString()}
            </p>

            <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-3xl mx-auto leading-relaxed">
              This Refund Policy explains how Companio handles refunds for
              platform registrations, subscriptions, and booking/session payments.
              By using Companio, you agree to this policy.
            </p>
          </header>

          {/* Content */}
          <div className="space-y-10 text-zinc-300 text-sm sm:text-base leading-7">

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                1. General Policy Overview
              </h2>
              <p>
                Companio operates as a digital marketplace platform. Different
                payment categories on the platform may have different refund
                eligibility depending on the nature of the purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                2. Non-Refundable Registration Fees
              </h2>
              <p>
                All registration fees, profile verification fees, onboarding fees,
                membership activation fees, subscription charges, or platform
                access fees are strictly non-refundable once successfully paid,
                except where legally required or where duplicate/technical errors
                are verified by Companio.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                3. Session / Booking Refund Eligibility
              </h2>
              <p>
                Booking or session-related payments may be eligible for refund
                only in legitimate cases, including but not limited to:
              </p>

              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>The booked session did not occur.</li>
                <li>The provider failed to appear without valid reason.</li>
                <li>A verified platform-side technical/payment issue occurred.</li>
                <li>Fraudulent or unauthorized booking activity is confirmed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                4. Refund Review Process
              </h2>
              <p>
                Refund requests for bookings are reviewed case-by-case based on
                evidence, booking records, communication logs, payment status,
                and platform investigation. Submission of a refund request does
                not guarantee approval.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                5. Abuse Prevention
              </h2>
              <p>
                Companio reserves the right to reject refund claims where abuse,
                false reporting, policy manipulation, or suspicious activity is
                detected. Fraudulent refund attempts may result in account
                suspension or permanent platform restriction.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                6. Duplicate or Technical Errors
              </h2>
              <p>
                Duplicate charges or verified payment gateway technical failures
                may qualify for correction or refund after internal verification.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                7. Refund Processing Timeline
              </h2>
              <p>
                Approved refunds are typically processed within 5–10 business
                days depending on banking channels, payment gateways, and
                financial institutions.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                8. Third-Party Payment Delays
              </h2>
              <p>
                Companio is not responsible for delays caused by banks, UPI
                providers, card processors, or external payment systems after
                refund approval has been initiated.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                9. Chargebacks
              </h2>
              <p>
                Unauthorized or abusive chargebacks without prior dispute
                resolution through Companio may lead to suspension of services
                and legal/payment enforcement actions where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                10. Policy Changes
              </h2>
              <p>
                Companio may modify this Refund Policy at any time. Continued
                platform use after updates constitutes acceptance of revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                11. Contact for Refund Requests
              </h2>
              <p>
                For eligible booking/session refund concerns:
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