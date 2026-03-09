// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import NotificationDropdown from "@/components/NotificationDropdown";

// // export default function Navbar() {

// //   const pathname = usePathname();

// //   const [mobileOpen, setMobileOpen] =
// //     useState(false);

// //   const [scrolled, setScrolled] =
// //     useState(false);

// //   const [user, setUser] =
// //     useState<any>(null);

// //   const [isLoggedIn, setIsLoggedIn] =
// //     useState(false);

// //   const menuRef =
// //     useRef<HTMLDivElement>(null);


// //   /*
// //   ACTIVE LINK STYLE
// //   */

// //   const navClass =
// //     (path: string) =>
// //       `transition hover:text-primary ${
// //         pathname === path
// //           ? "text-primary font-semibold"
// //           : "text-muted"
// //       }`;


// //   /*
// //   SCROLL EFFECT
// //   */

// //   useEffect(() => {

// //     const onScroll = () =>
// //       setScrolled(
// //         window.scrollY > 40
// //       );

// //     window.addEventListener(
// //       "scroll",
// //       onScroll
// //     );

// //     onScroll();

// //     return () =>
// //       window.removeEventListener(
// //         "scroll",
// //         onScroll
// //       );

// //   }, []);


// //   /*
// //   AUTH CHECK
// //   */

// //   useEffect(() => {

// //     const loadUser =
// //       async () => {

// //         try {

// //           const res =
// //             await fetch(
// //               `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
// //               {
// //                 credentials:
// //                   "include"
// //               }
// //             );

// //           if (!res.ok)
// //             throw new Error();

// //           const data =
// //             await res.json();

// //           setUser(data);
// //           setIsLoggedIn(true);

// //         }
// //         catch {

// //           setUser(null);
// //           setIsLoggedIn(false);

// //         }

// //       };

// //     loadUser();

// //   }, [pathname]);


// //   /*
// //   CLOSE MOBILE ON OUTSIDE
// //   */

// //   useEffect(() => {

// //     const handler =
// //       (e: MouseEvent) => {

// //         if (
// //           menuRef.current &&
// //           !menuRef.current.contains(
// //             e.target as Node
// //           )
// //         ) {

// //           setMobileOpen(false);

// //         }

// //       };

// //     if (mobileOpen) {

// //       document.addEventListener(
// //         "mousedown",
// //         handler
// //       );

// //     }

// //     return () =>
// //       document.removeEventListener(
// //         "mousedown",
// //         handler
// //       );

// //   }, [mobileOpen]);


// //   /*
// //   LOGOUT
// //   */

// //   const logout =
// //     async () => {

// //       await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
// //         {
// //           method: "POST",
// //           credentials:
// //             "include"
// //         }
// //       );

// //       window.location.href =
// //         "/";

// //     };


// //   return (

// //     <>

// //       {/* HEADER */}

// //       <header className="fixed top-3 left-0 w-full flex justify-center z-[9999]">

// //         <div
// //           className={`
// //           w-[95%] max-w-6xl
// //           bg-[#F7F3EE]/90 backdrop-blur-md
// //           border border-primary/10
// //           shadow-lg
// //           flex items-center justify-between
// //           px-6 rounded-full
// //           transition-all duration-300
// //           ${scrolled
// //             ? "py-2"
// //             : "py-4"}
// //         `}
// //         >

// //           {/* LOGO */}

// //           <Link
// //             href="/"
// //             className="text-xl font-semibold text-primary"
// //           >
// //             Companio
// //           </Link>


// //           {/* DESKTOP NAV */}

// //           <nav className="hidden md:flex gap-8 items-center text-sm">

// //             <Link href="/explore" className={navClass("/explore")}>
// //               Explore
// //             </Link>

// //             <Link href="/bookings" className={navClass("/bookings")}>
// //               My Bookings
// //             </Link>

// //             <Link href="/profile" className={navClass("/profile")}>
// //               Profile
// //             </Link>

// //             {user?.role === "admin" && (
// //               <Link href="/admin">
// //                 Admin
// //               </Link>
// //             )}

// //             {!isLoggedIn ? (

// //               <>
// //                 <Link href="/login">
// //                   Login
// //                 </Link>

// //                 <Link href="/register">
// //                   <button className="bg-primary text-white px-5 py-2 rounded-full">
// //                     Join
// //                   </button>
// //                 </Link>
// //               </>

// //             ) : (

// //               <button onClick={logout}>
// //                 Logout
// //               </button>

// //             )}

// //           </nav>


// //           {/* RIGHT */}

// //           <div className="flex items-center gap-4">

// //             {/* REPLACED InboxBell WITH NotificationDropdown */}
// //             {isLoggedIn && (
// //               <NotificationDropdown />
// //             )}

// //             {/* MOBILE BUTTON */}

