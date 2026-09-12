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
      demoNotice={{
        title: "Questa pagina è una bozza, non è ancora online",
        body:
          "I testi li ho scritti io per darti qualcosa da correggere: non so quali serrande fai davvero, quindi ho messo quelle che fa di solito un fabbro dalle tue parti. Nei riquadri accanto a ogni sezione trovi la foto che mi serve e la domanda a cui rispondere. Rispondi come ti viene, anche con un vocale.",
      }}
      demoSlots={[
        {
          photo: "Una serranda finita, ripresa di fronte e per intero",
          ask: "Questa è la foto che apre la pagina: scegli il lavoro di cui vai più fiero. Se la prima frase dice qualcosa di sbagliato sul tuo lavoro, correggimela.",
        },
        {
          photo: "Una foto per ogni tipo di serranda che fai",
          ask: "Ho elencato avvolgibili a doghe piene, a maglia, coibentate, microforate e chiusure rinforzate. Cancella quelle che non fai e aggiungi quelle che mancano.",
        },
        {
          photo: "Un motore montato, o la pulsantiera e il telecomando",
          ask: "Motorizzi anche le serrande già installate o solo quelle nuove? Ci sono marche che usi e che vale la pena nominare?",
        },
        {
          photo: "Un intervento di riparazione, anche dal banco di lavoro",
          ask: "Confermi che intervieni su molle, rulli, guide, doghe e motori? E le ripari anche quando la serranda l'ha montata qualcun altro?",
        },
        {
          photo: "Un dettaglio ravvicinato delle doghe e del colore",
          ask: "Quali materiali usi davvero e quali colori proponi più spesso? Se lavori solo con l'acciaio o solo con l'alluminio, dimmelo che sistemo.",
        },
        {
          photo: "Un prima e dopo, o la squadra che installa",
          ask: "Quanto passa in media dal preventivo all'installazione? E fin dove ti sposti per un lavoro?",
        },
      ]}
      related={[
        { href: "/automazione", label: "Automazione e domotica" },
        { href: "/cancelli", label: "Cancelli in ferro" },
        { href: "/detrazioni", label: "Detrazioni fiscali" },
      ]}
    />
  );
}
