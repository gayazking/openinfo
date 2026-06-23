/**
 * ALL SITE CONTENT IN ONE FILE.
 * Edit text / links / data here — no need to touch the rest of the code.
 *
 * Photo: drop your file into /public (e.g. /public/me.jpg) and set profile.photo.
 * CV:    /public/cv.pdf is your real CV (CV_EN.pdf).
 */

import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Brain,
  Database,
  LayoutDashboard,
  Server,
  Workflow,
  Headphones,
  QrCode,
  Wallet,
  FileText,
  LineChart,
  Bot,
  Github,
  Send,
  Mail,
  Globe,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export const profile = {
  name: "Almaz Gaiazov",
  role: "Backend & AI Engineer",
  // Roles are "typed" one by one in the hero section:
  roles: [
    "Backend Engineer",
    "AI Engineer",
    "Data Engineer",
    "Python Developer",
    "Automation Engineer",
  ],
  tagline:
    "I build AI-powered analytics, data pipelines and backend systems that run in production — from speech-to-text call grading to end-to-end business automation.",
  location: "Kazan, Russia · 100% remote",
  available: true, // green "open to work" indicator
  // BASE_URL makes these work both locally (/) and on GitHub Pages (/openinfo/)
  photo: `${import.meta.env.BASE_URL}me.jpg`, // ← drop your photo into /public/me.jpg (a styled placeholder shows until then)
  cvUrl: `${import.meta.env.BASE_URL}cv.pdf`, // ← real CV (CV_EN.pdf)
  email: "gayazking@gmail.com",
};

export type Social = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/gayazking", icon: Github },
  { label: "Retynex Pro", href: "https://retynex.pro", icon: Globe },
  // Telegram via phone (international format). Replace with @username if you prefer.
  { label: "Telegram", href: "https://t.me/+79534099018", icon: Send },
  { label: "Email", href: "mailto:gayazking@gmail.com", icon: Mail },
];

export const stats = [
  { value: "6+", label: "years experience" },
  { value: "1+3", label: "full-time + contracts" },
  { value: "100%", label: "calls AI-graded" },
  { value: "24/7", label: "production uptime" },
];

export const about = {
  heading: "About me",
  paragraphs: [
    "I'm a software developer and backend engineer with 6+ years of experience designing and shipping production systems in Python and Go. My core domains are AI-powered analytics, data engineering, business automation and backend APIs — with the supporting admin interfaces built in TypeScript / React.",
    "My flagship product is Retynex Pro, a commercial B2B SaaS for AI-driven call & chat analytics, in active production use by healthcare and dental clients. I'm Lead Software Developer at LLC «Girudomed» full-time since July 2024, and in parallel maintain three concurrent long-term contracts as an independent contractor — 100% remote.",
  ],
  highlights: [
    "End-to-end ownership: backend, AI/STT, data & frontend",
    "Production AI at scale — 100% of calls auto-graded",
    "Self-hosted GPU/ASR cluster with 24/7 observability",
    "Clean architecture & type-safe code (Python, Go, TS)",
    "Full-time lead + three concurrent long-term contracts",
    "AI-assisted delivery (Claude Code, Copilot, Codex)",
  ],
  // Compact info panel under the bio:
  facts: [
    { label: "Experience", value: "6+ years" },
    { label: "Education", value: "M.Sc. · KNRTU-KAI (Honors)" },
    { label: "Languages", value: "Russian · Tatar · English B2" },
    { label: "Availability", value: "100% remote, worldwide" },
  ],
};

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Backend",
    icon: Code2,
    items: ["Python", "Go", "SQL", "FastAPI", "Flask", "aiogram", "REST"],
  },
  {
    title: "AI & Speech",
    icon: Brain,
    items: [
      "LLM Integration",
      "Prompt Engineering",
      "Speech-to-Text",
      "Whisper",
      "scikit-learn",
      "NLP",
    ],
  },
  {
    title: "Data & Databases",
    icon: Database,
    items: ["PostgreSQL", "ClickHouse", "Redis", "MongoDB", "ETL", "1C"],
  },
  {
    title: "Frontend",
    icon: LayoutDashboard,
    items: ["TypeScript", "React", "HTML / CSS", "Admin dashboards"],
  },
  {
    title: "DevOps & Monitoring",
    icon: Server,
    items: ["Docker", "CI/CD", "Linux", "nginx", "Grafana", "Prometheus"],
  },
  {
    title: "Automation & BI",
    icon: Workflow,
    items: ["n8n", "Metabase", "Yandex DataLens", "Telegram / WhatsApp API"],
  },
];

// Skill bars with percentages (animate on scroll)
export const skillBars = [
  { name: "Python", level: 95 },
  { name: "Backend & APIs (FastAPI)", level: 92 },
  { name: "AI & LLM Integration", level: 88 },
  { name: "Data Engineering (SQL / ETL)", level: 87 },
  { name: "TypeScript / React", level: 78 },
  { name: "Go", level: 75 },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  icon?: LucideIcon;
};

