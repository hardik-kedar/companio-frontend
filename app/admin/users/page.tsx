

// "use client";

// import { useEffect, useState } from "react";

// export default function AdminUsers() {
//   const [users, setUsers] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState("");

//   const limit = 5;

//   const fetchUsers = async (pageNumber = 1, searchValue = search) => {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?page=${pageNumber}&limit=${limit}&search=${searchValue}`,
//       { credentials: "include" }
//     );

//     const data = await res.json();

//     setUsers(data.users);
//     setTotalPages(data.totalPages);
//     setPage(data.currentPage);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const action = async (url: string, method = "POST", body?: any) => {
//     await fetch(url, {
//       method,
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: body ? JSON.stringify(body) : undefined,
//     });

//     fetchUsers(page);
//   };

//   const confirmAction = (message: string, callback: () => void) => {
//     if (window.confirm(message)) {
//       callback();
//     }
//   };

//   const handleSearch = () => {
//     fetchUsers(1, search);
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">User Management</h1>

//       {/* Search */}
//       <div className="mb-6 flex gap-2">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           className="border px-4 py-2 rounded w-full"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-black text-white px-6 rounded"
//         >
//           Search
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-xl shadow border bg-white">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">Role</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-t">
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3 capitalize">{user.role}</td>

//                 {/* Status */}
//                 <td className="p-3 space-x-2">
//                   {user.isBanned && (
//                     <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
//                       Banned
//                     </span>
//                   )}
//                   {user.isSuspended && (
//                     <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
//                       Suspended
//                     </span>
//                   )}
//                   {user.role === "companion" && !user.isApproved && (
//                     <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
//                       Pending
//                     </span>
//                   )}
//                 </td>

//                 {/* Actions */}
//                 <td className="p-3 space-x-2">

//                   {/* Ban / Unban */}
//                   {user.isBanned ? (
//                     <button
//                       onClick={() =>
//                         confirmAction("Unban user?", () =>
//                           action(
//                             `${process.env.NEXT_PUBLIC_API_URL}/api/admin/unban/${user._id}`
//                           )
//                         )
//                       }
//                       className="bg-green-600 text-white px-3 py-1 rounded"
//                     >
//                       Unban
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() =>
//                         confirmAction("Ban user?", () =>
//                           action(
//                             `${process.env.NEXT_PUBLIC_API_URL}/api/admin/ban/${user._id}`
//                           )
//                         )
//                       }
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       Ban
//                     </button>
//                   )}

//                   {/* Suspend */}
//                   <button
//                     onClick={() =>
//                       confirmAction("Suspend user for 7 days?", () =>
//                         action(
//                           `${process.env.NEXT_PUBLIC_API_URL}/api/admin/suspend/${user._id}`,
//                           "POST",
//                           { days: 7 }
//                         )
//                       )
//                     }
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Suspend
//                   </button>

//                   {/* Delete */}
//                   <button
//                     onClick={() =>
//                       confirmAction("Delete user permanently?", () =>
//                         action(
//                           `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/${user._id}`,
//                           "DELETE"
//                         )
//                       )
//                     }
//                     className="bg-gray-700 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>

//                   {/* Approve */}
//                   {user.role === "companion" && !user.isApproved && (
//                     <button
//                       onClick={() =>
//                         action(
//                           `${process.env.NEXT_PUBLIC_API_URL}/api/admin/approve/${user._id}`
//                         )
//                       }
//                       className="bg-blue-600 text-white px-3 py-1 rounded"
//                     >
//                       Approve
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center gap-4 mt-6">
//         <button
//           disabled={page === 1}
//           onClick={() => fetchUsers(page - 1)}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <span>
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => fetchUsers(page + 1)}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

interface User {
  _id: string;
  name: string;
  email: string;
  role: "renter" | "companion" | "admin";
  isBanned: boolean;
  isSuspended: boolean;
  isApproved: boolean;
}

interface ApiResponse {
  users: User[];
  totalPages: number;
  currentPage: number;
}

