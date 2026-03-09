// "use client";

// import { useEffect, useState } from "react";
// import ProfileHeader from "@/components/profile/ProfileHeader";
// import EditProfileForm from "@/components/profile/EditProfileForm";
// import ProfilePhotoUpload from "@/components/profile/ProfilePhotoUpload";
// import PostUpload from "@/components/profile/PostUpload";
// import PostGrid from "@/components/profile/PostGrid";
// import EnablePushButton from "@/components/EnablePushButton";

// interface User {
//   role: string;
//   bio?: string;
//   city?: string;
//   state?: string;
//   pricePerHour?: number;
//   averageRating?: number;
//   totalRatings?: number;
//   bookingCount?: number;
//   posts: any[];
//   subscription?: { isActive: boolean };
//   profileCompletion?: number;
// }

// export default function ProfilePage() {

//   const [user, setUser] =
//     useState<User | null>(null);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {

//     const fetchProfile = async () => {

//       try {

//         const res =
//           await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
//             { credentials: "include" }
//           );

//         const data =
//           await res.json();

//         setUser(data);

//       }
//       catch {

//         console.error(
//           "Failed to load profile"
//         );

//       }
//       finally {

//         setLoading(false);

//       }

//     };

//     fetchProfile();

//   }, []);

//   if (loading)
//     return <div className="p-10">Loading...</div>;

//   if (!user)
//     return <div className="p-10">Not authorized</div>;

//   return (

//     <div className="max-w-4xl mx-auto mt-28 px-6 space-y-10 pb-32">

//       {/* HEADER */}
//       <ProfileHeader user={user} setUser={setUser} />



//       {/* PROFILE COMPLETION */}
//       {user?.role === "companion" &&
//         typeof user?.profileCompletion === "number" &&
//         user.profileCompletion < 100 && (

//         <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">

//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

//             <div>

//               <p className="font-semibold text-yellow-800">
//                 Complete your profile to appear in Explore
//               </p>

//               <p className="text-sm text-yellow-700">
//                 Profile completion: {user.profileCompletion}%
//               </p>

//             </div>

//             <div className="w-full sm:w-40 bg-yellow-200 rounded-full h-2 overflow-hidden">

//               <div
//                 className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
//                 style={{
//                   width: `${Math.min(
//                     user.profileCompletion,
//                     100
//                   )}%`
//                 }}
//               />

//             </div>

//           </div>

//         </div>

//       )}



//       {/* STATS */}
//       <div className="flex gap-6 text-sm text-gray-600 flex-wrap">

//         <div>
//           ⭐ {user.averageRating?.toFixed(1) || 0}
//           ({user.totalRatings || 0})
//         </div>

//         <div>
//           📅 {user.bookingCount || 0} bookings
//         </div>

//         {user.subscription?.isActive && (

//           <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
//             Active Subscription
//           </div>

//         )}

//       </div>



//       {/* BIO */}
//       <div>

//         <h3 className="font-semibold mb-2">
//           About
//         </h3>

//         <p className="text-gray-700">
//           {user.bio || "No bio added yet."}
//         </p>

//         {(user.city || user.state) && (

//           <p className="text-gray-600 mt-2">
//             📍 {user.city ?? ""}
//             {user.city && user.state ? ", " : ""}
//             {user.state ?? ""}
//           </p>

//         )}

//       </div>



//       {/* PRICE */}
//       {user.role === "companion" && (

//         <div>

//           <h3 className="font-semibold mb-2">
//             Price
//           </h3>

//           <p className="text-lg font-medium">
//             ₹{user.pricePerHour || 0} / hour
//           </p>

//         </div>

//       )}



//       {/* NOTIFICATIONS */}
//       <div className="mt-8 border-t pt-6">

//         <h2 className="text-lg font-semibold mb-4">
//           Notifications
//         </h2>

//         <EnablePushButton />

//       </div>



//       {/* EDIT PROFILE SECTION */}
//       <div className="border-t pt-8">

//         <div className="flex items-center justify-between mb-4">

//           <h2 className="text-lg font-semibold">
//             Profile Settings
//           </h2>

//           <span className="text-xs text-gray-400">
//             Update your info
//           </span>

//         </div>

//         <EditProfileForm user={user} setUser={setUser} />

//       </div>



//       {/* PROFILE PHOTO */}
//       <div className="border-t pt-8">

//         <div className="flex items-center justify-between mb-4">

//           <h2 className="text-lg font-semibold">
//             Profile Photo
//           </h2>

//           <span className="text-xs text-gray-400">
//             Update avatar
//           </span>

//         </div>

//         <ProfilePhotoUpload user={user} setUser={setUser} />

//       </div>



//       {/* POST UPLOAD */}
//       <div className="border-t pt-8">

//         <div className="flex items-center justify-between mb-4">

//           <h2 className="text-lg font-semibold">
//             Add New Post
//           </h2>

//           <span className="text-xs text-gray-400">
//             Showcase photos
//           </span>

//         </div>

//         <PostUpload user={user} setUser={setUser} />

//       </div>



//       {/* POSTS GRID */}
//       <div className="border-t pt-8">

