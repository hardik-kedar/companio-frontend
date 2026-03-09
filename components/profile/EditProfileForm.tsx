// "use client";

// import { useState } from "react";

// interface User {
//   name: string;
//   bio?: string;
//   role: "renter" | "companion" | "admin";
//   pricePerHour?: number;
// }

// interface Props {
//   user: User;
//   setUser: (user: User) => void;
// }

// export default function EditProfileForm({ user, setUser }: Props) {

//   const [name, setName] = useState(user.name || "");
//   const [bio, setBio] = useState(user.bio || "");
//   const [price, setPrice] = useState<number>(user.pricePerHour || 0);

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {

//     e.preventDefault();

//     setLoading(true);
//     setError("");
//     setSuccess(false);

//     try {

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
//         {
//           method: "PUT",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name,
//             bio,
//             pricePerHour:
//               user.role === "companion"
//                 ? price
//                 : undefined,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.message || "Update failed"
//         );
//       }

//       /*
//       IMPORTANT FIX
//       Backend returns:
//       { message, user }
//       */

//       if (data.user) {
//         setUser(data.user);
//       }

//       setSuccess(true);

//     } catch (err: any) {

//       setError(
//         err?.message || "Something went wrong"
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (

//     <div className="border-t pt-8">

//       <h3 className="text-lg font-semibold mb-6">
//         Edit Profile
//       </h3>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-5"
//       >

//         {/* Name */}

//         <div>

//           <label className="block text-sm font-medium mb-1">
//             Name
//           </label>

//           <input
//             type="text"
//             value={name}
//             onChange={(e) =>
//               setName(e.target.value)
//             }
//             required
//             className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//           />

//         </div>


//         {/* Bio */}

//         <div>

//           <label className="block text-sm font-medium mb-1">
//             Bio
//           </label>

//           <textarea
//             value={bio}
//             rows={3}
//             onChange={(e) =>
//               setBio(e.target.value)
//             }
//             className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//           />

//         </div>


//         {/* Companion Price */}

//         {user.role === "companion" && (

//           <div>

//             <label className="block text-sm font-medium mb-1">
//               Price Per Hour (₹)
//             </label>

//             <input
//               type="number"
//               min={0}
//               value={price}
//               onChange={(e) =>
//                 setPrice(Number(e.target.value))
//               }
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//             />

//           </div>

//         )}


//         {/* Errors */}

//         {error && (

//           <p className="text-red-500 text-sm">
//             {error}
//           </p>

//         )}


//         {/* Success */}

//         {success && (

//           <p className="text-green-600 text-sm">
//             Profile updated successfully
//           </p>

//         )}


//         {/* Button */}

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
//         >

//           {loading
//             ? "Saving..."
//             : "Save Changes"}

//         </button>

//       </form>

//     </div>

//   );

// }



"use client";

import { useState } from "react";

interface User {
  name?: string;
  bio?: string;
  role: "renter" | "companion" | "admin";
  pricePerHour?: number;
}

interface Props {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function EditProfileForm({ user, setUser }: Props) {

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [price, setPrice] = useState<number>(user.pricePerHour || 0);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            bio,
            pricePerHour:
              user.role === "companion"
                ? price
                : undefined,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Update failed"
        );
      }

      if (data.user) {
        setUser(data.user);
      }

      setSuccess(true);

    } catch (err: any) {

      setError(
        err?.message || "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="border-t pt-8">

      <h3 className="text-lg font-semibold mb-6">
        Edit Profile
      </h3>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="block text-sm font-medium mb-1">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Bio
          </label>

          <textarea
            value={bio}
            rows={3}
            onChange={(e) =>
              setBio(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

        </div>

        {user.role === "companion" && (

          <div>

            <label className="block text-sm font-medium mb-1">
              Price Per Hour (₹)
            </label>

            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) =>
                setPrice(Number(e.target.value))
              }
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

          </div>

        )}

        {error && (

          <p className="text-red-500 text-sm">
            {error}
          </p>

        )}

        {success && (

          <p className="text-green-600 text-sm">
            Profile updated successfully
          </p>

        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >

          {loading
            ? "Saving..."
            : "Save Changes"}

        </button>

      </form>

    </div>

  );

}