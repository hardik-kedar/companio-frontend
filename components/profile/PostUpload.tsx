// "use client";

// import { useState } from "react";

// export default function PostUpload({ user, setUser }: any) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setSelectedFile(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("image", selectedFile);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/user/posts`,
//         {
//           method: "POST",
//           credentials: "include",
//           body: formData,
//         }
//       );

//       if (!res.ok) {
//         const error = await res.json();
//         throw new Error(error.message || "Upload failed");
//       }

//       // Refetch profile
//       const profileRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
//         { credentials: "include" }
//       );

//       const updatedUser = await profileRes.json();
//       setUser(updatedUser);

//       setSelectedFile(null);
//       setPreview(null);

//     } catch (error: any) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="border-t pt-10">
//       <h3 className="text-lg font-semibold mb-6">Create Post</h3>

//       {preview && (
//         <div className="mb-4 w-40 aspect-square overflow-hidden rounded-lg">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="text-sm"
//       />

//       {selectedFile && (
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
//         >
//           {loading ? "Posting..." : "Post"}
//         </button>
//       )}
//     </div>
//   );
// }




"use client";

import { useState } from "react";

interface Props {
  user: any;
  setUser: (user: any) => void;
}

export default function PostUpload({ user, setUser }: Props) {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only images allowed");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

  };

  const handleUpload = async () => {

    if (!selectedFile) return;

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/posts`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      const profileRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
        { credentials: "include" }
      );

      const updatedUser = await profileRes.json();

      setUser(updatedUser);

      setSelectedFile(null);
      setPreview(null);

    } catch (err: any) {

      alert(err.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="border-t pt-10">

      <h3 className="text-lg font-semibold mb-6">
        Create Post
      </h3>

      {preview && (

        <div className="mb-4 w-40 aspect-square overflow-hidden rounded-lg">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>

      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm"
      />

      {selectedFile && (

        <button
          onClick={handleUpload}
          disabled={loading}
          className="block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>

      )}

    </div>

  );

}