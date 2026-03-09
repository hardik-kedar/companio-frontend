"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface FinanceSummary {

  totalRevenue: number;
  totalPayouts: number;
  totalBookings: number;
  totalWithdrawals: number;

}

export default function AdminFinancePage() {

  const [summary, setSummary] =
    useState<FinanceSummary | null>(null);

  const [loading, setLoading] =
    useState(true);



  /*
  ===============================
  LOAD FINANCE SUMMARY
  ===============================
  */

  const loadSummary =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/admin/finance/summary"
          );

        const data =
          await res.json();

        setSummary(data.summary);

      }
      catch {

        alert(
          "Failed to load finance data"
        );

      }
      finally {

        setLoading(false);

      }

    };



  useEffect(() => {

    loadSummary();

  }, []);



  /*
  ===============================
  UI
  ===============================
  */

  if (loading)
    return (
      <div className="p-6">
        Loading finance data...
      </div>
    );



  if (!summary)
    return (
      <div className="p-6">
        No data available
      </div>
    );



  return (

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Finance Dashboard
      </h1>



      <div className="grid grid-cols-2 gap-4">

        <div className="border rounded-xl p-5 bg-white shadow-sm">

          <p className="text-gray-500">
            Total Revenue
          </p>

          <p className="text-2xl font-semibold">
            ₹{summary.totalRevenue}
          </p>

        </div>



        <div className="border rounded-xl p-5 bg-white shadow-sm">

          <p className="text-gray-500">
            Total Payouts
          </p>

          <p className="text-2xl font-semibold">
            ₹{summary.totalPayouts}
          </p>

        </div>



        <div className="border rounded-xl p-5 bg-white shadow-sm">

          <p className="text-gray-500">
            Total Bookings
          </p>

          <p className="text-2xl font-semibold">
            {summary.totalBookings}
          </p>

        </div>



        <div className="border rounded-xl p-5 bg-white shadow-sm">

          <p className="text-gray-500">
            Total Withdrawals
          </p>

          <p className="text-2xl font-semibold">
            ₹{summary.totalWithdrawals}
          </p>

        </div>

      </div>

    </div>

  );

}