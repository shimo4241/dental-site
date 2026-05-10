"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Phone
} from "lucide-react";
import {
  consultationMotifs,
  reservationBenefits
} from "@/lib/data";
import {
  dateEstReservable,
  obtenirCreneauxDisponibles,
  trouverProchaineDateDisponible
} from "@/lib/booking";
import { FadeInUp, StaggerGroup, StaggerItem } from "./animated";
import { SectionHeading } from "./section-heading";

const joursSemaine = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

type FormulaireReservation = {
  nomComplet: string;
  telephone: string;
  motif: (typeof consultationMotifs)[number];
};

type RetourApi = {
  message: string;
  reference?: string;
};

function construireGrilleCalendrier(dateCourante: Date) {
  const debut = startOfWeek(startOfMonth(dateCourante), {
    locale: fr,
    weekStartsOn: 1
  });
  const fin = endOfWeek(endOfMonth(dateCourante), {
    locale: fr,
    weekStartsOn: 1
  });

  return eachDayOfInterval({ start: debut, end: fin });
}

export function BookingSection() {
  const [aujourdhui, setAujourdhui] = useState<Date | null>(null);
  const [moisAffiche, setMoisAffiche] = useState<Date | null>(null);
  const [dateSelectionnee, setDateSelectionnee] = useState<Date | null>(null);
  const [heureSelectionnee, setHeureSelectionnee] = useState<string | null>(
    null
  );
  const [formulaire, setFormulaire] = useState<FormulaireReservation>({
    nomComplet: "",
    telephone: "",
    motif: "Douleur"
  });
  const [etatEnvoi, setEtatEnvoi] = useState<"idle" | "loading">("idle");
  const [retour, setRetour] = useState<{
    type: "success" | "error";
    contenu: RetourApi;
  } | null>(null);

  useEffect(() => {
    const base = startOfDay(new Date());
    const prochaineDate = trouverProchaineDateDisponible(base);
    const creneaux = obtenirCreneauxDisponibles(prochaineDate);

    setAujourdhui(base);
    setMoisAffiche(startOfMonth(prochaineDate));
    setDateSelectionnee(prochaineDate);
    setHeureSelectionnee(creneaux[0] ?? null);
  }, []);

  const joursDuCalendrier = useMemo(() => {
    if (!moisAffiche) {
      return [];
    }

    return construireGrilleCalendrier(moisAffiche);
  }, [moisAffiche]);

  const creneauxDisponibles = useMemo(() => {
    if (!dateSelectionnee) {
      return [];
    }

    return obtenirCreneauxDisponibles(dateSelectionnee);
  }, [dateSelectionnee]);

  useEffect(() => {
    if (!heureSelectionnee && creneauxDisponibles.length > 0) {
      setHeureSelectionnee(creneauxDisponibles[0]);
      return;
    }

    if (heureSelectionnee && !creneauxDisponibles.includes(heureSelectionnee)) {
      setHeureSelectionnee(creneauxDisponibles[0] ?? null);
    }
  }, [creneauxDisponibles, heureSelectionnee]);

  if (!aujourdhui || !moisAffiche) {
    return (
      <section id="reservation" className="section-shell">
        <div className="panel-surface p-8 md:p-10">
          <p className="text-sm text-slate-600">
            Chargement de l'agenda de réservation...
          </p>
        </div>
      </section>
    );
  }

  const gestionSelectionDate = (date: Date) => {
    if (!dateEstReservable(date, aujourdhui)) {
      return;
    }

    const creneaux = obtenirCreneauxDisponibles(date);
    setDateSelectionnee(date);
    setHeureSelectionnee(creneaux[0] ?? null);
    setRetour(null);
  };

  const gestionEnvoi = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dateSelectionnee || !heureSelectionnee) {
      setRetour({
        type: "error",
        contenu: {
          message:
            "Veuillez sélectionner une date disponible ainsi qu'un créneau horaire."
        }
      });
      return;
    }

    setEtatEnvoi("loading");
    setRetour(null);

    try {
      const response = await fetch("/api/rendez-vous", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formulaire,
          dateISO: dateSelectionnee.toISOString(),
          heure: heureSelectionnee
        })
      });

      const data = (await response.json()) as RetourApi;

      if (!response.ok) {
        setRetour({
          type: "error",
          contenu: data
        });
        return;
      }

      setRetour({
        type: "success",
        contenu: data
      });
      setFormulaire({
        nomComplet: "",
        telephone: "",
        motif: "Douleur"
      });
    } catch {
      setRetour({
        type: "error",
        contenu: {
          message:
            "Impossible d'envoyer votre demande pour le moment. Merci de réessayer."
        }
      });
    } finally {
      setEtatEnvoi("idle");
    }
  };

  return (
    <section id="reservation" className="section-shell">
      <SectionHeading
        badge="Agenda de réservation"
        title="Planifiez votre consultation en quelques instants."
        description="Sélectionnez une date, choisissez un créneau et transmettez votre demande. L'interface est entièrement pensée pour une expérience fluide, rassurante et haut de gamme."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <FadeInUp className="panel-surface p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                Calendrier interactif
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {format(moisAffiche, "LLLL yyyy", { locale: fr })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMoisAffiche((courant) => subMonths(courant!, 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-teal-200 hover:text-teal-700"
                aria-label="Mois précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMoisAffiche((courant) => addMonths(courant!, 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-teal-200 hover:text-teal-700"
                aria-label="Mois suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-2">
            {joursSemaine.map((jour) => (
              <div
                key={jour}
                className="pb-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-xs"
              >
                {jour}
              </div>
            ))}

            {joursDuCalendrier.map((jour) => {
              const reservable = dateEstReservable(jour, aujourdhui);
              const selectionne =
                dateSelectionnee !== null && isSameDay(jour, dateSelectionnee);

              return (
                <button
                  key={jour.toISOString()}
                  type="button"
                  onClick={() => gestionSelectionDate(jour)}
                  disabled={!reservable}
                  className={[
                    "aspect-square rounded-xl border text-[13px] font-medium transition-all duration-300 sm:rounded-2xl sm:text-sm",
                    selectionne
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-900/20"
                      : reservable
                        ? "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700"
                        : "border-transparent bg-slate-100/60 text-slate-300",
                    !isSameMonth(jour, moisAffiche) && !selectionne
                      ? "opacity-45"
                      : ""
                  ].join(" ")}
                >
                  <span className="sr-only">
                    {format(jour, "EEEE d MMMM yyyy", { locale: fr })}
                  </span>
                  <span className="flex h-full flex-col items-center justify-center">
                    <span>{format(jour, "d", { locale: fr })}</span>
                    {isToday(jour) && reservable ? (
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current" />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4 sm:rounded-[1.75rem] sm:p-5">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-teal-700" />
              <div>
                <p className="font-semibold text-slate-950">
                  Créneaux disponibles
                </p>
                <p className="text-sm text-slate-600">
                  {dateSelectionnee
                    ? format(dateSelectionnee, "EEEE d MMMM yyyy", {
                        locale: fr
                      })
                    : "Veuillez sélectionner une date"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {creneauxDisponibles.length > 0 ? (
                creneauxDisponibles.map((creneau) => (
                  <button
                    key={creneau}
                    type="button"
                    onClick={() => setHeureSelectionnee(creneau)}
                    className={`rounded-full px-4 py-3 text-[13px] font-semibold transition-all duration-300 sm:text-sm ${
                      heureSelectionnee === creneau
                        ? "bg-teal-700 text-white shadow-md shadow-teal-900/15"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700"
                    }`}
                  >
                    {creneau}
                  </button>
                ))
              ) : (
                <p className="text-sm text-slate-600">
                  Aucun créneau n'est disponible sur cette date. Merci de
                  choisir un autre jour.
                </p>
              )}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.12} className="panel-surface p-4 sm:p-6 md:p-8">
          <div className="rounded-[1.5rem] border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-5 sm:rounded-[1.75rem] sm:p-6">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-1 h-5 w-5 text-teal-700" />
              <div>
                <p className="text-lg font-semibold text-slate-950">
                  Résumé de votre demande
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {dateSelectionnee && heureSelectionnee
                    ? `Consultation souhaitée le ${format(
                        dateSelectionnee,
                        "EEEE d MMMM yyyy",
                        { locale: fr }
                      )} à ${heureSelectionnee}.`
                    : "Sélectionnez une date et un horaire pour finaliser votre demande."}
                </p>
              </div>
            </div>

            <StaggerGroup className="mt-6 space-y-3">
              {reservationBenefits.map((item) => (
                <StaggerItem key={item}>
                  <div className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-sm text-slate-700">
                    {item}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <form className="mt-8 space-y-5" onSubmit={gestionEnvoi}>
            <div className="space-y-2">
              <label
                htmlFor="nomComplet"
                className="text-sm font-semibold text-slate-800"
              >
                Nom Complet
              </label>
              <input
                id="nomComplet"
                name="nomComplet"
                value={formulaire.nomComplet}
                onChange={(event) =>
                  setFormulaire((courant) => ({
                    ...courant,
                    nomComplet: event.target.value
                  }))
                }
                placeholder="Ex. Nadia El Mansouri"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-teal-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="telephone"
                className="text-sm font-semibold text-slate-800"
              >
                Numéro de Téléphone
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="telephone"
                  name="telephone"
                  value={formulaire.telephone}
                  onChange={(event) =>
                    setFormulaire((courant) => ({
                      ...courant,
                      telephone: event.target.value
                    }))
                  }
                  placeholder="Ex. 06 61 23 45 67"
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-11 pr-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-teal-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="motif"
                className="text-sm font-semibold text-slate-800"
              >
                Motif de consultation
              </label>
              <select
                id="motif"
                name="motif"
                value={formulaire.motif}
                onChange={(event) =>
                  setFormulaire((courant) => ({
                    ...courant,
                    motif: event.target.value as FormulaireReservation["motif"]
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none ring-0 focus:border-teal-300"
              >
                {consultationMotifs.map((motif) => (
                  <option key={motif} value={motif}>
                    {motif}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={
                etatEnvoi === "loading" ||
                !dateSelectionnee ||
                !heureSelectionnee
              }
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-900/15 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {etatEnvoi === "loading"
                ? "Envoi de votre demande..."
                : "Confirmer le Rendez-vous"}
            </button>
          </form>

          {retour ? (
            <div
              className={`mt-5 rounded-[1.5rem] border px-5 py-4 text-sm leading-7 ${
                retour.type === "success"
                  ? "border-teal-200 bg-teal-50 text-teal-900"
                  : "border-rose-200 bg-rose-50 text-rose-900"
              }`}
            >
              <p className="font-semibold">{retour.contenu.message}</p>
              {retour.contenu.reference ? (
                <p className="mt-2">
                  Référence de suivi :{" "}
                  <span className="font-semibold">
                    {retour.contenu.reference}
                  </span>
                </p>
              ) : null}
            </div>
          ) : null}
        </FadeInUp>
      </div>
    </section>
  );
}
