// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";
// import { LOCATIONS } from "../constants/locations";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export default function Register() {

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "renter",
//   });

//   const [stateValue, setStateValue] = useState("");
//   const [cityValue, setCityValue] = useState("");

//   const [showPassword, setShowPassword] =
//     useState(false);

//   const [loading, setLoading] =
//     useState(false);



//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {

//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });

//   };



//   const handleRegister = async (plan: "1_month" | "3_month") => {

//     try {

//       if (
//         !form.name ||
//         !form.email ||
//         !form.password ||
//         !stateValue ||
//         !cityValue
//       ) {

//         alert("Please fill all fields");
//         return;

//       }

//       setLoading(true);



//       // const orderRes = await fetch(
//       //   `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order`,
//       //   { method: "POST" }
//       // );


// const orderRes = await fetch(
//   `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order`,
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       plan: "1_month"
//     })
//   }
// );


//       if (!orderRes.ok)
//         throw new Error("Order creation failed");

//       const orderData =
//         await orderRes.json();



//       const options = {

//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

//         amount: orderData.amount,

//         currency: orderData.currency,

//         name: "Companio",

//         description: "Monthly Subscription",

//         order_id: orderData.id,



//         handler: async function (response: any) {

//           try {

//             const registerRes = await fetch(
//               `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-paid`,
//               {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   ...form,
//                   state: stateValue,
//                   city: cityValue,
//                   acceptedTerms: true,
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature,
//                 }),
//               }
//             );

//             const result = await registerRes.json();

//             if (registerRes.ok) {

//               alert("Registration successful!");

//               window.location.href = "/login";

//             }

//             else {

//               alert(result.message || "Registration failed");

//             }

//           }

//           catch (err) {

//             console.error("Register error:", err);

//             alert("Registration failed after payment");

//           }

//         },



//         modal: {
//           ondismiss: () => setLoading(false)
//         },



//         theme: {
//           color: "#3E2C23",
//         },

//       };



//       if (!window.Razorpay)
//         throw new Error("Razorpay SDK not loaded");



//       const rzp = new window.Razorpay(options);

//       rzp.open();

//     }

//     catch (error) {

//       console.error("Register error:", error);

//       alert("Something went wrong");

//       setLoading(false);

//     }

//   };



//   return (

//     <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">

//       {/* BRAND */}

//       <div className="mb-10 text-center">

//         <Link href="/">

//           <h1 className="text-3xl font-semibold tracking-tight text-primary hover:opacity-80 transition cursor-pointer">
//             Companio
//           </h1>

//         </Link>

//         <p className="text-sm text-muted mt-2">
//           Start your journey toward meaningful connection.
//         </p>

//       </div>



//       {/* CARD */}

//       <div className="bg-card p-10 rounded-2xl shadow-soft w-full max-w-md space-y-6">

//         <h2 className="text-2xl font-semibold text-center">
//           Join Companio
//         </h2>



//         {/* NAME */}

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />



//         {/* EMAIL */}

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />



//         {/* PASSWORD */}

//         <div className="relative">

//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg pr-12"
//           />

//           <button
//             type="button"
//             onClick={() =>
//               setShowPassword(!showPassword)
//             }
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//           >

//             {showPassword
//               ? <EyeOff size={20}/>
//               : <Eye size={20}/>
//             }

//           </button>

//         </div>



//         {/* ROLE */}

//         <select
//           name="role"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         >

//           <option value="renter">
//             I want companionship
//           </option>

//           <option value="companion">
//             I want to earn
//           </option>

//         </select>



//         {/* STATE */}

//         <select
//           value={stateValue}
//           onChange={(e) => {
//             setStateValue(e.target.value);
//             setCityValue("");
//           }}
//           className="w-full p-3 border rounded-lg"
//         >

//           <option value="">
//             Select State
//           </option>

//           {Object.keys(LOCATIONS).map((stateName) => (

//             <option key={stateName} value={stateName}>
//               {stateName}
//             </option>

//           ))}

//         </select>



//         {/* CITY */}

