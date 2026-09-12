"use client";
import { Camera, MessageSquare } from "lucide-react";

// demo: impalcatura visibile solo nella pagina /serrande in fase di bozza.
// Quando arrivano foto e correzioni dal cliente si cancella questo file e le
// due prop `demoNotice` / `demoSlots` di WPPage.

export function DemoNotice({ title, body }: { title: string; body: string }) {
  return (
    <section
      style={{
        backgroundColor: "var(--color-accent-subtle)",
        borderBottom: "1px solid var(--color-border)",
        paddingTop: 28,
        paddingBottom: 28,
      }}
    >
      <div className="container-ef">
        <div style={{ maxWidth: "68ch" }}>
          <h2
            className="text-h4"
            style={{ color: "var(--color-text-primary)", fontWeight: 500, marginBottom: 8 }}
          >
            {title}
          </h2>
          <p className="text-body" style={{ color: "var(--color-text-primary)", textWrap: "pretty" }}>
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}

export function DemoPhotoSlot({ photo, ask }: { photo: string; ask: string }) {
  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-[4/3] flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: 24,
        }}
      >
        <Camera size={26} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
        <p
          className="text-body mt-3"
          style={{ color: "var(--color-text-primary)", fontWeight: 500, maxWidth: "34ch" }}
        >
          {photo}
        </p>
        <p className="text-body-sm mt-1.5" style={{ color: "var(--color-text-secondary)" }}>
          Qui va una tua foto
        </p>
      </div>
      <div className="flex items-start gap-2.5 mt-4">
        <MessageSquare
          size={17}
          style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 3 }}
          aria-hidden="true"
        />
        <p className="text-body" style={{ color: "var(--color-text-primary)", textWrap: "pretty" }}>
          {ask}
        </p>
      </div>
    </div>
  );
}
