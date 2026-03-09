"use client";

import { apiFetch } from "@/lib/api";

export default function EnablePushButton() {

  const subscribeToPush = async () => {

    try {

      const permission =
        await Notification.requestPermission();

      if (permission !== "granted") {
        alert("Permission denied");
        return;
      }

      const registration =
        await navigator.serviceWorker.ready;

      const subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            process.env
              .NEXT_PUBLIC_VAPID_PUBLIC_KEY
        });

      await apiFetch("/api/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
      });

      alert("Push enabled successfully");

    } catch (error) {

      console.error("Push error:", error);

    }

  };

  return (
    <button
      onClick={subscribeToPush}
      className="bg-black text-white px-4 py-2 rounded"
    >
      Enable Notifications
    </button>
  );

}