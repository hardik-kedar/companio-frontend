"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Dispute {
  _id: string;
  totalAmount: number;
  dispute: {
    reason: string;
    status: string;
  };
  renter?: {
    name: string;
    email: string;
  };
  companion?: {
    name: string;
    email: string;
  };
}

export default function AdminDisputesPage() {

  const [disputes, setDisputes] =
    useState<Dispute[]>([]);

  const [loading, setLoading] =
    useState(true);



  /*
  ===============================
  LOAD DISPUTES
  ===============================
  */

  const loadDisputes =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/admin/disputes"
          );

        const data =
          await res.json();

        setDisputes(
          data.disputes || []
        );

      }
      catch {

        alert(
          "Failed to load disputes"
        );

      }
      finally {

        setLoading(false);

      }

    };



  useEffect(() => {

    loadDisputes();

  }, []);



  /*
  ===============================
  RELEASE PAYMENT
  ===============================
  */

  const releasePayment =
    async (id: string) => {

      await apiFetch(
        `/api/admin/disputes/${id}/release`,
        {
          method: "POST"
        }
      );

      loadDisputes();

    };



  /*
  ===============================
  REFUND
  ===============================
  */

  const refundRenter =
    async (id: string) => {

      await apiFetch(
        `/api/admin/disputes/${id}/refund`,
        {
          method: "POST"
        }
      );

      loadDisputes();

    };



  /*
  ===============================
  UI
  ===============================
  */

  if (loading)
    return (
      <div className="p-6">
        Loading disputes...
      </div>
    );



  return (

  <div className="max-w-4xl mx-auto p-6">

    <h1 className="text-2xl font-semibold mb-6">
      Disputes
    </h1>

    {disputes.length === 0 && (

      <div className="text-gray-500">
        No disputes
      </div>

    )}

    {disputes.map((d) => (

      <div
        key={d._id}
        className="border rounded-xl p-5 mb-4 bg-white shadow-sm"
      >

        <div className="flex justify-between">

          <div>

            <p className="font-semibold">
              {d.renter?.name}
            </p>

            <p className="text-sm text-gray-500">
              {d.renter?.email}
            </p>

          </div>

          <p className="text-red-600 font-semibold">
            {d.dispute?.status}
          </p>

        </div>

        <p className="mt-3 text-gray-700">
          {d.dispute?.reason}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Booking Amount: ₹{d.totalAmount}
        </p>

        <div className="flex gap-3 mt-4">

          <button
            onClick={() => releasePayment(d._id)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Release Payment
          </button>

          <button
            onClick={() => refundRenter(d._id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Refund Renter
          </button>

        </div>

      </div>

    ))}

  </div>

);
}