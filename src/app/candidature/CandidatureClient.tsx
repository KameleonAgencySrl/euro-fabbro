"use client";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useT } from "@/components/LanguageProvider";

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB, must match /api/lead

const copy = {
  it: {
    heroBadge: "Lavora con noi",
    heroTitlePre: "Entra nella squadra ",
    heroTitleAccent: "Eurofabbro",
    heroSub:
      "Cerchiamo persone che amano il lavoro ben fatto: fabbri, carpentieri, installatori e profili tecnici. Inviaci la tua candidatura, la valutiamo entro pochi giorni.",
    formTitle: "Invia la tua candidatura",
    formSub: "Compila il form e allega il tuo CV in PDF.",
    name: "Nome e cognome",
    phone: "Telefono",
    email: "Email",
    role: "Posizione di interesse",
    rolePlaceholder: "Es. fabbro, installatore, ufficio tecnico…",
    message: "Presentati in due righe",
    cv: "Curriculum (PDF, DOC — max 5 MB)",
    cvTooBig: "Il file supera i 5 MB: allega un CV più leggero.",
    privacyPre: "Inviando accetti la",
    privacyLink: "privacy policy",
    submit: "Invia candidatura",
    successTitle: "Candidatura inviata!",
    successBody: "Grazie! Abbiamo ricevuto il tuo CV, ti ricontatteremo al più presto.",
    successCta: "Invia un'altra candidatura",
    error: "Qualcosa è andato storto. Riprova o scrivici a eurofabbro@eurofabbro.com.",
  },
  en: {
    heroBadge: "Work with us",
    heroTitlePre: "Join the ",
    heroTitleAccent: "Eurofabbro team",
    heroSub:
      "We look for people who love work done right: blacksmiths, metal carpenters, installers and technical profiles. Send us your application, we review it within a few days.",
    formTitle: "Send your application",
    formSub: "Fill in the form and attach your CV as PDF.",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    role: "Position of interest",
    rolePlaceholder: "E.g. blacksmith, installer, technical office…",
    message: "Introduce yourself in a couple of lines",
    cv: "Curriculum (PDF, DOC — max 5 MB)",
    cvTooBig: "File exceeds 5 MB: please attach a lighter CV.",
    privacyPre: "By submitting you accept the",
    privacyLink: "privacy policy",
    submit: "Send application",
    successTitle: "Application sent!",
    successBody: "Thank you! We received your CV and will get back to you soon.",
    successCta: "Send another application",
    error: "Something went wrong. Try again or email us at eurofabbro@eurofabbro.com.",
  },
};

