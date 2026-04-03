// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// const images = [
//   "/why1.jpeg",
//   "/why2.jpeg",
//   "/why3.jpeg",
// ];

// export default function ImageSlider() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3500);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-[420px] h-[520px] rounded-3xl overflow-hidden shadow-soft">
//       {images.map((img, i) => (
//         <Image
//           key={i}
//           src={img}
//           alt="Companio moments"
//           fill
//           priority={i === 0}
//           className={`object-cover absolute transition-opacity duration-1000 ${
//             i === index ? "opacity-100" : "opacity-0"
//           }`}
//         />
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/why1.jpeg",
  "/why2.jpeg",
  "/why3.jpeg",
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[420px] h-[420px] sm:h-[480px] md:h-[520px] rounded-3xl overflow-hidden shadow-soft">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt="Companio moments"
          fill
          priority={i === 0}
          className={`object-cover absolute transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}