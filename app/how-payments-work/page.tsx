// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";

// const steps = [
// {
// title: "Booking Request",
// desc: "The renter sends a booking request with time, date and location."
// },
// {
// title: "Companion Accepts",
// desc: "The companion reviews the request and accepts it."
// },
// {
// title: "Secure Payment",
// desc: "The renter pays securely. The money is held in escrow."
// },
// {
// title: "Service Happens",
// desc: "Both users meet and complete the booking."
// },
// {
// title: "Payment Released",
// desc: "After completion, payment is released to the companion."
// }
// ];

// export default function PaymentSecurityPage() {

// return (

// <div className="max-w-5xl mx-auto px-6 py-24">

//   {/* HEADER */}

//   <div className="text-center mb-20">

//     <h1 className="text-3xl font-semibold mb-4">
//       How Payments & Safety Work
//     </h1>

//     <p className="text-gray-600 max-w-xl mx-auto">
//       Companio protects both renters and companions using secure payments,
//       escrow protection, and dispute resolution.
//     </p>

//   </div>


//   {/* ANIMATED FLOW */}

//   <div className="flex flex-col items-center gap-10">

//     {steps.map((step, index) => (

//       <motion.div
//         key={index}
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.2 }}
//         viewport={{ once: true }}
//         className="bg-white border rounded-xl shadow-md p-6 w-full max-w-md text-center"
//       >

//         <h3 className="font-semibold text-lg mb-2">
//           {index + 1}. {step.title}
//         </h3>

//         <p className="text-gray-600 text-sm">
//           {step.desc}
//         </p>

//       </motion.div>

//     ))}

//   </div>


//   {/* ESCROW EXPLANATION */}

//   <motion.div
//     initial={{ opacity: 0 }}
//     whileInView={{ opacity: 1 }}
//     transition={{ duration: 0.6 }}
//     viewport={{ once: true }}
//     className="mt-20 bg-gray-50 border rounded-xl p-8"
//   >

//     <h2 className="text-xl font-semibold mb-3">
//       Secure Escrow Protection
//     </h2>

//     <p className="text-gray-700 mb-3">
//       Payments are securely processed through Razorpay and held
//       temporarily until the service is completed.
//     </p>

//     <p className="text-gray-700">
//       This ensures companions are paid for their time while renters
//       remain protected in case of issues.
//     </p>

//   </motion.div>


//   {/* DISPUTE FLOW */}

//   <div className="mt-20">

//     <h2 className="text-xl font-semibold text-center mb-10">
//       Dispute Resolution
//     </h2>

//     <div className="grid md:grid-cols-3 gap-6">

//       {[
//         "User raises dispute",
//         "Admin reviews evidence",
//         "Fair decision is made"
//       ].map((text, i) => (

//         <motion.div
//           key={i}
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4, delay: i * 0.2 }}
//           viewport={{ once: true }}
//           className="border rounded-xl p-6 text-center bg-white shadow"
//         >

//           <p className="font-medium">
//             {text}
//           </p>

//         </motion.div>

//       ))}

//     </div>

//   </div>


//   {/* CTA */}

//   <div className="text-center mt-20">

//     <Link
//       href="/explore"
//       className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
//     >
//       Explore Companions
//     </Link>

//   </div>

// </div>

// );
// }



"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
{
title: "Booking Request",
desc: "The renter sends a booking request with time, date and location."
},
{
title: "Companion Accepts",
desc: "The companion reviews the request and accepts the booking."
},
{
title: "Secure Payment",
desc: "The renter pays securely using Razorpay. Payment is held in escrow."
},
{
title: "Service Happens",
desc: "Both users meet at the scheduled time and complete the service."
},
{
title: "Payment Released",
desc: "After completion and no dispute, the payment is released to the companion."
}
];

