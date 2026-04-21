import { Star } from "lucide-react";
import { beforeAfterCases } from "@/lib/data";
import { FadeInUp, StaggerGroup, StaggerItem } from "./animated";
import { SectionHeading } from "./section-heading";

export function BeforeAfterSection() {
  return (
    <section id="resultats" className="section-shell">
      <div className="panel-surface overflow-hidden bg-slate-950 text-white">
        <div className="grid gap-10 px-5 py-10 md:gap-12 md:px-10 md:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-14">
          <div>
            <SectionHeading
              badge="Avant / Après"
              title="Des résultats visiblement raffinés, sans compromis sur la naturalité."
              description="Cette section met en scène des emplacements visuels avant/après pour renforcer la confiance, illustrer la qualité des finitions et soutenir la conversion sur la prise de rendez-vous."
              inverse
            />

            <FadeInUp className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-300">
              <div className="flex items-center gap-3 text-white">
                <Star className="h-5 w-5 text-cyan-300" />
                <p className="font-semibold">
                  Idéal pour intégrer ultérieurement de vraies photographies
                  patient avec accord écrit.
                </p>
              </div>
              <p className="mt-4">
                Chaque carte ci-contre est pensée pour accueillir des images
                haute définition, un intitulé de traitement et une courte
                promesse de résultat.
              </p>
            </FadeInUp>
          </div>

          <StaggerGroup className="grid gap-4 md:gap-5">
            {beforeAfterCases.map((item) => (
              <StaggerItem key={item.title}>
                <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="grid flex-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.4rem] border border-dashed border-white/15 bg-white/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                          Avant
                        </p>
                        <div className="mt-3 flex h-32 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-slate-800 to-slate-900 text-center text-sm text-slate-300 sm:h-40">
                          Placeholder photo avant
                        </div>
                      </div>
                      <div className="rounded-[1.4rem] border border-dashed border-cyan-300/20 bg-cyan-400/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                          Après
                        </p>
                        <div className="mt-3 flex h-32 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-cyan-900/25 to-teal-900/15 text-center text-sm text-cyan-50 sm:h-40">
                          Placeholder photo après
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                        {item.category}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        {item.description}
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                            Technique
                          </p>
                          <p className="mt-2 text-sm font-medium text-white">
                            {item.technique}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                            Bénéfice perçu
                          </p>
                          <p className="mt-2 text-sm font-medium text-white">
                            {item.resultat}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
