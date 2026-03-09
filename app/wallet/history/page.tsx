"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Withdrawal {

  _id: string;
  amount: number;
  status: string;
  createdAt: string;

}

export default function WithdrawalHistoryPage() {

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
            "/api/wallet/my"
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
  STATUS BADGE
  ===============================
  */

  const getStatusColor =
    (status: string) => {

      if (status === "approved")
        return "text-green-600";

      if (status === "rejected")
        return "text-red-600";

      return "text-yellow-600";

    };



  /*
  ===============================
  UI
  ===============================
  */

  if (loading)
    return (
      <div className="p-6">
        Loading...
      </div>
    );



  return (

    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Withdrawal History
      </h1>



      {withdrawals.length === 0 && (

        <div className="text-gray-500">
          No withdrawals yet
        </div>

      )}



      {withdrawals.map((w) => (

        <div
          key={w._id}
          className="border rounded-xl p-4 mb-3 bg-white shadow-sm"
        >

          <div className="flex justify-between">

            <p className="font-semibold">
              ₹{w.amount}
            </p>

            <p className={
              getStatusColor(w.status)
            }>
              {w.status}
            </p>

          </div>



          <p className="text-sm text-gray-500">

            {new Date(
              w.createdAt
            ).toLocaleString()}

          </p>

        </div>

      ))}

    </div>

  );

}