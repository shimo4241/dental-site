"use client";

import { ArrowRight } from "lucide-react";
import { beforeAfterCases } from "@/lib/data";
import { FadeInUp, StaggerGroup, StaggerItem } from "./animated";
import { SectionHeading } from "./section-heading";
import { BeforeAfterSlider } from "./before-after-slider";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function BeforeAfterSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="resultats" className="section-shell">
      <div className="panel-surface overflow-hidden bg-slate-950 text-white">
        {/* Top header area */}
        <div className="px-5 pt-10 md:px-10 md:pt-14 lg:px-14">
          <SectionHeading
            badge="Avant / Après"
            title="Des résultats visiblement raffinés, sans compromis sur la naturalité."
            description="Explorez nos transformations en faisant glisser le curseur sur chaque image. Chaque sourire est le fruit d'un protocole sur mesure, pensé pour durer."
            inverse
          />
        </div>

        {/* Cases grid */}
        <div className="px-5 pb-10 pt-10 md:px-10 md:pb-14 lg:px-14">
          <StaggerGroup className="grid gap-8 lg:gap-10">
            {beforeAfterCases.map((item, index) => (
              <StaggerItem key={item.title}>
                <motion.article
                  className="group rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 md:p-7"
                  whileHover={
                    reduceMotion
                      ? {}
                      : {
                          y: -3,
                          transition: {
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        }
                  }
                  style={{
                    transition: "border-color 0.7s ease, background-color 0.7s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
                    {/* Slider */}
                    <div
                      className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
                    >
                      <BeforeAfterSlider
                        beforeImage={item.beforeImage}
                        afterImage={item.afterImage}
                      />
                    </div>

                    {/* Info */}
                    <div
                      className={`flex flex-col justify-center ${
                        index % 2 === 1 ? "lg:order-1" : ""
                      }`}
                    >
                      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
                        {item.category}
                      </span>

                      <h3 className="mt-5 text-2xl font-semibold leading-tight text-white md:text-3xl">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-300/90">
                        {item.description}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors duration-500 group-hover:bg-white/[0.08]">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                            Technique
                          </p>
                          <p className="mt-2 text-sm font-medium leading-snug text-white">
                            {item.technique}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors duration-500 group-hover:bg-white/[0.08]">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                            Bénéfice perçu
                          </p>
                          <p className="mt-2 text-sm font-medium leading-snug text-white">
                            {item.resultat}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* CTA */}
          <FadeInUp className="mt-12 flex flex-col items-center text-center">
            <p className="text-sm text-slate-400">
              Vous souhaitez un sourire transformé ?
            </p>
            <Link
              href="#reservation"
              className="group/cta mt-4 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-all duration-500 hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              Prendre un rendez-vous
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/cta:translate-x-0.5" />
            </Link>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
