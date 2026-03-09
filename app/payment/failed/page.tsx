export default function PaymentFailed() {

  return (

    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="bg-card shadow-soft rounded-3xl p-10 text-center max-w-md">

        <h1 className="text-2xl font-semibold text-red-600 mb-3">
          Payment Failed
        </h1>

        <p className="text-muted mb-6">
          Something went wrong during payment.
        </p>

        <a
          href="/bookings"
          className="bg-primary text-white px-6 py-3 rounded-xl hover:scale-[1.02] transition"
        >
          Back to Bookings
        </a>

      </div>

    </div>

  );

}