"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
          { credentials: "include" }
        );

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const user = await res.json();

        if (user.role !== "admin") {
          router.push("/");
          return;
        }

        setLoading(false);
      } catch {
        router.push("/login");
      }
    }

    checkAdmin();
  }, [router]);

  if (loading) return <div className="p-10">Checking admin access...</div>;

  return <div>{children}</div>;
}