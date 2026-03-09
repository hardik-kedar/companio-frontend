"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

interface Booking {

  _id: string;

  status: string;

  totalAmount: number;

  durationHours: number;

  date: string;

  startTime: string;

  companion?: {
    _id: string;
    name: string;
  };

}

export default function ActiveBookingsPage() {

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);



  const fetchBookings =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/bookings/my"
          );

        if (!res.ok) {
          throw new Error();
        }

        const data =
          await res.json();

        const paid =
          (data.bookings || [])
          .filter(
            (b: Booking) =>
              b.status ===
              "paid_pending_service"
          );

        setBookings(paid);

      }
      catch {

        setError(
          "Failed to load bookings"
        );

      }
      finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchBookings();

  }, []);



  if (loading)
    return (
      <div className="p-6">
        Loading...
      </div>
    );


  if (error)
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );


  return (

    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Active Bookings
      </h1>


      {bookings.length === 0 && (

        <div className="text-gray-500">
          No active bookings
        </div>

      )}


      {bookings.map((b) => (

        <div
          key={b._id}
          className="border rounded-xl p-5 mb-4 bg-white shadow-sm"
        >

          <div className="font-semibold text-lg">
            {b.companion?.name}
          </div>


          <div className="text-sm text-gray-500">

            {new Date(
              b.date
            ).toLocaleDateString()}

            {" • "}

            {b.startTime}

          </div>


          <div className="mt-2">

            ₹{b.totalAmount}

            {" "}

            ({b.durationHours}h)

          </div>


          <div className="text-green-600 font-semibold mt-1">
            Payment successful
          </div>


          <div className="mt-3">

            <Link
              href={`/messages/${b._id}`}
              className="text-primary font-medium hover:underline"
            >
              Open Chat
            </Link>

          </div>

        </div>

      ))}

    </div>

  );

}