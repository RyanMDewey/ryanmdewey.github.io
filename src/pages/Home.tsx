import React, { useEffect } from "react";
declare global { interface Window { particlesJS: any; }}

export default function Home() {
  useEffect(() => {
    // particles.js setup
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {/* ...same as before... */},
          interactivity: {/* ... */},
          retina_detect: true,
        });
      }
    };
    document.body.appendChild(script);

    // Clock
    const clock = document.getElementById("terminal-clock");
    const updateClock = () => {
      if (clock) {
        const now = new Date();
        clock.textContent = `📌 ${now.toLocaleDateString(undefined, { weekday: "long" })} | 📅 ${now.toLocaleDateString()} | 🕒 ${now.toLocaleTimeString()}`;
      }
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // Theme toggler
    const themeToggle = document.getElementById("theme-toggle");
    const themes = ["theme-1", "theme-2", "theme-3"];
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

    // Cleanup
    return () => {
      clearInterval(clockInterval);
      if (themeToggle) {
        themeToggle.removeEventListener("click", toggleTheme);
      }
      const particlesContainer = document.getElementById("particles-js");
      if (particlesContainer) {
        particlesContainer.innerHTML = "";
      }
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div id="particles-js" style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0,
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <header className="visible" style={{ textAlign: "center" }}>
          <h1 className="gradient-text" style={{ marginTop: "2rem", fontSize: "2.5rem" }}>
            Ryan Dewey
          </h1>
          <p className="tagline">
            Designing systems that evolve, languages that learn, and futures that remember us.
          </p>
        </header>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button id="theme-toggle">🌗 Toggle Theme</button>
        </div>
        <section className="hero-box">
          <div className="section-title">
            <span role="img" aria-label="brain">🧠</span> NEXUSARC: Engineered Evolution
          </div>
          <div className="desc">
            Founder of a multidisciplinary tech ecosystem advancing AI, quantum computing, blockchain, robotics, human augmentation, and post-silicon fabrication. Creator of ORC — a full-stack language and execution environment powering Oracle Ledger and next-gen systems for decentralized intelligence, hardware acceleration, and human–machine symbiosis.
          </div>
        </section>
        <section className="hero-box">
          <div className="section-title">
            <span role="img" aria-label="book">📖</span> Architect of Intelligence
          </div>
          <p className="desc mono">
            I don’t just write code — I design evolution. My work fuses artificial intelligence, quantum computing, human augmentation, and decentralized infrastructure into a single unified system. From building compilers that think to ledgers that defend themselves, I engineer frameworks that adapt, self-optimize, and scale beyond human input. Every layer I touch — from low-level hardware to high-level logic — is part of a living architecture aimed at reshaping how intelligence and autonomy exist in the world. This isn’t about tools. This is about rewriting the fabric of reality — one system at a time.
          </p>
        </section>
        <div className="terminal-time" id="terminal-clock">
          📌 Loading...
        </div>
      </div>
    </>
  );
}
