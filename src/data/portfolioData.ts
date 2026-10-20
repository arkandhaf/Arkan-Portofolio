export type Language = "en" | "id";
export type Localized = Record<Language, string>;
const bi = (en: string, id: string): Localized => ({ en, id });

// Edit these paths after placing your photos in public/assets/.
export const assets = {
  education: "/assets/itb-campus.jpg",
  experience: "/assets/mxc-last-day.jpg",
  internshipCertificate: "/assets/ixplore-certificate.png",
  internshipCertificatePdf: "/assets/ixplore-certificate.pdf",
  innovationAward: "/assets/satu-innovation-top30.jpg",
  dashboard: "/assets/relpool-dashboard.png",
};

export const copy = {
  viewPdf: bi("Open certificate (PDF)", "Buka sertifikat (PDF)"),
  viewAward: bi("View award evidence", "Lihat bukti penghargaan"),
  layers: bi("03 LAYERS", "03 LAPISAN"),
  foundation: bi("FOUNDATION → APPLICATION", "FONDASI → PENERAPAN"),
  iterate: bi("LEARN. BUILD. ITERATE.", "BELAJAR. BANGUN. SEMPURNAKAN."),
  field: bi("FIELD / OPERATIONS", "LAPANGAN / OPERASIONAL"),
  diagnostics: bi("core-network — diagnostics", "core-network — diagnostik"),
  artifact: bi("SCRIPT ARTIFACTS", "ARTEFAK SKRIP"),
  opticalTag: bi("Optical telemetry", "Telemetri optik"),
  brand: bi("NETWORK & CORE AUTOMATION", "OTOMASI JARINGAN & CORE"),
  nav: [bi("Statement", "Pernyataan"), bi("Education", "Pendidikan"), bi("Engineering", "Rekayasa"), bi("Telemetry", "Telemetri"), bi("Contact", "Kontak")],
  skip: bi("Skip to content", "Langsung ke konten"),
  available: bi("OPEN TO ENGINEERING OPPORTUNITIES", "TERBUKA UNTUK PELUANG ENGINEERING"),
  eyebrow: bi("MUHAMMAD ARKAN DHAIFULLAH · NETWORK AUTOMATION & CORE ENGINEER", "MUHAMMAD ARKAN DHAIFULLAH · ENGINEER OTOMASI JARINGAN & CORE"),
  hero: bi("Most engineers pick either software or hardware.", "Kebanyakan engineer memilih fokus di software atau hardware saja."),
  heroAccent: bi("I build across all three layers.", "Saya membangun di ketiganya."),
  statement: bi("Three domains that rarely sit in the same seat — united to transform manual, high-risk telecommunications operations into zero-error, sub-second automated workflows.", "Tiga ranah yang jarang dikuasai bersamaan — disatukan untuk mengubah operasional telekomunikasi manual berisiko tinggi menjadi sistem otomasi presisi dalam hitungan detik."),
  explore: bi("Explore the engineering", "Jelajahi rekayasanya"),
  location: bi("BASED IN INDONESIA · BUILT FOR GLOBAL SCALE", "BERBASIS DI INDONESIA · UNTUK SKALA GLOBAL"),
  scroll: bi("SCROLL TO EXPLORE", "GULIR UNTUK MENJELAJAH"),
  stack: bi("ENGINEERING STACK", "LAPISAN REKAYASA"),
  topology: bi("THREE LAYERS. ONE CONNECTED SYSTEM.", "TIGA LAPISAN. SATU SISTEM TERHUBUNG."),
  illustrative: bi("CONCEPTUAL TOPOLOGY / NOT LIVE DATA", "TOPOLOGI KONSEPTUAL / BUKAN DATA LANGSUNG"),
  pillars: [
    { code: "L1", title: bi("Physical Optical Layer", "Lapisan Fisik Optik"), detail: bi("Fiber optics · Transport · Diagnostics", "Serat optik · Transport · Diagnostik") },
    { code: "L2 / L3", title: bi("Carrier Core Architecture", "Arsitektur Core Operator"), detail: bi("Routing · Switching · 4G / 5G core", "Routing · Switching · Core 4G / 5G") },
    { code: "AUTO", title: bi("Intelligent Network Automation", "Otomasi Jaringan Cerdas"), detail: bi("Python · Artificial intelligence · APIs", "Python · Kecerdasan buatan · API") },
  ],
  ticker: "INDOSAT OOREDOO HUTCHISON · RELPOOL CORE ENGINE · HUAWEI GGSN PCEF & PCRF UPCC · SATU INNOVATION HUB TOP 30 · MULTI-VENDOR CLI (CISCO / HUAWEI / NOKIA / ZTE) · INSTITUT TEKNOLOGI BANDUNG · ",
  education: {
    label: bi("EDUCATION", "PENDIDIKAN"),
    title: bi("Trained in systems.\nWired for carrier-grade infrastructure.", "Terlatih merancang sistem.\nTeruji di infrastruktur skala operator."),
    institute: bi("Public Institute of Technology", "Institut Teknologi Negeri"),
    degree: bi("Information Systems and Technology (STEI)", "Sistem dan Teknologi Informasi (STEI)"),
    place: bi("Bandung, West Java", "Bandung, Jawa Barat"),
    narrative: bi("Studying Information Systems and Technology at Institut Teknologi Bandung teaches me how complex architectures are designed on paper; stepping directly into national telecom operations taught me how carrier networks survive real-world traffic, fiber cuts, and production pressure.", "Studi Sistem dan Teknologi Informasi di ITB mengajarkan bagaimana arsitektur sistem dirancang secara fundamental; terjun langsung ke operasional telekomunikasi nasional mengajarkan bagaimana jaringan skala besar bertahan menghadapi trafik riil dan insiden kritis."),
    foot: bi("SYSTEMS THINKING → REAL-WORLD ENGINEERING", "PEMIKIRAN SISTEM → REKAYASA DUNIA NYATA"),
  },
  engineering: bi("ENGINEERING & IMPACT", "REKAYASA & DAMPAK"),
  engineeringTitle: bi("Built with intent.\nOperated at scale.", "Dibangun dengan tujuan.\nDioperasikan dalam skala besar."),
  engineeringSubtitle: bi("Selected work across automation, intelligence, and the physical network.", "Karya pilihan di otomasi, kecerdasan, dan jaringan fisik."),
  selected: bi("SELECTED WORK / 01—03", "KARYA PILIHAN / 01—03"),
  metrics: bi("KEY METRICS", "METRIK UTAMA"),
  technicalLog: bi("TECHNICAL & OPERATIONAL LOG", "LOG TEKNIS & OPERASIONAL"),
  capability: bi("CAPABILITY", "KAPABILITAS"), implementation: bi("IMPLEMENTATION", "IMPLEMENTASI"),
  dashboard: bi("RELPOOL / PROVISIONING WORKSPACE", "RELPOOL / RUANG PROVISIONING"),
  dashboardNote: bi("INTERFACE SCHEMATIC · SAMPLE PAYLOAD", "SKEMA ANTARMUKA · CONTOH PAYLOAD"),
  dashboardLabels: [bi("INPUT VALIDATION", "VALIDASI INPUT"), bi("POLICY GENERATION", "GENERASI KEBIJAKAN"), bi("ROLLBACK ARTIFACT", "ARTEFAK ROLLBACK")],
  photo: bi("MXC / FIELD NOTES", "MXC / CATATAN LAPANGAN"),
  photoCaption: bi("From system architecture to the operations floor.", "Dari arsitektur sistem ke ruang operasional."),
  campusPhoto: bi("ITB / CAMPUS", "ITB / KAMPUS"),
  campusCaption: bi("Institut Teknologi Bandung campus", "Kampus Institut Teknologi Bandung"),
  telemetry: bi("VENDOR COMMAND MATRIX", "MATRIKS PERINTAH VENDOR"),
  terminalHint: bi("Read-only diagnostic examples. Syntax varies by platform and software release.", "Contoh diagnostik baca-saja. Sintaks bergantung pada platform dan versi perangkat lunak."),
  sample: bi("SAMPLE SESSION", "CONTOH SESI"), copy: bi("Copy commands", "Salin perintah"), copied: bi("Copied", "Tersalin"),
  copyFailed: bi("Unable to copy. Select the commands manually.", "Gagal menyalin. Pilih perintah secara manual."),
  credentials: bi("CREDENTIALS & CONTINUOUS DRIVE", "KREDENSIAL & PENGEMBANGAN DIRI"),
  credentialsTitle: bi("Always in motion.", "Terus bergerak."),
  credentialsSubtitle: bi("Targeting global telco-cloud & core engineering horizons.", "Menuju cakrawala rekayasa telco-cloud dan core global."),
  contactLabel: bi("THE NEXT CONNECTION", "KONEKSI BERIKUTNYA"),
  contactTitle: bi("Let’s build resilient\ninfrastructure.", "Mari membangun\ninfrastruktur tangguh."),
  contactText: bi("Open for discussions on Network Automation, Core Network Engineering, Telco Cloud, and global engineering opportunities.", "Terbuka untuk diskusi tentang Otomasi Jaringan, Rekayasa Core Network, Telco Cloud, dan peluang engineering global."),
  sayHello: bi("Start a conversation", "Mulai percakapan"), footer: bi("Engineered with precision.", "Direkayasa dengan presisi."),
  top: bi("Back to top", "Kembali ke atas"), light: bi("Switch to light mode", "Aktifkan mode terang"), dark: bi("Switch to dark mode", "Aktifkan mode gelap"), menu: bi("Toggle navigation", "Buka atau tutup navigasi"),
};

