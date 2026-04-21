import Link from "next/link";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "@/lib/data";

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
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="border-b border-white/70 bg-white/80">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 md:px-8">
          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-[11px] font-medium text-slate-600 hover:border-teal-200 hover:text-teal-700 sm:text-xs"
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-600 text-sm font-bold text-white shadow-lg shadow-teal-900/20">
            DE
          </div>
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
              className="text-sm font-medium text-slate-600 hover:text-slate-950"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:text-teal-700 lg:hidden"
            aria-label="Contacter sur WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href={contactInfo.phoneHref}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:text-teal-700 lg:hidden"
            aria-label="Appeler le centre"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Link
            href="#reservation"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-teal-700 sm:px-5"
          >
            <span className="sm:hidden">Rendez-vous</span>
            <span className="hidden sm:inline">Prendre un Rendez-vous</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