// //             <button
// //               className="md:hidden text-2xl"
// //               onClick={() =>
// //                 setMobileOpen(
// //                   !mobileOpen
// //                 )
// //               }
// //             >
// //               ☰
// //             </button>

// //           </div>

// //         </div>

// //       </header>


// //       {/* OVERLAY */}

// //       {mobileOpen && (

// //         <div className="fixed inset-0 bg-black/40 z-[9998]" />

// //       )}


// //       {/* MOBILE MENU */}

// //       <div
// //         ref={menuRef}
// //         className={`
// //         fixed top-20 left-1/2
// //         -translate-x-1/2
// //         w-[92%] max-w-md
// //         bg-white
// //         shadow-xl
// //         rounded-2xl
// //         p-6
// //         z-[9999]
// //         transition-all duration-300
// //         md:hidden
// //         ${
// //           mobileOpen
// //             ? "opacity-100 translate-y-0"
// //             : "opacity-0 pointer-events-none -translate-y-5"
// //         }
// //       `}
// //       >

// //         <div className="flex flex-col gap-4">


// // <Link href="/messages">
// //   Messages
// // </Link>

// //           <Link
// //             href="/explore"
// //             onClick={() =>
// //               setMobileOpen(false)
// //             }
// //           >
// //             Explore
// //           </Link>

// //           <Link
// //             href="/bookings"
// //             onClick={() =>
// //               setMobileOpen(false)
// //             }
// //           >
// //             My Bookings
// //           </Link>

// //           <Link
// //             href="/profile"
// //             onClick={() =>
// //               setMobileOpen(false)
// //             }
// //           >
// //             Profile
// //           </Link>

// //           {!isLoggedIn ? (

// //             <>
// //               <Link
// //                 href="/login"
// //                 onClick={() =>
// //                   setMobileOpen(false)
// //                 }
// //               >
// //                 Login
// //               </Link>

// //               <Link
// //                 href="/register"
// //                 onClick={() =>
// //                   setMobileOpen(false)
// //                 }
// //               >
// //                 Join
// //               </Link>

// //             </>

// //           ) : (

// //             <button
// //               onClick={logout}
// //               className="text-red-500"
// //             >
// //               Logout
// //             </button>

// //           )}

// //         </div>

// //       </div>

// //     </>

// //   );

// // }








// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import NotificationDropdown from "@/components/NotificationDropdown";

// export default function Navbar() {

// const pathname = usePathname();

// const [mobileOpen, setMobileOpen] = useState(false);
// const [scrolled, setScrolled] = useState(false);
// const [user, setUser] = useState<any>(null);
// const [isLoggedIn, setIsLoggedIn] = useState(false);

// const menuRef = useRef<HTMLDivElement>(null);

// /*
// ACTIVE LINK STYLE
// */

// const navClass = (path: string) =>
//   `transition hover:text-primary ${
//     pathname === path
//       ? "text-primary font-semibold"
//       : "text-muted"
//   }`;

// /*
// SCROLL EFFECT
// */

// useEffect(() => {

// const onScroll = () =>
//   setScrolled(window.scrollY > 40);

// window.addEventListener("scroll", onScroll);

// onScroll();

// return () =>
//   window.removeEventListener("scroll", onScroll);

// }, []);

// /*
// LOAD USER
// */

// useEffect(() => {

// const loadUser = async () => {

//   try {

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
//       { credentials: "include" }
//     );

//     if (!res.ok) throw new Error();

//     const data = await res.json();

//     setUser(data);
//     setIsLoggedIn(true);

//   } catch {

//     setUser(null);
//     setIsLoggedIn(false);

//   }

// };

// loadUser();

// }, [pathname]);

// /*
// CLOSE MOBILE MENU OUTSIDE CLICK
// */

// useEffect(() => {

// const handler = (e: MouseEvent) => {

//   if (
//     menuRef.current &&
//     !menuRef.current.contains(e.target as Node)
//   ) {
//     setMobileOpen(false);
//   }

// };

// if (mobileOpen) {
//   document.addEventListener("mousedown", handler);
// }

// return () =>
//   document.removeEventListener("mousedown", handler);

// }, [mobileOpen]);

// /*
// LOGOUT
// */

// const logout = async () => {

// await fetch(
//   `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
//   {
//     method: "POST",
//     credentials: "include"
//   }
// );

// window.location.href = "/";

// };

// return (

// <>

//   {/* HEADER */}

//   <header className="fixed top-3 left-0 w-full flex justify-center z-[9999]">

//     <div
//       className={`
//       w-[95%] max-w-6xl
//       bg-[#F7F3EE]/90 backdrop-blur-md
//       border border-primary/10
//       shadow-lg
//       flex items-center justify-between
//       px-6 rounded-full
//       transition-all duration-300
//       ${scrolled ? "py-2" : "py-4"}
//     `}
//     >