export default function CandidatureClient() {
  const { t } = useT();
  const c = copy[t.lang === "en" ? "en" : "it"];
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [cvError, setCvError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    message: "",
    cv: null as File | null,
    privacy: false,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy || !form.cv) return;
    if (form.cv.size > MAX_CV_BYTES) {
      setCvError(true);
      return;
    }
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("email", form.email);
      fd.append("role", form.role);
      fd.append("message", form.message);
      fd.append("cv", form.cv);
      fd.append("source", "candidature");
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", email: "", role: "", message: "", cv: null, privacy: false });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section
        style={{
          paddingTop: 80,
          paddingBottom: 40,
          textAlign: "center",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <div className="container-ef" style={{ maxWidth: 900 }}>
          <span
            className="inline-block py-1.5 px-4 rounded-full text-sm font-medium uppercase mb-6"
            style={{
              backgroundColor: "var(--color-accent-subtle)",
              color: "var(--color-accent)",
              letterSpacing: "0.08em",
            }}
          >
            {c.heroBadge}
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ color: "var(--color-surface-dark)", letterSpacing: "-0.02em" }}
          >
            {c.heroTitlePre}
            <span style={{ color: "var(--color-accent)", fontStyle: "italic", fontWeight: 300 }}>
              {c.heroTitleAccent}
            </span>
          </h1>
          <p
            className="text-base sm:text-lg mx-auto"
            style={{ color: "var(--color-text-secondary)", maxWidth: 720 }}
          >
            {c.heroSub}
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 96, backgroundColor: "var(--color-bg)" }}>
        <div className="container-ef" style={{ maxWidth: 800 }}>
          <div
            className="rounded-3xl shadow-xl"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border-subtle)",
              padding: "48px 32px",
            }}
          >
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ color: "var(--color-surface-dark)" }}
              >
                {c.formTitle}
              </h2>
              <p className="text-body-lg" style={{ color: "var(--color-text-secondary)" }}>
                {c.formSub}
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center py-12">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "rgba(34,160,92,0.12)" }}
                >
                  <CheckCircle style={{ width: 40, height: 40, color: "#22A05C" }} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-surface-dark)" }}>
                  {c.successTitle}
                </h3>
                <p className="text-body-lg mb-8" style={{ color: "var(--color-text-secondary)" }}>
                  {c.successBody}
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary">
                  {c.successCta}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="cand-name" className="label-ef" style={{ color: "var(--color-text-primary)" }}>
                      {c.name}
                    </label>
                    <input
                      id="cand-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-ef"
                      style={{ height: 56, backgroundColor: "var(--color-bg)" }}
                      placeholder="Mario Rossi"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="cand-phone" className="label-ef" style={{ color: "var(--color-text-primary)" }}>
                      {c.phone}
                    </label>
                    <input
                      id="cand-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-ef"
                      style={{ height: 56, backgroundColor: "var(--color-bg)" }}
                      placeholder="333 1234567"
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="cand-email" className="label-ef" style={{ color: "var(--color-text-primary)" }}>
                      {c.email}
                    </label>
                    <input
                      id="cand-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-ef"
                      style={{ height: 56, backgroundColor: "var(--color-bg)" }}
                      placeholder="mario@esempio.it"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="cand-role" className="label-ef" style={{ color: "var(--color-text-primary)" }}>
                      {c.role}
                    </label>
                    <input
                      id="cand-role"
                      type="text"
                      required
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="input-ef"
                      style={{ height: 56, backgroundColor: "var(--color-bg)" }}
                      placeholder={c.rolePlaceholder}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cand-cv" className="label-ef" style={{ color: "var(--color-text-primary)" }}>
                    {c.cv}
                  </label>
                  <input
                    id="cand-cv"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      setCvError(false);
                      setForm({ ...form, cv: e.target.files?.[0] ?? null });
                    }}
                    className="input-ef"
                    style={{ height: 56, backgroundColor: "var(--color-bg)", paddingTop: 14 }}
                  />
                  {cvError && (
                    <p className="text-sm mt-1" style={{ color: "#c0392b" }}>
                      {c.cvTooBig}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="cand-message" className="label-ef" style={{ color: "var(--color-text-primary)" }}>
                    {c.message}
                  </label>
                  <textarea
                    id="cand-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-ef"
                    style={{ minHeight: 120, backgroundColor: "var(--color-bg)", resize: "vertical" }}
                  />
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <input
                    id="cand-privacy"
                    type="checkbox"
                    required
                    checked={form.privacy}
                    onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
                    className="mt-1"
                    style={{ width: 18, height: 18, accentColor: "var(--color-accent)" }}
                  />
                  <label
                    htmlFor="cand-privacy"
                    className="text-sm leading-snug"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {c.privacyPre}{" "}
                    <Link href="/privacy-policy" className="underline">
                      {c.privacyLink}
                    </Link>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn-primary w-full"
                  style={{
                    opacity: status === "submitting" ? 0.7 : 1,
                    padding: "16px 24px",
                    fontSize: 17,
                  }}
                >
                  {status === "submitting" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    c.submit
                  )}
                </button>
                {status === "error" && (
                  <p className="text-sm" style={{ color: "#c0392b" }}>
                    {c.error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
