"use client";

import { useEffect, useRef, useState } from "react";

export const welcomeGreetings = [
  { language: "Bahasa Indonesia", text: "Halo, saya Sidqi", dir: "ltr" as const },
  { language: "English", text: "Hello, I’m Sidqi", dir: "ltr" as const },
  { language: "日本語", text: "こんにちは、Sidqiです", dir: "ltr" as const },
  { language: "한국어", text: "안녕하세요, Sidqi입니다", dir: "ltr" as const },
  { language: "中文", text: "你好，我是 Sidqi", dir: "ltr" as const },
  { language: "العربية", text: "مرحبًا، أنا Sidqi", dir: "rtl" as const },
];

export const welcomeConfig = {
  sessionKey: "sidqi-welcome-seen-v2",
  greetingDuration: 650,
  transitionDuration: 280,
  exitDuration: 520,
  reducedMotionDuration: 700,
  showSkip: true,
};

type WelcomeState = "checking" | "active" | "exiting" | "complete";

export function WelcomeOverlay() {
  const [state, setState] = useState<WelcomeState>("checking");
  const [index, setIndex] = useState(0);
  const skipRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const replay = params.get("welcome") === "1" || params.get("replay") === "1";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem(welcomeConfig.sessionKey);

    if (seen && !replay) {
      window.setTimeout(() => setState("complete"), 0);
      return;
    }

    window.sessionStorage.setItem(welcomeConfig.sessionKey, "1");
    window.setTimeout(() => setState("active"), 0);
    if (welcomeConfig.showSkip) window.requestAnimationFrame(() => skipRef.current?.focus());

    const duration = reducedMotion ? welcomeConfig.reducedMotionDuration : welcomeConfig.greetingDuration;
    timerRef.current = window.setTimeout(() => {
      if (reducedMotion) setState("exiting");
      else if (index < welcomeGreetings.length - 1) setIndex((current) => current + 1);
      else setState("exiting");
    }, duration);

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [index]);

  useEffect(() => {
    if (state !== "exiting") return;
    timerRef.current = window.setTimeout(() => setState("complete"), welcomeConfig.exitDuration);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [state]);

  useEffect(() => {
    if (state === "active" || state === "exiting") {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [state]);

  const skip = () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    window.sessionStorage.setItem(welcomeConfig.sessionKey, "1");
    setState("exiting");
  };

  if (state === "checking" || state === "complete") return null;

  const greeting = welcomeGreetings[index];
  return (
    <div className={`welcome-overlay${state === "exiting" ? " is-exiting" : ""}`} role="dialog" aria-modal="true" aria-label="Welcome to Sidqi’s portfolio">
      <div className="welcome-grid" aria-hidden="true" />
      <div className="welcome-content">
        <p className="welcome-kicker"><span className="signal-dot" /> INITIALIZING / SEED 2026</p>
        <p className="welcome-language" key={greeting.language}>{greeting.language}</p>
        <p className="welcome-greeting" key={greeting.text} dir={greeting.dir}>{greeting.text}</p>
        <div className="welcome-progress" aria-hidden="true">
          {welcomeGreetings.map((item, itemIndex) => <span key={item.language} className={itemIndex <= index ? "is-active" : ""} />)}
        </div>
      </div>
      {welcomeConfig.showSkip && (
        <button ref={skipRef} className="welcome-skip" type="button" onClick={skip}>
          Skip intro <span aria-hidden="true">↗</span>
        </button>
      )}
    </div>
  );
}
