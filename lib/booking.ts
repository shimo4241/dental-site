import { addDays, isBefore, startOfDay } from "date-fns";

const disponibilitesParJour: Record<number, string[]> = {
  1: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"],
  2: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"],
  3: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"],
  4: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"],
  5: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"],
  6: ["10:00", "11:00", "12:00", "13:00"]
};

export function obtenirCreneauxDisponibles(date: Date) {
  return disponibilitesParJour[date.getDay()] ?? [];
}

export function dateEstReservable(date: Date, reference: Date) {
  const dateNormalisee = startOfDay(date);
  const referenceNormalisee = startOfDay(reference);

  return (
    !isBefore(dateNormalisee, referenceNormalisee) &&
    obtenirCreneauxDisponibles(date).length > 0
  );
}

export function trouverProchaineDateDisponible(reference: Date) {
  let candidate = startOfDay(reference);

  for (let index = 0; index < 90; index += 1) {
    if (dateEstReservable(candidate, reference)) {
      return candidate;
    }

    candidate = addDays(candidate, 1);
  }

  return startOfDay(reference);
}
