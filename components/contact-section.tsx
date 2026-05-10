"use client";

import Link from "next/link";
import {
  Instagram,
  MapPin,
  MessageCircle,
  Phone
} from "lucide-react";
import { contactInfo } from "@/lib/data";
import { FadeInUp, StaggerGroup, StaggerItem } from "./animated";
import { SectionHeading } from "./section-heading";
import { motion, useReducedMotion } from "framer-motion";

const contactCards = [
  {
    title: contactInfo.addressLabel,
    value: contactInfo.addressText,
    description: "Accès simple et emplacement central à Casablanca.",
    href: contactInfo.addressHref,
    icon: MapPin,
    external: true
  },
  {
    title: contactInfo.phoneLabel,
    value: contactInfo.phoneText,
    description: "Appelez directement le secrétariat pour une réponse rapide.",
    href: contactInfo.phoneHref,
    icon: Phone,
    external: false
  },
  {
    title: contactInfo.whatsappLabel,
    value: contactInfo.whatsappText,
    description: "Échange fluide pour confirmation, suivi et questions.",
    href: contactInfo.whatsappHref,
    icon: MessageCircle,
    external: true
  },
  {
    title: contactInfo.instagramLabel,
    value: contactInfo.instagramText,
    description: "Découvrez l'univers visuel et les actualités du centre.",
    href: contactInfo.instagramHref,
    icon: Instagram,
    external: true
  }
];

export function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="section-shell">
      <div className="panel-surface overflow-hidden bg-white/85 px-5 py-10 sm:px-6 md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <SectionHeading
              badge="Coordonnées & accès"
              title="Un contact direct, clair et premium à chaque point d'entrée."
              description="Téléphone, WhatsApp, Instagram et localisation sont accessibles immédiatement afin de fluidifier la prise de contact, rassurer les patients mobiles et soutenir la conversion."
            />

            <FadeInUp delay={0.16}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#reservation"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-900/15"
                >
                  Réserver une consultation
                </Link>
                <a
                  href={contactInfo.phoneHref}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition-all duration-500 hover:border-teal-200 hover:text-teal-700"
                >
                  Appeler le secrétariat
                </a>
              </div>
            </FadeInUp>
          </div>

          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <StaggerItem key={card.title} className="h-full">
                  <motion.a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noreferrer" : undefined}
                    className="flex h-full flex-col rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)]"
                    whileHover={
                      reduceMotion
                        ? {}
                        : {
                            y: -4,
                            transition: {
                              duration: 0.6,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          }
                    }
                    style={{
                      transition: "border-color 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgb(153, 246, 228)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgb(226, 232, 240)";
                    }}
                  >
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-600 text-white"
                      whileHover={
                        reduceMotion
                          ? {}
                          : {
                              scale: 1.06,
                              transition: {
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                              },
                            }
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
                      {card.title}
                    </p>
                    <p className="mt-3 text-xl font-semibold text-slate-950">
                      {card.value}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {card.description}
                    </p>
                  </motion.a>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
