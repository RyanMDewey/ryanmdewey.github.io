import React from 'react';

const Home: React.FC = () => (
  <main className="home-page-gradient-bg">
    <section className="hero-card-gradient">
      <div className="hero-avatar-gradient">
        <span className="avatar-initials-gradient">RD</span>
      </div>
      <h1 className="main-title-gradient">Ryan Dewey</h1>
      <div className="decorative-divider-gradient"></div>
      <p className="tagline-gradient">
        Designing systems that evolve,<br />
        languages that learn, and futures that remember us.
      </p>
      <a
        className="hero-link-gradient"
        href="https://nexusarc.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span role="img" aria-label="brain">🧠</span>{" "}
        <span className="gradient-text">NEXUSARC: Engineered Evolution</span>
      </a>
      <p className="hero-description-gradient">
        Founder of a multidisciplinary tech ecosystem advancing <span className="gradient-text">AI</span>, <span className="gradient-text">quantum computing</span>, <span className="gradient-text">blockchain</span>, <span className="gradient-text">robotics</span>, <span className="gradient-text">human augmentation</span>, and <span className="gradient-text">post-silicon fabrication</span>...
      </p>
      <div className="hero-actions-gradient">
        <a className="button-gradient primary-gradient" href="/resume">View Resume</a>
        <a className="button-gradient secondary-gradient" href="/contact">Contact Me</a>
      </div>
    </section>
    <footer className="footer-gradient">
      <span>✨ This universe designed by Ryan Dewey © 2025</span>
    </footer>
  </main>
);

export default Home;
