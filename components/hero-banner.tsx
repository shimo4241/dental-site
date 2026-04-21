import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Instagram,
  MapPin,
  MessageCircle,
  Phone
} from "lucide-react";
import { contactInfo, trustMetrics } from "@/lib/data";
import { LoadIn, StaggerGroup, StaggerItem } from "./animated";

export function HeroBanner() {
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

          <LoadIn
            delay={0.18}
            className="relative min-h-[520px] rounded-[2rem] border border-white/70 bg-slate-950 p-6 text-white shadow-luxe"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.2),transparent_38%),linear-gradient(145deg,rgba(8,145,178,0.18),transparent_45%)]" />
            <StaggerGroup
              initialOnLoad
              className="relative flex h-full flex-col justify-between rounded-[1.6rem] border border-white/10 bg-white/5 p-6"
            >
              <StaggerItem>
                <div className="flex items-center gap-2 text-sm text-teal-100">
                  <BadgeCheck className="h-4 w-4" />
                  Plateau technique premium et image de fond à intégrer
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="rounded-[1.75rem] border border-dashed border-white/20 bg-white/5 p-6">
                  <div className="flex h-[320px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-800 via-teal-900/20 to-slate-900">
                    <div className="max-w-xs text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-100/70">
                        Emplacement visuel
                      </p>
                      <p className="mt-4 text-2xl font-semibold leading-tight">
                        Image hyper-réaliste de la clinique, de l'accueil ou
                        d'un sourire avant/après.
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Parcours patient confidentiel
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Accueil premium, diagnostics détaillés et accompagnement
                      personnalisé à chaque rendez-vous.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Résultats pensés sur la durée
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Protocoles précis, esthétique naturelle et suivi clinique
                      rigoureux.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </LoadIn>
        </div>
      </div>
    </section>
  );
}
