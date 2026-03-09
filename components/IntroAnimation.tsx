
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const text = "companio";

export default function IntroAnimation() {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("companioIntroShown");

    if (!alreadyShown) {
      setShow(true);

      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("companioIntroShown", "true");
      }, 3000);
    }

    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
        >
          <motion.h1 className="text-6xl font-bold tracking-wide text-black">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.5,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// const text = "companio";

// export default function IntroAnimation({
//   onFinish,
// }: {
//   onFinish: () => void;
// }) {
//   const [show, setShow] = useState(false);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     const shown = sessionStorage.getItem("companioIntroShown");

//     if (!shown) {
//       setShow(true);

//       setTimeout(() => {
//         setShow(false);
//         sessionStorage.setItem("companioIntroShown", "true");

//         setTimeout(() => {
//           onFinish();
//         }, 800); // wait fade out
//       }, 3000);
//     } else {
//       onFinish();
//     }

//     setReady(true);
//   }, [onFinish]);

//   if (!ready) return null;

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8 }}
//           className="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
//         >
//           <motion.h1 className="text-6xl font-bold tracking-wide text-black">
//             {text.split("").map((letter, index) => (
//               <motion.span
//                 key={index}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   delay: index * 0.12,
//                   duration: 0.5,
//                   ease: "easeOut",
//                 }}
//               >
//                 {letter}
//               </motion.span>
//             ))}
//           </motion.h1>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }