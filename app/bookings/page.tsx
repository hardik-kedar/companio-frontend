// "use client";

// import { useEffect, useState } from "react";
// import { apiFetch } from "@/lib/api";

// interface Booking {
// _id: string;
// status: string;
// expiresAt?: string;
// paymentExpiresAt?: string;
// totalAmount: number;
// durationHours: number;
// date: string;
// startTime: string;
// renter?: { name: string };
// companion?: { name: string };
// }

// export default function MyBookingsPage() {

// const [bookings, setBookings] = useState<Booking[]>([]);
// const [now, setNow] = useState(Date.now());
// const [loading, setLoading] = useState(true);
// const [processingId, setProcessingId] =
// useState<string | null>(null);

// /*

// LIVE TIMER

// */
// useEffect(() => {

// const timer =
//   setInterval(
//     () => setNow(Date.now()),
//     1000
//   );

// return () => clearInterval(timer);

// }, []);

// /*

// FETCH BOOKINGS

// */
// const fetchBookings =
// async () => {

//   try {

//     const res =
//       await apiFetch(
//         "/api/bookings/my"
//       );

//     const data =
//       await res.json();

//     setBookings(
//       data.bookings || []
//     );

//   }
//   catch {

//     alert(
//       "Failed to load bookings"
//     );

//   }
//   finally {

//     setLoading(false);

//   }

// };

// useEffect(() => {

// fetchBookings();

// const interval =
//   setInterval(
//     fetchBookings,
//     30000
//   );

// return () =>
//   clearInterval(interval);

// }, []);

// /*

// COUNTDOWN

// */
// const getRemaining =
// (expires?: string) => {

//   if (!expires)
//     return "";

//   const diff =
//     new Date(
//       expires
//     ).getTime()
//     - now;

//   if (diff <= 0)
//     return "Expired";

//   const min =
//     Math.floor(
//       diff / 60000
//     );

//   const sec =
//     Math.floor(
//       (diff % 60000) / 1000
//     );

//   return `${min}m ${sec}s`;

// };

// /*

// PAYMENT HANDLER

// */
// const handlePayment =
// async (
// bookingId: string
// ) => {

//   try {

//     setProcessingId(
//       bookingId
//     );

//     const res =
//       await apiFetch(
//         "/api/bookings/create-payment-order",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type":
//               "application/json"
//           },
//           body: JSON.stringify({
//             bookingId
//           })
//         }
//       );

//     const order =
//       await res.json();

//     if (!order.id) {
//       alert(
//         "Order creation failed"
//       );
//       return;
//     }

//     const options = {

//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

//       amount:
//         order.amount,

//       currency:
//         order.currency,

//       order_id:
//         order.id,

//       name:
//         "Companio",

//       description:
//         "Booking payment",

//       handler:
//         async (
//           response: any
//         ) => {

//           await apiFetch(
//             "/api/bookings/pay",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type":
//                   "application/json"
//               },
//               body:
//                 JSON.stringify({
//                   bookingId,
//                   razorpay_order_id:
//                     response.razorpay_order_id,
//                   razorpay_payment_id:
//                     response.razorpay_payment_id,
//                   razorpay_signature:
//                     response.razorpay_signature
//                 })
//             }
//           );

//           alert(
//             "Payment successful"
//           );

//           fetchBookings();

//         }

//     };

//     const rzp =
//       new (window as any)
//       .Razorpay(
//         options
//       );

//     rzp.open();

//   }
//   catch {

//     alert(
//       "Payment failed"
//     );

//   }
//   finally {

//     setProcessingId(
//       null
//     );

//   }

// };

// /*

// UI

// */
// if (loading)
// return (
// <div className="p-6">
// Loading...
// </div>
// );

// return (

// <div className="max-w-3xl mx-auto p-6 pb-32 pt-18">

//   <h1 className="text-2xl font-semibold mb-6">
//     My Bookings
//   </h1>


//   {bookings.length === 0 && (
//     <div className="text-gray-500">
//       No bookings yet
//     </div>
//   )}


//   {bookings.map(
//     (b) => {

//       const expired =
//         b.paymentExpiresAt &&
//         new Date(
//           b.paymentExpiresAt
//         ).getTime()
//         <= now;


//       const isRenter =
//         !!b.companion;


//       return (

//         <div
//           key={b._id}
//           className="border rounded-xl p-5 mb-4 bg-white shadow-sm"
//         >

//           <div className="space-y-1">


//             {/* TITLE */}
//             <div className="font-semibold">

//               {
//                 isRenter
//                   ?
//                   `You booked ${b.companion?.name}`
//                   :
//                   `${b.renter?.name} booked you`
//               }

//             </div>


//             <div className="text-sm text-gray-500">

//               {
//                 new Date(
//                   b.date
//                 ).toLocaleDateString()
//               }

