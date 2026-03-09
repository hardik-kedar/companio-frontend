"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Notification {

  _id: string;

  title: string;

  message: string;

  isRead: boolean;

  createdAt: string;

}

export default function NotificationBell() {

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);



  /*
  ============================
  LOAD NOTIFICATIONS
  ============================
  */

  const loadNotifications =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/notifications"
          );

        const data =
          await res.json();

        setNotifications(
          data.notifications || []
        );

      }
      catch {

        console.error(
          "Failed to load notifications"
        );

      }
      finally {

        setLoading(false);

      }

    };



  useEffect(() => {

    loadNotifications();

  }, []);



  /*
  ============================
  MARK AS READ
  ============================
  */

  const markAsRead =
    async (id: string) => {

      await apiFetch(
  `/api/notifications/read/${id}`,
  { method: "PATCH" }
);

      setNotifications(prev =>
        prev.map(n =>
          n._id === id
            ? { ...n, isRead: true }
            : n
        )
      );

    };



  const unreadCount =
    notifications.filter(
      n => !n.isRead
    ).length;



  return (

    <div className="relative">

      {/* Bell */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="relative text-xl"
      >
        🔔

        {unreadCount > 0 && (

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {unreadCount}
          </span>

        )}

      </button>



      {/* Dropdown */}

      {open && (

        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg z-50">

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

          {notifications.map(n => (

            <div
              key={n._id}
              className={`p-3 border-b text-sm cursor-pointer ${
                !n.isRead
                  ? "bg-gray-50"
                  : ""
              }`}
              onClick={() =>
                markAsRead(n._id)
              }
            >

              <div className="font-semibold">
                {n.title}
              </div>

              <div className="text-gray-600">
                {n.message}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {new Date(
                  n.createdAt
                ).toLocaleString()}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}