"use client";

import { useEffect, useState, useRef } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  bookingId?: string;
}

export default function NotificationDropdown() {

  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [count, setCount] =
    useState(0);

  const ref =
    useRef<HTMLDivElement>(null);


  /*
  ============================
  FETCH NOTIFICATIONS
  ============================
  */

  const fetchNotifications =
    async () => {

      try {

        setLoading(true);

        const res =
          await apiFetch(
            "/api/notifications"
          );

        if (!res.ok)
          return;

        const data =
          await res.json();

        setNotifications(
          data.notifications || []
        );

      }
      finally {

        setLoading(false);

      }

    };


  /*
  ============================
  FETCH UNREAD MESSAGE COUNT
  ============================
  */

  const fetchUnreadCount =
    async () => {

      try {

        const res =
        await apiFetch(
  "/api/notifications/unread-count"
);

        if (!res.ok)
          return;

        const data =
          await res.json();

        setCount(
          data.count || 0
        );

      }
      catch {

        console.error(
          "Failed to fetch unread count"
        );

      }

    };


  /*
  AUTO REFRESH COUNT
  */

  useEffect(() => {

    fetchUnreadCount();

    const interval =
      setInterval(
        fetchUnreadCount,
        10000
      );

    return () =>
      clearInterval(interval);

  }, []);


  /*
  OPEN / CLOSE
  */

  const toggle =
    () => {

      setOpen(prev =>
        !prev
      );

      if (!open) {

        fetchNotifications();
        fetchUnreadCount();

      }

    };


  /*
  CLOSE OUTSIDE CLICK
  */

  useEffect(() => {

    const handler =
      (e: MouseEvent) => {

        if (
          ref.current &&
          !ref.current.contains(
            e.target as Node
          )
        ) {

          setOpen(false);

        }

      };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );

  }, []);


  /*
  HANDLE CLICK
  */

  const handleClick =
    async (
      n: Notification
    ) => {

      try {

        await apiFetch(
          `/api/notifications/read/${n._id}`,
          {
            method: "PATCH"
          }
        );

        setNotifications(prev =>
          prev.map(x =>
            x._id === n._id
              ? {
                  ...x,
                  isRead: true
                }
              : x
          )
        );

        setOpen(false);


        if (
          n.type ===
          "booking_request_received"
        ) {

          router.push(
            "/inbox"
          );

        }
        else if (
          n.type ===
          "booking_accepted"
        ) {

          router.push(
            "/bookings"
          );

        }
        else if (
          n.type ===
          "payment_received"
        ) {

          router.push(
            "/bookings/active"
          );

        }
        else {

          router.push(
            "/bookings"
          );

        }

      }
      catch {

        alert(
          "Failed to open notification"
        );

      }

    };


  /*
  UI
  */

  return (

    <div
      className="relative"
      ref={ref}
    >

      {/* BELL */}

      <button
        onClick={toggle}
        className="text-xl relative"
      >

        🔔

        {/* UNREAD BADGE */}

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

      </button>


      {/* DROPDOWN */}

      {open && (

        <div className="
        absolute right-0 mt-3
        w-80 max-h-96
        overflow-y-auto
        bg-white border
        rounded-xl shadow-lg z-50
        ">

          <div className="p-3 font-semibold border-b">
            Notifications
          </div>


          {loading && (

            <div className="p-4 text-sm">
              Loading...
            </div>

          )}


          {!loading &&
            notifications.length === 0 && (

            <div className="p-4 text-sm text-gray-500">
              No notifications
            </div>

          )}


          {notifications.map(
            n => (

            <div
              key={n._id}
              onClick={() =>
                handleClick(n)
              }
              className={`
                p-3 border-b text-sm cursor-pointer
                hover:bg-gray-50
                ${
                  !n.isRead
                    ? "bg-blue-50"
                    : ""
                }
              `}
            >

              <div className="font-semibold">
                {n.title}
              </div>

              <div className="text-gray-600 text-xs">
                {n.message}
              </div>

              <div className="text-gray-400 text-xs mt-1">
                {
                  new Date(
                    n.createdAt
                  ).toLocaleString()
                }
              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}