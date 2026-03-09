

"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

interface Props {
  companionId: string;
  companionName: string;
  pricePerHour: number;
  onClose: () => void;
}

export default function BookingModal({
  companionId,
  companionName,
  pricePerHour,
  onClose
}: Props) {

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("18:00");
  const [durationHours, setDurationHours] = useState<number>(1);
  const [locationText, setLocationText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  /*
  ✅ FIXED TOTAL CALCULATION
  */

  const total =
    (pricePerHour || 0)
    * (durationHours || 1);



  /*
  ================================
  CREATE BOOKING REQUEST
  ================================
  */

  const handleSubmit =
    async () => {

      if (
        !date ||
        !startTime ||
        !durationHours ||
        !locationText
      ) {
        alert("Fill all required fields");
        return;
      }

      try {

        setLoading(true);

        const res =
          await apiFetch(
            "/api/bookings/create",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify({

                companionId,
                date,
                startTime,
                durationHours,
                locationText,
                message

              })
            }
          );

        if (!res.ok) {

          const err =
            await res.json();

          throw new Error(
            err.message
          );

        }

        alert("Booking request sent");

        onClose();

      }
      catch (error: any) {

        alert(
          error.message ||
          "Failed"
        );

      }
      finally {

        setLoading(false);

      }

    };



  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">

        <h2 className="text-xl font-semibold">
          Request Booking
        </h2>

        <p className="text-sm text-gray-500">
          Companion: {companionName}
        </p>


        {/* DATE */}
        <input
          type="date"
          value={date}
          onChange={(e)=>
            setDate(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />


        {/* TIME */}
        <input
          type="time"
          value={startTime}
          onChange={(e)=>
            setStartTime(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />


        {/* DURATION */}
        <select
          value={durationHours}
          onChange={(e)=>
            setDurationHours(
              Number(e.target.value)
            )
          }
          className="w-full border rounded-lg p-3"
        >

          <option value={1}>1 hour</option>
          <option value={2}>2 hours</option>
          <option value={3}>3 hours</option>
          <option value={4}>4 hours</option>
          <option value={5}>5 hours</option>
          <option value={6}>6 hours</option>

        </select>


        {/* LOCATION */}
        <input
          placeholder="Meeting area (ex: Indore, Vijay Nagar)"
          value={locationText}
          onChange={(e)=>
            setLocationText(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg"
        />


        {/* MESSAGE */}
        <textarea
          placeholder="Optional message"
          value={message}
          onChange={(e)=>
            setMessage(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg"
        />


        {/* TOTAL */}
        <div className="font-semibold text-lg">

          Total: ₹{total}

        </div>


        {/* BUTTONS */}
        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 border py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-primary text-white py-3 rounded-lg hover:opacity-90"
          >
            {loading
              ? "Sending..."
              : "Send Request"}
          </button>

        </div>

      </div>

    </div>

  );

}