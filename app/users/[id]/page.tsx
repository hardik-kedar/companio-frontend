// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import BookingModal from "@/components/BookingModal";

// function formatLastSeen(dateString?: string) {
//   if (!dateString) return "recently";

//   const now = new Date();
//   const last = new Date(dateString);

//   const diffMs = now.getTime() - last.getTime();
//   const diffMinutes = Math.floor(diffMs / (1000 * 60));
//   const diffHours = Math.floor(diffMinutes / 60);
//   const diffDays = Math.floor(diffHours / 24);

//   if (diffMinutes < 1) return "just now";
//   if (diffMinutes < 60) return `${diffMinutes} min ago`;
//   if (diffHours < 24) return `${diffHours} hr ago`;
//   if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

//   return last.toLocaleDateString();
// }

// export default function PublicProfilePage() {

//   const params = useParams();
//   const id = params?.id as string;

//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const [showBooking, setShowBooking] = useState(false);

//   useEffect(() => {

//     if (!id) return;

//     const fetchProfile = async () => {

//       try {

//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
//           {
//             credentials: "include"
//           }
//         );

//         if (!res.ok)
//           throw new Error();

//         const data = await res.json();

//         setUser(data);

//       }
//       catch {

//         console.error("Profile fetch failed");

//       }
//       finally {

//         setLoading(false);

//       }

//     };

//     fetchProfile();

//   }, [id]);


//   if (loading)
//     return (
//       <div className="p-10">
//         Loading...
//       </div>
//     );


//   if (!user)
//     return (
//       <div className="p-10">
//         Profile not found
//       </div>
//     );


//   return (

//     <div className="max-w-5xl mx-auto mt-28 px-6 pb-32 space-y-12">

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row gap-10">

//         {/* PHOTO */}
//         <div className="w-40 h-40 rounded-full overflow-hidden border">

//           <img
//             src={
//               user.profilePhoto
//               || "/default-avatar.png"
//             }
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />

//         </div>


//         {/* INFO */}
//         <div className="flex-1 space-y-3">

//           <h1 className="text-3xl font-semibold">
//             {user.name}
//           </h1>


//           <p className="text-gray-500 capitalize">
//             {user.role}
//           </p>


//           {/* LAST SEEN */}
//           <p className="text-sm text-gray-500">
//             Last seen {formatLastSeen(user.lastSeen)}
//           </p>


//           {/* LOCATION */}
//           {(user.city || user.state) && (

//             <p className="text-gray-600">

//               📍
//               {user.city || ""}
//               {user.city && user.state ? ", " : ""}
//               {user.state || ""}

//             </p>

//           )}


//           {/* STATS */}
//           <div className="flex gap-6 text-sm text-gray-600 flex-wrap">

//             <div>
//               ⭐ {user.averageRating?.toFixed(1) || 0}
//               {" "}
//               ({user.totalRatings || 0})
//             </div>


//             {user.subscription?.isActive && (

//               <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
//                 Active Subscription
//               </div>

//             )}

//           </div>


//           {/* PRICE */}
//           {user.role === "companion" && (

//             <div className="text-xl font-semibold mt-2">

//               ₹{user.pricePerHour || 0}
//               {" "}
//               / hour

//             </div>

//           )}


//           {/* BOOK BUTTON ONLY FOR COMPANIONS */}
//           {user.role === "companion" && (

//             <button
//               onClick={() =>
//                 setShowBooking(true)
//               }
//               className="bg-primary text-white px-6 py-3 rounded-xl mt-4 hover:opacity-90 transition"
//             >
//               Request Booking
//             </button>

//           )}

//         </div>

//       </div>


//       {/* ABOUT */}
//       <div>

//         <h2 className="text-xl font-semibold mb-4">
//           About
//         </h2>

//         <p className="text-gray-700 leading-relaxed">
//           {user.bio || "No bio available."}
//         </p>

//       </div>


//       {/* POSTS */}
//       {user.posts?.length > 0 && (

//         <div>

//           <h2 className="text-xl font-semibold mb-6">
//             Photos
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

//             {user.posts.map((post: any) => (

//               <div
//                 key={post._id}
//                 className="aspect-square overflow-hidden rounded-xl"
//               >

//                 <img
//                   src={post.imageUrl}
//                   alt=""
//                   className="w-full h-full object-cover"
//                 />

