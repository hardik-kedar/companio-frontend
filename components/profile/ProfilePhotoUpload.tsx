// "use client";

// import { useState } from "react";

// export default function ProfilePhotoUpload({ user, setUser }: any) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setSelectedFile(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     setLoading(true);
//     setMessage("");

//     try {
//       const formData = new FormData();
//       formData.append("image", selectedFile);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile-photo`,
//         {
//           method: "PUT",
//           credentials: "include",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Upload failed");
//       }

//       setUser(data);
//       setMessage("Profile photo updated successfully");
//       setSelectedFile(null);
//       setPreview(null);

//     } catch (error: any) {
//       setMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="border-t pt-8">
//       <h3 className="text-lg font-semibold mb-6">
//         Update Profile Photo
//       </h3>

//       {/* Current Photo */}
//       <div className="flex items-center gap-6 mb-6">
//         <div className="w-20 h-20 rounded-full overflow-hidden border">
//           {preview ? (
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-full h-full object-cover"
//             />
//           ) : user.profilePhoto ? (
//             <img
//               src={user.profilePhoto}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xl">
//               {user.name?.charAt(0)}
//             </div>
//           )}
//         </div>

//         <div>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="text-sm"
//           />

//           {selectedFile && (
//             <button
//               onClick={handleUpload}
//               disabled={loading}
//               className="block mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
//             >
//               {loading ? "Uploading..." : "Save Photo"}
//             </button>
//           )}
//         </div>
//       </div>

//       {message && (
//         <p className="text-sm text-gray-600">{message}</p>
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

export default function ProfilePhotoUpload({ user, setUser }: Props) {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

  };

  const handleUpload = async () => {

    if (!selectedFile) return;

    setLoading(true);
    setMessage("");

    try {

      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile-photo`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setUser(data);

      setMessage("Profile photo updated successfully");

      setSelectedFile(null);
      setPreview(null);

    } catch (err: any) {

      setMessage(err.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="border-t pt-8">

      <h3 className="text-lg font-semibold mb-6">
        Update Profile Photo
      </h3>

      <div className="flex items-center gap-6 mb-6">

        <div className="w-20 h-20 rounded-full overflow-hidden border">

          {preview ? (

            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />

          ) : user.profilePhoto ? (

            <img
              src={user.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />

          ) : (

            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xl">
              {user.name?.charAt(0)}
            </div>

          )}

        </div>

        <div>

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
              className="block mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Save Photo"}
            </button>

          )}

        </div>

      </div>

      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}

    </div>

  );

}