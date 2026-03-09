

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function Login() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

// const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");

//   try {
//     // 🔐 LOGIN (sets HTTP-only cookie)
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
//       {
//         method: "POST",
//         credentials: "include", // REQUIRED
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Login failed");
//     }

//     // 🔐 VERIFY USER FROM COOKIE
//     const userRes = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
//       {
//         method: "GET",
//         credentials: "include", // REQUIRED
//       }
//     );

//     const userData = await userRes.json();

//     if (!userRes.ok) {
//       throw new Error(userData.message || "Failed to fetch user");
//     }

//     // Role-based routing
//     switch (userData.role) {
//       case "admin":
//         router.push("/admin");
//         break;
//       case "companion":
//         router.push("/explore");

//         break;
//       default:
//         router.push("/explore");
//     }

//   } catch (err: any) {
//     setError(err.message || "Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">

//       {/* Brand */}
//       <div className="mb-10 text-center">
//         <Link href="/">
//           <h1 className="text-3xl font-semibold tracking-tight text-primary hover:opacity-80 transition cursor-pointer">
//             Companio
//           </h1>
//         </Link>
//         <p className="text-sm text-muted mt-2">
//           Feel connected. Without pressure.
//         </p>
//       </div>

//       {/* Card */}
//       <div className="w-full max-w-md bg-card rounded-3xl shadow-soft p-10">
        
//         <h2 className="text-2xl font-semibold text-center mb-8">
//           Welcome Back
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-5">

//           <div>
//             <label className="text-sm text-muted">Email</label>
//             <input
//               type="email"
//               required
//               className="w-full mt-2 p-3 rounded-xl border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-muted">Password</label>
//             <input
//               type="password"
//               required
//               className="w-full mt-2 p-3 rounded-xl border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm">{error}</p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-primary text-white py-3 rounded-xl hover:scale-[1.02] transition duration-300 disabled:opacity-60"
//           >
//             {loading ? "Signing in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-muted mt-6">
//           Don’t have an account?{" "}
//           <Link href="/register" className="text-primary underline">
//             Join Now
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");



  const handleLogin =
    async (
      e: React.FormEvent<HTMLFormElement>
    ) => {

      e.preventDefault();

      setLoading(true);
      setError("");

      try {

        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify({
                email,
                password
              })
            }
          );

        const data =
          await res.json();

        if (!res.ok) {

          throw new Error(
            data.message ||
            "Login failed"
          );

        }


        const userRes =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
            {
              method: "GET",
              credentials: "include"
            }
          );

        const userData =
          await userRes.json();

        if (!userRes.ok) {

          throw new Error(
            userData.message ||
            "Failed to fetch user"
          );

        }


        switch (userData.role) {

          case "admin":
            router.push("/admin");
            break;

          case "companion":
            router.push("/explore");
            break;

          default:
            router.push("/explore");

        }

      }

      catch (err: any) {

        setError(
          err.message ||
          "Something went wrong"
        );

      }

      finally {

        setLoading(false);

      }

    };



  return (

    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">

      {/* BRAND */}

      <div className="mb-10 text-center">

        <Link href="/">
          <h1 className="text-3xl font-semibold tracking-tight text-primary hover:opacity-80 transition cursor-pointer">
            Companio
          </h1>
        </Link>

        <p className="text-sm text-muted mt-2">
          Feel connected. Without pressure.
        </p>

      </div>



      {/* CARD */}

      <div className="w-full max-w-md bg-card rounded-3xl shadow-soft p-10">

        <h2 className="text-2xl font-semibold text-center mb-8">
          Welcome Back
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="text-sm text-muted">
              Email
            </label>

            <input
              type="email"
              required
              className="w-full mt-2 p-3 rounded-xl border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>



          {/* PASSWORD */}

          <div>

            <label className="text-sm text-muted">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                required
                className="w-full mt-2 p-3 pr-12 rounded-xl border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >

                {showPassword
                  ? <EyeOff size={20} />
                  : <Eye size={20} />
                }

              </button>

            </div>

          </div>



          {/* ERROR */}

          {error && (

            <p className="text-red-500 text-sm">
              {error}
            </p>

          )}



          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl hover:scale-[1.02] transition duration-300 disabled:opacity-60"
          >

            {loading
              ? "Signing in..."
              : "Login"
            }

          </button>

        </form>



        {/* REGISTER LINK */}

        <p className="text-center text-sm text-muted mt-6">

          Don’t have an account?{" "}

          <Link
            href="/register"
            className="text-primary underline"
          >
            Join Now
          </Link>

        </p>

      </div>

    </div>

  );

}