//               {" "}

//               {b.startTime}

//             </div>


//             <div>

//               ₹
//               {
//                 b.totalAmount
//               }

//               {" "}
//               (
//               {
//                 b.durationHours
//               }
//               h)

//             </div>


//             <div className="font-semibold">
//               Status: {b.status}
//             </div>


//             {
//               b.status ===
//                 "awaiting_payment"
//               &&
//               (

//                 <div className="font-semibold">

//                   {
//                     expired
//                     ?
//                     (
//                       <span className="text-red-500">
//                         Payment expired
//                       </span>
//                     )
//                     :
//                     (
//                       <span className="text-blue-600">
//                         Pay within{" "}
//                         {
//                           getRemaining(
//                             b.paymentExpiresAt
//                           )
//                         }
//                       </span>
//                     )

//                   }

//                 </div>

//               )
//             }

//           </div>



//           {/* RENTER PAY BUTTON */}
//           {
//             isRenter
//             &&
//             b.status ===
//               "awaiting_payment"
//             &&
//             !expired
//             &&
//             (

//               <button
//                 disabled={
//                   processingId
//                   === b._id
//                 }
//                 onClick={() =>
//                   handlePayment(
//                     b._id
//                   )
//                 }
//                 className="bg-black text-white px-4 py-2 rounded mt-3"
//               >
//                 {
//                   processingId ===
//                   b._id
//                   ?
//                   "Processing..."
//                   :
//                   "Pay Now"
//                 }
//               </button>

//             )
//           }



//           {/* COMPANION WAIT MESSAGE */}
//           {
//             !isRenter
//             &&
//             b.status ===
//               "awaiting_payment"
//             &&
//             (

//               <div className="text-yellow-600 font-semibold mt-3">
//                 Waiting for renter payment
//               </div>

//             )
//           }


//         </div>

//       );

//     }
//   )}

// </div>

// );

// }


"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Booking {
_id: string;
status: string;
expiresAt?: string;
paymentExpiresAt?: string;
totalAmount: number;
durationHours: number;
date: string;
startTime: string;
renter?: { name: string };
companion?: { name: string };
}

export default function MyBookingsPage() {

const [bookings, setBookings] = useState<Booking[]>([]);
const [now, setNow] = useState(Date.now());
const [loading, setLoading] = useState(true);
const [processingId, setProcessingId] =
useState<string | null>(null);

/* ===== ADDED FOR DISPUTE ===== */

const [disputeBookingId, setDisputeBookingId] =
useState<string | null>(null);

const [disputeReason, setDisputeReason] =
useState("");

/* ============================== */

/*

LIVE TIMER

*/
useEffect(() => {

const timer =
  setInterval(
    () => setNow(Date.now()),
    1000
  );

return () => clearInterval(timer);

}, []);

/*

FETCH BOOKINGS

*/
const fetchBookings =
async () => {

  try {

    const res =
      await apiFetch(
        "/api/bookings/my"
      );

    const data =
      await res.json();

    setBookings(
      data.bookings || []
    );

  }
  catch {

    alert(
      "Failed to load bookings"
    );

  }
  finally {

    setLoading(false);

  }

};

useEffect(() => {

fetchBookings();

const interval =
  setInterval(
    fetchBookings,
    30000
  );

return () =>
  clearInterval(interval);

}, []);

/*

COUNTDOWN

*/
const getRemaining =
(expires?: string) => {

  if (!expires)
    return "";

  const diff =
    new Date(
      expires
    ).getTime()
    - now;

  if (diff <= 0)
    return "Expired";

  const min =
    Math.floor(
      diff / 60000
    );

  const sec =
    Math.floor(
      (diff % 60000) / 1000
    );

  return `${min}m ${sec}s`;

};

/*

PAYMENT HANDLER

*/
const handlePayment =
async (
bookingId: string
) => {

  try {

    setProcessingId(
      bookingId
    );

    const res =
      await apiFetch(
        "/api/bookings/create-payment-order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            bookingId
          })
        }
      );

    const order =
      await res.json();

    if (!order.id) {
      alert(
        "Order creation failed"
      );
      return;
    }

    const options = {

      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount:
        order.amount,

      currency:
        order.currency,

      order_id:
        order.id,

      name:
        "Companio",

      description:
        "Booking payment",

      handler:
        async (
          response: any
        ) => {

          await apiFetch(
            "/api/bookings/pay",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body:
                JSON.stringify({
                  bookingId,
                  razorpay_order_id:
                    response.razorpay_order_id,
                  razorpay_payment_id:
                    response.razorpay_payment_id,
                  razorpay_signature:
                    response.razorpay_signature
                })
            }
          );

          alert(
            "Payment successful"
          );

          fetchBookings();

        }

    };

    const rzp =
      new (window as any)
      .Razorpay(
        options
      );

    rzp.open();

  }
  catch {

    alert(
      "Payment failed"
    );

  }
  finally {

    setProcessingId(
      null
    );

  }

};

