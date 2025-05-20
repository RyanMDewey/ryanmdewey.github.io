import React, { useEffect } from "react";
import "./styles/global.css";

export default function App() {
  useEffect(() => {
    // Terminal clock
    const clock = document.getElementById("terminal-clock");
    const updateClock = () => {
      if (clock) {
        const now = new Date();
        clock.textContent = `📌 ${now.toLocaleDateString(undefined, { weekday: 'long' })} | 📅 ${now.toLocaleDateString()} | 🕒 ${now.toLocaleTimeString()}`;
      }
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // Theme toggler
    const themeToggle = document.getElementById("theme-toggle");
    const themes = ['theme-1', 'theme-2', 'theme-3'];
    let currentTheme = 0;

    document.body.classList.add(themes[currentTheme]);

    function toggleTheme() {
      document.body.classList.remove(...themes);
      currentTheme = (currentTheme + 1) % themes.length;
      document.body.classList.add(themes[currentTheme]);
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }

    // Clean up
    return () => {
      clearInterval(clockInterval);
      if (themeToggle) {
        themeToggle.removeEventListener("click", toggleTheme);
      }
    };
  }, []);

  // Note: particles.js is typically initialized outside React, but you can use useEffect or keep it in index.html

  return (
    <>
      <div id="particles-js" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <nav className="top-nav">
          <div className="nav-links">
            <a href="/experience.html">Experience</a>
            <a href="/projects.html">Projects</a>
            <a href="/skills.html">Skills</a>
            <a href="/resume.html">Resume</a>
            <a href="/contact.html">Contact</a>
            <a href="/blog/">Blog</a>
            <a href="/academy/">Academy</a>
          </div>
        </nav>

        <header className="visible" style={{ textAlign: "center" }}>
          <h1 className="glitch" style={{ marginTop: "2rem" }}>Ryan Dewey</h1>
          <p className="tagline">Designing systems that evolve, languages that learn, and futures that remember us.</p>
        </header>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button id="theme-toggle">🌗 Toggle Theme</button>
        </div>

        <section className="hero-box">
          <div className="section-title dws-glow">🧠 NEXUSARC: Engineered Evolution</div>
          <div className="dws-desc">
            Founder of a multidisciplinary tech ecosystem advancing AI, quantum computing, blockchain, robotics, human augmentation, and post-silicon fabrication. Creator of ORC — a full-stack language and execution environment powering Oracle Ledger and next-gen systems for decentralized intelligence, hardware acceleration, and human–machine symbiosis.
          </div>
        </section>

        <section className="hero-box">
          <div className="section-title dws-glow">📖 Architect of Intelligence</div>
          <p className="dws-desc mono">
            I don’t just write code — I design evolution. My work fuses artificial intelligence, quantum computing, human augmentation, and decentralized infrastructure into a single unified system. From building compilers that think to ledgers that defend themselves, I engineer frameworks that adapt, self-optimize, and scale beyond human input. Every layer I touch — from low-level hardware to high-level logic — is part of a living architecture aimed at reshaping how intelligence and autonomy exist in the world. This isn’t about tools. This is about rewriting the fabric of reality — one system at a time.
          </p>
        </section>

        <footer className="visible" style={{ marginTop: "4rem" }}>
          ✨ This universe designed by Ryan Dewey © 2025
        </footer>
        <div className="terminal-time" id="terminal-clock">📌 Loading...</div>
      </div>
    </>
  );
}