export const projects = [
  {
    number: "01", category: bi("CORE NETWORK AUTOMATION", "OTOMASI CORE NETWORK"),
    role: bi("NOA & DIOC Division · Indosat Ooredoo Hutchison", "Divisi NOA & DIOC · Indosat Ooredoo Hutchison"),
    title: bi("RELPOOL Core\nAutomation Engine", "RELPOOL Core\nAutomation Engine"),
    subtitle: bi("End-to-End Huawei GGSN/Service-V PCEF & PCRF UPCC Policy Provisioning Platform", "Platform Provisioning Kebijakan Huawei GGSN/Service-V PCEF & PCRF UPCC End-to-End"),
    description: bi("Architected and deployed an end-to-end automation platform that transforms manual, error-prone MML script configurations into an automated pipeline with built-in operational governance.", "Merancang dan menerapkan platform otomasi end-to-end yang mengubah konfigurasi skrip MML manual yang rentan kesalahan menjadi pipeline otomatis dengan tata kelola operasional terintegrasi."),
    tags: ["Python", "Streamlit", "Paramiko", "Huawei MML"],
    metrics: [
      { value: "< 5 sec", label: bi("Provisioning turnaround", "Waktu provisioning"), detail: bi("From hours / days per Work Order", "Dari hitungan jam / hari per Work Order") },
      { value: "Top 30", label: bi("SATU Innovation Hub 2026", "SATU Innovation Hub 2026"), detail: bi("Awardee · Team AI GAMERS", "Penerima penghargaan · Tim AI GAMERS") },
      { value: "100%", label: bi("Syntax compliance", "Kepatuhan sintaks"), detail: bi("Zero human-typo revenue leakage", "Tanpa kebocoran pendapatan akibat salah ketik") },
      { value: "Fernet", label: bi("Encrypted SSH gateway", "Gateway SSH terenkripsi"), detail: bi("AES-128 · Paramiko live testbed", "AES-128 · Testbed langsung Paramiko") },
    ],
    logs: [
      { title: bi("Smart Input Sanitization", "Sanitasi Input Cerdas"), text: bi("Automated Python parser strips URL protocols, trailing slashes, and Excel float artifacts (11010.0 → 11010) into sequential Huawei host/filter commands.", "Parser Python otomatis menghapus protokol URL, slash di akhir, dan artefak float Excel (11010.0 → 11010) menjadi rangkaian perintah host/filter Huawei.") },
      { title: bi("Resilient Batch CIQ Ingestion", "Ingesti Batch CIQ Andal"), text: bi("In-memory Excel/CSV parser with fuzzy column aliasing packages multi-APN deployment scripts into on-the-fly .zip and .txt artifacts.", "Parser Excel/CSV dalam memori dengan alias kolom fuzzy mengemas skrip deployment multi-APN menjadi artefak .zip dan .txt secara langsung.") },
      { title: bi("Carrier-Grade Safety & Rollback", "Keamanan & Rollback Skala Operator"), text: bi("Auto-generated inverse Rollback CLI scripts pair with atomic-write persistence (.tmp → .json swap) for uncorrupted compliance audit trails.", "Skrip CLI Rollback invers dibuat otomatis, dipadukan dengan penyimpanan atomic-write (pertukaran .tmp → .json) untuk menjaga integritas jejak audit kepatuhan.") },
      { title: bi("NOC Command Center UI", "Antarmuka Pusat Komando NOC"), text: bi("Streamlit operational dashboard with real-time KPI metrics, payload inspection, and commercial policy presets.", "Dashboard operasional Streamlit dengan metrik KPI real-time, inspeksi payload, dan preset kebijakan komersial.") },
    ],
  },
  {
    number: "02", category: bi("INCIDENT INTELLIGENCE & OBSERVABILITY", "INTELIJENSI INSIDEN & OBSERVABILITAS"),
    role: bi("Operational Analytics · Indosat Ooredoo Hutchison", "Analitik Operasional · Indosat Ooredoo Hutchison"),
    title: bi("Automated NOC Incident\nSummary & Visualization Pipeline", "Pipeline Otomatis Ringkasan\n& Visualisasi Insiden NOC"),
    subtitle: bi("LLM-Driven Outage Parser & Executive Reporting Engine", "Parser Gangguan Berbasis LLM & Mesin Pelaporan Eksekutif"),
    description: bi("Built an automated data pipeline to ingest raw, unstructured, high-volume NOC incident feeds and convert them into standardized executive visual reports in real time.", "Membangun pipeline data otomatis untuk mengolah arus insiden NOC mentah, tidak terstruktur, dan bervolume tinggi menjadi laporan visual eksekutif terstandar secara real-time."),
    tags: ["Python", "Gemini Flash", "Matplotlib", "LLM"],
    metrics: [
      { value: "Real-Time", label: bi("From raw feeds to insight", "Dari data mentah ke wawasan"), detail: bi("Unstructured ticket dumps → visual tables", "Tiket tidak terstruktur → tabel visual") },
      { value: "Multi-Category", label: bi("Incident coverage", "Cakupan insiden"), detail: bi("Major / Critical · MW alarms · Fiber cuts", "Major / Critical · Alarm MW · Fiber cut") },
      { value: "Automated", label: bi("Extraction & rendering", "Ekstraksi & rendering"), detail: bi("Gemini Flash API + Matplotlib", "Gemini Flash API + Matplotlib") },
    ],
    logs: [
      { title: bi("Automated Triage Parsing", "Parsing Triase Otomatis"), text: bi("Extracts root cause, affected regions, site impact, and MTTR progression from raw operational chat/ticket logs.", "Mengekstrak akar masalah, wilayah terdampak, dampak pada site, dan progres MTTR dari log chat/tiket operasional mentah.") },
      { title: bi("Executive Table Renderer", "Renderer Tabel Eksekutif"), text: bi("Programmatic Matplotlib layout generator produces high-resolution summary tables ready for management briefings.", "Generator tata letak Matplotlib terprogram menghasilkan tabel ringkasan resolusi tinggi siap untuk paparan manajemen.") },
    ],
  },
  {
    number: "03", category: bi("MULTI-VENDOR CARRIER DIAGNOSTICS / L1—L3", "DIAGNOSTIK OPERATOR MULTI-VENDOR / L1—L3"),
    role: bi("Tier-1 / L1–L3 Network Operations · BO-IP Datacom & DIOC", "Operasional Jaringan Tier-1 / L1–L3 · BO-IP Datacom & DIOC"),
    title: bi("Multi-Vendor Transport\n& Core Diagnostics", "Diagnostik Transport\n& Core Multi-Vendor"),
    subtitle: bi("Optical Telemetry, Routing Adjacency & Fault Isolation via SecureCRT", "Telemetri Optik, Adjacency Routing & Isolasi Gangguan melalui SecureCRT"),
    description: bi("Hands-on operational diagnostics across national backhaul and core routers, bridging physical layer realities with upper-layer routing stability.", "Diagnostik operasional langsung pada backhaul nasional dan router core, menghubungkan kondisi lapisan fisik dengan stabilitas routing lapisan atas."),
    tags: ["SecureCRT", "Optical telemetry", "OSPF / IS-IS", "LACP"],
    metrics: [
      { value: "4 Tier-1 Vendors", label: bi("Multi-platform operations", "Operasional lintas platform"), detail: bi("Cisco IOS / IOS-XR · Huawei ATN / CX / VRP · Nokia SR OS · ZTE", "Cisco IOS / IOS-XR · Huawei ATN / CX / VRP · Nokia SR OS · ZTE") },
      { value: "L1 Optical", label: bi("Physical layer diagnostics", "Diagnostik lapisan fisik"), detail: bi("Tx / Rx power (dBm) · RSL thresholds · CRC errors", "Daya Tx / Rx (dBm) · Ambang RSL · Error CRC") },
      { value: "L2 / L3 Protocols", label: bi("Routing & bundle health", "Kesehatan routing & bundle"), detail: bi("OSPF · IS-IS · LACP Smartgroup · Bundle-Ether", "OSPF · IS-IS · LACP Smartgroup · Bundle-Ether") },
    ],
    logs: [
      { title: bi("Optical & Physical Fault Isolation", "Isolasi Gangguan Optik & Fisik"), text: bi("Correlates Tx/Rx optical levels, RSL degradation, and interface CRC errors to distinguish physical faults from routing symptoms.", "Mengorelasikan level optik Tx/Rx, degradasi RSL, dan error CRC antarmuka untuk membedakan gangguan fisik dari gejala routing.") },
      { title: bi("Routing & Aggregation Verification", "Verifikasi Routing & Agregasi"), text: bi("Checks OSPF neighbors, IS-IS adjacency, and LACP member state across multi-vendor transport and core infrastructure.", "Memeriksa neighbor OSPF, adjacency IS-IS, dan status anggota LACP di infrastruktur transport dan core multi-vendor.") },
    ],
  },
];

