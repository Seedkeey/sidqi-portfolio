export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

const sharedAbout = {
  enthusiastTags: [
    "IoT Enthusiast",
    "Telecommunication",
    "Electrical",
    "AI Enthusiast",
    "Learning Autonomous Systems",
  ],
  experience: [
    {
      period: "2025–2026",
      title: "Asisten Laboratorium TKJ/TJA",
      place: "SMK Telkom Bandung",
      description: "Asisten laboratorium divisi praktikum, pembuatan konten, dan project helper.",
    },
    {
      period: "2025",
      title: "Telkom Digital Connectivity Service",
      place: "Telkom Test House",
      description: "Helper instalasi fiber optik dan quality control.",
    },
    {
      period: "2026",
      title: "Leader — IoT SIMS",
      place: "SMK Telkom Bandung",
      description: "Memimpin proyek Smart Infus Monitoring System serta manajemen quality control.",
    },
  ],
  education: [
    {
      period: "2023–2026",
      title: "Teknik Jaringan Akses Telekomunikasi",
      place: "SMK Telkom Bandung",
      description: "Merangkai dan membangun rancangan fiber optik menjadi implementasi nyata.",
    },
    {
      period: "2026–sekarang",
      title: "S1 Teknik Elektro",
      place: "Telkom University",
      description: "Mempelajari rangkaian listrik, IoT, otomasi industri, dan sistem otonom.",
    },
  ],
};

const skillTools = [
  { label: "Design & Topology", items: ["AutoCAD", "Microsoft Visio", "CX-Programmer", "Proteus 9", "Cisco Packet Tracer", "Unity"] },
  { label: "Costing & BOQ", items: ["Microsoft Excel", "Google Sheets", "RAB / Cost Sheets"] },
  { label: "Measurement & Testing", items: ["OTDR", "OPM", "OLS", "Fusion Splicer"] },
  { label: "Docs & Presentation", items: ["Microsoft Word", "PowerPoint", "Google Docs", "Canva", "Figma", "Cirkit Designer", "Notion"] },
];

const projectBase = [
  { id: "sims", category: "iot", year: "2026", title: "Smart Infusion Monitoring System", stack: ["ESP32", "Load Cell", "SIMS App"], confidential: false, image: "/projects/sims.png", imagePosition: "center" },
  { id: "ftth-boq", category: "telecom", year: "2025", title: "FTTH Design & BOQ", stack: ["Google Earth Pro", "Excel", "Link Budget"], confidential: false, image: "/projects/ftth-boq.png", imagePosition: "center" },
  { id: "yagi", category: "telecom", year: "2025", title: "Yagi Antenna", stack: ["RF Design", "VSWR", "Hardware"], confidential: false, image: "/projects/yagi-antenna.png", imagePosition: "center 58%" },
  { id: "motor-showroom", category: "software", year: "2025", title: "Motorcycle Sales Prototype", stack: ["HTML", "CSS", "JavaScript", "Figma"], confidential: false, image: "/projects/motor-showroom.png", imagePosition: "center top" },
  { id: "gas-detector", category: "iot", year: "2025", title: "Smoke & Gas Detector", stack: ["ESP8266", "MQ-2", "Blynk"], confidential: false, image: "/projects/iot-mq2.png", imagePosition: "center" },
  { id: "hand-tracking", category: "software", year: "2026", title: "Hand Tracking", stack: ["Python", "Computer Vision"], confidential: false, image: null, imagePosition: "center" },
  { id: "water-penetration", category: "telecom", year: "2025", title: "Work Instruction - Water Penetration", stack: ["Fiber Optic", "Test Procedure"], confidential: true, image: null, imagePosition: "center" },
  { id: "mechanical-fo", category: "telecom", year: "2025", title: "Work Instruction - Mechanical FO Test", stack: ["Fiber Optic", "Mechanical Test"], confidential: true, image: null, imagePosition: "center" },
  { id: "fo-installation", category: "telecom", year: "2026", title: "Fiber Optic Installation", stack: ["OTDR", "Fusion Splicer", "OPM / OLS"], confidential: false, image: "/projects/fiber-optic-installation.png", imagePosition: "center 62%" },
] as const;

