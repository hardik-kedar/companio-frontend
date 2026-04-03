"use client";

import FadeInSection from "../components/FadeInSection";
import ImageCarousel from "../components/ImageCarousel";
import ImageSlider from "../components/ImageSlider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import IntroAnimation from "@/components/IntroAnimation";
export default function Home() {

const [isLoggedIn, setIsLoggedIn] = useState(false);





  const handleLearnMore = () => {
    document
      .getElementById("learn-more-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
        {
          credentials: "include",
        }
      );

      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

    } catch {
      setIsLoggedIn(false);
    }
  };

  checkAuth();

}, []);

  return (



    <>
  <IntroAnimation />

  

    <main className="min-h-screen bg-white text-black">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-0 md:pt-4">


        <div className="max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-10">

            <h1 className="text-[56px] md:text-[84px] font-serif leading-[1.05] tracking-tight">
              Connection,
              <br />
              done{" "}
              <span className="relative inline-block">
                intentionally
                <span className="absolute left-0 bottom-3 w-full h-3 bg-accent/40 -z-10 rounded-full"></span>
              </span>.
            </h1>

            <p className="text-xl text-gray-600 max-w-xl leading-relaxed font-serif">
              
              Companio creates a structured <br>
              </br>environment where people can
              connect,<br></br> talk, and share meaningful time<br>
              </br> — without pressure.
              
              
            </p>

            <div className="flex gap-6 pt-6">
             
        {/* GET STARTED */}
         <Link href={isLoggedIn ? "/explore" : "/register"}>
    <button className="bg-primary text-white px-8 py-4 rounded-full shadow-soft hover:scale-105 transition duration-300">
      {isLoggedIn ? "Explore" : "Get Started"}
    </button>
  </Link>

        {/* LEARN MORE */}
        <Link href="/how-payments-work">
        <button
          
          className="text-black underline underline-offset-4 hover:text-primary transition duration-300"
        >
          Learn More
        </button>

        </Link>
        





     
            </div>
          </div>



{/* RIGHT SIDE IMAGE CAROUSEL */}
<div className="flex justify-center items-center mt-12 md:mt-0">

  <ImageCarousel />
</div>






        </div>
      </section>




<FadeInSection>
  <section id="learn-more-section" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6 text-center space-y-12">

      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif leading-tight">
          Real People.
          <br />
          Real Conversations.
        </h2>

        <p className="text-muted max-w-2xl mx-auto text-lg">
          <br />
          Companio isn't only about connection —
          it can also become your part-time income.

          Meet people you genuinely enjoy spending time with,
          set your own availability,
          and earn money simply by being present.

          You decide who you meet.
          You decide your value.
        </p>
      </div>

      {/* Images Row */}
      <div className="grid md:grid-cols-3 gap-8">

        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/images/community1.jpg"
            alt="Community"
            className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/images/community2.jpg"
            alt="Friends"
            className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/images/community3.jpg"
            alt="Meaningful connection"
            className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

      </div>

    </div>
  </section>
</FadeInSection>





      {/* ================= WHY ================= */}
  
  
  


<FadeInSection>
  <section
    id="why"
    className="py-28 bg-white border-t border-primary/10"
  >
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

      {/* LEFT SIDE — CHANGING IMAGES */}
      <div className="flex justify-center">
        <ImageSlider />
      </div>

      {/* RIGHT SIDE — TEXT */}
      <div className="space-y-8">
        <h2 className="text-5xl font-serif leading-tight">
          Because no one  
          <br />
          should feel alone.
        </h2>

        <p className="text-lg text-muted font-serif leading-relaxed max-w-lg">
          Loneliness is real. And connection today feels <br></br>noisy,
          rushed, and transactional.
          <br /><br />
          Companio creates a structured, intentional environment
          where people can connect safely — without pressure.
        </p>

        <div className="pt-4">
         
        </div>
      </div>

    </div>
  </section>
</FadeInSection>

  

      {/* ================= HOW IT WORKS ================= */}
    
    
    
    <FadeInSection>
  <section
    id="how"
    className="py-28 px-6 bg-background scroll-mt-40"
  >
    <div className="max-w-6xl mx-auto px-6 text-center space-y-16">

      <h2 className="text-[42px] md:text-[56px] font-serif">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-12">

        <div className="bg-[#F3EDE4] p-10 rounded-3xl shadow-soft">
          <h3 className="text-xl font-semibold mb-4">
            1. Discover
          </h3>
          <p className="text-gray-600">
            Browse verified hosts near you.
          </p>
        </div>

        <div className="bg-[#F3EDE4] p-10 rounded-3xl shadow-soft">
          <h3 className="text-xl font-semibold mb-4">
            2. Connect
          </h3>
          <p className="text-gray-600">
            Book securely and unlock conversation.
          </p>
        </div>

        <div className="bg-[#F3EDE4] p-10 rounded-3xl shadow-soft">
          <h3 className="text-xl font-semibold mb-4">
            3. Experience
          </h3>
          <p className="text-gray-600">
            Share time, talk openly, build comfort.
          </p>
        </div>

      </div>
    </div>
  </section>
</FadeInSection>

    
    
    



<FadeInSection>
  <section className="py-32 bg-[#F8F5F1]">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

      {/* LEFT */}
      <div className="space-y-8">
        <h2 className="text-[40px] md:text-[52px] font-serif leading-tight">
          Earn by
          <br />
          being present.
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed">
          Companio enables individuals to earn by offering meaningful
          companionship. Set your hourly rate, accept bookings,
          and receive secure payouts.
        </p>

        <p className="text-sm text-gray-500">
          Platform commission: 15% per completed booking.
        </p>
      </div>

      {/* RIGHT */}
      <div className="bg-white rounded-3xl p-16 shadow-soft text-center border border-black/5">
        <p className="text-6xl font-serif font-semibold text-primary">
          ₹800
        </p>
        <p className="text-gray-500 mt-2">per session</p>

        <div className="mt-8 pt-8 border-t border-black/5">
          <p className="text-sm text-gray-500">
            After commission:
          </p>
          <p className="text-2xl font-semibold text-primary">
            ₹680/hr
          </p>
        </div>
      </div>

    </div>
  </section>
</FadeInSection>









<FadeInSection>
  <section className="py-32 bg-white">
    <div className="max-w-4xl mx-auto px-6 text-center space-y-12">

      <h2 className="text-[40px] md:text-[52px] font-serif">
        Simple Monthly Access
      </h2>

      <div className="bg-[#F3EDE4] p-16 rounded-3xl shadow-soft space-y-8 border border-black/5">

        <p className="text-6xl font-serif font-semibold text-primary">
          ₹199
          <span className="text-base font-normal text-gray-500"> / month</span>
        </p>

        <p className="text-gray-600 max-w-md mx-auto">
          Unlimited browsing, secure booking access,
          verified users, and protected interactions.
        </p>
        <Link href="/register">
        <button className="bg-primary text-white px-10 py-4 rounded-full hover:scale-105 transition duration-300">
          Start Membership
        </button>
</Link>
      </div>

    </div>
  </section>
</FadeInSection>


      {/* ================= SAFETY STRIP ================= */}
      <FadeInSection>
        <section className="py-20 border-t border-black/5 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">

            <div>
              <h4 className="font-semibold  text-lg mb-2">
                Verified Users
              </h4>
              <p className="text-gray-600 text-sm">
                Subscription-based access ensures serious members only.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Secure Payments
              </h4>
              <p className="text-gray-600 text-sm">
                All bookings processed securely via Razorpay.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Controlled Interaction
              </h4>
              <p className="text-gray-600 text-sm">
                Chat unlocks only after successful payment.
              </p>
            </div>

          </div>
        </section>
      </FadeInSection>

  



{/* CONTACT SECTION */}
<section className="py-20 border-t border-primary/10 bg-background">
  <div className="max-w-5xl mx-auto px-6 text-center space-y-8">

    <h2 className="text-3xl font-semibold tracking-tight">
      Get in Touch
    </h2>

    <p className="text-muted max-w-xl mx-auto">
      Have questions, feedback, or partnership inquiries?  
      Reach out and we’ll respond promptly.
    </p>

    <div className="flex flex-col md:flex-row justify-center gap-6 text-lg">

      <a 
        href="mailto:support@companio.com"
        className="text-primary hover:underline transition"
      >
        companio.support@gmail.com
      </a>

      <a 
        href="mailto:partners@companio.com"
        className="text-primary hover:underline transition"
      >
        trycompanio@gmail.com
      </a>

    </div>

    <p className="text-sm text-muted pt-6">
      © {new Date().getFullYear()} Companio. All rights reserved.
    </p>

  </div>
</section>




    </main>

    </>
  );
}

