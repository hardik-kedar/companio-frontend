"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    title: "Booking Request",
    desc: "The user selects a host, chooses time and details, then sends a booking request.",
  },
  {
    title: "Host Accepts",
    desc: "The host reviews the request and confirms availability.",
  },
  {
    title: "Secure Payment",
    desc: "Payment is processed securely through the platform and held safely until booking completion.",
  },
  {
    title: "Session Happens",
    desc: "Both users complete the scheduled session.",
  },
  {
    title: "Payment Release",
    desc: "After successful completion and no valid dispute, payment is released.",
  },
];

export default function PaymentSecurityPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">

      {/* HEADER */}
      <section className="text-center mb-14 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight">
          How Payments & Safety Work
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Companio uses secure payment systems, booking protection, and dispute
          review processes to help create a safer experience for both users and hosts.
        </p>
      </section>

      {/* MOBILE + DESKTOP STEPS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-16 sm:mb-24">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white border rounded-2xl shadow-sm p-5 text-center"
          >
            <div className="text-primary font-semibold mb-3 text-sm sm:text-base">
              {index + 1}. {step.title}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* PAYMENT PROTECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-50 border rounded-2xl p-5 sm:p-8 mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Secure Payment Protection
        </h2>

        <p className="text-gray-700 mb-3 leading-relaxed">
          Payments are not instantly transferred after booking. Funds are managed
          securely through the platform process until the session is completed
          according to platform conditions.
        </p>

        <p className="text-gray-700 leading-relaxed">
          This helps reduce fraud risk, improve booking trust, and support fair
          issue resolution where necessary.
        </p>
      </motion.section>

      {/* DISPUTE */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Dispute Protection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Raise Issue",
              desc: "If a major problem occurs, users can report it for review.",
            },
            {
              title: "Platform Review",
              desc: "Booking details and available evidence may be reviewed.",
            },
            {
              title: "Resolution",
              desc: "A fair decision may include payment release, hold, or eligible refund.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border rounded-2xl p-5 text-center"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOST EARNINGS */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white border rounded-2xl p-5 sm:p-8 mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Host Earnings & Withdrawals
        </h2>

        <p className="text-gray-700 mb-3 leading-relaxed">
          After eligible booking completion, host earnings are reflected within
          the platform process based on platform policies, deductions, and verification.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Withdrawal requests may be reviewed for safety, fraud prevention, and
          compliance before final transfer.
        </p>
      </motion.section>

      {/* PLATFORM FEES */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-50 border rounded-2xl p-5 sm:p-8 mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Platform Fees
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Companio may apply platform or service fees to support payment systems,
          safety operations, customer support, infrastructure, and growth.
        </p>
      </motion.section>

      {/* SAFETY */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white border rounded-2xl p-5 sm:p-8 mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Trust & Safety
        </h2>

        <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm sm:text-base">
          <li>Payments are processed through secure systems.</li>
          <li>Serious disputes may be reviewed for fairness.</li>
          <li>Fraud, abuse, or policy violations may result in restrictions.</li>
          <li>User safety and respectful conduct are prioritized.</li>
        </ul>
      </motion.section>

      {/* SUPPORT */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-50 border rounded-2xl p-5 sm:p-8"
      >
        <h2 className="text-2xl font-semibold mb-4">
          User Support
        </h2>

        <p className="text-gray-700 mb-3 leading-relaxed">
          For booking, payment, or platform concerns, users can contact support
          for assistance.
        </p>

        <p className="text-gray-700 font-medium break-all">
          companio.support@gmail.com
        </p>
      </motion.section>

      {/* CTA */}
      <div className="text-center mt-14 sm:mt-20">
        <Link
          href="/register"
          className="inline-block bg-primary text-white px-8 py-4 rounded-full hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </div>

    </main>
  );
}