const projectDescriptions = {
  id: [
    "Merancang platform pemantauan infus otomatis berbasis IoT yang terintegrasi dengan database dan pemantauan jarak jauh.",
    "Merancang jaringan akses optik FTTH dari ODC hingga ODP, termasuk link budget, kebutuhan material, dan estimasi anggaran.",
    "Mengembangkan perangkat keras RF melalui perancangan, perhitungan, dan pengujian performa antena directional Yagi-Uda.",
    "Membuat rancangan awal website jual-beli motor untuk kebutuhan operasional showroom.",
    "Membangun pendeteksi asap dan gas berbasis IoT dengan pemantauan serta notifikasi real-time melalui Blynk.",
    "Mengembangkan sistem kamera yang mendeteksi tangan dan mengendalikan objek digital melalui gerakan tangan.",
    "Meneliti dan menyusun instruksi kerja pengujian ketahanan penetrasi air pada fiber optik.",
    "Meneliti dan menyusun instruksi kerja untuk pengujian mekanis fiber optik.",
    "Melakukan penyambungan, pengukuran, dan pemasangan fisik jaringan fiber optik.",
  ],
  en: [
    "Designed an IoT-based automated infusion monitoring platform with database integration and remote supervision.",
    "Designed an ODC-to-ODP FTTH access network, including link budgets, material requirements, and cost estimates.",
    "Developed RF hardware through the design, calculation, and performance testing of a directional Yagi-Uda antenna.",
    "Created an initial motorcycle marketplace website prototype for showroom operations.",
    "Built an IoT smoke and gas detector with real-time monitoring and notifications through Blynk.",
    "Developed a camera system that detects hands and controls digital objects through hand movement.",
    "Researched and documented a work instruction for fiber-optic water penetration resistance testing.",
    "Researched and documented a work instruction for mechanical fiber-optic testing.",
    "Performed physical fiber-optic network splicing, measurement, and installation.",
  ],
};

const skillCategories = [
  {
    code: "TEL / NET",
    title: "Telecommunication and Network",
    description: "Rancang bangun jaringan fisik, perhitungan redaman, dan eksekusi lapangan.",
    skills: ["FTTH Network Design", "Fiber Optic Splicing", "Link Budget Calculation", "ODC/ODP Mapping", "5G Network Concepts"],
    tags: ["Fiber Optic", "FTTH", "Splicing", "RF / Wireless"],
  },
  {
    code: "IOT / EMB",
    title: "Internet of Things & Embedded Systems",
    description: "Pengembangan perangkat keras cerdas, integrasi sensor, dan arsitektur sistem pemantauan.",
    skills: ["Microcontroller Programming", "Sensor Integration", "Medical / Infusion Monitors", "Cloud IoT Platforms"],
    tags: ["Arduino", "Blynk", "C++", "Sensors", "ESP32"],
  },
  {
    code: "ELEC / R&D",
    title: "Electrical & Hardware R&D",
    description: "Perancangan perangkat keras frekuensi radio dan implementasi teori elektromagnetik terapan.",
    skills: ["Yagi Antenna Design", "RF Impedance Matching", "VSWR Measurement", "Hardware Assembly", "Basic Circuit Design"],
    tags: ["RF Engineering", "Antenna Design", "Electromagnetics"],
  },
  {
    code: "PLAN / BOQ",
    title: "Project Planning & BOQ",
    description: "Estimasi biaya operasional, kalkulasi material jaringan, dan penyusunan dokumen proyek teknis.",
    skills: ["Material Cost Estimation", "Route Optimization", "Vendor Document Preparation", "Technical Blueprint Reading"],
    tags: ["Data Analysis", "Costing", "Documentation"],
  },
];

