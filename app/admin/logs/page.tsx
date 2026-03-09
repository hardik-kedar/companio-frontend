"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Log {

  _id: string;

  action: string;

  createdAt: string;

  admin?: {
    name: string;
    email: string;
  };

  targetUser?: {
    name: string;
    email: string;
  };

}

export default function AdminLogsPage() {

  const [logs, setLogs] =
    useState<Log[]>([]);

  const [loading, setLoading] =
    useState(true);



  /*
  ===============================
  LOAD LOGS
  ===============================
  */

  const loadLogs =
    async () => {

      try {

        const res =
          await apiFetch(
            "/api/admin/logs"
          );

        const data =
          await res.json();

        setLogs(
          data.logs || []
        );

      }
      catch {

        alert(
          "Failed to load logs"
        );

      }
      finally {

        setLoading(false);

      }

    };



  useEffect(() => {

    loadLogs();

  }, []);



  /*
  ===============================
  UI
  ===============================
  */

  if (loading)
    return (
      <div className="p-6">
        Loading logs...
      </div>
    );



  return (

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Admin Activity Logs
      </h1>



      {logs.length === 0 && (

        <div className="text-gray-500">
          No logs yet
        </div>

      )}



      {logs.map((log) => (

        <div
          key={log._id}
          className="border rounded-xl p-4 mb-3 bg-white shadow-sm"
        >

          <div className="flex justify-between">

            <div>

              <p className="font-semibold">
                {log.action}
              </p>

              <p className="text-sm text-gray-500">

                Admin: {log.admin?.name} ({log.admin?.email})

              </p>

              {log.targetUser && (

                <p className="text-sm text-gray-500">

                  Target User: {log.targetUser.name}

                </p>

              )}

            </div>



            <p className="text-xs text-gray-400">

              {new Date(
                log.createdAt
              ).toLocaleString()}

            </p>

          </div>

        </div>

      ))}

    </div>

  );

}