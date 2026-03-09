
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { apiFetch } from "@/lib/api";

// interface User {
//   _id: string;
//   name: string;
//   role: string;
//   bio?: string;
//   pricePerHour?: number;
//   city?: string;
//   state?: string;
// }

// export default function ExplorePage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedCity, setSelectedCity] = useState("All");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await apiFetch(
//           `/api/explore/list?city=${selectedCity}`
//         );
//         const data = await res.json();
//         setUsers(data.users);
//       } catch (error) {
//         console.error("Explore fetch error:", error);
//       }
//     };

//     fetchUsers();
//   }, [selectedCity]);

//   return (
//     <div className="min-h-screen bg-background pt-28 px-6">

//       <div className="max-w-6xl mx-auto">

//         <h2 className="text-2xl font-semibold mb-6">
//           People Near You
//         </h2>

//         {/* CITY FILTER */}
//         <div className="mb-8">
//           <select
//             value={selectedCity}
//             onChange={(e) => setSelectedCity(e.target.value)}
//             className="border p-3 rounded-lg"
//           >
//             <option value="All">All Cities</option>
//             <option value="Indore">Indore</option>
//             <option value="Bhopal">Bhopal</option>
//             <option value="Dewas">Dewas</option>
//           </select>
//         </div>

//         <div className="grid gap-6">
//           {users.map((user) => (
//             <Link key={user._id} href={`/users/${user._id}`}>
//               <div className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-lg transition cursor-pointer">
//                 <div className="flex justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold">
//                       {user.name}
//                     </h3>

//                     <p className="text-sm text-muted capitalize">
//                       {user.role}
//                     </p>

//                     {(user.city || user.state) && (
//                       <p className="text-sm text-gray-500 mt-1">
//                         📍 {user.city}, {user.state}
//                       </p>
//                     )}
//                   </div>

//                   {user.pricePerHour && (
//                     <p className="font-semibold text-primary">
//                       ₹{user.pricePerHour}/hr
//                     </p>
//                   )}
//                 </div>

//                 {user.bio && (
//                   <p className="text-sm text-muted mt-3">
//                     {user.bio}
//                   </p>
//                 )}
//               </div>
//             </Link>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { LOCATIONS } from "../constants/locations";

interface User {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  pricePerHour?: number;
  city?: string;
  state?: string;
  profilePhoto?: string;
  averageRating?: number;
  totalRatings?: number;
}

export default function ExplorePage() {
  const [selectedState, setSelectedState] = useState("All");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await apiFetch(
          `/api/explore/list?city=${selectedCity}&page=${page}&limit=9`
        );

        const data = await res.json();

        setUsers(data.users || []);
        setTotalPages(data.pagination?.totalPages || 1);

      } catch (error) {
        console.error("Explore fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedCity, page]);

  // Reset page when city changes
  useEffect(() => {
    setPage(1);
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-background pt-28 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-2xl font-semibold mb-6">
          People Near You
        </h2>

        {/* CITY FILTER */}
        <div className="mb-8">

<select
  value={selectedState}
  onChange={(e) => setSelectedState(e.target.value)}
  className="border p-3 rounded-lg"
>

<option value="All">All States</option>

{Object.keys(LOCATIONS).map((state) => (

<option key={state} value={state}>
{state}
</option>

))}

</select>

</div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading users...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && users.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No users found.
          </div>
        )}

        {/* GRID */}
        {!loading && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {users.map((user) => (
              <Link key={user._id} href={`/users/${user._id}`}>
                <div className="bg-card rounded-2xl shadow-soft hover:shadow-xl transition cursor-pointer overflow-hidden">

                  {/* PROFILE IMAGE */}
                  <div className="h-56 w-full overflow-hidden bg-gray-100">
                    <img
                      src={user.profilePhoto || "/default-avatar.png"}
                      alt={user.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* CARD CONTENT */}
                  <div className="p-5">

                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {user.name}
                        </h3>

                        <p className="text-sm text-muted capitalize">
                          {user.role}
                        </p>

                        {(user.city || user.state) && (
                          <p className="text-sm text-gray-500 mt-1">
                            📍 {user.city}
                            {user.city && user.state ? ", " : ""}
                            {user.state}
                          </p>
                        )}
                      </div>

                      {user.pricePerHour && user.pricePerHour > 0 && (
                        <p className="font-semibold text-primary">
                          ₹{user.pricePerHour}/hr
                        </p>
                      )}
                    </div>

                    {user.bio && (
                      <p className="text-sm text-muted mt-3 line-clamp-2">
                        {user.bio}
                      </p>
                    )}

                    <div className="mt-4 text-sm text-gray-600">
                      ⭐ {user.averageRating?.toFixed(1) || 0} (
                      {user.totalRatings || 0})
                    </div>

                  </div>
                </div>
              </Link>
            ))}

          </div>
        )}

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">

            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </div>
  );
}