//         <select
//           value={cityValue}
//           onChange={(e) => setCityValue(e.target.value)}
//           disabled={!stateValue}
//           className="w-full p-3 border rounded-lg"
//         >

//           <option value="">
//             Select City
//           </option>

//           {stateValue &&
//             LOCATIONS[stateValue as keyof typeof LOCATIONS].map(
//               (cityName) => (

//                 <option key={cityName} value={cityName}>
//                   {cityName}
//                 </option>

//               )
//             )}

//         </select>



//         {/* BUTTON */}

//         {/* <button
//           onClick={handleRegister}
//           disabled={loading}
//           className="w-full bg-primary text-white py-3 rounded-xl hover:scale-105 transition disabled:opacity-60"
//         >

//           {loading
//             ? "Processing..."
//             : "Pay ₹299 & Register"
//           }

//         </button> */}




// <p className="text-sm text-gray-500 text-center">
// Choose your subscription plan
// </p>


// <div className="space-y-4">

//   {/* 1 MONTH PLAN */}

//   <button
//     onClick={() => handleRegister("1_month")}
//     disabled={loading}
//     className="w-full border border-primary text-primary py-3 rounded-xl hover:bg-primary hover:text-white transition"
//   >
//     {loading
//       ? "Processing..."
//       : "₹199 — 1 Month (Intro Offer)"
//     }
//   </button>


//   {/* 3 MONTH PLAN */}

//   <button
//     onClick={() => handleRegister("3_month")}
//     disabled={loading}
//     className="w-full bg-primary text-white py-3 rounded-xl hover:scale-[1.02] transition duration-300 disabled:opacity-60 relative"
//   >

//     <span className="absolute right-3 top-1 text-xs bg-yellow-400 text-black px-2 py-[2px] rounded">
//       BEST VALUE
//     </span>

//     {loading
//       ? "Processing..."
//       : "₹299 — 3 Months"
//     }

//   </button>

// </div>



//       </div>

//     </div>

//   );

// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";
// import { LOCATIONS } from "../constants/locations";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export default function Register() {

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "renter",
//   });

//   const [stateValue, setStateValue] = useState("");
//   const [cityValue, setCityValue] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {

//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });

//   };



//   const handleRegister = async (plan: "1_month" | "3_month") => {

//     try {

//       if (
//         !form.name ||
//         !form.email ||
//         !form.password ||
//         !stateValue ||
//         !cityValue
//       ) {

//         alert("Please fill all fields");
//         return;

//       }

//       if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
//         alert("Payment configuration error");
//         return;
//       }

//       setLoading(true);



//       const orderRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             plan
//           })
//         }
//       );

//       if (!orderRes.ok)
//         throw new Error("Order creation failed");

//       const orderData = await orderRes.json();



//       const options = {

//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

//         amount: orderData.amount,

//         currency: orderData.currency,

//         name: "Companio",

//         description: "Subscription Payment",

//         order_id: orderData.id,

//         prefill: {
//           name: form.name,
//           email: form.email
//         },



//         // handler: async function (response: any) {

//         //   try {

//         //     const registerRes = await fetch(
//         //       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-paid`,
//         //       {
//         //         method: "POST",
//         //         credentials: "include",
//         //         headers: {
//         //           "Content-Type": "application/json",
//         //         },
//         //         body: JSON.stringify({
//         //           ...form,
//         //           state: stateValue,
//         //           city: cityValue,
//         //           acceptedTerms: true,
//         //           razorpay_order_id: response.razorpay_order_id,
//         //           razorpay_payment_id: response.razorpay_payment_id,
//         //           razorpay_signature: response.razorpay_signature,
//         //         }),
//         //       }
//         //     );

//         //     const result = await registerRes.json();

//         //     if (registerRes.ok) {

//         //       alert("Registration successful!");

//         //       window.location.href = "/login";

//         //     } else {

//         //       alert(result.message || "Registration failed");

//         //     }

//         //   } catch (err) {

//         //     console.error("Register error:", err);

//         //     alert("Registration failed after payment");

