"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function InboxBell() {

  const [count, setCount] = useState(0);

  /*
  ==========================
  FETCH UNREAD COUNT
  ==========================
  */
  const fetchCount = async () => {

    try {

      const res =
        await apiFetch(
          "/api/notifications/unread-count"
        );

      if (!res.ok) return;

      const data =
        await res.json();

      setCount(data.count || 0);

    }
    catch {

      setCount(0);

    }

  };

  /*
  AUTO REFRESH
  */
  useEffect(() => {

    fetchCount();

    const interval =
      setInterval(fetchCount, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  /*
  UI
  */
  return (

    <Link
      href="/inbox"
      className="relative"
    >

      <span className="text-xl">
        🔔
      </span>

      {count > 0 && (

        <span
          className="
          absolute
          -top-2
          -right-2
          bg-red-500
          text-white
          text-xs
          px-1.5
          py-0.5
          rounded-full
          font-semibold
          "
        >
          {count}
        </span>

      )}

    </Link>

  );

}