export const content = {
  id: {
    nav: ["Beranda", "Tentang", "Keahlian", "Proyek", "Kontak"],
    eyebrow: "Portofolio / 2026",
    intro: "Halo, saya",
    name: "Sidqi",
    role: "Mahasiswa Teknik Elektro",
    summary:
      "Saya merancang sistem IoT, infrastruktur telekomunikasi, dan perangkat keras yang menghubungkan perhitungan teknis dengan implementasi lapangan.",
    projects: "Lihat proyek",
    about: "Tentang saya",
    status: "Bandung, Indonesia / tersedia untuk kolaborasi",
    aboutSection: {
      label: "02 / Tentang",
      title: "Teknik yang bekerja di dunia nyata.",
      statement:
        "Mahasiswa Teknik Elektro di Telkom University dengan latar belakang praktik langsung di bidang fiber optik dan infrastruktur jaringan — memadukan studi teknik formal dengan pengalaman proyek telekomunikasi dan IoT nyata.",
      githubLabel: "Aktivitas GitHub",
      githubDescription: "Catatan publik eksperimen perangkat lunak dan sistem tertanam.",
      githubUnavailable: "Profil publik belum dapat dijangkau. Statistik akan muncul otomatis saat akun tersedia.",
      repositories: "Repositori publik",
      activity: "Aktivitas terbaru",
      language: "Bahasa dominan",
      experienceLabel: "Pengalaman",
      educationLabel: "Pendidikan",
      present: "Sekarang",
      ...sharedAbout,
    },
    skillsSection: {
      label: "03 / Keahlian",
      title: "Sistem, sinyal, dan eksekusi lapangan.",
      direction:
        "Electrical & Network Engineer untuk sistem IoT, infrastruktur jaringan, dan desain perangkat keras. Saya merancang arsitektur jaringan fisik, mengembangkan solusi embedded IoT, lalu mendukungnya dengan perhitungan teknis presisi, dokumen BOQ, dan rencana eksekusi lapangan.",
      summary: [
        { label: "Keahlian utama", value: "Electrical, Telecommunication, IoT" },
        { label: "Keahlian pendukung", value: "Hardware Design, BOQ Costing, Network Topology" },
        { label: "Mode pengerjaan", value: "Design, Calculate, Implement, Measure" },
      ],
      toolsLabel: "Project delivery / Tools & software",
      capabilitiesLabel: "Kemampuan teknis",
      skillsLabel: "Kapabilitas",
      tools: skillTools,
      categories: skillCategories,
    },
    projectsSection: {
      label: "04 / Proyek",
      title: "Dibangun, diuji, dan diterapkan.",
      description: "Sembilan proyek terpilih dari sistem IoT, infrastruktur telekomunikasi, dan eksperimen perangkat lunak.",
      filters: { all: "Semua", iot: "IoT", telecom: "Telekomunikasi / Fiber Optik", software: "Website / Software" },
      completed: "Selesai",
      confidential: "Dokumentasi rahasia",
      unavailable: "Visual proyek akan ditambahkan",
      projects: projectBase.map((project, index) => ({ ...project, description: projectDescriptions.id[index] })),
    },
    contactSection: {
      label: "05 / Kontak",
      title: "Mari menghubungkan ide dengan implementasi.",
      description: "Terbuka untuk kolaborasi di bidang IoT, telekomunikasi, infrastruktur jaringan, dan pengembangan perangkat keras.",
      availability: "Tersedia untuk diskusi proyek dan kolaborasi",
      primaryAction: "Buka GitHub",
      pending: "Belum dipublikasikan",
      location: "Bandung, Indonesia",
      channels: ["Email", "LinkedIn", "WhatsApp"],
      backToTop: "Kembali ke atas",
      quickLinks: "Navigasi cepat",
      copyright: "Sidqi Sonjaya / Seed. Dirancang dan dikembangkan secara mandiri.",
    },
  },
  en: {
    nav: ["Home", "About", "Skills", "Projects", "Contact"],
    eyebrow: "Portfolio / 2026",
    intro: "Hello, I am",
    name: "Sidqi",
    role: "Electrical Engineering Student",
    summary:
      "I design IoT systems, telecommunications infrastructure, and hardware that connect technical calculations with field implementation.",
    projects: "View projects",
    about: "About me",
    status: "Bandung, Indonesia / open to collaboration",
    aboutSection: {
      label: "02 / About",
      title: "Engineering that works in the real world.",
      statement:
        "Electrical Engineering student at Telkom University with a hands-on background in fiber optics and network infrastructure — combining formal engineering study with real-world telecom and IoT project experience.",
      githubLabel: "GitHub activity",
      githubDescription: "A public record of software and embedded-system experiments.",
      githubUnavailable: "The public profile is not reachable yet. Stats will populate automatically when the account is available.",
      repositories: "Public repositories",
      activity: "Latest activity",
      language: "Primary language",
      experienceLabel: "Experience",
      educationLabel: "Education",
      present: "Present",
      enthusiastTags: sharedAbout.enthusiastTags,
      experience: [
        {
          period: "2025–2026",
          title: "TKJ/TJA Laboratory Assistant",
          place: "SMK Telkom Bandung",
          description: "Supported practical sessions, content production, and student projects.",
        },
        {
          period: "2025",
          title: "Telkom Digital Connectivity Service",
          place: "Telkom Test House",
          description: "Supported fiber-optic installation and quality control.",
        },
        {
          period: "2026",
          title: "Lead — IoT SIMS",
          place: "SMK Telkom Bandung",
          description: "Led the Smart Infusion Monitoring System project and its quality control.",
        },
      ],
      education: [
        {
          period: "2023–2026",
          title: "Telecommunication Access Network Engineering",
          place: "SMK Telkom Bandung",
          description: "Turned fiber-optic network plans into field-ready implementations.",
        },
        {
          period: "2026–present",
          title: "B.Eng. Electrical Engineering",
          place: "Telkom University",
          description: "Studying electrical circuits, IoT, industrial automation, and autonomous systems.",
        },
      ],
    },
    skillsSection: {
      label: "03 / Skills",
      title: "Systems, signals, and field delivery.",
      direction:
        "Electrical & Network Engineer for IoT Systems, Network Infrastructure, and Hardware Design. I design physical network architectures, develop embedded IoT solutions, and support them with precise technical calculations, BOQ documents, and field execution plans.",
      summary: [
        { label: "Core skill", value: "Electrical, Telecommunication, IoT" },
        { label: "Support skill", value: "Hardware Design, BOQ Costing, Network Topology" },
        { label: "Delivery mode", value: "Design, Calculate, Implement, Measure" },
      ],
      toolsLabel: "Project delivery / Tools & software",
      capabilitiesLabel: "Technical capabilities",
      skillsLabel: "Capabilities",
      tools: skillTools,
      categories: skillCategories.map((category) => ({
        ...category,
        description: {
          "TEL / NET": "Physical network design, attenuation calculations, and field execution.",
          "IOT / EMB": "Smart hardware development, sensor integration, and monitoring-system architecture.",
          "ELEC / R&D": "Radio-frequency hardware design and applied electromagnetic theory.",
          "PLAN / BOQ": "Operational cost estimates, network material calculations, and technical project documentation.",
        }[category.code] ?? category.description,
      })),
    },
    projectsSection: {
      label: "04 / Projects",
      title: "Built, tested, and deployed.",
      description: "Nine selected projects spanning IoT systems, telecommunications infrastructure, and software experiments.",
      filters: { all: "All", iot: "IoT", telecom: "Telecommunication / Fiber Optic", software: "Website / Software" },
      completed: "Completed",
      confidential: "Confidential documentation",
      unavailable: "Project visual coming soon",
      projects: projectBase.map((project, index) => ({ ...project, description: projectDescriptions.en[index] })),
    },
    contactSection: {
      label: "05 / Contact",
      title: "Let us connect ideas with implementation.",
      description: "Open to collaboration across IoT, telecommunications, network infrastructure, and hardware development.",
      availability: "Available for project discussions and collaboration",
      primaryAction: "Open GitHub",
      pending: "Not published yet",
      location: "Bandung, Indonesia",
      channels: ["Email", "LinkedIn", "WhatsApp"],
      backToTop: "Back to top",
      quickLinks: "Quick links",
      copyright: "Sidqi Sonjaya / Seed. Independently designed and developed.",
    },
  },
};
