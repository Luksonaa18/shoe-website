"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";
import shoe from "@/public/shoe.png";

const HomePage = () => {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftShoeRef = useRef<HTMLDivElement>(null);
  const rightShoeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(
      leftShoeRef.current,
      { x: -420, opacity: 0, rotate: -35, scale: 0.5 },
      { x: 0, opacity: 1, rotate: -12, scale: 1, duration: 1.1 },
    )
      .fromTo(
        rightShoeRef.current,
        { x: 420, opacity: 0, rotate: 35, scale: 0.5 },
        { x: 0, opacity: 1, rotate: 12, scale: 1, duration: 1.1 },
        "<",
      )

      .to([leftShoeRef.current, rightShoeRef.current], {
        scaleY: 0.88,
        scaleX: 1.08,
        duration: 0.1,
        ease: "power1.in",
      })
      .to([leftShoeRef.current, rightShoeRef.current], {
        scaleY: 1,
        scaleX: 1,
        duration: 0.45,
        ease: "elastic.out(1.2, 0.4)",
      })

      .fromTo(
        headingRef.current,
        { opacity: 0, y: -60, scale: 1.3, letterSpacing: "0.4em" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          letterSpacing: "0.02em",
          duration: 0.75,
          ease: "back.out(2)",
        },
        "-=0.5",
      )

      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2",
      )

      .fromTo(
        ringRef.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
        "<-0.6",
      );

    gsap.to(leftShoeRef.current, {
      y: -18,
      rotate: -8,
      duration: 2.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.4,
    });
    gsap.to(rightShoeRef.current, {
      y: -14,
      rotate: 8,
      duration: 2.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.6,
    });

    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 18,
      ease: "none",
      repeat: -1,
    });
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, x: -80, scale: 0.92 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardRefs.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  const cardData = [
    {
      title: "Premium Quality",
      desc: "Crafted with the finest materials for all-day comfort.",
      icon: "👟",
      color: "#ff6b35",
    },
    {
      title: "Latest Trends",
      desc: "Stay ahead with designs straight from the runway.",
      icon: "🔥",
      color: "#e63946",
    },
    {
      title: "Affordable Prices",
      desc: "Luxury look, everyday price — no compromise.",
      icon: "💸",
      color: "#2a9d8f",
    },
    {
      title: "Fast Delivery",
      desc: "From warehouse to doorstep in record time.",
      icon: "🚚",
      color: "#457b9d",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0a0a0f", fontFamily: "'Georgia', serif" }}
    >
      <div
        ref={sectionRef}
        className="relative h-screen flex items-center justify-center overflow-hidden mb-24"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 60%, #1a0a2e 0%, #0d0d1a 60%, #0a0a0f 100%)",
          boxShadow: "inset 0 0 120px rgba(120,60,255,0.12)",
        }}
      >
        <div
          ref={ringRef}
          className="absolute w-130 h-130 rounded-full"
          style={{
            border: "1.5px dashed rgba(180,120,255,0.2)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div
          className="absolute w-90 h-90 rounded-full"
          style={{
            border: "1px solid rgba(255,100,60,0.12)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />

        <div
          className="absolute w-72 h-20 rounded-full blur-3xl"
          style={{
            background: "rgba(140,80,255,0.25)",
            bottom: "22%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <div
          ref={leftShoeRef}
          className="absolute z-10"
          style={{ left: "18%", bottom: "10%", width: "360px" }}
        >
          <Image
            src={shoe}
            alt="shoe left"
            className="w-full"
            style={{
              filter:
                "drop-shadow(0 20px 60px rgba(255,80,50,0.45)) drop-shadow(0 4px 12px rgba(0,0,0,0.8))",
            }}
          />
        </div>

        <div
          ref={rightShoeRef}
          className="absolute z-10 scale-x-[-1]"
          style={{ right: "18%", bottom: "10%", width: "360px" }}
        >
          <Image
            src={shoe}
            alt="shoe right"
            className="w-full"
            width={900}
            style={{
              filter:
                "drop-shadow(0 20px 60px rgba(80,120,255,0.45)) drop-shadow(0 4px 12px rgba(0,0,0,0.8))",
            }}
          />
        </div>

        <div className="relative z-20 text-center px-4 mb-29">
          <h2
            ref={headingRef}
            className="text-4xl  sm:text-3xl lg:text-8xl font-black uppercase text-white mb-4"
            style={{
              opacity: 0,
              background:
                "linear-gradient(135deg, #ffffff 0%, #c4a8ff 50%, #ff8c69 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.05,
            }}
          >
            ახალი
            <br />
            კოლექცია
          </h2>
          <p
            ref={subRef}
            className="text-sm uppercase tracking-[0.4em] font-medium"
            style={{ opacity: 0, color: "rgba(255,255,255,0.4)" }}
          >
            გაზაფხული / ზაფხული 2026
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:grid-cols-2 lg:grid-cols-4 mb-15 max-w-6xl mx-auto">
        {cardData.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className="card relative rounded-2xl p-6 overflow-hidden group cursor-default"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              opacity: 0,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${card.color}22, transparent 70%)`,
              }}
            />

            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
              }}
            />

            <div
              className="text-3xl mb-5 w-12 h-12 flex items-center justify-center rounded-xl"
              style={{ background: `${card.color}18` }}
            >
              {card.icon}
            </div>
            <h3 className="font-bold text-white mb-2 text-base tracking-tight">
              {card.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
