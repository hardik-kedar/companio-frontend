export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 sm:px-6 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <section className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Return Policy
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
            This Return Policy explains how Companio handles returns,
            cancellations, and service-related disputes for bookings made
            through our platform.
          </p>
          <p className="text-xs sm:text-sm text-muted mt-4">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </section>

        {/* Policy Content */}
        <div className="space-y-8 text-sm sm:text-base leading-7">

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              1. Nature of Services
            </h2>
            <p>
              Companio is a digital platform that connects users with independent
              companions/service providers. Since our offerings are service-based
              and not physical goods, traditional product returns do not apply.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              2. No Physical Returns
            </h2>
            <p>
              As Companio does not sell physical products, users cannot return
              any item after purchase. Bookings are service engagements and are
              governed by booking status, cancellation terms, and refund
              eligibility.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              3. Booking Cancellations
            </h2>
            <p>
              Users may cancel eligible bookings according to our Refund Policy.
              Cancellation charges or partial refunds may apply depending on:
            </p>

            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Time remaining before scheduled booking</li>
              <li>Companion acceptance status</li>
              <li>Payment processing fees</li>
              <li>Violation of platform policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              4. Non-Returnable / Non-Reversible Cases
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Completed bookings</li>
              <li>Services already rendered</li>
              <li>Subscription fees already utilized</li>
              <li>Violations of user or provider conduct policies</li>
              <li>Fraudulent or abusive transactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              5. Service Quality Concerns
            </h2>
            <p>
              If a user experiences issues with service quality, misconduct, or
              platform errors, they should contact our support team immediately.
              Cases are reviewed individually and may qualify for compensation
              or partial refunds under platform discretion.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              6. Incorrect Charges
            </h2>
            <p>
              In the event of duplicate payment, technical billing error, or
              unauthorized charge, users must report the issue promptly for
              investigation. Verified billing issues may result in reversal or
              refund.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              7. Platform Rights
            </h2>
            <p>
              Companio reserves the right to deny refund or return-related
              requests in cases involving fraud, abuse, policy manipulation, or
              misuse of promotional systems.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              8. Policy Updates
            </h2>
            <p>
              This Return Policy may be updated periodically to reflect legal,
              business, or operational changes. Continued use of Companio
              indicates acceptance of revised policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              9. Contact Support
            </h2>
            <p>
              For return, cancellation, or dispute-related concerns:
            </p>

            <div className="mt-3 space-y-2">
              <p>Email: companio.support@gmail.com</p>
              <p>Email: trycompanio@gmail.com</p>
              <p>Website: https://www.trycompanio.in</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}