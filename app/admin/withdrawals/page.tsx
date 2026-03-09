"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Withdrawal {

  _id: string;

  amount: number;

  status: string;

  createdAt: string;

  user?: {
    name: string;
    email: string;
  };

}

export default function AdminWithdrawalsPage() {

  const [withdrawals, setWithdrawals] =
    useState<Withdrawal[]>([]);

  const [loading, setLoading] =
    useState(true);



  /*
  ===============================
  LOAD WITHDRAWALS
  ===============================
  */

  const loadWithdrawals =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/admin/withdrawals"
          );

        const data =
          await res.json();

        setWithdrawals(
          data.withdrawals || []
        );

      }
      catch {

        alert(
          "Failed to load withdrawals"
        );

      }
      finally {

        setLoading(false);

      }

    };



  useEffect(() => {

    loadWithdrawals();

  }, []);



  /*
  ===============================
  APPROVE
  ===============================
  */

  const approve =
    async (id: string) => {

      await apiFetch(
        `/api/admin/withdrawals/${id}/approve`,
        {
          method: "POST"
        }
      );

      loadWithdrawals();

    };



  /*
  ===============================
  REJECT
  ===============================
  */

 const reject = async (id: string) => {

  const reason = prompt("Enter rejection reason");

  if (!reason) return;

  await apiFetch(
    `/api/admin/withdrawals/${id}/reject`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reason })
    }
  );

  loadWithdrawals();
};



  /*
  ===============================
  UI
  ===============================
  */

  if (loading)
    return (
      <div className="p-6">
        Loading withdrawals...
      </div>
    );



  return (

    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Withdrawal Requests
      </h1>



      {withdrawals.length === 0 && (

        <div className="text-gray-500">
          No withdrawal requests
        </div>

      )}



      {withdrawals.map((w) => (

        <div
          key={w._id}
          className="border rounded-xl p-5 mb-4 bg-white shadow-sm"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="font-semibold">
                {w.user?.name}
              </p>

              <p className="text-sm text-gray-500">
                {w.user?.email}
              </p>

            </div>

            <p className="font-semibold">
              ₹{w.amount}
            </p>

          </div>



          <p className="text-sm text-gray-500 mt-2">
            {new Date(
              w.createdAt
            ).toLocaleString()}
          </p>



          {w.status === "pending" && (

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  approve(w._id)
                }
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  reject(w._id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>

            </div>

          )}

          {w.status !== "pending" && (

            <p className="mt-3 text-gray-500">
              Status: {w.status}
            </p>

          )}

        </div>

      ))}

    </div>

  );

}