export const experience: ExperienceItem[] = [
  {
    role: "Lead Software Developer / Backend & AI Engineer",
    company: "LLC «Girudomed» — Healthcare · Kazan (full-time, remote)",
    period: "Jul 2024 – Present",
    description:
      "Full-time lead developer. Built Retynex Pro from inception and scaled it to a production B2B SaaS; own the end-to-end backend (Python/Go services, REST APIs, LLM & STT integrations, omnichannel chat). Also delivered a QR-based time & attendance system for medical staff and the data engineering stack — ETL from 1C with executive dashboards in Metabase and Yandex DataLens.",
    tags: ["Python", "FastAPI", "Go", "LLM", "ClickHouse", "n8n"],
    icon: Briefcase,
  },
  {
    role: "Backend Developer / IT Consultant",
    company: "LLC Stomatology «Master Dent» (Azurdent / azurs.ru) — Dental · Kazan (remote)",
    period: "Apr 2026 – Present",
    description:
      "Long-term contract for a dental clinic chain. Built and maintain the azurs.ru web platform — online booking, patient personal account, CRM and messenger integrations. Engineered 1C ecosystem connectors, financial-report automation and BI dashboards in Yandex DataLens with ETL pipelines from 1C into PostgreSQL.",
    tags: ["Python", "Go", "TypeScript", "1C", "PostgreSQL", "DataLens"],
    icon: Briefcase,
  },
  {
    role: "Backend Developer / Data Engineer",
    company: "LLC «Clever» — Business services · Kazan (remote)",
    period: "Jun 2025 – Present",
    description:
      "In-house automation & BI platform replacing manual operational processes: document workflow automation, an automated expense-management Telegram bot, n8n orchestrations, a Go aggregation service and Metabase / DataLens dashboards.",
    tags: ["Python", "Go", "aiogram", "PostgreSQL", "Metabase"],
    icon: Briefcase,
  },
  {
    role: "Backend Developer",
    company: "IE Fandrikh A.E. — B2B IT consulting (remote)",
    period: "May 2025 – Present",
    description:
      "Primary backend developer delivering custom software for the consultancy's end-clients across industries: Telegram bots, REST API integrations bridging CRM, 1C, marketplaces and payments, ETL pipelines and Go services for high-throughput processing and competitor-price monitoring.",
    tags: ["Python", "Go", "Redis", "n8n", "nginx"],
    icon: Briefcase,
  },
  {
    role: "M.Sc. — Automation & Control Systems",
    company: "KNRTU-KAI · Kazan",
    period: "2013 – 2019",
    description:
      "Master's degree, graduated with Honors (Red Diploma). Professional certifications: DevOps Engineer and Python Developer (Skillbox).",
    tags: ["Honors", "DevOps", "Python"],
    icon: GraduationCap,
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  link?: string;
  repo?: string;
  featured?: boolean; // flagship badge + full-width card
  wide?: boolean; // full-width card without the badge (bento balance)
};

export const projects: Project[] = [
  {
    title: "Retynex Pro — AI Call & Chat Analytics SaaS",
    description:
      "Commercial B2B SaaS I engineered end-to-end — backend infrastructure, AI/STT layer, omnichannel chat engine, 1C data pipelines and the operator-facing web app. It transcribes, analyzes and grades 100% of operator voice calls against custom corporate KPIs, running on a self-hosted 5×GPU ASR/LLM cluster with 24/7 Grafana observability.",
    tags: [
      "Python",
      "FastAPI",
      "LLM",
      "Speech-to-Text",
      "PostgreSQL",
      "ClickHouse",
      "React",
    ],
    icon: Headphones,
    link: "https://retynex.pro",
    featured: true,
  },
  {
    title: "QR Time & Attendance System",
    description:
      "Secure QR-based check-in ecosystem with a Telegram bot for medical staff to log precise clock-in / clock-out times into a central database, with automatic shift-close logic and notifications.",
    tags: ["Python", "Telegram Bot API", "PostgreSQL"],
    icon: QrCode,
  },
  {
    title: "Automated Expense Management Bot",
    description:
      "A tailored Telegram bot tracking accountable employee funds and automating data ingestion into a secure database — eliminating manual paperwork and reducing financial data loss to zero.",
    tags: ["Python", "aiogram", "PostgreSQL"],
    icon: Wallet,
  },
  {
    title: "Document Workflow Automation",
    description:
      "Python automation for document generation, routing and archival via REST API, plus n8n orchestrations bridging CRM, spreadsheets and notification channels — replacing manual operational processes.",
    tags: ["Python", "REST API", "n8n"],
    icon: FileText,
  },
  {
    title: "Marketing Analytics Warehouse",
    description:
      "End-to-end marketing analytics ingesting Yandex Direct, VK Ads and call-tracking events into a PostgreSQL + ClickHouse warehouse with multi-touch attribution and interactive executive BI dashboards.",
    tags: ["ClickHouse", "PostgreSQL", "Metabase", "DataLens"],
    icon: LineChart,
  },
  {
    title: "B2B Bots & System Integrations",
    description:
      "Telegram bots and REST API integrations bridging CRM, accounting (1C), marketplaces and payment providers, plus high-throughput Go services for data processing and competitor-price monitoring.",
    tags: ["Go", "Python", "REST", "1C"],
    icon: Bot,
    wide: true,
  },
];

export const contact = {
  heading: "Let's work together",
  text: "Open to interesting remote projects and long-term collaboration worldwide. I usually reply fast — drop me a line.",
  email: "gayazking@gmail.com",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

export const cvIcon = FileText;
export const briefcaseIcon = Briefcase;