export const vendors = [
  { name: "Cisco XR", system: "IOS-XR", prompt: "RP/0/RSP0/CPU0:CORE-01#", commands: [
    { label: bi("Optical transceiver diagnostics", "Diagnostik transceiver optik"), command: "show controllers TenGigE 0/0/0/0 phy" },
    { label: bi("Routing adjacency", "Adjacency routing"), command: "show ospf neighbor\nshow isis adjacency" },
    { label: bi("LACP bundle health", "Kesehatan bundle LACP"), command: "show bundle Bundle-Ether 1" },
    { label: bi("Chassis environment", "Lingkungan chassis"), command: "show environment all" },
  ] },
  { name: "Huawei", system: "VRP", prompt: "<CORE-01>", commands: [
    { label: bi("Optical transceiver diagnostics", "Diagnostik transceiver optik"), command: "display transceiver interface GigabitEthernet 0/0/0 verbose" },
    { label: bi("Routing adjacency", "Adjacency routing"), command: "display ospf peer brief\ndisplay isis peer" },
    { label: bi("LACP bundle health", "Kesehatan bundle LACP"), command: "display eth-trunk 1" },
    { label: bi("Chassis environment", "Lingkungan chassis"), command: "display environment" },
  ] },
  { name: "Nokia", system: "SR OS / CLASSIC CLI", prompt: "A:CORE-01#", commands: [
    { label: bi("Optical transceiver diagnostics", "Diagnostik transceiver optik"), command: "show port 1/1/1 optical" },
    { label: bi("Routing adjacency", "Adjacency routing"), command: "show router ospf neighbor\nshow router isis adjacency" },
    { label: bi("LACP bundle health", "Kesehatan bundle LACP"), command: "show lag 1 detail" },
    { label: bi("Chassis environment", "Lingkungan chassis"), command: "show chassis environment" },
  ] },
  { name: "ZTE", system: "ZXROS", prompt: "CORE-01#", commands: [
    { label: bi("Optical transceiver diagnostics", "Diagnostik transceiver optik"), command: "show opticalinfo interface xgei-0/1/0/1" },
    { label: bi("Routing adjacency", "Adjacency routing"), command: "show ip ospf neighbor\nshow isis adjacency" },
    { label: bi("LACP bundle health", "Kesehatan bundle LACP"), command: "show lacp internal" },
    { label: bi("Chassis environment", "Lingkungan chassis"), command: "show environment" },
  ] },
];