//         //   }

//         // },

// handler: async function (response: any) {

//   try {

//     const registerRes = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-paid`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...registerData,
//           razorpay_order_id: orderData.id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,
//         }),
//       }
//     );

//     const result = await registerRes.json();

//     if (registerRes.ok) {
//       alert("Registration successful!");
//       window.location.href = "/login";
//     } else {
//       alert(result.message || "Registration failed");
//     }

//   } catch (err) {

//     console.error("Register error:", err);
//     alert("Registration failed after payment");

//   }

// },


//         modal: {
//           ondismiss: () => setLoading(false)
//         },

//         theme: {
//           color: "#3E2C23",
//         },

//       };



//       if (!window.Razorpay)
//         throw new Error("Razorpay SDK not loaded");



//       const rzp = new window.Razorpay(options);

//       rzp.open();

//     }

//     catch (error) {

//       console.error("Register error:", error);

//       alert("Something went wrong");

//       setLoading(false);

//     }

//   };



//   return (

//     <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">

//       <div className="mb-10 text-center">

//         <Link href="/">
//           <h1 className="text-3xl font-semibold tracking-tight text-primary hover:opacity-80 transition cursor-pointer">
//             Companio
//           </h1>
//         </Link>

//         <p className="text-sm text-muted mt-2">
//           Start your journey toward meaningful connection.
//         </p>

//       </div>



//       <div className="bg-card p-10 rounded-2xl shadow-soft w-full max-w-md space-y-6">

//         <h2 className="text-2xl font-semibold text-center">
//           Join Companio
//         </h2>



//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />



//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />



//         <div className="relative">

//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg pr-12"
//           />

//           <button
//             type="button"
//             onClick={() =>
//               setShowPassword(!showPassword)
//             }
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//           >

//             {showPassword
//               ? <EyeOff size={20}/>
//               : <Eye size={20}/>
//             }

//           </button>

//         </div>



//         <select
//           name="role"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         >

//           <option value="renter">
//             I want companionship
//           </option>

//           <option value="companion">
//             I want to earn
//           </option>

//         </select>



//         <select
//           value={stateValue}
//           onChange={(e) => {
//             setStateValue(e.target.value);
//             setCityValue("");
//           }}
//           className="w-full p-3 border rounded-lg"
//         >

//           <option value="">
//             Select State
//           </option>

//           {Object.keys(LOCATIONS).map((stateName) => (

//             <option key={stateName} value={stateName}>
//               {stateName}
//             </option>

//           ))}

//         </select>



//         <select
//           value={cityValue}
//           onChange={(e) => setCityValue(e.target.value)}
//           disabled={!stateValue}
//           className="w-full p-3 border rounded-lg"
//         >

//           <option value="">
//             Select City
//           </option>

//           {stateValue &&
//             LOCATIONS[stateValue as keyof typeof LOCATIONS].map(
//               (cityName) => (

//                 <option key={cityName} value={cityName}>
//                   {cityName}
//                 </option>

//               )
//             )}

//         </select>



//         <p className="text-sm text-gray-500 text-center">
//           Choose your subscription plan
//         </p>



//         <div className="space-y-4">

//           <button
//             onClick={() => handleRegister("1_month")}
//             disabled={loading}
//             className="w-full border border-primary text-primary py-3 rounded-xl hover:bg-primary hover:text-white transition"
//           >
//             {loading
//               ? "Processing..."
//               : "₹199 — 1 Month (Intro Offer)"
//             }
//           </button>



//           <button
//             onClick={() => handleRegister("3_month")}
//             disabled={loading}
//             className="w-full bg-primary text-white py-3 rounded-xl hover:scale-[1.02] transition duration-300 disabled:opacity-60 relative"
//           >

//             <span className="absolute right-3 top-1 text-xs bg-yellow-400 text-black px-2 py-[2px] rounded">
//               BEST VALUE
//             </span>

//             {loading
//               ? "Processing..."
//               : "₹299 — 3 Months"
//             }

//           </button>

//         </div>

//       </div>

