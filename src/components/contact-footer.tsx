"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight, Code2, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import type { Locale } from "@/lib/content";
import { content } from "@/lib/content";
import type { GitHubStats } from "@/lib/github";

export function ContactFooter({ locale, github }: { locale: Locale; github: GitHubStats }) {
  const copy = content[locale];
  const contact = copy.contactSection;
  const otherLocale = locale === "id" ? "en" : "id";
  const anchors = ["home", "about", "skills", "projects", "contact"];

  return (
    <>
      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-signal" aria-hidden="true"><span /><span /><span /><span /></div>
        <motion.div
          className="contact-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="section-label">{contact.label}</p>
          <h2 id="contact-title">{contact.title}</h2>
          <p>{contact.description}</p>
        </motion.div>

        <div className="contact-grid">
          <motion.a
            className="contact-primary"
            href={github.profileUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span><Code2 aria-hidden="true" /> GitHub / @Seedkeey</span>
            <strong>{contact.primaryAction}</strong>
            <ArrowUpRight aria-hidden="true" />
          </motion.a>

          <div className="contact-details">
            <p><span className="signal-dot" />{contact.availability}</p>
            <p><MapPin aria-hidden="true" />{contact.location}</p>
            <a href="tel:+6282116318615"><Phone aria-hidden="true" />+62 821-1631-8615</a>
          </div>

          <div className="contact-pending" aria-label={locale === "id" ? "Kanal kontak yang belum dipublikasikan" : "Contact channels not published yet"}>
            {contact.channels.map((channel, index) => (
              <div key={channel}>
                <span>0{index + 1}</span>
                <strong>{channel}</strong>
                <small>{contact.pending}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <strong>SEED / 2026</strong>
        </div>
        <nav aria-label={contact.quickLinks}>
          {copy.nav.map((item, index) => <a key={item} href={`#${anchors[index]}`}>{item}</a>)}
        </nav>
        <div className="footer-meta">
          <p>&copy; {new Date().getFullYear()} {contact.copyright}</p>
          <Link href={`/${otherLocale}`} hrefLang={otherLocale}>{otherLocale.toUpperCase()}</Link>
          <a href="#home" aria-label={contact.backToTop}><ArrowUp aria-hidden="true" /></a>
        </div>
      </footer>
    </>
  );
}
