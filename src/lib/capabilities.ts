import type { Locale } from "@/lib/content";

export type Capability = {
  code: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  skills: string[];
  tags: string[];
};

export const capabilities: Capability[] = [
  { code: "TEL / NET", title: { id: "Telekomunikasi dan Jaringan", en: "Telecommunication and Network" }, description: { id: "Rancang bangun jaringan fisik, perhitungan redaman, dan eksekusi lapangan.", en: "Physical network design, attenuation calculations, and field execution." }, skills: ["FTTH Network Design", "Fiber Optic Splicing", "Link Budget Calculation", "ODC/ODP Mapping", "5G Network Concepts"], tags: ["Fiber Optic", "FTTH", "Splicing", "RF / Wireless"] },
  { code: "IOT / EMB", title: { id: "Internet of Things dan Embedded Systems", en: "Internet of Things & Embedded Systems" }, description: { id: "Pengembangan perangkat keras cerdas, integrasi sensor, dan arsitektur sistem pemantauan.", en: "Smart hardware development, sensor integration, and monitoring-system architecture." }, skills: ["Microcontroller Programming", "Sensor Integration", "Medical / Infusion Monitors", "Cloud IoT Platforms"], tags: ["Arduino", "Blynk", "C++", "Sensors", "ESP32"] },
  { code: "ELEC / R&D", title: { id: "Riset dan Pengembangan Elektrikal", en: "Electrical & Hardware R&D" }, description: { id: "Perancangan perangkat keras frekuensi radio dan implementasi teori elektromagnetik terapan.", en: "Radio-frequency hardware design and applied electromagnetic theory." }, skills: ["Yagi Antenna Design", "RF Impedance Matching", "VSWR Measurement", "Hardware Assembly", "Basic Circuit Design"], tags: ["RF Engineering", "Antenna Design", "Electromagnetics"] },
  { code: "PLAN / BOQ", title: { id: "Perencanaan Proyek dan BOQ", en: "Project Planning & BOQ" }, description: { id: "Estimasi biaya operasional, kalkulasi material jaringan, dan penyusunan dokumen proyek teknis.", en: "Operational cost estimates, network material calculations, and technical project documentation." }, skills: ["Material Cost Estimation", "Route Optimization", "Vendor Document Preparation", "Technical Blueprint Reading"], tags: ["Data Analysis", "Costing", "Documentation"] },
];
