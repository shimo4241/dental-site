"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "@/lib/data";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
  AnimatePresence
} from "framer-motion";

const navigation = [
  { label: "Services", href: "#services" },
  { label: "Avant / Après", href: "#resultats" },
  { label: "L'équipe", href: "#equipe" },
  { label: "Contact", href: "#contact" },
  { label: "Réservation", href: "#reservation" }
];

const quickLinks = [
  {
    label: contactInfo.addressText,
    href: contactInfo.addressHref,
    icon: MapPin
  },
  {
    label: contactInfo.phoneText,
    href: contactInfo.phoneHref,
    icon: Phone
  },
  {
    label: contactInfo.whatsappText,
    href: contactInfo.whatsappHref,
    icon: MessageCircle
  },
  {
    label: "Instagram",
    href: contactInfo.instagramHref,
    icon: Instagram
  }
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
    setTopBarVisible(latest < 60);
  });

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Top bar (auto-hides on scroll) ── */}
      <AnimatePresence>
        {topBarVisible && (
          <motion.div
            className="border-b border-white/70 bg-white/80"
            initial={{ height: "auto", opacity: 1 }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 md:px-8">
              {quickLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-[11px] font-medium text-slate-600 transition-all duration-300 hover:border-teal-200 hover:text-teal-700 sm:text-xs"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main nav ── */}
      <motion.div
        className="border-b transition-colors duration-700"
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.88)"
            : "rgba(255, 255, 255, 0.7)",
          borderColor: isScrolled
            ? "rgba(226, 232, 240, 0.6)"
            : "rgba(255, 255, 255, 0.6)",
          backdropFilter: isScrolled ? "blur(24px)" : "blur(16px)",
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-600 text-sm font-bold text-white shadow-lg shadow-teal-900/20"
              whileHover={
                reduceMotion
                  ? {}
                  : { scale: 1.05, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }
            >
              DE
            </motion.div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                Maison Dentaire
              </p>
              <p className="text-lg font-semibold text-slate-950">Élysée</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-slate-600 transition-colors duration-300 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contactInfo.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-teal-200 hover:text-teal-700 lg:hidden"
              aria-label="Contacter sur WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={contactInfo.phoneHref}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-teal-200 hover:text-teal-700 lg:hidden"
              aria-label="Appeler le centre"
            >
              <Phone className="h-5 w-5" />
            </a>
            <Link
              href="#reservation"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-900/15 sm:px-5"
            >
              <span className="sm:hidden">Rendez-vous</span>
              <span className="hidden sm:inline">Prendre un Rendez-vous</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
