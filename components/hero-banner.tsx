"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Play
} from "lucide-react";
import { contactInfo, trustMetrics } from "@/lib/data";
import { LoadIn, StaggerGroup, StaggerItem } from "./animated";
import { motion, useReducedMotion } from "framer-motion";

const cinematic = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3,
    },
  },
};

const shimmer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.5, 0],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      delay: 1.2,
    },
  },
};

export function HeroBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-shell pt-14 md:pt-20">
      <div className="panel-surface overflow-hidden bg-hero-radial">
        <div className="grid gap-12 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
          <StaggerGroup initialOnLoad className="flex flex-col justify-center">
            <StaggerItem className="inline-flex">
              <span className="eyebrow">Centre dentaire haut de gamme</span>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
                L'excellence du sourire, pensée comme une expérience médicale
                d'exception.
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Soins esthétiques, implantaires et orthodontiques dans un cadre
                raffiné, discret et technologique, conçu pour offrir confort,
                précision et sérénité à chaque étape.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#reservation"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-teal-700"
                >
                  Prendre un Rendez-vous
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#equipe"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-700 hover:border-teal-200 hover:text-teal-700"
                >
                  Découvrir l'Équipe Médicale
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 grid gap-4 rounded-[1.5rem] border border-white/70 bg-white/70 p-5 text-sm text-slate-600 md:grid-cols-3">
                <a
                  href={contactInfo.addressHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-[1.2rem] hover:bg-white/70"
                >
                  <MapPin className="mt-0.5 h-5 w-5 text-teal-700" />
                  <div>
                    <p className="font-semibold text-slate-950">Adresse</p>
                    <p>{contactInfo.addressText}</p>
                  </div>
                </a>
                <a
                  href={contactInfo.phoneHref}
                  className="flex items-start gap-3 rounded-[1.2rem] hover:bg-white/70"
                >
                  <Phone className="mt-0.5 h-5 w-5 text-teal-700" />
                  <div>
                    <p className="font-semibold text-slate-950">Téléphone</p>
                    <p>{contactInfo.phoneText}</p>
                  </div>
                </a>
                <a
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-[1.2rem] hover:bg-white/70"
                >
                  <MessageCircle className="mt-0.5 h-5 w-5 text-teal-700" />
                  <div>
                    <p className="font-semibold text-slate-950">WhatsApp</p>
                    <p>{contactInfo.whatsappText}</p>
                  </div>
                </a>
              </div>
            </StaggerItem>

            <StaggerGroup initialOnLoad className="mt-10 grid gap-4 sm:grid-cols-3">
              {trustMetrics.map((item) => (
                <StaggerItem key={item.label} className="h-full">
                  <div className="h-full rounded-[1.5rem] border border-white/80 bg-white/70 p-5">
                    <p className="text-3xl font-semibold text-slate-950">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <StaggerItem>
              <a
                href={contactInfo.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-700"
              >
                <Instagram className="h-4 w-4" />
                Suivre l'actualité du centre sur Instagram
              </a>
            </StaggerItem>
          </StaggerGroup>

          {/* ── Hero visual card ── */}
          <LoadIn
            delay={0.18}
            className="relative flex min-h-[520px] flex-col rounded-[2rem] border border-white/70 bg-slate-950 text-white shadow-luxe"
          >
            {/* Ambient gradient overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.2),transparent_38%),linear-gradient(145deg,rgba(8,145,178,0.18),transparent_45%)]" />

            <div className="relative flex flex-1 flex-col p-5">
              {/* Badge */}
              <div className="mb-4 flex items-center gap-2 text-sm text-teal-100">
                <BadgeCheck className="h-4 w-4" />
                Plateau technique de dernière génération
              </div>

              {/* Cinematic image reveal */}
              <div className="relative flex-1 overflow-hidden rounded-[1.4rem]">
                <motion.div
                  className="absolute inset-0"
                  variants={reduceMotion ? {} : cinematic}
                  initial="hidden"
                  animate="visible"
                >
                  <Image
                    src="/images/hero/hero_banner.png"
                    alt="Intérieur de la clinique dentaire haut de gamme"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority
                  />
                </motion.div>

                {/* Cinematic shimmer */}
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  variants={reduceMotion ? {} : shimmer}
                  initial="hidden"
                  animate="visible"
                />

                {/* Bottom gradient for text contrast */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/80 to-transparent" />

                {/* Overlay badge inside the image */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                    <Play className="h-4 w-4 text-white" fill="white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Visite virtuelle
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Découvrez notre clinique
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom info cards */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.2rem] border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-sm font-semibold text-white">
                    Parcours patient confidentiel
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Accueil premium, diagnostics détaillés et accompagnement
                    personnalisé à chaque rendez-vous.
                  </p>
                </div>
                <div className="rounded-[1.2rem] border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-sm font-semibold text-white">
                    Résultats pensés sur la durée
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Protocoles précis, esthétique naturelle et suivi clinique
                    rigoureux.
                  </p>
                </div>
              </div>
            </div>
          </LoadIn>
        </div>
      </div>
    </section>
  );
}
