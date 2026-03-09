"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import react-leaflet components (prevents SSR crash)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface User {
  _id: string;
  name: string;
  role: string;
  pricePerHour?: number;
  location?: {
    coordinates?: {
      coordinates: [number, number]; // [lng, lat]
    };
  };
}

interface Props {
  users: User[];
  center?: [number, number];
}

export default function ExploreMap({ users, center }: Props) {
  const defaultCenter: [number, number] = center || [22.7196, 75.8577];

  // Fix Leaflet default marker icon issue
  useEffect(() => {
    (async () => {
      const L = await import("leaflet");

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <div className="h-[50vh] w-full rounded-2xl overflow-hidden shadow-soft">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {users.map((user) => {
          const coords = user.location?.coordinates?.coordinates;

          if (!coords) return null;

          const [lng, lat] = coords;

          return (
            <Marker key={user._id} position={[lat, lng]}>
              <Popup>
                <div className="space-y-1">
                  <strong>{user.name}</strong>
                  <div className="text-sm">{user.role}</div>

                  {typeof user.pricePerHour === "number" &&
                    user.pricePerHour > 0 && (
                      <div className="text-sm font-medium">
                        ₹{user.pricePerHour}/hr
                      </div>
                    )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
