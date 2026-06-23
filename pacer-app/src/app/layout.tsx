import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang";

// Next does not prefix metadata file URLs with basePath in static export,
// so we build the icon/manifest paths manually to keep them valid on Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "PACER – Aide à la décision en vol",
  description:
    "PACER : Percevoir · Analyser · Choisir · Exécuter · Réévaluer. Guide rapide de prise de décision pour les pilotes face à une menace en vol.",
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: `${basePath}/icon.png`,
    shortcut: `${basePath}/icon.png`,
    apple: `${basePath}/icon.png`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0C10",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
