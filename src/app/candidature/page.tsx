import type { Metadata } from "next";
import CandidatureClient from "./CandidatureClient";

export const metadata: Metadata = {
  title: "Candidature — Eurofabbro | Lavora con noi",
  description:
    "Invia la tua candidatura a Eurofabbro: carpenteria metallica a Bologna dal 1977. Compila il form e allega il tuo CV.",
  openGraph: {
    title: "Candidature — Eurofabbro",
    description:
      "Invia la tua candidatura a Eurofabbro: carpenteria metallica a Bologna dal 1977.",
    url: "https://euro-fabbro.vercel.app/candidature",
  },
  alternates: {
    canonical: "https://euro-fabbro.vercel.app/candidature",
  },
};

export default function CandidaturePage() {
  return <CandidatureClient />;
}
