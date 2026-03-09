// // "use client";

// // import { useState } from "react";
// // import { apiFetch } from "@/lib/api";
// // import { useRouter } from "next/navigation";

// // export default function WithdrawPage() {

// //   const router = useRouter();

// //   const [amount, setAmount] =
// //     useState("");

// //   const [loading, setLoading] =
// //     useState(false);



// //   /*
// //   ===============================
// //   SUBMIT WITHDRAW REQUEST
// //   ===============================
// //   */

// // const submitWithdraw = async () => {

// //   if (!amount || Number(amount) <= 0) {
// //     alert("Enter valid amount");
// //     return;
// //   }

// //   try {

// //     setLoading(true);

// //     const res = await apiFetch(
// //       "/api/withdrawals/request",
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({
// //           amount: Number(amount)
// //         })
// //       }
// //     );

// //     const data = await res.json();

// //     if (!res.ok) {
// //       alert(data.message || "Withdrawal failed");
// //       return;
// //     }

// //     alert("Withdrawal request submitted");

// //     router.push("/wallet");

// //   }
// //   catch (err) {

// //     console.error(err);

// //     alert("Server error");

// //   }
// //   finally {

// //     setLoading(false);

// //   }

// // };


// //   /*
// //   ===============================
// //   UI
// //   ===============================
// //   */

// //   return (

// //     <div className="max-w-xl mx-auto p-6">

// //       <h1 className="text-2xl font-semibold mb-6">
// //         Withdraw Money
// //       </h1>



// //       <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">

// //         <p className="text-gray-600 text-sm">
// //           Enter the amount you want to withdraw.
// //           The admin will review and process your request.
// //         </p>



// //         <input
// //           type="number"
// //           placeholder="Amount"
// //           value={amount}
// //           onChange={(e) =>
// //             setAmount(e.target.value)
// //           }
// //           className="w-full border rounded-lg px-4 py-2"
// //         />



// //         <button
// //           onClick={submitWithdraw}
// //           disabled={loading}
// //           className="w-full bg-primary text-white py-3 rounded-lg disabled:opacity-50"
// //         >
// //           {loading
// //             ? "Submitting..."
// //             : "Request Withdrawal"}
// //         </button>

// //       </div>

// //     </div>

// //   );

// // }

// "use client";

// import { useState } from "react";
// import { apiFetch } from "@/lib/api";
// import { useRouter } from "next/navigation";

// export default function WithdrawPage() {

//   const router = useRouter();

//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   /*
//   ===============================
//   SUBMIT WITHDRAW REQUEST
//   ===============================
//   */

//   const submitWithdraw = async () => {

//     if (loading) return;

//     const value = Number(amount);

//     /*
//     ===============================
//     VALIDATION
//     ===============================
//     */

//     if (!value || value <= 0) {
//       alert("Enter a valid amount");
//       return;
//     }

//     if (value < 500) {
//       alert("Minimum withdrawal is ₹500");
//       return;
//     }

//     if (!Number.isInteger(value)) {
//       alert("Amount must be a whole number");
//       return;
//     }

//     try {

//       setLoading(true);

//       const res = await apiFetch(
//         "/api/withdrawals/request",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             amount: value
//           })
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Withdrawal failed");
//         return;
//       }

//       alert("Withdrawal request submitted");

//       router.push("/wallet");

//     }
//     catch (err) {

//       console.error("Withdraw error:", err);

//       alert("Server error");

//     }
//     finally {

//       setLoading(false);

//     }

//   };

//   /*
//   ===============================
//   UI
//   ===============================
//   */

//   return (

//     <div className="max-w-xl mx-auto p-6">

//       <h1 className="text-2xl font-semibold mb-6">
//         Withdraw Money
//       </h1>

//       <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">

//         <p className="text-gray-600 text-sm">
//           Enter the amount you want to withdraw.  
//           The admin will review and process your request.
//         </p>

//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           min={500}
//           step={1}
//           onChange={(e) =>
//             setAmount(e.target.value)
//           }
//           className="w-full border rounded-lg px-4 py-2"
//         />

//         <button
//           onClick={submitWithdraw}
//           disabled={loading}
//           className="w-full bg-primary text-white py-3 rounded-lg disabled:opacity-50"
//         >
//           {loading
//             ? "Submitting..."
//             : "Request Withdrawal"}
//         </button>

//       </div>

//     </div>

//   );

// }


"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function WithdrawPage() {

  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  /*
  ===============================
  SUBMIT WITHDRAW REQUEST
  ===============================
  */

  const submitWithdraw = async () => {

    if (loading) return;

    const value = Number(amount);

    /*
    VALIDATION
    */

    if (!value || value <= 0) {
      alert("Enter a valid amount");
      return;
    }

    if (value < 500) {
      alert("Minimum withdrawal is ₹500");
      return;
    }

    if (!Number.isInteger(value)) {
      alert("Amount must be a whole number");
      return;
    }

    try {

      setLoading(true);

      const res = await apiFetch(
        "/api/withdrawals/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            amount: value
          })
        }
      );

      let data: any = {};

      try {
        data = await res.json();
      } catch {
        // backend returned no json
      }

      if (!res.ok) {
        alert(data?.message || "Withdrawal failed");
        return;
      }

      alert("Withdrawal request submitted");

      router.push("/wallet");

    }
    catch (err) {

      console.error("Withdraw error:", err);

      alert("Server error");

    }
    finally {

      setLoading(false);

    }

  };

  /*
  ===============================
  UI
  ===============================
  */

  return (

    <div className="max-w-xl mx-auto p-6 pt-18">

      <h1 className="text-2xl font-semibold mb-6">
        Withdraw Money
      </h1>

      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">

        <p className="text-gray-600 text-sm">
          Enter the amount you want to withdraw.
          The admin will review and process your request.
        </p>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          min={500}
          step={1}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <button
          onClick={submitWithdraw}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Request Withdrawal"}
        </button>

      </div>

    </div>

  );

}