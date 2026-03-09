"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Booking {

  _id: string;

  status: string;

  date: string;

  totalAmount: number;

  companionRating?: number;

  renterRating?: number;

  companion?: {
    name: string;
  };

  renter?: {
    name: string;
  };

}

export default function CompletedBookingsPage() {

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [rating, setRating] =
    useState<number>(5);



  const fetchBookings = async () => {

    try {

      const res =
        await apiFetch("/api/bookings/my");

      const data =
        await res.json();

      const completed =
        data.bookings.filter(
          (b: Booking) =>
            b.status === "completed"
        );

      setBookings(completed);

    }
    catch {

      alert("Failed to load bookings");

    }
    finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchBookings();

  }, []);



  /*
  =========================
  SUBMIT RATING
  =========================
  */

  const submitRating =
    async (bookingId: string) => {

      await apiFetch(
        "/api/bookings/rate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            bookingId,
            rating
          })
        }
      );

      alert("Rating submitted");

      fetchBookings();

    };



  if (loading)
    return <div className="p-6">Loading...</div>;



  return (

    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Completed Bookings
      </h1>



      {bookings.length === 0 && (

        <div className="text-gray-500">
          No completed bookings
        </div>

      )}



      {bookings.map((b) => (

        <div
          key={b._id}
          className="border rounded-xl p-5 mb-4"
        >

          <div className="font-semibold">
            {b.companion?.name}
          </div>

          <div className="text-sm text-gray-500">
            {new Date(b.date)
              .toLocaleDateString()}
          </div>

          <div className="mb-2">
            ₹{b.totalAmount}
          </div>



          {!b.companionRating && (

            <div className="flex gap-3">

              <select
                value={rating}
                onChange={(e) =>
                  setRating(
                    Number(e.target.value)
                  )
                }
                className="border p-2 rounded"
              >
                {[1,2,3,4,5].map(n => (
                  <option key={n}>
                    {n} ⭐
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  submitRating(b._id)
                }
                className="bg-black text-white px-4 py-2 rounded"
              >
                Submit Rating
              </button>

            </div>

          )}

          {b.companionRating && (

            <div className="text-green-600">
              Rated: {b.companionRating} ⭐
            </div>

          )}

        </div>

      ))}

    </div>

  );

}