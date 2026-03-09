"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Booking {
  _id: string;
  status: string;
  expiresAt?: string;
  totalAmount: number;
  durationHours: number;
  date: string;
  startTime: string;
  renter?: {
    name: string;
  };
}

export default function CompanionInbox() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] =
    useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  /*
  ============================
  LIVE TIMER
  ============================
  */
  useEffect(() => {
    const interval =
      setInterval(
        () => setNow(Date.now()),
        1000
      );

    return () =>
      clearInterval(interval);
  }, []);

  /*
  ============================
  FETCH BOOKINGS
  ============================
  */
const fetchBookings = async () => {

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
          b.status === "pending_acceptance" &&
          b.expiresAt &&
          new Date(b.expiresAt).getTime() > Date.now()
      );

    setBookings(pending);

  }
  catch {

    alert("Failed to load inbox");

  }
  finally {

    setLoading(false);

  }

};

  useEffect(() => {
    fetchBookings();
  }, []);

  /*
  ============================
  ACCEPT
  ============================
  */
  const acceptBooking =
    async (
      bookingId: string
    ) => {
      try {
        setProcessingId(
          bookingId
        );

        const res =
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

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data.message ||
              "Accept failed"
          );
        }

        fetchBookings();
      }
      catch (error: any) {
        alert(
          error.message
        );
      }
      finally {
        setProcessingId(
          null
        );
      }
    };

  /*
  ============================
  REJECT
  ============================
  */
  const rejectBooking =
    async (
      bookingId: string
    ) => {
      try {
        setProcessingId(
          bookingId
        );

        const res =
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

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data.message ||
              "Reject failed"
          );
        }

        fetchBookings();
      }
      catch (error: any) {
        alert(
          error.message
        );
      }
      finally {
        setProcessingId(
          null
        );
      }
    };

  /*
  ============================
  COUNTDOWN
  ============================
  */
  const getRemaining =
    (
      expiresAt?: string
    ) => {
      if (!expiresAt)
        return "Expired";

      const diff =
        new Date(
          expiresAt
        ).getTime() -
        now;

      if (diff <= 0)
        return "Expired";

      const min =
        Math.floor(
          diff / 60000
        );

      const sec =
        Math.floor(
          (diff %
            60000) /
            1000
        );

      return `${min}m ${sec}s`;
    };

  /*
  ============================
  UI
  ============================
  */
  if (loading)
    return (
      <div className="p-6">
        Loading inbox...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 pb-32">

      <h1 className="text-2xl font-semibold mb-6">
        Booking Requests
      </h1>

      {bookings.length === 0 && (
        <div className="text-gray-500">
          No pending requests
        </div>
      )}

      {bookings.map(
        (b) => {

          const expired =
            b.expiresAt &&
            new Date(
              b.expiresAt
            ).getTime() <=
              now;

          return (
            <div
              key={b._id}
              className="border rounded-xl p-5 mb-4 bg-white shadow-sm"
            >

              <div>

                <div className="font-semibold">
                  {
                    b.renter?.name
                  }
                </div>

                <div className="text-sm text-gray-500">
                  {new Date(
                    b.date
                  ).toLocaleDateString()}{" "}
                  {b.startTime}
                </div>

                <div>
                  ₹
                  {
                    b.totalAmount
                  }{" "}
                  (
                  {
                    b.durationHours
                  }
                  h)
                </div>

                <div
                  className={`text-sm font-semibold ${
                    expired
                      ? "text-red-500"
                      : "text-blue-600"
                  }`}
                >
                  Expires in:{" "}
                  {getRemaining(
                    b.expiresAt
                  )}
                </div>

              </div>

              {/* ACCEPT BUTTON BLOCK (REPLACED AS REQUESTED) */}
              {!expired && (
                <button
                  disabled={
                    processingId ===
                    b._id
                  }
                  onClick={() =>
                    acceptBooking(
                      b._id
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Accept
                </button>
              )}

              {expired && (
                <div className="text-red-500 font-semibold mt-2">
                  Request expired
                </div>
              )}

              {/* REJECT BUTTON ONLY IF NOT EXPIRED */}
              {!expired && (
                <button
                  disabled={
                    processingId ===
                    b._id
                  }
                  onClick={() =>
                    rejectBooking(
                      b._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg mt-2 ml-2"
                >
                  Reject
                </button>
              )}

            </div>
          );

        }
      )}

    </div>
  );

}