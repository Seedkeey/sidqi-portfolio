import type { Locale } from "@/lib/content";

export type ProjectCategory = "iot" | "telecom" | "rf" | "pcb" | "software";

export type Project = {
  id: string;
  category: ProjectCategory;
  year: string;
  title: string;
  stack: string[];
  confidential: boolean;
  image: string | null;
  images?: string[];
  imageAlt?: string;
  imagePosition: string;
  link: string | null;
  role: Record<Locale, string>;
  status: Record<Locale, string>;
  documentationStatus?: Record<Locale, string>;
  securityNote?: Record<Locale, string>;
  description: Record<Locale, string>;
  facts?: Array<{ label: string; value: string }>;
};

export const projects: Project[] = [
  {
    id: "sims",
    category: "iot",
    year: "2026",
    title: "Smart Infusion Monitoring System",
    stack: ["ESP32", "Load Cell", "IoT Monitoring", "SIMS App"],
    confidential: false,
    image: "/projects/sims.png",
    imageAlt: "Smart Infusion Monitoring System interface and prototype documentation",
    imagePosition: "center",
    link: null,
    role: {
      id: "Project lead — perancangan sistem, integrasi sensor, dan quality control.",
      en: "Project lead — system design, sensor integration, and quality control.",
    },
    status: {
      id: "Selesai",
      en: "Completed",
    },
    description: {
      id: "Merancang platform pemantauan infus otomatis berbasis IoT yang terintegrasi dengan database dan pemantauan jarak jauh.",
      en: "Designed an IoT-based automated infusion monitoring platform with database integration and remote supervision.",
    },
  },
  {
    id: "ftth-boq",
    category: "telecom",
    year: "2025",
    title: "FTTH Design & BOQ",
    stack: ["Google Earth Pro", "Excel", "Link Budget", "FTTH Design"],
    confidential: false,
    image: "/projects/ftth-boq.png",
    imageAlt: "FTTH network design map and bill of quantities documentation",
    imagePosition: "center",
    link: null,
    role: {
      id: "Perancangan jaringan — survei jalur, link budget, dan estimasi material.",
      en: "Network design — route survey, link budget, and material estimation.",
    },
    status: {
      id: "Selesai",
      en: "Completed",
    },
    description: {
      id: "Merancang jaringan akses optik FTTH dari ODC hingga ODP, termasuk link budget, kebutuhan material, dan estimasi anggaran.",
      en: "Designed an ODC-to-ODP FTTH access network, including link budgets, material requirements, and cost estimates.",
    },
  },
  {
    id: "yagi",
    category: "rf",
    year: "2025",
    title: "Yagi Antenna",
    stack: ["RF Design", "VSWR", "Hardware", "Antenna Design"],
    confidential: false,
    image: "/projects/yagi-antenna.png",
    imageAlt: "Yagi-Uda directional antenna build and VSWR testing",
    imagePosition: "center 58%",
    link: null,
    role: {
      id: "Perancangan dan pengujian — perhitungan dimensi elemen, perakitan, dan pengukuran VSWR.",
      en: "Design and testing — element dimension calculation, assembly, and VSWR measurement.",
    },
    status: {
      id: "Selesai",
      en: "Completed",
    },
    description: {
      id: "Mengembangkan perangkat keras RF melalui perancangan, perhitungan, dan pengujian performa antena directional Yagi-Uda.",
      en: "Developed RF hardware through the design, calculation, and performance testing of a directional Yagi-Uda antenna.",
    },
  },
  {
    id: "motor-showroom",
    category: "software",
    year: "2025",
    title: "Motorcycle Sales Prototype",
    stack: ["HTML", "CSS", "JavaScript", "Figma"],
    confidential: false,
    image: "/projects/motor-showroom.png",
    imageAlt: "Motorcycle showroom website prototype interface",
    imagePosition: "center top",
    link: null,
    role: {
      id: "Desain dan implementasi — wireframe Figma hingga prototipe front-end.",
      en: "Design and implementation — Figma wireframes to a front-end prototype.",
    },
    status: {
      id: "Selesai",
      en: "Completed",
    },
    description: {
      id: "Membuat rancangan awal website jual-beli motor untuk kebutuhan operasional showroom.",
      en: "Created an initial motorcycle marketplace website prototype for showroom operations.",
    },
  },
  {
    id: "gas-detector",
    category: "iot",
    year: "2025",
    title: "Smoke & Gas Detector",
    stack: ["ESP8266", "MQ-2", "Blynk"],
    confidential: false,
    image: "/projects/iot-mq2.png",
    imageAlt: "IoT smoke and gas detector prototype with MQ-2 sensor",
    imagePosition: "center",
    link: null,
    role: {
      id: "Perakitan dan integrasi — rangkaian sensor, firmware ESP8266, dan notifikasi Blynk.",
      en: "Assembly and integration — sensor circuit, ESP8266 firmware, and Blynk notifications.",
    },
    status: {
      id: "Selesai",
      en: "Completed",
    },
    description: {
      id: "Membangun pendeteksi asap dan gas berbasis IoT dengan pemantauan serta notifikasi real-time melalui Blynk.",
      en: "Built an IoT smoke and gas detector with real-time monitoring and notifications through Blynk.",
    },
  },
  {
    id: "hand-tracking",
    category: "software",
    year: "2026",
    title: "Hand Tracking",
    stack: ["Python", "Computer Vision"],
    confidential: false,
    image: null,
    imagePosition: "center",
    link: null,
    role: {
      id: "Pengembangan — pemrosesan citra dan kontrol gerakan tangan.",
      en: "Development — image processing and hand-motion control.",
    },
    status: {
      id: "Selesai",
      en: "Completed",
    },
    documentationStatus: {
      id: "Dokumentasi visual akan ditambahkan",
      en: "Visual documentation to be added",
    },
    description: {
      id: "Mengembangkan sistem kamera yang mendeteksi tangan dan mengendalikan objek digital melalui gerakan tangan.",
      en: "Developed a camera system that detects hands and controls digital objects through hand movement.",
    },
  },
  {
    id: "water-penetration",
    category: "telecom",
    year: "2025",
    title: "Work Instruction — Water Penetration",
    stack: ["Fiber Optic", "Test Procedure"],
    confidential: true,
    image: null,
    imagePosition: "center",
    link: null,
    role: {
      id: "Penyusunan instruksi kerja — riset prosedur dan dokumentasi pengujian.",
      en: "Work instruction authoring — procedure research and test documentation.",
    },
    status: {
      id: "Dokumentasi rahasia",
      en: "Confidential documentation",
    },
    description: {
      id: "Meneliti dan menyusun instruksi kerja pengujian ketahanan penetrasi air pada fiber optik.",
      en: "Researched and documented a work instruction for fiber-optic water penetration resistance testing.",
    },
  },
  {
    id: "mechanical-fo",
    category: "telecom",
    year: "2025",
    title: "Work Instruction — Mechanical FO Test",
    stack: ["Fiber Optic", "Mechanical Test"],
    confidential: true,
    image: null,
    imagePosition: "center",
    link: null,
    role: {
      id: "Penyusunan instruksi kerja — riset prosedur dan dokumentasi pengujian.",
      en: "Work instruction authoring — procedure research and test documentation.",
    },
    status: {
      id: "Dokumentasi rahasia",
      en: "Confidential documentation",
    },
    description: {
      id: "Meneliti dan menyusun instruksi kerja untuk pengujian mekanis fiber optik.",
      en: "Researched and documented a work instruction for mechanical fiber-optic testing.",
    },
  },
  {
    id: "fo-installation",
    category: "telecom",
    year: "2026",
    title: "Fiber Optic Installation",
    stack: ["OTDR", "Fusion Splicer", "OPM / OLS", "Fiber Optic Installation"],
    confidential: false,
    image: "/projects/fiber-optic-installation.png",
    imageAlt: "Fiber optic field installation, splicing, and measurement",
    imagePosition: "center 62%",
    link: null,
    role: {
      id: "Implementasi lapangan — penyambungan, pengukuran, dan instalasi fisik.",
      en: "Field implementation — splicing, measurement, and physical installation.",
    },
    status: {
      id: "Selesai",
      en: "Completed",
    },
    description: {
      id: "Melakukan penyambungan, pengukuran, dan pemasangan fisik jaringan fiber optik.",
      en: "Performed physical fiber-optic network splicing, measurement, and installation.",
    },
  },
  {
    id: "bluejammer",
    category: "rf",
    year: "2026",
    title: "Bluejammer Security Prototype",
    stack: ["ESP32", "RF Security", "Bluetooth", "Wi-Fi"],
    confidential: false,
    image: "/projects/bluejammer-1.jpeg",
    images: ["/projects/bluejammer-1.jpeg", "/projects/bluejammer-2.jpeg"],
    imageAlt: "Bluejammer ESP32 RF security testing prototype",
    imagePosition: "center",
    link: null,
    role: {
      id: "Pengembangan prototipe — eksperimen perangkat keras dan analisis permukaan risiko nirkabel.",
      en: "Prototype development — hardware experimentation and wireless risk-surface analysis.",
    },
    status: {
      id: "Pengujian lab berizin",
      en: "Authorized lab testing",
    },
    documentationStatus: {
      id: "Dokumentasi sedang disiapkan",
      en: "Documentation in progress",
    },
    securityNote: {
      id: "Proyek ini hanya dilakukan pada perangkat, jaringan, dan lingkungan yang memiliki izin. Proyek tidak ditujukan untuk mengganggu komunikasi publik, mengambil alih perangkat pihak lain, atau menyerang jaringan tanpa izin.",
      en: "This project is conducted only on devices, networks, and environments with explicit authorization. It is not intended to disrupt public communications, take over third-party devices, or attack networks without permission.",
    },
    description: {
      id: "Mengembangkan prototipe eksperimental berbasis ESP32 untuk mempelajari keamanan perangkat Bluetooth, Wi-Fi, dan flight controller pada pita 2,4 GHz. Fokus proyek adalah pengujian defensif pada lingkungan laboratorium yang terisolasi, identifikasi permukaan risiko, dan pemahaman terhadap ketahanan sistem nirkabel.",
      en: "Developed an experimental ESP32-based prototype to study the security of Bluetooth, Wi-Fi, and flight-controller devices in the 2.4 GHz band. The project focuses on defensive testing in an isolated laboratory environment, risk-surface identification, and understanding wireless-system resilience.",
    },
  },
  {
    id: "seven-segment-pcb",
    category: "pcb",
    year: "2026",
    title: "Seven-Segment Display PCB",
    stack: ["PCB Design", "Schematic", "Routing"],
    confidential: false,
    image: "/projects/seven-segment-pcb.png",
    imageAlt: "Seven segment display PCB design layout",
    imagePosition: "center",
    link: null,
    role: {
      id: "Perancangan PCB — skematik, pemilihan komponen, penempatan, dan routing.",
      en: "PCB design — schematic, component selection, placement, and routing.",
    },
    status: {
      id: "Dalam perancangan",
      en: "In design",
    },
    documentationStatus: {
      id: "Dokumentasi PCB sedang disiapkan",
      en: "PCB documentation in progress",
    },
    description: {
      id: "Merancang papan PCB untuk seven segment display, mulai dari penyusunan skematik, pemilihan komponen, penempatan komponen, pengaturan jalur PCB, hingga persiapan desain untuk proses perakitan dan pengujian.",
      en: "Designed a PCB for a seven-segment display — from schematic drafting and component selection to placement, routing, and preparation for assembly and testing.",
    },
  },
];