//     </div>

//   );

// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";
// import { LOCATIONS } from "../constants/locations";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export default function Register() {

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "renter",
//   });

//   const [stateValue, setStateValue] = useState("");
//   const [cityValue, setCityValue] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {

//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });

//   };



//   const handleRegister = async (plan: "1_month" | "3_month") => {

//     try {

//       if (
//         !form.name ||
//         !form.email ||
//         !form.password ||
//         !stateValue ||
//         !cityValue
//       ) {
//         alert("Please fill all fields");
//         return;
//       }

//       if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
//         alert("Payment configuration error");
//         return;
//       }

//       setLoading(true);

//       // store form data safely
//       const registerData = {
//         ...form,
//         state: stateValue,
//         city: cityValue,
//         acceptedTerms: true
//       };

//       // create order
//       const orderRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ plan })
//         }
//       );

//       if (!orderRes.ok) {
//         throw new Error("Order creation failed");
//       }

//       const orderData = await orderRes.json();

//       const options = {

//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

//         amount: orderData.amount,

//         currency: orderData.currency,

//         name: "Companio",

//         description: "Subscription Payment",

//         order_id: orderData.id,

//         prefill: {
//           name: form.name,
//           email: form.email
//         },

//   handler: async function (response: any) {

//   try {

//     const registerRes = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-paid`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           password: form.password,
//           role: form.role,
//           state: stateValue,
//           city: cityValue,
//           acceptedTerms: true,
//           razorpay_order_id: orderData.id,
//           razorpay_payment_id: response.razorpay_payment_id
//         })
//       }
//     );

//     const result = await registerRes.json();

//     if (registerRes.ok) {
//       alert("Registration successful!");
//       window.location.href = "/login";
//     } else {
//       alert(result.message || "Registration failed");
//     }

//   } catch (err) {
//     console.error("Register error:", err);
//     alert("Registration failed after payment");
//   }

// },

//         modal: {
//           ondismiss: () => setLoading(false)
//         },

//         theme: {
//           color: "#3E2C23"
//         }

//       };

//       if (!window.Razorpay) {
//         throw new Error("Razorpay SDK not loaded");
//       }

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     }

//     catch (error) {

//       console.error("Register error:", error);
//       alert("Something went wrong");
//       setLoading(false);

//     }

//   };



//   return (

//     <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">

//       <div className="mb-10 text-center">

//         <Link href="/">
//           <h1 className="text-3xl font-semibold tracking-tight text-primary hover:opacity-80 transition cursor-pointer">
//             Companio
//           </h1>
//         </Link>

//         <p className="text-sm text-muted mt-2">
//           Start your journey toward meaningful connection.
//         </p>

//       </div>

//       <div className="bg-card p-10 rounded-2xl shadow-soft w-full max-w-md space-y-6">

//         <h2 className="text-2xl font-semibold text-center">
//           Join Companio
//         </h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />

//         <div className="relative">

//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg pr-12"
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//           >
//             {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
//           </button>

//         </div>

//         <select
//           name="role"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         >
//           <option value="renter">I want companionship</option>
//           <option value="companion">I want to earn</option>
//         </select>

//         <select
//           value={stateValue}
//           onChange={(e) => {
//             setStateValue(e.target.value);
//             setCityValue("");
//           }}
//           className="w-full p-3 border rounded-lg"
//         >
//           <option value="">Select State</option>

//           {Object.keys(LOCATIONS).map((stateName) => (
//             <option key={stateName} value={stateName}>
//               {stateName}
//             </option>
//           ))}

//         </select>

//         <select
//           value={cityValue}
//           onChange={(e) => setCityValue(e.target.value)}
//           disabled={!stateValue}
//           className="w-full p-3 border rounded-lg"
//         >

//           <option value="">Select City</option>

//           {stateValue &&
//             LOCATIONS[stateValue as keyof typeof LOCATIONS].map((cityName) => (
//               <option key={cityName} value={cityName}>
//                 {cityName}
//               </option>
//             ))}

//         </select>

