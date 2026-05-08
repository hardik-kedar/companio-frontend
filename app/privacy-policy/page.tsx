"use client";


import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-16 py-8 sm:py-12">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-sm border border-gray-700 px-4 py-2 rounded-full hover:bg-gray-900 transition"
        >
          ← Back
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-zinc-950 rounded-3xl shadow-2xl border border-zinc-800 p-5 sm:p-8 md:p-12">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight mb-3">
          Privacy Policy
        </h1>

        <p className="text-center text-gray-400 text-sm sm:text-base mb-8">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-300 text-sm sm:text-base leading-7">
          {/* Intro */}
          <section>
            <p>
              At <span className="text-white font-semibold">Companio</span>, we
              respect your privacy and are committed to protecting your personal
              data. This Privacy Policy explains how we collect, use, store, and
              safeguard your information when you access our website, mobile
              platform, or services.
            </p>
          </section>

          {/* Information Collection */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Full name, phone number, email address</li>
              <li>Profile details </li>
              <li>Booking, transaction, and payment details</li>
              <li>Location data for service optimization</li>
              <li>Device/browser analytics and usage behavior</li>
            </ul>
          </section>

          {/* Usage */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To create and manage your account</li>
              <li>To process bookings and secure payments</li>
              <li>To improve platform safety and trust</li>
              <li>To personalize user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              3. Data Protection & Security
            </h2>
            <p>
              We implement commercially reasonable security safeguards including
              encryption, secure authentication, and restricted access controls
              to protect your information. However, no digital platform can
              guarantee absolute security.
            </p>
          </section>

          {/* Sharing */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              4. Information Sharing
            </h2>
            <p>
              We do not sell your personal data. Information may be shared only
              with:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Payment gateway providers</li>
              <li>Legal/regulatory authorities when required</li>
              <li>Trusted operational partners</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              5. Cookies & Analytics
            </h2>
            <p>
              We may use cookies and analytics tools to understand traffic,
              improve performance, and enhance functionality.
            </p>
          </section>

          {/* Rights */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              6. Your Rights
            </h2>
            <p>You may request to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Access your stored data</li>
              <li>Correct inaccurate details</li>
              <li>Delete your account (subject to legal requirements)</li>
            </ul>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              7. Policy Updates
            </h2>
            <p>
              Companio may update this Privacy Policy periodically. Updated
              versions will be published on this page.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              8. Contact Us
            </h2>
            <p>
              For privacy-related concerns, contact us at:
              <br />
              <span className="text-white font-medium">
                companio.support@gmail.com
              </span>
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center text-sm text-gray-400 mt-12 border-t border-zinc-800 pt-6">
          <a href="/privacy-policy" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a
            href="/terms-and-conditions"
            className="hover:text-white transition"
          >
            Terms & Conditions
          </a>
          <a href="/refund-policy" className="hover:text-white transition">
            Refund Policy
          </a>
          <a href="/return-policy" className="hover:text-white transition">
            Return Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;