export default function PaymentSecurityPage() {

return (

<div className="max-w-6xl mx-auto px-6 py-24">

  {/* HEADER */}

  <div className="text-center mb-20">

    <h1 className="text-3xl font-semibold mb-4">
      How Payments & Safety Work
    </h1>

    <p className="text-gray-600 max-w-xl mx-auto">
      Companio protects both renters and companions with secure payments,
      escrow protection, and fair dispute resolution.
    </p>

  </div>


  {/* TIMELINE */}

  <div className="overflow-x-auto">

    <div className="flex items-center gap-10 min-w-[900px]">

      {steps.map((step, index) => (

        <div key={index} className="flex items-center">

          {/* STEP CARD */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white border rounded-xl shadow-md p-6 w-56 text-center"
          >

            <div className="text-primary font-semibold mb-2">
              {index + 1}. {step.title}
            </div>

            <p className="text-sm text-gray-600">
              {step.desc}
            </p>

          </motion.div>


          {/* ARROW */}

          {index < steps.length - 1 && (

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="text-2xl text-gray-400 px-4"
            >
              →
            </motion.div>

          )}

        </div>

      ))}

    </div>

  </div>


  {/* ESCROW EXPLANATION */}

  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mt-24 bg-gray-50 border rounded-xl p-8"
  >

    <h2 className="text-xl font-semibold mb-4">
      Secure Escrow Protection
    </h2>

    <p className="text-gray-700 mb-3">
      When a renter pays, the money is not immediately sent to the companion.
      It is held securely by the platform.
    </p>

    <p className="text-gray-700">
      After the booking is completed successfully and no dispute is raised,
      the payment is released to the companion.
    </p>

  </motion.div>


  {/* DISPUTE FLOW */}

  <div className="mt-24">

    <h2 className="text-xl font-semibold text-center mb-10">
      Dispute Protection
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      {[
        {
          title: "Raise Dispute",
          desc: "If something goes wrong, either user can raise a dispute."
        },
        {
          title: "Admin Review",
          desc: "Our team reviews chat history, booking details and evidence."
        },
        {
          title: "Fair Resolution",
          desc: "Admin either refunds the renter or releases payment to the companion."
        }
      ].map((item, i) => (

        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.2 }}
          viewport={{ once: true }}
          className="bg-white border rounded-xl shadow p-6 text-center"
        >

          <h3 className="font-semibold mb-2">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600">
            {item.desc}
          </p>

        </motion.div>

      ))}

    </div>

  </div>
{/* COMPANION WALLET SYSTEM */}

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}
className="mt-28 bg-white border rounded-xl p-8"
>

<h2 className="text-xl font-semibold mb-4">
Companion Wallet & Withdrawals
</h2>

<p className="text-gray-700 mb-3">
After a booking is completed successfully and no dispute is raised,
the payment is first transferred to the companion's Companio wallet.
This wallet acts as a secure balance system inside the platform.
</p>

<p className="text-gray-700 mb-3">
Companions can request a withdrawal of their wallet balance at any time
from their dashboard.
</p>

<p className="text-gray-700">
Withdrawal requests are reviewed and approved by the Companio admin
team before the payment is transferred to the companion's bank account.
This verification step helps prevent fraud and ensures platform safety.
</p>

</motion.div>


{/* PLATFORM COMMISSION */}

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}
className="mt-16 bg-gray-50 border rounded-xl p-8"
>

<h2 className="text-xl font-semibold mb-4">
Platform Commission
</h2>

<p className="text-gray-700 mb-3">
Companio operates on a transparent commission model. A small platform
service fee is deducted from each completed booking to maintain the
platform infrastructure, payment processing, customer support and
security systems.
</p>

<p className="text-gray-700">
The remaining amount is credited to the companion's Companio wallet
and can be withdrawn according to the platform withdrawal policy.
</p>

</motion.div>


{/* STARTUP NOTICE */}

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}
className="mt-16 border rounded-xl p-8"
>

<h2 className="text-xl font-semibold mb-4">
Early Stage Platform
</h2>

<p className="text-gray-700 mb-3">
Companio is currently in its early startup phase. While we strive to
deliver a smooth and reliable experience for all users, occasional
technical issues or delays may occur as the platform continues to
improve and expand.
</p>

<p className="text-gray-700">
Our team is actively working to enhance stability, safety and user
experience as we grow.
</p>

</motion.div>


{/* USER SUPPORT */}

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}
className="mt-16 bg-white border rounded-xl p-8"
>

<h2 className="text-xl font-semibold mb-4">
User Support
</h2>

<p className="text-gray-700 mb-3">
If you experience any issues related to bookings, payments,
withdrawals or user behavior, you can contact the Companio
support team via email.
</p>

<p className="text-gray-700 mb-3">
Our administrators review user reports and support requests
carefully to ensure fair outcomes and platform safety.
</p>

<p className="text-gray-700">
For assistance, please contact: <span className="font-medium">
support@companio.in
</span>
</p>

</motion.div>


{/* TRUST & SAFETY */}

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}
className="mt-16 bg-gray-50 border rounded-xl p-8"
>

<h2 className="text-xl font-semibold mb-4">
Trust & Safety Commitment
</h2>

<p className="text-gray-700 mb-3">
Companio is committed to maintaining a respectful and safe
environment for both renters and companions.
</p>

<ul className="text-gray-700 text-sm space-y-2 list-disc pl-5">

<li>All payments are processed through secure payment gateways.</li>

<li>Booking activity and communication may be reviewed to resolve disputes.</li>

<li>Users who violate platform rules may be restricted or permanently banned.</li>

<li>Fraudulent activity, harassment or illegal behavior is strictly prohibited.</li>

</ul>

</motion.div>

  {/* CTA */}

  <div className="text-center mt-20">

    <Link
      href="/register"
      className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
    >
      Explore Companions
    </Link>

  </div>

</div>

);
}