"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);



  /*
  LOAD PROFILE
  */

  const loadProfile = async () => {

    try {

      const res =
        await apiFetch("/api/user/me");

      const data =
        await res.json();

      setName(data.name || "");
      setBio(data.bio || "");
      setPricePerHour(
        data.pricePerHour || ""
      );

    }
    catch {

      alert("Failed to load profile");

    }
    finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    loadProfile();

  }, []);



  /*
  SAVE PROFILE
  */

  const saveProfile = async () => {

    try {

      setSaving(true);

      await apiFetch(
        "/api/user/update",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            name,
            bio,
            pricePerHour
          })
        }
      );

      router.push("/profile");

    }
    catch {

      alert("Failed to update profile");

    }
    finally {

      setSaving(false);

    }

  };



  if (loading)
    return (
      <div className="p-6">
        Loading profile...
      </div>
    );



  return (

    <div className="max-w-xl mx-auto mt-28 p-6 bg-white rounded-xl shadow-sm">

      <h1 className="text-2xl font-semibold mb-6">
        Edit Profile
      </h1>



      <div className="space-y-5">

        {/* NAME */}

        <div>

          <label className="block text-sm mb-1">
            Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />

        </div>



        {/* BIO */}

        <div>

          <label className="block text-sm mb-1">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />

        </div>



        {/* PRICE */}

        <div>

          <label className="block text-sm mb-1">
            Price Per Hour (₹)
          </label>

          <input
            type="number"
            value={pricePerHour}
            onChange={(e) =>
              setPricePerHour(
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />

        </div>



        {/* SAVE BUTTON */}

        <button
          onClick={saveProfile}
          disabled={saving}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >

          {saving
            ? "Saving..."
            : "Save Changes"}

        </button>

      </div>

    </div>

  );

}