export const credentials = [
  { number: "01", type: bi("INDUSTRY EXPERIENCE", "PENGALAMAN INDUSTRI"), title: bi("i-Xplore Internship Certificate", "Sertifikat Magang i-Xplore"), issuer: "Indosat Ooredoo Hutchison", detail: "NOA & DIOC", image: assets.internshipCertificate, source: assets.internshipCertificatePdf, sourceLabel: copy.viewPdf },
  { number: "02", type: bi("INNOVATION AWARD", "PENGHARGAAN INOVASI"), title: bi("SATU Innovation Hub 2026", "SATU Innovation Hub 2026"), issuer: bi("Top 30 Innovator Award", "Penghargaan Inovator Top 30"), detail: bi("Cycle 2 · Team AI GAMERS", "Siklus 2 · Tim AI GAMERS"), image: assets.innovationAward, source: assets.innovationAward, sourceLabel: copy.viewAward },
];

export const contacts = [
  { name: "LinkedIn", label: "linkedin.com/in/muhammad-arkan-dhaifullah", url: "https://www.linkedin.com/in/muhammad-arkan-dhaifullah-22ab68380/" },
  { name: "GitHub", label: "github.com/arkandhaf", url: "https://github.com/arkandhaf" },
  { name: "Instagram", label: "@arkandhaf", url: "https://www.instagram.com/arkandhaf/" },
  { name: "Email", label: "arkandhaifulloh@gmail.com", url: "mailto:arkadhaifullah@gmail.com" },
];