//         <p className="text-sm text-gray-500 text-center">
//           Choose your subscription plan
//         </p>

//         <div className="space-y-4">

//           <button
//             onClick={() => handleRegister("1_month")}
//             disabled={loading}
//             className="w-full border border-primary text-primary py-3 rounded-xl hover:bg-primary hover:text-white transition"
//           >
//             {loading ? "Processing..." : "₹199 — 1 Month (Intro Offer)"}
//           </button>

//           <button
//             onClick={() => handleRegister("3_month")}
//             disabled={loading}
//             className="w-full bg-primary text-white py-3 rounded-xl hover:scale-[1.02] transition duration-300 disabled:opacity-60 relative"
//           >

//             <span className="absolute right-3 top-1 text-xs bg-yellow-400 text-black px-2 py-[2px] rounded">
//               BEST VALUE
//             </span>

//             {loading ? "Processing..." : "₹299 — 3 Months"}

//           </button>

//         </div>

//       </div>

//     </div>

//   );

// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { LOCATIONS } from "../constants/locations";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "renter",
  });

  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (plan: "1_month" | "3_month") => {

    try {

      if (!form.name || !form.email || !form.password || !stateValue || !cityValue) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ plan })
        }
      );

      if (!orderRes.ok) {
        throw new Error("Order creation failed");
      }

      const orderData = await orderRes.json();

      const options = {

        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: orderData.amount,

        currency: orderData.currency,

        name: "Companio",

        description: "Subscription Payment",

        order_id: orderData.id,

        prefill: {
          name: form.name,
          email: form.email
        },

handler: async function (response: any) {

  try {

    const registerPayload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      state: stateValue,
      city: cityValue,
      acceptedTerms: true,

      // IMPORTANT
      razorpay_order_id: orderData.id,
      razorpay_payment_id: response.razorpay_payment_id
    };

    console.log("REGISTER PAYLOAD:", registerPayload);

    const registerRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-paid`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerPayload)
      }
    );

    const result = await registerRes.json();

    if (registerRes.ok) {
      alert("Registration successful!");
      window.location.href = "/login";
    } else {
      alert(result.message);
    }

  } catch (error) {

    console.error("Registration error:", error);
    alert("Registration failed after payment");

  }

},

        modal: {
          ondismiss: () => setLoading(false)
        }

      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      console.error(error);
      alert("Something went wrong");
      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 pt-15">

      <div className="mb-10 text-center">
        <Link href="/">
          <h1 className="text-3xl font-semibold tracking-tight text-primary">
            Companio
          </h1>
        </Link>
        <p className="text-sm text-muted mt-2">
          Start your journey toward meaningful connection.
        </p>
      </div>

      <div className="bg-card p-10 rounded-2xl shadow-soft w-full max-w-md space-y-6">

        <h2 className="text-2xl font-semibold text-center">
          Join Companio
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        </div>

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        >
          <option value="renter">I want companionship</option>
          <option value="companion">I want to earn</option>
        </select>

        <select
          value={stateValue}
          onChange={(e) => {
            setStateValue(e.target.value);
            setCityValue("");
          }}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select State</option>
          {Object.keys(LOCATIONS).map((stateName) => (
            <option key={stateName} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>

        <select
          value={cityValue}
          onChange={(e) => setCityValue(e.target.value)}
          disabled={!stateValue}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select City</option>
          {stateValue &&
            LOCATIONS[stateValue as keyof typeof LOCATIONS].map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
        </select>

        <button
          onClick={() => handleRegister("1_month")}
          disabled={loading}
          className="w-full border border-primary text-primary py-3 rounded-xl"
        >
          ₹199 — 1 Month
        </button>

        <button
          onClick={() => handleRegister("3_month")}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-xl"
        >
          ₹299 — 3 Months
        </button>


        <p className="text-xs text-gray-500 text-center mt-4">
  By creating an account you agree to the{" "}
  <a
    href="/terms"
    className="text-primary underline"
    target="_blank"
  >
    Terms & Conditions
  </a>
</p>

      </div>

    </div>

  );

}