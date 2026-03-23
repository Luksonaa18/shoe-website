"use client"
import React from "react";

const Footer = () => {
  const links = {
    Company: ["About Us", "Careers", "Press", "Sustainability"],
    Support: ["FAQ", "Shipping", "Returns", "Size Guide", "Contact"],
  };

  const socials = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      href: "#",
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      href: "#",
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="h-auto"
      style={{
        
        background: "#0a0a0f",
        fontFamily: "'Georgia', serif",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Top marquee strip ─────────────────────────────────────── */}
      <div
        className="overflow-hidden py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 22s linear infinite" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-xs uppercase tracking-[0.35em] font-semibold"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              Free shipping over $80 &nbsp;✦&nbsp; New collection 2026
              &nbsp;✦&nbsp; Handcrafted quality
            </span>
          ))}
        </div>
      </div>

      {/* ── Main footer body ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <span
                className="text-4xl font-black uppercase tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #c4a8ff 50%, #ff8c69 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Tes shoes
              </span>
              <p
                className="mt-3 text-sm leading-relaxed max-w-xs"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                Shoes that move with you. Built for the streets, designed for
                the bold. Every pair tells a story — make it yours.
              </p>
            </div>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,107,53,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,53,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                className="text-xs uppercase tracking-[0.3em] font-bold mb-5"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#fff")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.45)")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ───────────────────────────────────────────────── */}
        <div
          className="my-10"
          style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
        />

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            © 2026 Tes Shoes. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.2)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.6)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.2)")
                }
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Big watermark text ────────────────────────────────────── */}
      <div
        className="text-center pb-2 select-none pointer-events-none overflow-hidden"
        style={{
          fontSize: "clamp(4rem, 14vw, 11rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
          fontFamily: "'Georgia', serif",
        }}
      >
        TES SHOES
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;