"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EyeOff, RadioTower, ScanLine } from "lucide-react";
import { startTransition, useState } from "react";
import type { Locale } from "@/lib/content";
import { content } from "@/lib/content";

type ProjectFilter = "all" | "iot" | "telecom" | "software";

export function ProjectsSection({ locale }: { locale: Locale }) {
  const copy = content[locale].projectsSection;
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const filters = Object.entries(copy.filters) as [ProjectFilter, string][];
  const projects = activeFilter === "all"
    ? copy.projects
    : copy.projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <motion.header
        className="projects-heading"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <p className="section-label">{copy.label}</p>
        <h2 id="projects-title">{copy.title}</h2>
        <p>{copy.description}</p>
      </motion.header>

      <div className="project-controls" aria-label={locale === "id" ? "Filter proyek" : "Project filters"}>
        {filters.map(([value, label]) => (
          <button
            type="button"
            key={value}
            aria-pressed={activeFilter === value}
            onClick={() => startTransition(() => setActiveFilter(value))}
          >
            <span>{label}</span>
            <small>{value === "all" ? copy.projects.length : copy.projects.filter((project) => project.category === value).length}</small>
          </button>
        ))}
      </div>

      <motion.div className="projects-grid" layout aria-live="polite">
        {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.32, delay: index * 0.035 }}
            >
              <div className={`project-visual${project.confidential ? " confidential" : ""}${project.image ? " has-image" : ""}`}>
                <span className="project-number">{String(copy.projects.findIndex((item) => item.id === project.id) + 1).padStart(2, "0")}</span>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} project documentation`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectPosition: project.imagePosition }}
                  />
                ) : (
                  <>
                    {project.confidential ? <EyeOff aria-hidden="true" /> : <ScanLine aria-hidden="true" />}
                    <div>
                      <RadioTower aria-hidden="true" size={15} />
                      <span>{project.confidential ? copy.confidential : copy.unavailable}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="project-meta">
                <span>{project.year}</span>
                <span>{copy.completed}</span>
                <span>{copy.filters[project.category]}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-stack">
                {project.stack.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </motion.article>
          ))}
      </motion.div>
    </section>
  );
}