//       {/* LOGO */}

//       <Link
//         href="/"
//         className="text-xl font-semibold text-primary"
//       >
//         Companio
//       </Link>



//       {/* DESKTOP NAV */}

//       <nav className="hidden md:flex gap-8 items-center text-sm">

//         {!isLoggedIn && (
//           <>
//             <Link href="/#how" className="text-muted hover:text-primary transition">
//               How
//             </Link>

//             <Link href="/#why" className="text-muted hover:text-primary transition">
//               Why
//             </Link>
//           </>
//         )}



//         {isLoggedIn && (
//           <>
//             <Link href="/explore" className={navClass("/explore")}>
//               Explore
//             </Link>

//             <Link href="/messages" className={navClass("/messages")}>
//               Messages
//             </Link>

//             <Link href="/bookings" className={navClass("/bookings")}>
//               My Bookings
//             </Link>

//             <Link href="/profile" className={navClass("/profile")}>
//               Profile
//             </Link>

//             {user?.role === "admin" && (
//               <Link href="/admin">
//                 Admin
//               </Link>
//             )}
//           </>
//         )}



//         {!isLoggedIn ? (

//           <>
//             <Link href="/login">
//               Login
//             </Link>

//             <Link href="/register">
//               <button className="bg-primary text-white px-5 py-2 rounded-full">
//                 Join Now
//               </button>
//             </Link>
//           </>

//         ) : (

//           <button onClick={logout}>
//             Logout
//           </button>

//         )}

//       </nav>



//       {/* RIGHT SIDE */}

//       <div className="flex items-center gap-4">

//         {isLoggedIn && (
//           <NotificationDropdown />
//         )}

//         {/* MOBILE MENU BUTTON */}

//         <button
//           className="md:hidden text-2xl"
//           onClick={() =>
//             setMobileOpen(!mobileOpen)
//           }
//         >
//           ☰
//         </button>

//       </div>

//     </div>

//   </header>



//   {/* OVERLAY */}

//   {mobileOpen && (
//     <div className="fixed inset-0 bg-black/40 z-[9998]" />
//   )}



//   {/* MOBILE MENU */}

//   <div
//     ref={menuRef}
//     className={`
//     fixed top-20 left-1/2
//     -translate-x-1/2
//     w-[92%] max-w-md
//     bg-white
//     shadow-xl
//     rounded-2xl
//     p-6
//     z-[9999]
//     transition-all duration-300
//     md:hidden
//     ${
//       mobileOpen
//         ? "opacity-100 translate-y-0"
//         : "opacity-0 pointer-events-none -translate-y-5"
//     }
//   `}
//   >

//     <div className="flex flex-col gap-4">

//       {!isLoggedIn && (
//         <>
//           <Link href="/#how" onClick={() => setMobileOpen(false)}>
//             How
//           </Link>

//           <Link href="/#why" onClick={() => setMobileOpen(false)}>
//             Why
//           </Link>

//           <Link href="/login" onClick={() => setMobileOpen(false)}>
//             Login
//           </Link>

//           <Link href="/register" onClick={() => setMobileOpen(false)}>
//             Join
//           </Link>
//         </>
//       )}



//       {isLoggedIn && (
//         <>
//           <Link href="/explore" onClick={() => setMobileOpen(false)}>
//             Explore
//           </Link>

//           <Link href="/messages" onClick={() => setMobileOpen(false)}>
//             Messages
//           </Link>

//           <Link href="/bookings" onClick={() => setMobileOpen(false)}>
//             My Bookings
//           </Link>

//           <Link href="/profile" onClick={() => setMobileOpen(false)}>
//             Profile
//           </Link>

//           <Link href="/wallet">
//   Wallet
// </Link>

//           <button
//             onClick={logout}
//             className="text-red-500"
//           >
//             Logout
//           </button>
//         </>
//       )}

//     </div>

//   </div>

// </>

// );

// }
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationDropdown from "@/components/NotificationDropdown";

export default function Navbar() {

const pathname = usePathname();

const [mobileOpen, setMobileOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [user, setUser] = useState<any>(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);

const menuRef = useRef<HTMLDivElement>(null);

/*
ACTIVE LINK STYLE
*/

const navClass = (path: string) =>
  `transition hover:text-primary ${
    pathname === path
      ? "text-primary font-semibold"
      : "text-muted"
  }`;

/*
SCROLL EFFECT
*/

useEffect(() => {

const onScroll = () =>
  setScrolled(window.scrollY > 40);

window.addEventListener("scroll", onScroll);

onScroll();

return () =>
  window.removeEventListener("scroll", onScroll);

}, []);

/*
LOAD USER
*/

useEffect(() => {

const loadUser = async () => {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
      { credentials: "include" }
    );

    if (!res.ok) throw new Error();

    const data = await res.json();

    setUser(data);
    setIsLoggedIn(true);

  } catch {

    setUser(null);
    setIsLoggedIn(false);

  }

};

loadUser();

}, [pathname]);

