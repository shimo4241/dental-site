"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { teamMembers } from "@/lib/data";
import { StaggerGroup, StaggerItem } from "./animated";
import { SectionHeading } from "./section-heading";
import { motion, useReducedMotion } from "framer-motion";

export function TeamSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="equipe" className="section-shell">
      <SectionHeading
        badge="L'équipe médicale"
        title="Des praticiens reconnus pour la précision de leur geste et la qualité de l'accompagnement."
        description="Une équipe pluridisciplinaire à taille humaine, réunie autour d'un standard d'exigence élevé et d'une relation patient fondée sur l'écoute, la pédagogie et la confiance."
      />

      <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <StaggerItem key={member.name} className="h-full">
            <motion.article
              className="panel-surface group h-full p-7"
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
              <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-lg shadow-cyan-900/20">
                  {member.image ? (
                    <motion.div
                      className="absolute inset-0"
                      whileHover={
                        reduceMotion
                          ? {}
                          : {
                              scale: 1.08,
                              transition: {
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                              },
                            }
                      }
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </motion.div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-700 via-cyan-600 to-slate-800 text-xl font-semibold text-white">
                      {member.initials}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xl font-semibold text-slate-950">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{member.role}</p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-600">
                {member.bio}
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-[1.4rem] border border-teal-100 bg-teal-50/80 px-4 py-3 text-sm text-teal-800 transition-colors duration-500 group-hover:border-teal-200 group-hover:bg-teal-50">
                <BadgeCheck className="h-4 w-4" />
                {member.highlight}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors duration-500 group-hover:border-teal-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