/* ===== ADDED DISPUTE FUNCTIONS ===== */

const openDispute = (bookingId: string) => {

setDisputeBookingId(bookingId);

};

const submitDispute = async () => {

if (!disputeBookingId) return;

if (!disputeReason.trim()) {

alert("Please enter dispute reason");

return;

}

try {

const res = await apiFetch(
"/api/bookings/raise-dispute",
{
method: "POST",
body: JSON.stringify({
bookingId: disputeBookingId,
reason: disputeReason
})
}
);

const data = await res.json();

if (!res.ok) {

alert(data.message || "Failed to raise dispute");

return;

}

alert("Dispute raised successfully");

setDisputeBookingId(null);
setDisputeReason("");

fetchBookings();

}
catch {

alert("Dispute failed");

}

};

/* =================================== */

/*

UI

*/
if (loading)
return (
<div className="p-6">
Loading...
</div>
);

return (

<div className="max-w-3xl mx-auto p-6 pb-32 pt-18">

  <h1 className="text-2xl font-semibold mb-6">
    My Bookings
  </h1>


  {bookings.length === 0 && (
    <div className="text-gray-500">
      No bookings yet
    </div>
  )}


  {bookings.map(
    (b) => {

      const expired =
        b.paymentExpiresAt &&
        new Date(
          b.paymentExpiresAt
        ).getTime()
        <= now;


      const isRenter =
        !!b.companion;


      return (

        <div
          key={b._id}
          className="border rounded-xl p-5 mb-4 bg-white shadow-sm"
        >

          <div className="space-y-1">


            <div className="font-semibold">

              {
                isRenter
                  ?
                  `You booked ${b.companion?.name}`
                  :
                  `${b.renter?.name} booked you`
              }

            </div>


            <div className="text-sm text-gray-500">

              {
                new Date(
                  b.date
                ).toLocaleDateString()
              }

              {" "}

              {b.startTime}

            </div>


            <div>

              ₹
              {
                b.totalAmount
              }

              {" "}
              (
              {
                b.durationHours
              }
              h)

            </div>


            <div className="font-semibold">
              Status: {b.status}
            </div>


            {
              b.status ===
                "awaiting_payment"
              &&
              (

                <div className="font-semibold">

                  {
                    expired
                    ?
                    (
                      <span className="text-red-500">
                        Payment expired
                      </span>
                    )
                    :
                    (
                      <span className="text-blue-600">
                        Pay within{" "}
                        {
                          getRemaining(
                            b.paymentExpiresAt
                          )
                        }
                      </span>
                    )

                  }

                </div>

              )
            }

          </div>



          {/* RENTER PAY BUTTON */}
          {
            isRenter
            &&
            b.status ===
              "awaiting_payment"
            &&
            !expired
            &&
            (

              <button
                disabled={
                  processingId
                  === b._id
                }
                onClick={() =>
                  handlePayment(
                    b._id
                  )
                }
                className="bg-black text-white px-4 py-2 rounded mt-3"
              >
                {
                  processingId ===
                  b._id
                  ?
                  "Processing..."
                  :
                  "Pay Now"
                }
              </button>

            )
          }



          {/* COMPANION WAIT MESSAGE */}
          {
            !isRenter
            &&
            b.status ===
              "awaiting_payment"
            &&
            (

              <div className="text-yellow-600 font-semibold mt-3">
                Waiting for renter payment
              </div>

            )
          }


          {/* ===== RAISE DISPUTE BUTTON ===== */}

          {(b.status === "paid_pending_service" ||
            b.status === "completed") && (

            <button
              onClick={() => openDispute(b._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-3"
            >

              Raise Dispute

            </button>

          )}

          {/* ===== DISPUTE STATUS ===== */}

          {b.status === "under_review" && (

            <div className="text-red-600 font-semibold mt-2">

              Dispute under review

            </div>

          )}

        </div>

      );

    }
  )}


{/* ===== DISPUTE MODAL ===== */}

{disputeBookingId && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white p-6 rounded-xl w-96">

<h2 className="text-lg font-semibold mb-3">

Raise Dispute

</h2>

<textarea
value={disputeReason}
onChange={(e)=>setDisputeReason(e.target.value)}
placeholder="Explain the issue..."
className="w-full border rounded p-2 h-28"
/>

<div className="flex justify-end gap-2 mt-4">

<button
onClick={()=>setDisputeBookingId(null)}
className="px-4 py-2 border rounded"
>

Cancel

</button>

<button
onClick={submitDispute}
className="px-4 py-2 bg-red-500 text-white rounded"
>

Submit

</button>

</div>

</div>

</div>

)}

</div>

);

}