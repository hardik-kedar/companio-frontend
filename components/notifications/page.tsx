"use client";

import {
  useEffect,
  useState
}
from "react";

import {
  apiFetch
}
from "@/lib/api";


interface Notification {

  _id: string;

  type: string;

  title: string;

  message: string;

  isRead: boolean;

  createdAt: string;

}


export default function NotificationsPage() {

  const [
    notifications,
    setNotifications
  ] = useState<
    Notification[]
  >([]);


  const fetchNotifications =
    async () => {

      const res =
        await apiFetch(
          "/api/notifications/my"
        );

      const data =
        await res.json();

      setNotifications(
        data.notifications || []
      );

    };


  useEffect(() => {

    fetchNotifications();

  }, []);


  return (

    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Notifications
      </h1>


      {notifications.length === 0 && (

        <div className="text-gray-500">
          No notifications
        </div>

      )}


      {notifications.map(
        (n) => (

          <div
            key={n._id}
            className="
            border
            rounded-xl
            p-4
            mb-3
            bg-white
            shadow
            "
          >

            <div className="font-semibold">
              {n.title}
            </div>

            <div className="text-sm text-gray-600">
              {n.message}
            </div>

            <div className="text-xs text-gray-400 mt-1">
              {
                new Date(
                  n.createdAt
                ).toLocaleString()
              }
            </div>

          </div>

        )

      )}

    </div>

  );

}