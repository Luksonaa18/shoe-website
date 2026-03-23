"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navItems = [
    { href: "/", label: "მთავარი", num: "01" },
    { href: "/profile", label: "პროფილი", num: "02" },
    { href: "/about", label: "ჩვენს შესახებ", num: "03" },
  ];

  const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

  const menuVariants = {
    closed: {
      clipPath: "inset(0 0 100% 0)",
      transition: { duration: 0.5, ease },
    },
    open: {
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.5, ease },
    },
  };

  const itemVariants = {
    closed: { y: 40, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.15 + i * 0.07,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed bg-[#0a0a0f] top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 bg-inherit" : "py-5"
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all duration-500 ${
            scrolled
              ? "backdrop-blur-xl shadow-[0_2px_32px_rgba(0,0,0,0.3)] border border-white/10"
              : "bg-transparent"
          }`}
          style={{ padding: scrolled ? "12px 24px" : "0 24px" }}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 select-none">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
              style={{
                background: "linear-gradient(135deg, #0f0f0f 0%, #3d3d3d 100%)",
              }}
            >
              T
            </span>
            <span className="font-black text-xl tracking-tight text-white">
              Tes Shoes
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-white transition-colors duration-200 group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-200" />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors duration-200"
            >
              Get started
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-[5px] hover:bg-white/10 transition-colors duration-200"
              aria-label="Open menu"
            >
              <span className="w-5 h-[1.5px] bg-white rounded-full block" />
              <span className="w-3.5 h-[1.5px] bg-white rounded-full block self-start ml-[5px]" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f] origin-top text-white"
              style={{ borderRadius: "0 0 28px 28px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black bg-gradient-to-br from-neutral-900 to-neutral-700">
                    L
                  </span>
                  <span className="font-black text-xl text-white">Logo</span>
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <nav className="px-4 py-6 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={itemVariants}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-white/10"
                    >
                      <span className="text-2xl font-bold">{item.label}</span>→
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                className="px-6 py-6"
                custom={navItems.length}
                variants={itemVariants}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-4 rounded-2xl bg-white text-black font-semibold"
                >
                  Get started
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
