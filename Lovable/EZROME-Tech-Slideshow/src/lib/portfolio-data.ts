import portrait from "@/assets/sixolile-portrait.jpg.asset.json";
import cvAsset from "@/assets/cv.pdf.asset.json";

export const profile = {
  name: "Sixolile Ezrome Mtyhali",
  identity: "Technology Professional & Digital Innovator",
  subtitle: "Customer Service • Warehouse Operations • Sales Merchandising • AI Enthusiast",
  lead: "Hardworking and adaptable professional with hands-on experience across retail, warehousing, manufacturing, sales and logistics, now expanding into digital technology and AI through CAPACITI and Google AI Essentials.",
  quote: "Build smarter. Work harder. Create impact.",
  portrait: portrait.url,
  cv: cvAsset.url,
  emails: ["xillahwethu87@gmail.com", "sixolile.mtyhali@capaciti.org.za"],
  phones: [
    { label: "069 144 7275", href: "tel:+27691447275" },
    { label: "063 114 6561", href: "tel:+27631146561" },
  ],
  location: "J411 Qubaka Crescent, Khayelitsha, Cape Town, Western Cape, 7784",
  aiAssistantUrl: "https://sixolile-mtyhali-ai-assistant.lovable.app",
};

export const about = {
  about: "I am a motivated and reliable individual with hands-on experience across retail, manufacturing, warehousing, sales and logistics. I take pride in teamwork, following procedures, accurate stock handling, customer support and adapting to different working environments. I am strengthening my digital and AI skills through a CAPACITI learnership and Google AI Essentials.",
  objective: "I am looking for a professional, teamwork-oriented environment where I can contribute my practical experience, strong work ethic and growing digital capabilities while continuing to learn, take on responsibility and create value for the organisation.",
};

export const experience = [
  { date: "Feb 2022 — Nov 2022", company: "Food Lovers' Meat Market", role: "Order Picker & Stock Tracker", note: "Through an agency", points: ["Order picking and customer orders", "Stock tracking and inventory support", "Accurate product handling", "Fast-paced retail environment"] },
  { date: "Dec 2022 — Jun 2023", company: "Albany Bakeries / Tiger Brands", role: "Assistant Machine Operator", points: ["Assisted production operations", "Supported machine operators", "Followed workplace procedures", "Worked as part of a production team"] },
  { date: "Jun 2023 — Nov 2023", company: "StageZero", role: "Picker", points: ["Order picking and product handling", "Accuracy and quality of picked items", "Supported fulfilment processes", "Worked under pressure"] },
  { date: "Dec 2023 — Aug 2024", company: "Simba", role: "Picker & Sales Merchandiser", points: ["Picked and handled products", "Sales merchandising", "Stock availability and presentation", "Supported retail execution"] },
  { date: "Most recent role", company: "Freightmore Ltd Pty", role: "Checker / Van Assistant", points: ["Checking goods and items", "Van and delivery support", "Product handling", "Logistics team support", "Employment dates to be confirmed"] },
];

export const skillGroups = [
  { title: "Operations & Logistics", items: ["Order Picking", "Stock Tracking", "Stock Handling", "Checking", "Packing", "Warehouse Operations", "Logistics Support", "Van Assistance", "Product Handling"] },
  { title: "Customer & Sales", items: ["Customer Service", "Sales Merchandising", "Retail Support", "Communication", "Team Collaboration", "Professional Conduct"] },
  { title: "Workplace Skills", items: ["Time Management", "Reliability", "Adaptability", "Teamwork", "Attention to Detail", "Working Under Pressure", "Willingness to Learn", "Problem Solving"] },
  { title: "Digital & AI Skills", items: ["AI Literacy", "AI Productivity Tools", "Prompting", "Responsible AI", "Digital Productivity", "AI-Assisted Problem Solving", "AI Project Development"] },
];

export const roadmap = [
  { step: "01 · Proven Today", title: "Digital Foundations", body: "Practical digital productivity, AI literacy and responsible use.", tags: ["AI Literacy", "Prompting", "Git & GitHub", "HTML/CSS"], current: true },
  { step: "02 · Building Now", title: "AI Productivity", body: "Applying AI to practical workflows and productivity-focused projects.", tags: ["AI Tools", "Responsible AI", "AI Projects", "Problem Solving"], current: true },
  { step: "03 · Developing", title: "Web Development", body: "Growing from web fundamentals toward modern application development.", tags: ["JavaScript", "React", "Next.js", "Tailwind CSS"], current: false },
  { step: "04 · Next Horizon", title: "Full-Stack & APIs", body: "Learning how frontends, APIs and backend services work together.", tags: ["Python", "FastAPI", "APIs", "Databases"], current: false },
  { step: "05 · Long-Term", title: "Cloud & Innovation", body: "Building the foundations for scalable, deployable technology solutions.", tags: ["Cloud", "DevOps", "Automation", "AI Innovation"], current: false },
];

export const certification = {
  title: "Google AI Essentials",
  issuer: "Google / Coursera",
  completed: "Completed 18 August 2026",
  verifyUrl: "https://coursera.org/verify/specialization/HQ80B2O6SVQY",
  modules: ["Introduction to AI", "Maximize Productivity With AI Tools", "Discover the Art of Prompting", "Use AI Responsibly", "Stay Ahead of the AI Curve"],
};

export const education = [
  { title: "Uxolo High School", detail: "Matric Certificate · 2019 — 2021" },
  { title: "CAPACITI Learnership", detail: "Currently in progress. Developing digital skills, technology exposure, workplace readiness and AI capabilities." },
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/cv", label: "CV" },
  { to: "/contact", label: "Contact" },
] as const;
