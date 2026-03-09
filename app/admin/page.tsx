// "use client";

// import { useEffect, useState } from "react";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState<any>(null);

//   useEffect(() => {
//     fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`,
//       { credentials: "include" }
//     )
//       .then(res => res.json())
//       .then(data => setStats(data));
//   }, []);

//   if (!stats) return <div className="p-10">Loading...</div>;

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-8">
//         Admin Dashboard
//       </h1>

//       <div className="grid grid-cols-3 gap-6">
//         <StatCard title="Total Users" value={stats.totalUsers} />
//         <StatCard title="Total Bookings" value={stats.totalBookings} />
//         <StatCard
//           title="Platform Earnings"
//           value={`₹${stats.totalPlatformEarnings}`}
//         />
//       </div>
//     </div>
//   );
// }

// function StatCard({
//   title,
//   value,
// }: {
//   title: string;
//   value: any;
// }) {
//   return (
//     <div className="bg-white shadow p-6 rounded-xl">
//       <p className="text-gray-500">{title}</p>
//       <h2 className="text-2xl font-bold mt-2">{value}</h2>
//     </div>
//   );
// }
"use client";

import Link from "next/link";

export default function AdminDashboard() {

  return (

    <div className="max-w-6xl mx-auto p-6 pt-20">

      <h1 className="text-3xl font-semibold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        <Link href="/admin/bookings">
          <div className="border p-6 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="text-lg font-semibold">
              Bookings
            </div>
            <div className="text-gray-500 text-sm">
              Manage all bookings
            </div>
          </div>
        </Link>

        <Link href="/admin/disputes">
          <div className="border p-6 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="text-lg font-semibold">
              Disputes
            </div>
            <div className="text-gray-500 text-sm">
              Resolve disputes
            </div>
          </div>
        </Link>

        <Link href="/admin/users">
          <div className="border p-6 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="text-lg font-semibold">
              Users
            </div>
            <div className="text-gray-500 text-sm">
              Manage platform users
            </div>
          </div>
        </Link>

        <Link href="/admin/finance">
          <div className="border p-6 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="text-lg font-semibold">
              Finance
            </div>
            <div className="text-gray-500 text-sm">
              Platform revenue
            </div>
          </div>
        </Link>

        <Link href="/admin/withdrawals">
          <div className="border p-6 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="text-lg font-semibold">
              Withdrawals
            </div>
            <div className="text-gray-500 text-sm">
              Companion payouts
            </div>
          </div>
        </Link>

        <Link href="/admin/logs">
          <div className="border p-6 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="text-lg font-semibold">
              Logs
            </div>
            <div className="text-gray-500 text-sm">
              System activity
            </div>
          </div>
        </Link>

      </div>

    </div>

  );

}