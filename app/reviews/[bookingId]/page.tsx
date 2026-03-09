"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StarRating from "@/components/StarRating";
import { apiFetch } from "@/lib/api";

export default function LeaveReviewPage() {

  const { bookingId } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    try {

      setLoading(true);

      const res = await apiFetch(
        "/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            bookingId,
            rating,
            comment
          })
        }
      );

      if (!res.ok) {
        throw new Error("Review failed");
      }

      router.push("/bookings");

    }
    catch {
      alert("Failed to submit review");
    }
    finally {
      setLoading(false);
    }

  };

  return (

    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Leave a Review
      </h1>

      <div className="bg-card rounded-2xl shadow-soft p-6 space-y-6">

        <div>
          <p className="text-sm text-muted mb-2">
            Rating
          </p>

          <StarRating
  value={rating}
  onChange={setRating}
/>
        </div>

        <div>
          <p className="text-sm text-muted mb-2">
            Comment
          </p>

          <textarea
            className="w-full border border-primary/20 rounded-xl p-3"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
          />
        </div>

        <button
          onClick={submitReview}
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-xl hover:scale-[1.02] transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

      </div>

    </div>

  );

}