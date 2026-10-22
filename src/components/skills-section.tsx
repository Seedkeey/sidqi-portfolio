"use client";

import { useRef } from "react";
import { Cpu, Network, RadioTower, Ruler } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Locale } from "@/lib/content";
import { content } from "@/lib/content";

const icons = [Network, Cpu, RadioTower, Ruler];

export function SkillsSection({ locale }: { locale: Locale }) {
  const copy = content[locale].skillsSection;
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 82%", "end 30%"],
  });
  const signalProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.35,
  });
  const signalX = useTransform(signalProgress, [0, 1], ["0%", "100%"]);
  const tickerRows = [
    copy.categories.flatMap((category) => category.skills).slice(0, 7),
    copy.categories.flatMap((category) => category.skills).slice(7, 14),
    copy.categories.flatMap((category) => category.skills).slice(14, 21),
  ];

  return (
    <section ref={sectionRef} id="skills" className="skills-section" aria-labelledby="skills-title">
      <div className="skills-signal" aria-hidden="true">
        <span /><span /><span />
        <motion.i
          className="skills-signal-progress"
          style={{ scaleX: shouldReduceMotion ? 1 : signalProgress }}
        />
        <motion.b
          className="skills-signal-node"
          style={{ left: shouldReduceMotion ? "100%" : signalX }}
        />
      </div>

      <motion.header
        className="skills-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <p className="section-label">{copy.label}</p>
        <h2 id="skills-title">{copy.title}</h2>
        <p className="skills-direction">{copy.direction}</p>
      </motion.header>

      <div className="skills-summary">
        {copy.summary.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span>0{index + 1} / {item.label}</span>
            <strong>{item.value}</strong>
          </motion.div>
        ))}
      </div>

      <div className="skills-ticker" aria-label="Animated skills capability map">
        {tickerRows.map((row, rowIndex) => (
          <div className={`skills-ticker-row ticker-row-${rowIndex + 1}`} key={rowIndex}>
            <div className="skills-ticker-track">
              {[...row, ...row].map((skill, skillIndex) => (
                <span key={`${skill}-${skillIndex}`}>{skill}<b aria-hidden="true"> / </b></span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skills-body">
        <motion.aside
          className="tools-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: shouldReduceMotion ? 0 : 0.07 },
            },
          }}
          aria-labelledby="tools-title"
        >
          <h3 id="tools-title">{copy.toolsLabel}</h3>
          {copy.tools.map((group, index) => (
            <motion.div
              className="tool-group"
              key={group.label}
              variants={{
                hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -16 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <span>0{index + 1}</span>
              <div><h4>{group.label}</h4><p>{group.items.join(" / ")}</p></div>
            </motion.div>
          ))}
        </motion.aside>

        <div className="capabilities" aria-labelledby="capabilities-title">
          <h3 id="capabilities-title">{copy.capabilitiesLabel}</h3>
          {copy.categories.map((category, index) => {
            const Icon = icons[index];

            return (
              <motion.article
                className="capability-row"
                key={category.code}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? undefined : { x: 8 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.05,
                  duration: shouldReduceMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div
                  className="capability-scan"
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    duration: shouldReduceMotion ? 0 : 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                />
                <div className="capability-index"><span>0{index + 1}</span><Icon size={22} strokeWidth={1.5} /></div>
                <div className="capability-main">
                  <p>{category.code}</p>
                  <h4>{category.title}</h4>
                  <p className="capability-description">{category.description}</p>
                </div>
                <div className="capability-details">
                  <span>{copy.skillsLabel}</span>
                  <ul>{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                  <div>{category.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
