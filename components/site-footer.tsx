"use client";

import Link from "next/link";
import {
  Instagram,
  MapPin,
  MessageCircle,
  Phone
} from "lucide-react";
import { contactInfo } from "@/lib/data";
import { FadeInUp } from "./animated";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Avant / Après", href: "#resultats" },
  { label: "Équipe", href: "#equipe" },
  { label: "Contact", href: "#contact" },
  { label: "Réservation", href: "#reservation" }
];

const footerContacts = [
  {
    label: contactInfo.addressText,
    href: contactInfo.addressHref,
    icon: MapPin,
    external: true
  },
  {
    label: contactInfo.phoneText,
    href: contactInfo.phoneHref,
    icon: Phone,
    external: false
  },
  {
    label: contactInfo.whatsappText,
    href: contactInfo.whatsappHref,
    icon: MessageCircle,
    external: true
  },
  {
    label: "Instagram",
    href: contactInfo.instagramHref,
    icon: Instagram,
    external: true
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:px-8 lg:grid-cols-[1fr_auto_1.1fr]">
        <FadeInUp>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
              Maison Dentaire Élysée
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Dentisterie esthétique, orthodontique et implantaire dans un
              cadre premium pensé pour la confiance et la conversion.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="flex flex-col gap-3 text-sm text-slate-600">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-500 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.16}>
          <div className="grid gap-3 sm:grid-cols-2">
            {footerContacts.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 transition-all duration-500 hover:-translate-y-0.5 hover:border-teal-200 hover:text-teal-700"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </FadeInUp>
      </div>
    </footer>
  );
}
