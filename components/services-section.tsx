"use client";

import { Gem, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { services } from "@/lib/data";
import { StaggerGroup, StaggerItem } from "./animated";
import { SectionHeading } from "./section-heading";
import { motion, useReducedMotion } from "framer-motion";

const icons = [ShieldCheck, Stethoscope, Gem, Sparkles];

export function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="section-shell">
      <SectionHeading
        badge="Nos services"
        title="Des traitements conçus pour conjuguer santé, précision et élégance."
        description="Chaque protocole est pensé sur mesure, avec une approche clinique avancée, des matériaux premium et une attention constante portée au confort du patient."
      />

      <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = icons[index];

          return (
            <StaggerItem key={service.title} className="h-full">
              <motion.article
                className="panel-surface group h-full p-6 md:p-7"
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
              >
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-600 text-white shadow-lg shadow-cyan-900/10"
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
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="mt-6 text-2xl font-semibold text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-700 transition-colors duration-500 group-hover:border-teal-100 group-hover:bg-teal-50/40"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
