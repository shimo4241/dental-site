import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
// 1. هاحنا عيطنا للكومبوننت ديال الشات بوت
import ChatBot from "@/components/ChatBot"; 

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Maison Dentaire Élysée | Dentisterie d'Exception",
  description:
    "Landing page premium et système de réservation pour un centre dentaire haut de gamme."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        {/* 2. هاحنا حطيناه باش يبان فوق السيت كامل */}
        <ChatBot /> 
      </body>
    </html>
  );
}