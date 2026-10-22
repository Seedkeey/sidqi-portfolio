"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { Locale } from "@/lib/content";
import { content } from "@/lib/content";
import type { GitHubStats } from "@/lib/github";
import { AboutSection } from "./about-section";
import { ContactFooter } from "./contact-footer";
import { CustomCursor } from "./custom-cursor";
import { ElectricFlow } from "./electric-flow";
import { ProjectsSection } from "./projects-section";
import { SkillsSection } from "./skills-section";

import { WelcomeOverlay } from "./welcome-overlay";

const ArduinoScene = dynamic(
  () => import("./arduino-scene").then((module) => module.ArduinoScene),
  { ssr: false },
);

export function PortfolioShell({ locale, github }: { locale: Locale; github: GitHubStats }) {
  const copy = content[locale];
  const otherLocale = locale === "id" ? "en" : "id";

  return (
    <main className="min-h-dvh">
      <WelcomeOverlay />
      <CustomCursor />
      <ElectricFlow />
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header">
        <Link href={`/${locale}`} className="brand" aria-label="Seed portfolio home">
          <span>SEED / 2026</span>
        </Link>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {copy.nav.map((item, index) => (
            <a key={item} href={index === 0 ? "#home" : `#${["about", "skills", "projects", "contact"][index - 1]}`}>
              {item}
            </a>
          ))}
        </nav>
        <Link className="language-switch" href={`/${otherLocale}`} hrefLang={otherLocale}>
          {otherLocale.toUpperCase()}
        </Link>
      </header>

      <section id="home" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy" id="content">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="signal-dot" /> {copy.eyebrow}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32 }}>
            <p className="intro">{copy.intro}</p>
            <h1 id="hero-title">{copy.name}</h1>
          </motion.div>
          <motion.div className="hero-details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.78 }}>
            <p className="role">{copy.role}</p>
            <p className="summary">{copy.summary}</p>
            <div className="hero-actions">
              <a href="#projects" className="primary-action">{copy.projects}<ArrowDownRight size={18} /></a>
              <a href="#about" className="text-action">{copy.about}<ArrowUpRight size={17} /></a>
            </div>
          </motion.div>
        </div>

        <div className="hero-visual">
          <ArduinoScene />
          <div className="visual-label"><span>ARDUINO_UNO</span><span>INTERACTIVE HARDWARE MODEL</span></div>
        </div>

        <div className="hero-status"><span>01 / 05</span><span>{copy.status}</span></div>
      </section>

      <AboutSection locale={locale} github={github} />
      <SkillsSection locale={locale} />
      <ProjectsSection locale={locale} />
      <ContactFooter locale={locale} github={github} />
    </main>
  );
}
