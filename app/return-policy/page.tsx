"use client";

import React from "react";
import Link from "next/link";

export default function ReturnPolicyPage() {
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
              Return Policy
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-400">
              Effective Date: {new Date().toLocaleDateString()}
            </p>

            <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-3xl mx-auto leading-relaxed">
              This Return Policy explains how Companio handles returns,
              reversals, cancellations, and service disputes for services
              offered through the platform.
            </p>
          </header>

          {/* Content */}
          <div className="space-y-10 text-zinc-300 text-sm sm:text-base leading-7">

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                1. Service-Based Platform
              </h2>
              <p>
                Companio is a digital platform facilitating service-oriented
                bookings and user interactions. Companio does not sell or ship
                physical goods or merchandise.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                2. No Physical Product Returns
              </h2>
              <p>
                Since Companio does not provide physical products, traditional
                product return policies are not applicable.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                3. Registration, Membership & Subscription Purchases
              </h2>
              <p>
                Registration fees, onboarding charges, membership fees,
                verification charges, subscriptions, and platform-access
                purchases are non-returnable and non-reversible once payment is
                successfully processed, except where legally required.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                4. Booking / Session Cancellations
              </h2>
              <p>
                Session or booking-related transactions may qualify for review
                under the Refund Policy if a booked service does not occur or
                where legitimate disputes are verified.
              </p>

              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Provider no-show</li>
                <li>Verified technical issue</li>
                <li>Unauthorized payment</li>
                <li>Platform-recognized exceptional circumstances</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                5. Non-Returnable Cases
              </h2>

              <ul className="list-disc pl-5 space-y-2">
                <li>Completed sessions or fulfilled bookings</li>
                <li>Consumed subscriptions or active memberships</li>
                <li>User misconduct or policy violations</li>
                <li>Fraudulent refund or abuse attempts</li>
                <li>Off-platform agreements or transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                6. Service Quality Complaints
              </h2>
              <p>
                Complaints regarding service quality, conduct, or dissatisfaction
                may be reviewed by Companio for platform integrity purposes but
                do not automatically qualify as returns or refunds.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                7. Technical or Duplicate Charges
              </h2>
              <p>
                Verified duplicate billing, payment gateway failures, or
                technical processing issues may qualify for corrective action
                after internal review.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                8. Platform Protection Rights
              </h2>
              <p>
                Companio reserves the right to reject return, reversal, or
                refund requests where misuse, fraud, coercion, policy abuse, or
                false claims are suspected.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                9. Third-Party Payment Systems
              </h2>
              <p>
                Payment reversals may be subject to banking systems, UPI rails,
                payment gateways, or processor timelines beyond Companio’s direct
                operational control.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                10. Policy Updates
              </h2>
              <p>
                Companio may revise this Return Policy periodically. Continued
                use of the platform constitutes acceptance of revised policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                11. Contact
              </h2>
              <p>
                For return-policy related concerns:
                <br />
                <span className="text-white font-medium break-all">
                  companio.support@gmail.com
                </span>
                <br />
                <span className="text-white font-medium break-all">
                  trycompanio@gmail.com
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