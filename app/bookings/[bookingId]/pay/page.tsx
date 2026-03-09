// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { apiFetch } from "@/lib/api";

// interface Booking {
//   _id: string;
//   totalAmount: number;
//   status: string;
//   companion?: {
//     name: string;
//   };
// }

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export default function PayBookingPage() {

//   const razorpayKey =
//     process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

//   console.log("Razorpay key loaded:", razorpayKey);

//   const params = useParams();
//   const bookingId = params?.bookingId as string;

//   const [booking, setBooking] =
//     useState<Booking | null>(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [processing, setProcessing] =
//     useState(false);


//   /*
//   ===============================
//   LOAD BOOKING
//   ===============================
//   */

//   const loadBooking = async () => {

//     try {

//       const res =
//         await apiFetch(`/api/bookings/${bookingId}`);

//       const data = await res.json();

//       if (!res.ok)
//         throw new Error();

//       setBooking(data.booking);

//     }
//     catch {

//       alert("Failed to load booking");

//     }
//     finally {

//       setLoading(false);

//     }

//   };

//   useEffect(() => {

//     if (bookingId) {
//       loadBooking();
//     }

//   }, [bookingId]);


//   /*
//   ===============================
//   LOAD RAZORPAY SCRIPT
//   ===============================
//   */

//   const loadScript = (src: string) => {

//     return new Promise<boolean>((resolve) => {

//       const existing =
//         document.querySelector(`script[src="${src}"]`);

//       if (existing) {
//         resolve(true);
//         return;
//       }

//       const script =
//         document.createElement("script");

//       script.src = src;

//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);

//       document.body.appendChild(script);

//     });

//   };


//   /*
//   ===============================
//   HANDLE PAYMENT
//   ===============================
//   */

//   const handlePay = async () => {

//     if (processing) return;

//     try {

//       setProcessing(true);

//       if (!razorpayKey) {
//         alert("Razorpay key missing");
//         setProcessing(false);
//         return;
//       }

//       /*
//       LOAD RAZORPAY
//       */

//       const loaded =
//         await loadScript(
//           "https://checkout.razorpay.com/v1/checkout.js"
//         );

//       if (!loaded) {
//         alert("Failed to load Razorpay");
//         setProcessing(false);
//         return;
//       }


//       /*
//       CREATE ORDER (BOOKING ESCROW)
//       */

//       const orderRes =
//         await apiFetch(
//           "/api/bookings/create-payment-order",
//           {
//             method: "POST",
//             body: JSON.stringify({
//               bookingId
//             })
//           }
//         );

//       const orderData =
//         await orderRes.json();

//       if (!orderRes.ok || !orderData.id) {

//         console.error("Order error:", orderData);

//         alert("Order creation failed");

//         setProcessing(false);
//         return;

//       }


//       /*
//       RAZORPAY OPTIONS
//       */


//       console.log("Razorpay key being used:", razorpayKey);

// const options = {

//   key: "rzp_test_SCVHc6t38CRMlH",

//   amount: orderData.amount,

//   currency: orderData.currency,

//   name: "Companio",

//   description: "Booking Payment",

//   order_id: orderData.id,

//   handler: async (response: any) => {

//     try {

//       const verifyRes = await apiFetch(
//         "/api/bookings/pay",
//         {
//           method: "POST",
//           body: JSON.stringify({
//             bookingId,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature
//           })
//         }
//       );

//       const verifyData = await verifyRes.json();

//       if (!verifyRes.ok) {
//         console.error("Verification failed:", verifyData);
//         alert("Payment verification failed");
//         return;
//       }

//       window.location.href = "/payment/success";

//     } catch (err) {

//       console.error("Payment verification error:", err);

//       alert("Payment verification failed");

//     }

//   },

//   theme: {
//     color: "#3E2C23"
//   }

// };

//       const rzp =
//         new window.Razorpay(options);

//       rzp.on("payment.failed", () => {

//         window.location.href =
//           "/payment/failed";

//       });

//       rzp.open();

//     }
//     catch (error) {

//       console.error(error);

//       alert("Payment failed");

//     }
//     finally {

//       setProcessing(false);

//     }

//   };


//   /*
//   ===============================
//   UI
//   ===============================
//   */

//   if (loading)
//     return (
//       <div className="p-6">
//         Loading payment page...
//       </div>
//     );

//   if (!booking)
//     return (
//       <div className="p-6">
//         Booking not found
//       </div>
//     );

//   return (

//     <div className="max-w-xl mx-auto p-6">

//       <h1 className="text-2xl font-semibold mb-6">
//         Complete Payment
//       </h1>

//       <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">

//         <p className="font-semibold">
//           Companion: {booking.companion?.name}
//         </p>

//         <p>
//           Amount: ₹{booking.totalAmount}
//         </p>

//         <p className="text-sm text-gray-500">
//           Payment will be held securely until service completion.
//         </p>

//         <button
//           onClick={handlePay}
//           disabled={processing}
//           className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-60"
//         >
//           {processing
//             ? "Processing..."
//             : "Pay Now"}
//         </button>

//         {booking.status === "completed" && (

//           <a
//             href={`/reviews/${booking._id}`}
//             className="block text-primary text-sm underline"
//           >
//             Leave Review
//           </a>

//         )}

//       </div>

//     </div>

//   );

// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface Booking {
  _id: string;
  totalAmount: number;
  status: string;
  companion?: {
    name: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PayBookingPage() {

  const razorpayKey =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

  console.log("Razorpay key loaded:", razorpayKey);

  const params = useParams();
  const bookingId = params?.bookingId as string;

  const [booking, setBooking] =
    useState<Booking | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState(false);

  /*
  ===============================
  LOAD BOOKING
  ===============================
  */

  const loadBooking = async () => {

    try {

      const res =
        await apiFetch(`/api/bookings/${bookingId}`);

      const data = await res.json();

      if (!res.ok)
        throw new Error();

      setBooking(data.booking);

    }
    catch {

      alert("Failed to load booking");

    }
    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (bookingId) {
      loadBooking();
    }

  }, [bookingId]);

  /*
  ===============================
  LOAD RAZORPAY SCRIPT
  ===============================
  */

  const loadScript = (src: string) => {

    return new Promise<boolean>((resolve) => {

      const existing =
        document.querySelector(`script[src="${src}"]`);

      if (existing) {
        resolve(true);
        return;
      }

      const script =
        document.createElement("script");

      script.src = src;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);

    });

  };

  /*
  ===============================
  HANDLE PAYMENT
  ===============================
  */

  const handlePay = async () => {

    if (processing) return;

    try {

      setProcessing(true);

      if (!razorpayKey) {
        alert("Razorpay key missing");
        setProcessing(false);
        return;
      }

      /*
      LOAD RAZORPAY
      */

      const loaded =
        await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

      if (!loaded) {
        alert("Failed to load Razorpay");
        setProcessing(false);
        return;
      }

      /*
      CREATE ORDER
      */

      const orderRes =
        await apiFetch(
          "/api/bookings/create-payment-order",
          {
            method: "POST",
            body: JSON.stringify({
              bookingId
            })
          }
        );

      const orderData =
        await orderRes.json();

      if (!orderRes.ok || !orderData.id) {

        console.error("Order error:", orderData);

        alert("Order creation failed");

        setProcessing(false);
        return;

      }

      /*
      RAZORPAY OPTIONS
      */

      const options = {

        key: razorpayKey,

        amount: orderData.amount,

        currency: orderData.currency,

        name: "Companio",

        description: "Booking Payment",

        order_id: orderData.id,

        handler: async (response: any) => {

          try {

            const verifyRes =
              await apiFetch(
                "/api/bookings/pay",
                {
                  method: "POST",
                  body: JSON.stringify({
                    bookingId,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                  })
                }
              );

            const verifyData =
              await verifyRes.json();

            if (!verifyRes.ok) {

              console.error(
                "Verification failed:",
                verifyData
              );

              alert(
                verifyData.message ||
                "Payment verification failed"
              );

              return;

            }

            window.location.href =
              "/payment/success";

          }
          catch (err) {

            console.error(
              "Payment verification error:",
              err
            );

            alert(
              "Payment verification failed"
            );

          }

        },

        theme: {
          color: "#3E2C23"
        }

      };

      const rzp =
        new window.Razorpay(options);

      rzp.on(
        "payment.failed",
        () => {

          window.location.href =
            "/payment/failed";

        }
      );

      rzp.open();

    }
    catch (error) {

      console.error(error);

      alert("Payment failed");

    }
    finally {

      setProcessing(false);

    }

  };

  /*
  ===============================
  UI
  ===============================
  */

  if (loading)
    return (
      <div className="p-6">
        Loading payment page...
      </div>
    );

  if (!booking)
    return (
      <div className="p-6">
        Booking not found
      </div>
    );

  return (

    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Complete Payment
      </h1>

      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">

        <p className="font-semibold">
          Companion: {booking.companion?.name}
        </p>

        <p>
          Amount: ₹{booking.totalAmount}
        </p>

        <p className="text-sm text-gray-500">
          Payment will be held securely until service completion.
        </p>

        <button
          onClick={handlePay}
          disabled={processing}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-60"
        >
          {processing
            ? "Processing..."
            : "Pay Now"}
        </button>

        {booking.status === "completed" && (

          <a
            href={`/reviews/${booking._id}`}
            className="block text-primary text-sm underline"
          >
            Leave Review
          </a>

        )}

      </div>

    </div>

  );

}