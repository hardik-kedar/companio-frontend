"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Wallet {

  balance: number;
  pending: number;
  totalEarned: number;

}

export default function WalletPage() {

  const [wallet, setWallet] =
    useState<Wallet | null>(null);

  const [loading, setLoading] =
    useState(true);



  /*
  ===============================
  LOAD WALLET
  ===============================
  */

  const loadWallet =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/user/me"
          );

        const data =
          await res.json();

        setWallet(
          data.wallet
        );

      }
      catch {

        alert(
          "Failed to load wallet"
        );

      }
      finally {

        setLoading(false);

      }

    };



  useEffect(() => {

    loadWallet();

  }, []);



  /*
  ===============================
  UI
  ===============================
  */

  if (loading)
    return (
      <div className="p-6">
        Loading wallet...
      </div>
    );



  if (!wallet)
    return (
      <div className="p-6">
        Wallet not available
      </div>
    );



  return (

    <div className="max-w-xl mx-auto p-6 pt-18">

      <h1 className="text-2xl font-semibold mb-6">
        Wallet
      </h1>



      <div className="space-y-4">

        <div className="border rounded-xl p-5 bg-white shadow-sm">

          <p className="text-gray-500">
            Available Balance
          </p>

          <p className="text-2xl font-semibold">
            ₹{wallet.balance}
          </p>

        </div>



        <div className="border rounded-xl p-5 bg-white shadow-sm">

          <p className="text-gray-500">
            Pending Earnings
          </p>

          <p className="text-xl font-semibold">
            ₹{wallet.pending}
          </p>

        </div>



        <div className="border rounded-xl p-5 bg-white shadow-sm">

          <p className="text-gray-500">
            Total Earnings
          </p>

          <p className="text-xl font-semibold">
            ₹{wallet.totalEarned}
          </p>

        </div>



        <button
          onClick={() =>
            window.location.href =
              "/wallet/withdraw"
          }
          className="w-full bg-primary text-white py-3 rounded-lg mt-4"
        >
          Withdraw Money
        </button>

      </div>

    </div>

  );

}