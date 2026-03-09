// // "use client";

// // export default function PostGrid({ posts = [] }: any) {
// //   if (!posts.length) {
// //     return (
// //       <div className="border-t pt-10">
// //         <h3 className="text-lg font-semibold mb-4">Posts</h3>
// //         <p className="text-gray-500">
// //           No posts yet. Upload your first post above.
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="border-t pt-10">
// //       <h3 className="text-lg font-semibold mb-6">Posts</h3>

// //       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// //         {posts.map((post: any) => (
// //           <div
// //             key={post._id}
// //             className="aspect-square overflow-hidden rounded-xl"
// //           >
// //             <img
// //               src={post.imageUrl}
// //               alt="Post"
// //               className="w-full h-full object-cover hover:scale-105 transition"
// //             />
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";

// export default function PostGrid({ posts = [], setUser }: any) {
//   const [loadingId, setLoadingId] = useState<string | null>(null);

//   const handleDelete = async (postId: string) => {
//     try {
//       setLoadingId(postId);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/user/posts/${postId}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         }
//       );

//       if (!res.ok) {
//         const error = await res.json();
//         throw new Error(error.message || "Delete failed");
//       }

//       const data = await res.json();

//       // Update posts instantly
//       setUser((prev: any) => ({
//         ...prev,
//         posts: data.posts,
//       }));

//     } catch (error: any) {
//       alert(error.message);
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   if (!posts.length) {
//     return (
//       <div className="border-t pt-10">
//         <h3 className="text-lg font-semibold mb-4">Posts</h3>
//         <p className="text-gray-500">
//           No posts yet. Upload your first post above.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="border-t pt-10">
//       <h3 className="text-lg font-semibold mb-6">Posts</h3>

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {posts.map((post: any) => (
//           <div
//             key={post._id}
//             className="relative group aspect-square overflow-hidden rounded-xl"
//           >
//             <img
//               src={post.imageUrl}
//               alt="Post"
//               className="w-full h-full object-cover"
//             />

//             {/* Hover Overlay */}
//             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

//               <button
//                 onClick={() => handleDelete(post._id)}
//                 disabled={loadingId === post._id}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
//               >
//                 {loadingId === post._id ? "Deleting..." : "Delete"}
//               </button>

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";

interface Post {
  _id: string;
  imageUrl: string;
}

interface Props {
  posts: Post[];
  setUser: (update: any) => void;
}

export default function PostGrid({ posts = [], setUser }: Props) {

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (postId: string) => {

    if (!confirm("Delete this post?")) return;

    try {

      setLoadingId(postId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setUser((prev: any) => ({
        ...prev,
        posts: data.posts,
      }));

    } catch (err: any) {

      alert(err.message);

    } finally {

      setLoadingId(null);

    }

  };

  if (!posts.length) {
    return (
      <div className="border-t pt-10">
        <h3 className="text-lg font-semibold mb-4">Posts</h3>
        <p className="text-gray-500">
          No posts yet. Upload your first post above.
        </p>
      </div>
    );
  }

  return (

    <div className="border-t pt-10">

      <h3 className="text-lg font-semibold mb-6">Posts</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {posts.map((post) => (

          <div
            key={post._id}
            className="relative group aspect-square overflow-hidden rounded-xl"
          >

            <img
              src={post.imageUrl}
              alt="Post"
              loading="lazy"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

              <button
                onClick={() => handleDelete(post._id)}
                disabled={loadingId === post._id}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
              >
                {loadingId === post._id ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}