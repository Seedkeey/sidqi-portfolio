"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight, Code2 } from "lucide-react";
import { motion } from "motion/react";
import type { Locale } from "@/lib/content";
import { content } from "@/lib/content";
import type { GitHubStats } from "@/lib/github";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false },
);

const calendarTheme = {
  light: ["#dedbd5", "#dba8af", "#c96a79", "#a72b42", "#701020"],
};

function formatActivity(value: string | null, locale: Locale) {
  if (!value) return "—";

  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function AboutSection({ locale, github }: { locale: Locale; github: GitHubStats }) {
  const copy = content[locale].aboutSection;
  const stats = [
    { label: copy.repositories, value: github.publicRepos?.toString() ?? "—" },
    { label: copy.activity, value: formatActivity(github.latestActivity, locale) },
    { label: copy.language, value: github.primaryLanguage ?? "—" },
  ];

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="section-rail" aria-hidden="true">
        <span>02</span><span>ABOUT / PROFILE</span>
      </div>

      <motion.header
        className="about-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="section-label">{copy.label}</p>
        <h2 id="about-title">{copy.title}</h2>
        <p className="about-statement">{copy.statement}</p>
      </motion.header>

      <div className="about-grid">
        <motion.article
          className="github-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="github-heading">
            <div>
              <p className="panel-kicker"><Code2 size={15} /> {copy.githubLabel}</p>
              <p>{copy.githubDescription}</p>
            </div>
            <a href={github.profileUrl} target="_blank" rel="noreferrer" aria-label="Open Seed's GitHub profile">
              @Seedkeey <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="github-stats">
            {stats.map((stat) => <div key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></div>)}
          </div>

          <div className="contribution-panel">
            {github.available ? (
              <GitHubCalendar username="Seedkeey" colorScheme="light" theme={calendarTheme} blockSize={11} blockMargin={4} fontSize={11} />
            ) : (
              <div className="github-empty" role="status"><span>404 / PROFILE OFFLINE</span><p>{copy.githubUnavailable}</p></div>
            )}
          </div>

          <div className="enthusiast-tags" aria-label="Areas of interest">
            {copy.enthusiastTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </motion.article>

        <div className="timeline-columns">
          <Timeline title={copy.experienceLabel} items={copy.experience} />
          <Timeline title={copy.educationLabel} items={copy.education} />
        </div>
      </div>
    </section>
  );
}

function Timeline({ title, items }: { title: string; items: Array<{ period: string; title: string; place: string; description: string }> }) {
  return (
    <motion.section
      className="timeline-group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      aria-labelledby={`timeline-${title.replaceAll(" ", "-").toLowerCase()}`}
    >
      <h3 id={`timeline-${title.replaceAll(" ", "-").toLowerCase()}`}>{title}</h3>
      <ol>
        {items.map((item) => (
          <li key={`${item.period}-${item.title}`}>
            <time>{item.period}</time>
            <div><h4>{item.title}</h4><p className="timeline-place">{item.place}</p><p>{item.description}</p></div>
          </li>
        ))}
      </ol>
    </motion.section>
  );
}
