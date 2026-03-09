"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/hero/1.jpeg",
  "/hero/2.jpeg",
  "/hero/3.jpeg",
  "/hero/4.jpeg",
  "/hero/5.jpeg",
  "/hero/7.jpeg",
  "/hero/8.jpeg",
  "/hero/9.jpeg",
  "/hero/12.jpeg",
  "/hero/13.jpeg",
  "/hero/15.jpeg",
  "/hero/16.jpeg",
  "/hero/17.jpeg",
  "/hero/20.jpeg",
];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[420px] h-[520px] rounded-3xl overflow-hidden shadow-soft">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt="Companio moments"
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