/*
CLOSE MOBILE MENU OUTSIDE CLICK
*/

useEffect(() => {

const handler = (e: MouseEvent) => {

  if (
    menuRef.current &&
    !menuRef.current.contains(e.target as Node)
  ) {
    setMobileOpen(false);
  }

};

if (mobileOpen) {
  document.addEventListener("mousedown", handler);
}

return () =>
  document.removeEventListener("mousedown", handler);

}, [mobileOpen]);

/*
LOGOUT
*/

const logout = async () => {

await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
  {
    method: "POST",
    credentials: "include"
  }
);

window.location.href = "/";

};

return (

<>

  {/* HEADER */}

  <header className="fixed top-3 left-0 w-full flex justify-center z-[9999]">

    <div
      className={`
      w-[95%] max-w-6xl
      bg-[#F7F3EE]/90 backdrop-blur-md
      border border-primary/10
      shadow-lg
      flex items-center justify-between
      px-6 rounded-full
      transition-all duration-300
      ${scrolled ? "py-2" : "py-4"}
    `}
    >

      {/* LOGO */}

      <Link
        href="/"
        className="text-xl font-semibold text-primary"
      >
        Companio
      </Link>



      {/* DESKTOP NAV */}

      <nav className="hidden md:flex gap-8 items-center text-sm">

        {!isLoggedIn && (
          <>
            <Link href="/#how" className="text-muted hover:text-primary transition">
              How
            </Link>

            <Link href="/#why" className="text-muted hover:text-primary transition">
              Why
            </Link>
          </>
        )}



        {isLoggedIn && (
          <>
            <Link href="/explore" className={navClass("/explore")}>
              Explore
            </Link>

            <Link href="/messages" className={navClass("/messages")}>
              Messages
            </Link>

            <Link href="/bookings" className={navClass("/bookings")}>
              My Bookings
            </Link>

            <Link href="/wallet" className={navClass("/wallet")}>
              Wallet
            </Link>

            <Link href="/profile" className={navClass("/profile")}>
              Profile
            </Link>

            {user?.role === "admin" && (
              <Link href="/admin">
                Admin
              </Link>
            )}
          </>
        )}



        {!isLoggedIn ? (

          <>
            <Link href="/login">
              Login
            </Link>

            <Link href="/register">
              <button className="bg-primary text-white px-5 py-2 rounded-full">
                Join Now
              </button>
            </Link>
          </>

        ) : (

          <button onClick={logout}>
            Logout
          </button>

        )}

      </nav>



      {/* RIGHT SIDE */}

      <div className="flex items-center gap-4">

        {isLoggedIn && (
          <NotificationDropdown />
        )}

        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden text-2xl"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          ☰
        </button>

      </div>

    </div>

  </header>



  {/* OVERLAY */}

  {mobileOpen && (
    <div className="fixed inset-0 bg-black/40 z-[9998]" />
  )}



  {/* MOBILE MENU */}

  <div
    ref={menuRef}
    className={`
    fixed top-20 left-1/2
    -translate-x-1/2
    w-[92%] max-w-md
    bg-white
    shadow-xl
    rounded-2xl
    p-6
    z-[9999]
    transition-all duration-300
    md:hidden
    ${
      mobileOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 pointer-events-none -translate-y-5"
    }
  `}
  >

    <div className="flex flex-col gap-4">

      {!isLoggedIn && (
        <>
          <Link href="/#how" onClick={() => setMobileOpen(false)}>
            How
          </Link>

          <Link href="/#why" onClick={() => setMobileOpen(false)}>
            Why
          </Link>

          <Link href="/login" onClick={() => setMobileOpen(false)}>
            Login
          </Link>

          <Link href="/register" onClick={() => setMobileOpen(false)}>
            Join
          </Link>
        </>
      )}



      {isLoggedIn && (
        <>
          <Link href="/explore" onClick={() => setMobileOpen(false)}>
            Explore
          </Link>

          <Link href="/messages" onClick={() => setMobileOpen(false)}>
            Messages
          </Link>

          <Link href="/bookings" onClick={() => setMobileOpen(false)}>
            My Bookings
          </Link>

          <Link href="/profile" onClick={() => setMobileOpen(false)}>
            Profile
          </Link>

          <Link href="/wallet" onClick={() => setMobileOpen(false)}>
            Wallet
          </Link>

          <button
            onClick={logout}
            className="text-red-500"
          >
            Logout
          </button>
        </>
      )}

    </div>

  </div>

</>

);

}