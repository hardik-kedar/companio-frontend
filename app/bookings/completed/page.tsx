"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import StarRating from "@/components/StarRating";

interface Booking {

  _id: string;

  status: string;

  date: string;

  totalAmount: number;

  renterRating?: number;

  companionRating?: number;

  companion?: {
    name: string;
  };

}

export default function CompletedBookingsPage() {

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [ratings, setRatings] =
    useState<Record<string, number>>({});

  const [submitting, setSubmitting] =
    useState<string | null>(null);



  /*
  ===============================
  FETCH BOOKINGS
  ===============================
  */

  const fetchBookings =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/bookings/my"
          );

        const data =
          await res.json();

        const completed =
          (data.bookings || []).filter(
            (b: Booking) =>
              b.status === "completed"
          );

        setBookings(completed);

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

    fetchBookings();

  }, []);



  /*
  ===============================
  SET RATING
  ===============================
  */

  const setRating =
    (bookingId: string, value: number) => {

      setRatings((prev) => ({
        ...prev,
        [bookingId]: value
      }));

    };



  /*
  ===============================
  SUBMIT RATING
  ===============================
  */

  const submitRating =
    async (bookingId: string) => {

      const rating =
        ratings[bookingId] || 5;

      try {

        setSubmitting(bookingId);

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

        fetchBookings();

      }
      catch {

        alert(
          "Failed to submit rating"
        );

      }
      finally {

        setSubmitting(null);

      }

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

    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Completed Bookings
      </h1>



      {bookings.length === 0 && (

        <div className="text-gray-500">
          No completed bookings
        </div>

      )}



      {bookings.map((b) => {

        const alreadyRated =
          b.companionRating ||
          b.renterRating;

        return (

          <div
            key={b._id}
            className="border rounded-xl p-5 mb-4 bg-white shadow-sm"
          >

            <div className="font-semibold text-lg">
              {b.companion?.name}
            </div>

            <div className="text-sm text-gray-500 mb-2">
              {new Date(
                b.date
              ).toLocaleDateString()}
            </div>

            <div className="mb-3">
              ₹{b.totalAmount}
            </div>



            {/* EXISTING RATING */}

            {alreadyRated && (

              <div className="text-yellow-500 font-medium">
                Rated: {"★".repeat(alreadyRated)}
              </div>

            )}



            {/* RATE */}

            {!alreadyRated && (

              <div className="flex items-center gap-4">

                <StarRating
                  value={
                    ratings[b._id] || 5
                  }
                  onChange={(v) =>
                    setRating(
                      b._id,
                      v
                    )
                  }
                />

                <button
                  onClick={() =>
                    submitRating(
                      b._id
                    )
                  }
                  disabled={
                    submitting ===
                    b._id
                  }
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  {submitting === b._id
                    ? "Submitting..."
                    : "Submit"}
                </button>

              </div>

            )}

          </div>

        );

      })}

    </div>

  );

}