//         <h2 className="text-lg font-semibold mb-4">
//           Your Posts
//         </h2>

//         <PostGrid posts={user.posts} setUser={setUser} />

//       </div>

//     </div>

//   );

// }












"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ProfilePhotoUpload from "@/components/profile/ProfilePhotoUpload";
import PostUpload from "@/components/profile/PostUpload";
import PostGrid from "@/components/profile/PostGrid";
import EnablePushButton from "@/components/EnablePushButton";


// interface User {
//   name?: string;
//   role: "renter" | "companion" | "admin";

//   bio?: string;
//   city?: string;
//   state?: string;

//   pricePerHour?: number;

//   averageRating?: number;
//   totalRatings?: number;
//   bookingCount?: number;

//   posts?: any[];

//   subscription?: {
//     isActive?: boolean;
//   };

//   profileCompletion?: number;
// }

interface User {
  name: string;
  role: string;
  profilePhoto?: string;

  bio?: string;
  city?: string;
  state?: string;
  pricePerHour?: number;

  averageRating?: number;
  totalRatings?: number;
  bookingCount?: number;

  posts: any[];

  subscription?: { isActive: boolean };
  profileCompletion?: number;
}


export default function ProfilePage() {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

 const fetchProfile = async () => {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
      { credentials: "include" }
    );

    const text = await res.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(text || "Invalid server response");
    }

    if (!res.ok) {
      throw new Error(
        data?.message || "Failed to load profile"
      );
    }

    setUser(data);

  }
  catch (err) {

    console.error(
      "Failed to load profile",
      err
    );

  }
  finally {

    setLoading(false);

  }

};
    fetchProfile();

  }, []);

  if (loading)
    return <div className="p-10">Loading...</div>;

  if (!user)
    return <div className="p-10">Not authorized</div>;

  return (

    <div className="max-w-4xl mx-auto mt-28 px-6 space-y-10 pb-32">

      {/* HEADER */}
      <ProfileHeader user={user!} setUser={setUser} />

      {/* PROFILE COMPLETION */}
      {user?.role === "companion" &&
        typeof user?.profileCompletion === "number" &&
        user.profileCompletion < 100 && (

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>

              <p className="font-semibold text-yellow-800">
                Complete your profile to appear in Explore
              </p>

              <p className="text-sm text-yellow-700">
                Profile completion: {user.profileCompletion}%
              </p>

            </div>

            <div className="w-full sm:w-40 bg-yellow-200 rounded-full h-2 overflow-hidden">

              <div
                className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    user.profileCompletion,
                    100
                  )}%`
                }}
              />

            </div>

          </div>

        </div>

      )}

      {/* STATS */}
      <div className="flex gap-6 text-sm text-gray-600 flex-wrap">

        <div>
          ⭐ {user.averageRating?.toFixed(1) || 0}
          ({user.totalRatings || 0})
        </div>

        <div>
          📅 {user.bookingCount || 0} bookings
        </div>

        {user.subscription?.isActive && (

          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
            Active Subscription
          </div>

        )}

      </div>

      {/* BIO */}
      <div>

        <h3 className="font-semibold mb-2">
          About
        </h3>

        <p className="text-gray-700">
          {user.bio || "No bio added yet."}
        </p>

        {(user.city || user.state) && (

          <p className="text-gray-600 mt-2">
            📍 {user.city ?? ""}
            {user.city && user.state ? ", " : ""}
            {user.state ?? ""}
          </p>

        )}

      </div>

      {/* PRICE */}
      {user.role === "companion" && (

        <div>

          <h3 className="font-semibold mb-2">
            Price
          </h3>

          <p className="text-lg font-medium">
            ₹{user.pricePerHour || 0} / hour
          </p>

        </div>

      )}

      {/* NOTIFICATIONS */}
      <div className="mt-8 border-t pt-6">

        <h2 className="text-lg font-semibold mb-4">
          Notifications
        </h2>

        <EnablePushButton />

      </div>

      {/* EDIT PROFILE */}
      <div className="border-t pt-8">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-lg font-semibold">
            Profile Settings
          </h2>

          <span className="text-xs text-gray-400">
            Update your info
          </span>

        </div>

        <EditProfileForm user={user!} setUser={setUser} />

      </div>

      {/* PROFILE PHOTO */}
      <div className="border-t pt-8">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-lg font-semibold">
            Profile Photo
          </h2>

          <span className="text-xs text-gray-400">
            Update avatar
          </span>

        </div>

        <ProfilePhotoUpload user={user!} setUser={setUser} />

      </div>

      {/* POST UPLOAD */}
      <div className="border-t pt-8">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-lg font-semibold">
            Add New Post
          </h2>

          <span className="text-xs text-gray-400">
            Showcase photos
          </span>

        </div>

        <PostUpload user={user!} setUser={setUser} />

      </div>

      {/* POSTS GRID */}
      <div className="border-t pt-8">

        <h2 className="text-lg font-semibold mb-4">
          Your Posts
        </h2>

        <PostGrid posts={user?.posts || []} setUser={setUser} />

      </div>

    </div>

  );

}