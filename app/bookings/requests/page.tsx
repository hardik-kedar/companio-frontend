"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Booking {
  _id: string;
  status: string;
  date: string;
  startTime: string;
  durationHours: number;
  locationText: string;
  message?: string;
  totalAmount: number;
  renter: {
    name: string;
    profilePhoto?: string;
  };
  expiresAt: string;
}

export default function BookingRequestsPage() {

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [processingId, setProcessingId] =
    useState<string | null>(null);



  /*
  =============================
  FETCH REQUESTS
  =============================
  */

  const fetchRequests =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/bookings/my"
          );

        const data =
          await res.json();

        const pending =
          (data.bookings || [])
          .filter(
            (b: Booking) =>
              b.status ===
              "pending_acceptance"
          );

        setBookings(pending);

      }
      catch {

        alert(
          "Failed to load requests"
        );

      }
      finally {

        setLoading(false);

      }

    };



  useEffect(() => {

    fetchRequests();

  }, []);



  /*
  =============================
  ACCEPT BOOKING
  =============================
  */

  const acceptBooking =
    async (bookingId: string) => {

      try {

        setProcessingId(bookingId);

        await apiFetch(
          "/api/bookings/accept",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              bookingId
            })
          }
        );

        fetchRequests();

      }
      catch {

        alert(
          "Failed to accept booking"
        );

      }
      finally {

        setProcessingId(null);

      }

    };



  /*
  =============================
  REJECT BOOKING
  =============================
  */

  const rejectBooking =
    async (bookingId: string) => {

      try {

        setProcessingId(bookingId);

        await apiFetch(
          "/api/bookings/cancel",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              bookingId
            })
          }
        );

        fetchRequests();

      }
      catch {

        alert(
          "Failed to reject booking"
        );

      }
      finally {

        setProcessingId(null);

      }

    };



  /*
  =============================
  FORMAT EXPIRY TIMER
  =============================
  */

  const getTimeLeft =
    (expiresAt: string) => {

      const diff =
        new Date(expiresAt).getTime()
        - Date.now();

      if (diff <= 0)
        return "Expired";

      const mins =
        Math.floor(diff / 60000);

      return `${mins} min left`;

    };



  /*
  =============================
  UI
  =============================
  */

  if (loading)
    return (
      <div className="p-6">
        Loading requests...
      </div>
    );



  return (

    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Booking Requests
      </h1>



      {bookings.length === 0 && (

        <div className="text-gray-500">
          No pending requests
        </div>

      )}



      {bookings.map((b) => (

        <div
          key={b._id}
          className="border rounded-xl p-5 mb-4 bg-white shadow-sm space-y-3"
        >

          {/* RENTER */}

          <div className="flex items-center gap-3">

            <img
              src={
                b.renter?.profilePhoto ||
                "/default-avatar.png"
              }
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>

              <p className="font-semibold">
                {b.renter?.name}
              </p>

              <p className="text-sm text-gray-500">
                {getTimeLeft(
                  b.expiresAt
                )}
              </p>

            </div>

          </div>



          {/* DETAILS */}

          <p>
            📅{" "}
            {new Date(
              b.date
            ).toLocaleDateString()}
          </p>

          <p>
            🕒 {b.startTime}
          </p>

          <p>
            ⏱ {b.durationHours} hours
          </p>

          <p>
            📍 {b.locationText}
          </p>

          <p>
            💰 ₹{b.totalAmount}
          </p>


          {b.message && (

            <p className="text-gray-600 italic">
              "{b.message}"
            </p>

          )}



          {/* ACTIONS */}

          <div className="flex gap-3 pt-2">

            <button
              disabled={
                processingId === b._id
              }
              onClick={() =>
                acceptBooking(b._id)
              }
              className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {processingId === b._id
                ? "Processing..."
                : "Accept"}
            </button>


            <button
              disabled={
                processingId === b._id
              }
              onClick={() =>
                rejectBooking(b._id)
              }
              className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Reject
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}