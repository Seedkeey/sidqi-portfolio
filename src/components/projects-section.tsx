"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, EyeOff, FileLock2, ScanLine, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { content } from "@/lib/content";
import type { ProjectCategory } from "@/lib/projects";
import { projects as projectData } from "@/lib/projects";

type ProjectFilter = "all" | ProjectCategory;

const HASH_PREFIX = "#project-";

function readIdFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  return hash.startsWith(HASH_PREFIX) ? decodeURIComponent(hash.slice(HASH_PREFIX.length)) : null;
}

export function ProjectsSection({ locale }: { locale: Locale }) {
  const copy = content[locale].projectsSection;
  const filters = useMemo(() => Object.entries(copy.filters) as [ProjectFilter, string][], [copy.filters]);

  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [activeId, setActiveId] = useState<string>(projectData[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(
    () => (activeFilter === "all" ? projectData : projectData.filter((project) => project.category === activeFilter)),
    [activeFilter],
  );

  const activeIndex = Math.max(
    filteredProjects.findIndex((project) => project.id === activeId),
    0,
  );
  const activeProject = filteredProjects[activeIndex] ?? filteredProjects[0] ?? projectData[0];

  // Reflect the active project in the URL hash (replace, so Back is not flooded).
  useEffect(() => {
    if (!activeProject) return;
    const hash = `${HASH_PREFIX}${encodeURIComponent(activeProject.id)}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }, [activeProject]);

  // Restore selection from the hash after hydration and when the user navigates back/forward.
  useEffect(() => {
    const applyHash = () => {
      const id = readIdFromHash();
      if (id && projectData.some((project) => project.id === id)) {
        setActiveId(id);
      }
    };

    applyHash();
    const onHashChange = () => applyHash();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (!filteredProjects.length) return;
      const next = filteredProjects[(index + filteredProjects.length) % filteredProjects.length];
      setActiveId(next.id);
    },
    [filteredProjects],
  );

  // Keyboard navigation scoped to the section.
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section || !filteredProjects.length) return;

      const target = event.target as HTMLElement | null;
      const isInside = target ? section.contains(target) : false;
      const isTyping = target ? /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable : false;

      // Arrow Up / Down always navigate the archive; Arrow Left / Right only when focused inside.
      if (event.key === "ArrowDown" || (isInside && event.key === "ArrowRight")) {
        if (!isTyping) {
          event.preventDefault();
          goTo(activeIndex + 1);
        }
      } else if (event.key === "ArrowUp" || (isInside && event.key === "ArrowLeft")) {
        if (!isTyping) {
          event.preventDefault();
          goTo(activeIndex - 1);
        }
      } else if (event.key === "Enter" && isInside && target?.dataset.projectId) {
        event.preventDefault();
        setActiveId(target.dataset.projectId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, filteredProjects.length, goTo]);

  if (!activeProject) return null;

  const projectNumber = projectData.findIndex((project) => project.id === activeProject.id) + 1;
  const statusLabel = activeProject.status[locale];
  const isConfidential = activeProject.confidential;
  const documentationNote = activeProject.documentationStatus?.[locale];

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title" ref={sectionRef}>
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

      <div className="project-controls" aria-label={locale === "id" ? "Filter proyek" : "Project filters"} role="group">
        {filters.map(([value, label]) => {
          const count = value === "all" ? projectData.length : projectData.filter((project) => project.category === value).length;
          return (
            <button
              type="button"
              key={value}
              aria-pressed={activeFilter === value}
              onClick={() => setActiveFilter(value)}
            >
              <span>{label}</span>
              <small>{count}</small>
            </button>
          );
        })}
      </div>

      <div className="projects-archive" aria-live="polite">
        <div className="project-index" ref={listRef} role="listbox" aria-label={copy.indexLabel} aria-activedescendant={`project-option-${activeProject.id}`}>
          <div className="project-index-heading">
            <span>{copy.indexLabel}</span>
            <strong>{String(filteredProjects.length).padStart(2, "0")}</strong>
          </div>
          <ul>
            {filteredProjects.map((project, index) => {
              const isActive = project.id === activeProject.id;
              const number = String(projectData.findIndex((item) => item.id === project.id) + 1).padStart(2, "0");
              return (
                <li key={project.id}>
                  <button
                    type="button"
                    id={`project-option-${project.id}`}
                    data-project-id={project.id}
                    role="option"
                    aria-selected={isActive}
                    className="project-index-item"
                    onClick={() => goTo(index)}
                  >
                    <span className="project-index-num">{number}</span>
                    <span className="project-index-title">{project.title}</span>
                    <span className="project-index-meta">
                      <span>{project.year}</span>
                      <span>{copy.filters[project.category]}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            className="project-detail"
            key={activeProject.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="project-detail-meta">
              <span>{String(projectNumber).padStart(2, "0")} / {String(projectData.length).padStart(2, "0")}</span>
              <span>{activeProject.year}</span>
              <span>{copy.filters[activeProject.category]}</span>
            </div>

            <div className={`project-detail-visual${isConfidential ? " confidential" : ""}${activeProject.image ? " has-image" : ""}`}>
              {activeProject.image ? (
                activeProject.images && activeProject.images.length > 1 ? (
                  <div className="project-detail-gallery">
                    {activeProject.images.map((image, imageIndex) => (
                      <Image
                        key={image}
                        src={image}
                        alt={`${activeProject.imageAlt ?? `${activeProject.title} project documentation`} — view ${imageIndex + 1}`}
                        fill={false}
                        width={900}
                        height={560}
                        sizes="(max-width: 900px) 50vw, 28vw"
                        style={{ objectPosition: activeProject.imagePosition }}
                      />
                    ))}
                  </div>
                ) : (
                  <Image
                    src={activeProject.image}
                    alt={activeProject.imageAlt ?? `${activeProject.title} project documentation`}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    style={{ objectPosition: activeProject.imagePosition }}
                  />
                )
              ) : isConfidential ? (
                <FileLock2 aria-hidden="true" />
              ) : (
                <ScanLine aria-hidden="true" />
              )}
              <span className="project-detail-visual-tag">
                {isConfidential ? <EyeOff aria-hidden="true" /> : null}
                {isConfidential ? copy.confidential : documentationNote ?? statusLabel}
              </span>
            </div>

            <div className="project-detail-copy">
              <h3>{activeProject.title}</h3>
              <p>{activeProject.description[locale]}</p>

              {activeProject.securityNote ? (
                <div className="project-security-note">
                  <p className="project-detail-label">
                    <ShieldCheck aria-hidden="true" /> {copy.securityNoteLabel}
                  </p>
                  <p>{activeProject.securityNote[locale]}</p>
                </div>
              ) : null}

              <div className="project-detail-grid">
                <div>
                  <p className="project-detail-label">{copy.roleLabel}</p>
                  <p>{activeProject.role[locale]}</p>
                </div>
                <div>
                  <p className="project-detail-label">{copy.stackLabel}</p>
                  <div className="project-row-stack">
                    {activeProject.stack.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="project-detail-status">
                {isConfidential ? <EyeOff aria-hidden="true" /> : <ShieldCheck aria-hidden="true" />}
                {statusLabel}
              </p>
            </div>

            <div className="project-navigation">
              <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label={copy.previous}>
                <ArrowLeft aria-hidden="true" />
                <span>{copy.previous}</span>
              </button>
              <span aria-hidden="true">
                {String(activeIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label={copy.next}>
                <span>{copy.next}</span>
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
