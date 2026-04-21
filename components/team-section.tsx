import { BadgeCheck } from "lucide-react";
import { teamMembers } from "@/lib/data";
import { StaggerGroup, StaggerItem } from "./animated";
import { SectionHeading } from "./section-heading";

export function TeamSection() {
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
            <article className="panel-surface h-full p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-teal-700 via-cyan-600 to-slate-800 text-xl font-semibold text-white shadow-lg shadow-cyan-900/20">
                  {member.initials}
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

              <div className="mt-6 flex items-center gap-3 rounded-[1.4rem] border border-teal-100 bg-teal-50/80 px-4 py-3 text-sm text-teal-800">
                <BadgeCheck className="h-4 w-4" />
                {member.highlight}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
