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



<section className="relative overflow-hidden min-h-screen flex items-center">
  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

    {/* LEFT CONTENT */}
    <div className="space-y-6 sm:space-y-8 text-center md:text-left">

      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[84px] font-serif leading-tight tracking-tight">
        Connection,
        <br />
        done{" "}
        <span className="relative inline-block">
          intentionally
          <span className="absolute left-0 bottom-1 sm:bottom-2 md:bottom-3 w-full h-2 sm:h-3 bg-accent/40 -z-10 rounded-full"></span>
        </span>.
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed font-serif">
        Companio creates a structured environment where people can
        connect, talk, and share meaningful time — without pressure.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 sm:gap-6 pt-4">

        {/* GET STARTED */}
        <Link
          href={isLoggedIn ? "/explore" : "/register"}
          className="w-full sm:w-auto text-center bg-primary text-white px-8 py-4 rounded-full shadow-soft hover:scale-105 transition duration-300"
        >
          {isLoggedIn ? "Explore" : "Get Started"}
        </Link>

        {/* LEARN MORE */}
        <Link
          href="/how-payments-work"
          className="text-black underline underline-offset-4 hover:text-primary transition duration-300"
        >
          Learn More
        </Link>

      </div>
    </div>

    {/* RIGHT SIDE IMAGE CAROUSEL */}
    <div className="flex justify-center items-center mt-4 md:mt-0 w-full">
      <ImageCarousel />
    </div>

  </div>
</section>









{/* <FadeInSection>
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
      {/* <div className="grid md:grid-cols-3 gap-8">

        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/images/community1.jpg"
            alt="Community"
            className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
          />
        </div> */}

        {/* <div className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/images/community2.jpg"
            alt="Friends"
            className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
          />
        </div> */}

        {/* <div className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/images/community3.jpg"
            alt="Meaningful connection"
            className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

      </div>

    </div>
  </section>
</FadeInSection> */}
 <FadeInSection>
  <section
    id="learn-more-section"
    className="py-16 sm:py-20 md:py-24 bg-white"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 sm:space-y-12">

      {/* Heading + Copy */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight">
          Real People.
          <br />
          Real Conversations.
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
          Companio isn't only about connection — it can also become your
          part-time income.
          <br className="hidden sm:block" />
          Meet people you genuinely enjoy spending time with, set your own
          availability, and earn money simply by being present.
          <br className="hidden sm:block" />
          You decide who you meet. You decide your value.
        </p>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/images/community1.jpg"
            alt="Community"
            className="w-full h-[280px] sm:h-[340px] md:h-[420px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/images/community2.jpg"
            alt="Friends"
            className="w-full h-[280px] sm:h-[340px] md:h-[420px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/images/community3.jpg"
            alt="Meaningful connection"
            className="w-full h-[280px] sm:h-[340px] md:h-[420px] object-cover hover:scale-105 transition duration-500"
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
            ₹680/session
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
                All bookings processed securely .
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
{/* CONTACT + LEGAL FOOTER SECTION */}
<section className="py-16 sm:py-20 border-t border-primary/10 bg-background">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">

    {/* Main Contact Block */}
    <div className="text-center space-y-6">

      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Get in Touch
      </h2>

      <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
        Have questions, feedback, or partnership inquiries?
        Reach out and we’ll respond promptly.
      </p>

      {/* Emails */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm sm:text-lg">

        <a
          href="mailto:companio.support@gmail.com"
          className="text-primary hover:underline break-all transition"
        >
          companio.support@gmail.com
        </a>

        <a
          href="mailto:trycompanio@gmail.com"
          className="text-primary hover:underline break-all transition"
        >
          trycompanio@gmail.com
        </a>

      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-primary/10 my-8 sm:my-10" />

    {/* Legal Links */}
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted font-medium">

      <a
        href="/privacy-policy"
        className="hover:text-primary transition"
      >
        Privacy Policy
      </a>

      <a
        href="/terms"
        className="hover:text-primary transition"
      >
        Terms & Conditions
      </a>

      <a
        href="/refund-policy"
        className="hover:text-primary transition"
      >
        Refund Policy
      </a>

      <a
        href="/return-policy"
        className="hover:text-primary transition"
      >
        Return Policy
      </a>

    </div>

    {/* Copyright */}
    <p className="text-center text-xs sm:text-sm text-muted pt-8">
      © {new Date().getFullYear()} Companio. All rights reserved.
    </p>

  </div>
</section>



    </main>

    </>
  );
}

