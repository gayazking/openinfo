/**
 * ВЕСЬ КОНТЕНТ САЙТА В ОДНОМ ФАЙЛЕ.
 * Меняй текст/ссылки/данные здесь — остальной код трогать не нужно.
 *
 * Фото: положи свой файл в /public (например /public/me.jpg) и укажи путь в profile.photo.
 * CV: положи PDF в /public (например /public/cv.pdf) и укажи путь в profile.cvUrl.
 */

import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Cpu,
  Database,
  Cloud,
  Layers,
  Smartphone,
  GitBranch,
  Boxes,
  Github,
  Linkedin,
  Mail,
  Send,
  FileText,
  Briefcase,
  Scale,
} from "lucide-react";

export const profile = {
  name: "Ваше Имя",
  role: "Software Engineer",
  // Роли поочерёдно «печатаются» в hero-секции:
  roles: [
    "Full-Stack Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "Open Source Contributor",
  ],
  tagline:
    "Создаю быстрые, надёжные и красивые продукты. Превращаю сложные задачи в понятные интерфейсы и устойчивые системы.",
  location: "Город, Страна",
  available: true, // зелёный индикатор «открыт к предложениям»
  photo: "/me.jpg", // ← положи фото в /public/me.jpg (если нет — покажется заглушка)
  cvUrl: "/cv.pdf", // ← положи CV в /public/cv.pdf
  email: "you@example.com",
};

export type Social = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: Linkedin },
  { label: "Telegram", href: "https://t.me/", icon: Send },
  { label: "Email", href: "mailto:you@example.com", icon: Mail },
];

export const stats = [
  { value: "5+", label: "лет опыта" },
  { value: "30+", label: "проектов" },
  { value: "20+", label: "клиентов" },
  { value: "∞", label: "чашек кофе" },
];

export const about = {
  heading: "Обо мне",
  paragraphs: [
    "Здесь короткий рассказ о себе: кто ты, чем занимаешься, какой стек любишь и какие задачи тебя зажигают. 2–4 предложения — этого достаточно.",
    "Можно добавить про подход к работе: внимание к деталям, чистый код, забота о пользователе и производительности. Замени этот текст своим.",
  ],
  highlights: [
    "Чистая архитектура и читаемый код",
    "Внимание к UX и производительности",
    "Командная работа и code review",
    "Постоянное обучение и эксперименты",
  ],
};

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Cpu,
    items: ["Node.js", "Python", "REST", "GraphQL", "WebSockets"],
  },
  {
    title: "Базы данных",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    items: ["Docker", "CI/CD", "AWS", "Vercel", "Nginx"],
  },
  {
    title: "Инструменты",
    icon: GitBranch,
    items: ["Git", "Figma", "Jest", "Vite", "Linux"],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    items: ["React Native", "Expo", "PWA"],
  },
];

// Полоски навыков с процентами (анимируются при прокрутке)
export const skillBars = [
  { name: "JavaScript / TypeScript", level: 95 },
  { name: "React / Next.js", level: 92 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 78 },
  { name: "UI / UX Design", level: 70 },
  { name: "DevOps", level: 65 },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Компания / Проект",
    period: "2023 — настоящее время",
    description:
      "Чем занимался, что построил, какой был результат. Опиши вклад и метрики (рост, ускорение, надёжность).",
    tags: ["React", "Node.js", "AWS"],
  },
  {
    role: "Full-Stack Developer",
    company: "Компания / Проект",
    period: "2021 — 2023",
    description:
      "Краткое описание роли и ключевых достижений. Замени на свои данные.",
    tags: ["TypeScript", "PostgreSQL", "Docker"],
  },
  {
    role: "Junior Developer",
    company: "Компания / Проект",
    period: "2019 — 2021",
    description:
      "С чего начинал, какие технологии освоил, над чем работал.",
    tags: ["JavaScript", "REST", "Git"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  link?: string;
  repo?: string;
  featured?: boolean;
};

/**
 * РАЗДЕЛ «КЕЙСЫ / ПРОЕКТЫ».
 *
 * ВАЖНО про твой запрос: я НЕ могу достать данные из другого чата в Claude
 * (про Малайзию, документы, кейсы, договоры) — у меня нет доступа к истории
 * других диалогов. Скопируй тот текст в наш чат, и я вставлю его сюда вместо
 * этих заглушек. Один из блоков ниже подготовлен как раз под такой кейс.
 */
export const projects: Project[] = [
  {
    title: "Кейс: Малайзия — документы и договоры",
    description:
      "[ЗАГЛУШКА] Сюда вставится содержимое из твоего чата про Малайзию: суть кейса, какие документы и договоры готовились, результат. Пришли текст — заменю.",
    tags: ["Legal", "Документы", "Договоры"],
    icon: Scale,
    featured: true,
  },
  {
    title: "Проект №2",
    description:
      "Короткое описание проекта: задача, решение, технологии, результат. Замени на свой.",
    tags: ["React", "TypeScript", "API"],
    icon: Layers,
    link: "#",
    repo: "#",
    featured: true,
  },
  {
    title: "Проект №3",
    description:
      "Короткое описание проекта. Можно указать живую ссылку и репозиторий.",
    tags: ["Node.js", "PostgreSQL"],
    icon: Database,
    link: "#",
    repo: "#",
  },
  {
    title: "Проект №4",
    description: "Ещё один кейс из портфолио. Замени текст и ссылки на свои.",
    tags: ["Next.js", "Tailwind"],
    icon: Boxes,
    link: "#",
    repo: "#",
  },
];

export const contact = {
  heading: "Свяжись со мной",
  text: "Открыт к интересным проектам и сотрудничеству. Напиши — отвечу быстро.",
  email: "you@example.com",
};

export const navLinks = [
  { id: "home", label: "Главная" },
  { id: "about", label: "Обо мне" },
  { id: "skills", label: "Навыки" },
  { id: "experience", label: "Опыт" },
  { id: "projects", label: "Кейсы" },
  { id: "contact", label: "Контакты" },
];

export const cvIcon = FileText;
export const briefcaseIcon = Briefcase;
