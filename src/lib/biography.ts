import type { Locale } from "@/lib/content";

export type DossierBlock = {
  label: Record<Locale, string>;
  value: Record<Locale, string>;
};

export const dossierBlocks: DossierBlock[] = [
  { label: { id: "Nama", en: "Name" }, value: { id: "Sidqi Fachriansyah", en: "Sidqi Fachriansyah" } },
  { label: { id: "Lokasi", en: "Base" }, value: { id: "Jakarta, Indonesia", en: "Jakarta, Indonesia" } },
  { label: { id: "Fokus", en: "Focus" }, value: { id: "Telekomunikasi, IoT, dan Riset Elektrikal", en: "Telecommunication, IoT, and Electrical R&D" } },
  { label: { id: "Status", en: "Status" }, value: { id: "Terbuka untuk kolaborasi teknis", en: "Open to technical collaboration" } },
];
