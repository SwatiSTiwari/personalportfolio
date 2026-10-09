export const profile = {
  name: "Swati Tiwari",
  role: "Software engineer, full stack",
  company: "ScrollConnect",
  status: "Building ScrollConnect",
  intro:
    "I build web apps end to end time fthe interface people click, and the APIs, databases and real-time plumbing behind it.",
  email: "swatistiwati13@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/SwatiSTiwari" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/swati-tiwari-a02b2a237/" },
    { label: "X", href: "https://x.com/ThisIsSwati" },
    { label: "Instagram", href: "https://www.instagram.com/swatistiwari13" },
  ],
};

export const experience = [
  {
    role: "Full Stack Engineer",
    company: "QenixLabs",
    start: "Mar 2026",
    end: "Aug 2026",
    points: [
      "Led development of the company website and the wider technical work behind it.",
      "Owned technology strategy and kept it aligned with business goals.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "HDFC General Insurance",
    start: "Mar 2023",
    end: "Aug 2023",
    points: [
      "Built and optimised 10+ API endpoints.",
      "Shipped 15+ features in a MERN application.",
      "Integrated 5+ third-party services and tools.",
    ],
  },
  {
    role: "Backend Developer",
    company: "Widsaki Technologies",
    start: "Jan 2023",
    end: "Mar 2023",
    points: [
      "Ran 20+ code reviews and debugging sessions.",
      "Managed and maintained a database of 10,000+ records.",
      "Integrated 5+ third-party services and tools.",
    ],
  },
];

export type Project = {
  name: string;
  summary: string;
  stack: string[];
  label?: string;
  highlights?: string[];
  featured?: boolean;
  code?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "SunLo",
    label: "Live",
    featured: true,
    summary:
      "An anonymous space to talk through everyday stress with verified human listeners, booked by the session.",
    highlights: [
      "Listeners matched by mood, language and topic",
      "Private, end-to-end encrypted conversations",
      "Pay-per-session pricing with Razorpay and UPI",
      "Anonymous by default: no real names needed",
    ],
    stack: ["Next.js", "Razorpay"],
    live: "https://sun-lo.vercel.app/",
  },
  {
    name: "Mullai",
    label: "Live",
    featured: true,
    summary:
      "A Chennai meal subscription service delivering fresh South Indian food to homes and offices every day.",
    highlights: [
      "Subscription meal plans for individuals and companies",
      "Custom corporate menus and bulk catering for events",
      "Dashboard to pause or cancel meals before 9 PM the day before",
      "Ordering flow built around a 30-minute delivery promise",
    ],
    stack: ["Next.js"],
    live: "https://www.mullai.food/",
  },
  {
    name: "Auctionwale",
    label: "In production",
    summary:
      "A platform for bank and lender property auctions across Mumbai, Navi Mumbai, Thane and Palghar. Browse listings by city, compare prices and register interest.",
    stack: ["Next.js", "Tailwind CSS", "Auth.js", "MongoDB"],
    live: "https://auctionwale.in/",
    code: "https://github.com/SwatiSTiwari/Auctionwalenew",
  },
  {
    name: "OfferGali",
    label: "Mobile app",
    summary:
      "A hyperlocal app that shows nearby offers, discounts, coupons and vouchers from local retailers, using geofencing, QR redemption and Supabase with row-level security.",
    stack: ["React Native", "Expo", "Node.js", "Express", "Supabase", "PostgreSQL"],
  },
  {
    name: "Gloria Beddings",
    summary:
      "An online store for premium bed linen with category browsing, a shop-the-look feature, search, cart and checkout.",
    stack: ["Shopify"],
    live: "https://www.gloriabeddings.com/",
  },
  {
    name: "PolyVision",
    summary: "A college finder with personalised recommendations and career guidance.",
    stack: ["React", "Redux", "Material UI", "Stripe"],
    code: "https://github.com/shhresth/polyVision/tree/master",
    live: "https://polyvision.netlify.app/",
  },
];

export const projectFilters = ["Next.js", "React", "React Native", "Node.js", "MongoDB", "Shopify"];

export const services = [
  {
    title: "Web & mobile apps",
    body: "Responsive sites and cross-platform mobile apps built across the full stack, from component to deployment.",
    tools: ["Next.js", "React", "React Native", "Expo", "Firebase"],
  },
  {
    title: "Backend & APIs",
    body: "APIs, server setup and real-time features designed to hold up as usage grows.",
    tools: ["Node.js", "Express", "Socket.io", "Docker", "AWS"],
  },
  {
    title: "Databases",
    body: "SQL and NoSQL schema design, migrations and query tuning.",
    tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    title: "Product thinking",
    body: "Helping teams pin down goals, audiences and a roadmap before code gets written.",
    tools: ["Git", "Ubuntu", "Collaboration"],
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "C++", "Java"] },
  { group: "Frontend", items: ["Next.js", "React", "Redux Toolkit", "HTML", "CSS", "Tailwind CSS"] },
  { group: "Mobile", items: ["React Native", "Expo"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "Socket.io"] },
  { group: "Data", items: ["MongoDB", "PostgreSQL", "Supabase", "MySQL", "Redis"] },
  { group: "Tooling", items: ["Firebase", "Docker", "AWS", "Git", "Ubuntu"] },
];
