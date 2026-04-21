import { Gem, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { services } from "@/lib/data";
import { StaggerGroup, StaggerItem } from "./animated";
import { SectionHeading } from "./section-heading";

const icons = [ShieldCheck, Stethoscope, Gem, Sparkles];

export function ServicesSection() {
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
              <article className="panel-surface group h-full p-6 hover:-translate-y-1 hover:border-teal-200 md:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-600 text-white shadow-lg shadow-cyan-900/10">
                  <Icon className="h-6 w-6" />
                </div>
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
                      className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-700"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
