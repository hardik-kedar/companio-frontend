"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Booking {

  _id: string;
  status: string;
  totalAmount: number;
  date: string;
  startTime: string;

  renter?: {
    name: string;
    email: string;
  };

  companion?: {
    name: string;
    email: string;
  };

}

export default function AdminBookingsPage() {

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);



  /*
  ===============================
  LOAD BOOKINGS
  ===============================
  */

  const loadBookings =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/admin/bookings"
          );

        const data =
          await res.json();

        setBookings(
          data.bookings || []
        );

      }
      catch {

        alert(
          "Failed to load bookings"
        );

      }
      finally {

        setLoading(false);

      }

    };



  useEffect(() => {

    loadBookings();

  }, []);



  /*
  ===============================
  STATUS COLOR
  ===============================
  */

  const getStatusColor =
    (status: string) => {

      if (status === "completed")
        return "text-green-600";

      if (status === "cancelled")
        return "text-red-600";

      if (status === "paid_pending_service")
        return "text-blue-600";

      return "text-gray-600";

    };



  /*
  ===============================
  UI
  ===============================
  */

  if (loading)
    return (
      <div className="p-6">
        Loading bookings...
      </div>
    );



  return (

    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        All Bookings
      </h1>



      {bookings.length === 0 && (

        <div className="text-gray-500">
          No bookings found
        </div>

      )}



      {bookings.map((b) => (

        <div
          key={b._id}
          className="border rounded-xl p-5 mb-4 bg-white shadow-sm"
        >

          <div className="flex justify-between">

            <div>

              <p className="font-semibold">
                Renter: {b.renter?.name}
              </p>

              <p className="text-sm text-gray-500">
                {b.renter?.email}
              </p>

            </div>

            <div>

              <p className="font-semibold">
                Companion: {b.companion?.name}
              </p>

              <p className="text-sm text-gray-500">
                {b.companion?.email}
              </p>

            </div>

          </div>



          <div className="mt-3">

            <p>
              Amount: ₹{b.totalAmount}
            </p>

            <p>
              Date: {new Date(b.date).toLocaleDateString()}
            </p>

            <p>
              Time: {b.startTime}
            </p>

            <p className={getStatusColor(b.status)}>
              Status: {b.status}
            </p>

          </div>

        </div>

      ))}

    </div>

  );

}