//               </div>

//             ))}

//           </div>

//         </div>

//       )}


//       {/* BOOKING MODAL */}
//       {showBooking && (
//   <BookingModal
//     companionId={user._id}
//     companionName={user.name}
//     pricePerHour={user.pricePerHour}
//     onClose={() => setShowBooking(false)}
//   />
// )}

//     </div>

//   );

// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingModal from "@/components/BookingModal";

function formatLastSeen(dateString?: string) {

  if (!dateString) return "recently";

  const now = new Date();
  const last = new Date(dateString);

  const diffMs = now.getTime() - last.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return last.toLocaleDateString();

}

export default function PublicProfilePage() {

  const params = useParams();
  const id = params?.id as string;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {

    if (!id) return;

    const fetchProfile = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
          { credentials: "include" }
        );

        if (!res.ok)
          throw new Error();

        const data = await res.json();

        setUser(data);

      }
      catch {

        console.error("Profile fetch failed");

      }
      finally {

        setLoading(false);

      }

    };

    fetchProfile();

  }, [id]);

  if (loading)
    return <div className="p-10">Loading profile...</div>;

  if (!user)
    return <div className="p-10">Profile not found</div>;

  return (

    <div className="max-w-5xl mx-auto mt-28 px-6 pb-32 space-y-12">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row gap-10">

        {/* PHOTO */}

        <div className="w-40 h-40 rounded-full overflow-hidden border">

          <img
            src={
              user.profilePhoto ||
              "/default-avatar.png"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />

        </div>

        {/* INFO */}

        <div className="flex-1 space-y-3">

          <h1 className="text-3xl font-semibold">
            {user.name}
          </h1>

          <p className="text-gray-500 capitalize">
            {user.role}
          </p>

          <p className="text-sm text-gray-500">
            Last seen {formatLastSeen(user.lastSeen)}
          </p>

          {(user.city || user.state) && (

            <p className="text-gray-600">

              📍
              {user.city || ""}
              {user.city && user.state ? ", " : ""}
              {user.state || ""}

            </p>

          )}

          {/* STATS */}

          <div className="flex gap-6 text-sm text-gray-600 flex-wrap">

            <div>
              ⭐ {user.averageRating?.toFixed(1) || 0}
              {" "}
              ({user.totalRatings || 0})
            </div>

            {user.subscription?.isActive && (

              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                Active Subscription
              </div>

            )}

          </div>

          {/* PRICE */}

          {user.role === "companion" && (

            <div className="text-xl font-semibold mt-2">
              ₹{user.pricePerHour || 0} / hour
            </div>

          )}

          {/* BOOK BUTTON */}

          {user.role === "companion" && (

            <button
              onClick={() => setShowBooking(true)}
              className="bg-primary text-white px-6 py-3 rounded-xl mt-4 hover:opacity-90 transition"
            >
              Request Booking
            </button>

          )}

        </div>

      </div>


      {/* ABOUT */}

      <div>

        <h2 className="text-xl font-semibold mb-4">
          About
        </h2>

        <p className="text-gray-700 leading-relaxed">
          {user.bio || "No bio available."}
        </p>

      </div>


      {/* PHOTOS */}

      {user.posts?.length > 0 && (

        <div>

          <h2 className="text-xl font-semibold mb-6">
            Photos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

            {user.posts.map((post: any) => (

              <div
                key={post._id}
                className="aspect-square overflow-hidden rounded-xl"
              >

                <img
                  src={post.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />

              </div>

            ))}

          </div>

        </div>

      )}

      {/* REVIEWS */}

      {user.reviews?.length > 0 && (

        <div>

          <h2 className="text-xl font-semibold mb-6">
            Reviews
          </h2>

          <div className="space-y-4">

            {user.reviews.map((r: any) => (

              <div
                key={r._id}
                className="border rounded-xl p-4"
              >

                <p className="font-semibold">
                  ⭐ {r.rating}
                </p>

                <p className="text-gray-600 text-sm">
                  {r.comment}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* BOOKING MODAL */}

      {showBooking && (

        <BookingModal
          companionId={user._id}
          companionName={user.name}
          pricePerHour={user.pricePerHour}
          onClose={() => setShowBooking(false)}
        />

      )}

    </div>

  );

}