export default function AdminUsers() {

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const limit = 5;

  /*
  ===============================
  FETCH USERS
  ===============================
  */

  const fetchUsers = async (
    pageNumber = 1,
    searchValue = search
  ) => {

    try {

      setLoading(true);

      const res = await fetch(
        `${API}/api/admin/users?page=${pageNumber}&limit=${limit}&search=${searchValue}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error();

      const data: ApiResponse = await res.json();

      setUsers(data.users);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);

    } catch {

      alert("Failed to load users");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /*
  ===============================
  ADMIN ACTION
  ===============================
  */

  const action = async (
    url: string,
    method = "POST",
    body?: any
  ) => {

    try {

      setActionLoading(url);

      await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
      });

      fetchUsers(page);

    } catch {

      alert("Action failed");

    } finally {

      setActionLoading(null);

    }

  };

  const confirmAction = (
    message: string,
    callback: () => void
  ) => {

    if (window.confirm(message)) {
      callback();
    }

  };

  const handleSearch = () => {
    fetchUsers(1, search);
  };

  /*
  ===============================
  UI
  ===============================
  */

  return (

    <div className="max-w-6xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        User Management
      </h1>

      {/* SEARCH */}

      <div className="mb-6 flex gap-2">

        <input
          type="text"
          placeholder="Search by name or email..."
          className="border px-4 py-2 rounded w-full"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          onClick={handleSearch}
          className="bg-black text-white px-6 rounded"
        >
          Search
        </button>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto rounded-xl shadow border bg-white">

        {loading ? (

          <div className="p-6 text-center">
            Loading users...
          </div>

        ) : (

          <table className="min-w-full text-sm">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user._id} className="border-t">

                  <td className="p-3">{user.name}</td>

                  <td className="p-3">{user.email}</td>

                  <td className="p-3 capitalize">
                    {user.role}
                  </td>

                  {/* STATUS */}

                  <td className="p-3 space-x-2">

                    {user.isBanned && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                        Banned
                      </span>
                    )}

                    {user.isSuspended && (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                        Suspended
                      </span>
                    )}

                    {user.role === "companion" && !user.isApproved && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        Pending
                      </span>
                    )}

                  </td>

                  {/* ACTIONS */}

                  <td className="p-3 space-x-2">

                    {/* BAN / UNBAN */}

                    {user.isBanned ? (

                      <button
                        disabled={!!actionLoading}
                        onClick={() =>
                          confirmAction(
                            "Unban user?",
                            () =>
                              action(
                                `${API}/api/admin/unban/${user._id}`
                              )
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Unban
                      </button>

                    ) : (

                      <button
                        disabled={!!actionLoading}
                        onClick={() =>
                          confirmAction(
                            "Ban user?",
                            () =>
                              action(
                                `${API}/api/admin/ban/${user._id}`
                              )
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Ban
                      </button>

                    )}

                    {/* SUSPEND */}

                    <button
                      disabled={!!actionLoading}
                      onClick={() =>
                        confirmAction(
                          "Suspend user for 7 days?",
                          () =>
                            action(
                              `${API}/api/admin/suspend/${user._id}`,
                              "POST",
                              { days: 7 }
                            )
                        )
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Suspend
                    </button>

                    {/* DELETE */}

                    <button
                      disabled={!!actionLoading}
                      onClick={() =>
                        confirmAction(
                          "Delete user permanently?",
                          () =>
                            action(
                              `${API}/api/admin/user/${user._id}`,
                              "DELETE"
                            )
                        )
                      }
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                    {/* APPROVE */}

                    {user.role === "companion" &&
                      !user.isApproved && (

                        <button
                          disabled={!!actionLoading}
                          onClick={() =>
                            action(
                              `${API}/api/admin/approve/${user._id}`
                            )
                          }
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>

                      )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center gap-4 mt-6">

        <button
          disabled={page === 1}
          onClick={() =>
            fetchUsers(page - 1)
          }
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            fetchUsers(page + 1)
          }
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  );

}