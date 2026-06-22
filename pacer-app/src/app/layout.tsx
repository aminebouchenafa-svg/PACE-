import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang";

export const metadata: Metadata = {
  title: "PACER – Aide à la décision en vol",
  description:
    "PACER : Percevoir · Analyser · Choisir · Exécuter · Réévaluer. Guide rapide de prise de décision pour les pilotes face à une menace en vol.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141414",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#141414", color: "#f0f0f0" }}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
