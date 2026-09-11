import { WPPage } from "@/components/WPPage";

export const metadata = {
  title: "Serrande su misura, motorizzazione e riparazione — Ferioli Sergio",
  description:
    "Serrande avvolgibili, a maglia e coibentate per garage, negozi e capannoni. Produzione interna, motorizzazione e riparazione. Bologna, San Giovanni in Persiceto, Crevalcore, Cento.",
};

export default function Page() {
  return (
    <WPPage
      slug="serrande"
      preLabel="Serrande · Bologna, Modena, Ferrara"
      heroAccent="su misura"
      related={[
        { href: "/automazione", label: "Automazione e domotica" },
        { href: "/cancelli", label: "Cancelli in ferro" },
        { href: "/detrazioni", label: "Detrazioni fiscali" },
      ]}
    />
  );
}
