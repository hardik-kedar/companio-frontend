// "use client";

// export default function ProfileHeader({ user }: any) {
//   return (
//     <div className="flex items-center gap-6">

//       {/* Profile Image */}
//       <div className="w-24 h-24 rounded-full overflow-hidden border">
//         {user.profilePhoto ? (
//           <img
//             src={user.profilePhoto}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-200 text-2xl">
//             {user.name?.charAt(0)}
//           </div>
//         )}
//       </div>

//       {/* Name + Role */}
//       <div>
//         <h2 className="text-2xl font-semibold">{user.name}</h2>
//         <p className="text-sm text-gray-500 capitalize">{user.role}</p>
//       </div>

//     </div>
//   );
// }
"use client";

interface Props {
  user: {
    name: string;
    role: string;
    profilePhoto?: string;
  };
  setUser?: any;
}

export default function ProfileHeader({ user }: Props) {

  return (

    <div className="flex items-center gap-6">

      <div className="w-24 h-24 rounded-full overflow-hidden border">

        {user.profilePhoto ? (

          <img
            src={user.profilePhoto}
            alt="Profile"
            className="w-full h-full object-cover"
          />

        ) : (

          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-2xl">
            {user.name?.charAt(0)}
          </div>

        )}

      </div>

      <div>

        <h2 className="text-2xl font-semibold">
          {user.name}
        </h2>

        <p className="text-sm text-gray-500 capitalize">
          {user.role}
        </p>

      </div>

    </div>

  );

}