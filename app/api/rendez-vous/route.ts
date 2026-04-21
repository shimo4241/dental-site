import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactInfo } from "@/lib/data";

const motifsAutorises = new Set(["Douleur", "Esthétique", "Contrôle", "Autre"]);

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;
const resendToEmail = process.env.RESEND_TO_EMAIL;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formaterDateReservation(dateISO: string, heure: string) {
  return `${format(new Date(dateISO), "EEEE d MMMM yyyy", {
    locale: fr
  })} à ${heure}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      nomComplet?: string;
      telephone?: string;
      motif?: string;
      dateISO?: string;
      heure?: string;
    };

    const nomComplet = body.nomComplet?.trim();
    const telephone = body.telephone?.trim();
    const motif = body.motif?.trim();
    const dateISO = body.dateISO?.trim();
    const heure = body.heure?.trim();

    if (!nomComplet || nomComplet.length < 3) {
      return NextResponse.json(
        { message: "Veuillez renseigner un nom complet valide." },
        { status: 400 }
      );
    }

    if (!telephone || telephone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { message: "Veuillez renseigner un numéro de téléphone valide." },
        { status: 400 }
      );
    }

    if (!motif || !motifsAutorises.has(motif)) {
      return NextResponse.json(
        { message: "Veuillez sélectionner un motif de consultation valide." },
        { status: 400 }
      );
    }

    if (!dateISO || Number.isNaN(Date.parse(dateISO)) || !heure) {
      return NextResponse.json(
        { message: "Veuillez sélectionner une date et un créneau horaire." },
        { status: 400 }
      );
    }

    const reference = `RDV-${new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 12)}`;

    if (!resend || !resendFromEmail || !resendToEmail) {
      return NextResponse.json(
        {
          message:
            "Le service email n'est pas encore configuré. Ajoutez RESEND_API_KEY, RESEND_FROM_EMAIL et RESEND_TO_EMAIL pour activer les notifications."
        },
        { status: 500 }
      );
    }

    const dateFormatee = formaterDateReservation(dateISO, heure);

    const { error } = await resend.emails.send({
      from: resendFromEmail,
      to: [resendToEmail],
      subject: `Nouvelle demande de rendez-vous - ${nomComplet}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fcfc;padding:32px;color:#0f172a;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dbeafe;border-radius:24px;padding:32px;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#0f766e;">
              Nouvelle réservation
            </p>
            <h1 style="margin:0 0 18px;font-size:28px;line-height:1.25;">
              Demande reçue pour Maison Dentaire Élysée
            </h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#475569;">
              Une nouvelle demande de rendez-vous a été envoyée depuis le formulaire du site.
            </p>

            <table style="width:100%;border-collapse:separate;border-spacing:0 12px;">
              <tr>
                <td style="width:180px;font-weight:700;color:#0f172a;">Référence</td>
                <td style="color:#334155;">${escapeHtml(reference)}</td>
              </tr>
              <tr>
                <td style="font-weight:700;color:#0f172a;">Nom complet</td>
                <td style="color:#334155;">${escapeHtml(nomComplet)}</td>
              </tr>
              <tr>
                <td style="font-weight:700;color:#0f172a;">Téléphone</td>
                <td style="color:#334155;">${escapeHtml(telephone)}</td>
              </tr>
              <tr>
                <td style="font-weight:700;color:#0f172a;">Motif</td>
                <td style="color:#334155;">${escapeHtml(motif)}</td>
              </tr>
              <tr>
                <td style="font-weight:700;color:#0f172a;">Date souhaitée</td>
                <td style="color:#334155;">${escapeHtml(dateFormatee)}</td>
              </tr>
            </table>

            <div style="margin-top:24px;padding:20px;border-radius:18px;background:#ecfeff;color:#164e63;">
              <p style="margin:0 0 8px;font-weight:700;">Coordonnées publiques du centre</p>
              <p style="margin:0;line-height:1.8;">
                ${escapeHtml(contactInfo.addressText)}<br />
                ${escapeHtml(contactInfo.phoneText)}<br />
                ${escapeHtml(contactInfo.whatsappText)}
              </p>
            </div>
          </div>
        </div>
      `
    });

    if (error) {
      console.error("Erreur Resend :", error);

      return NextResponse.json(
        {
          message:
            "La demande a été reçue, mais l'envoi de l'email a échoué. Vérifiez la configuration Resend."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        "Votre demande a bien été enregistrée. Notre secrétariat vous recontactera rapidement pour validation finale.",
      reference
    });
  } catch (error) {
    console.error("Erreur API réservation :", error);

    return NextResponse.json(
      {
        message:
          "Une erreur est survenue lors de l'envoi. Merci de réessayer dans quelques instants."
      },
      { status: 500 }
    );
  }
}
