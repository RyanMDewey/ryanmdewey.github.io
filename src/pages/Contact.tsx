import React from 'react';

const Contact: React.FC = () => (
  <main className="contact-page">
    <h1 className="glitch">Contact</h1>
    <p className="tagline">Let’s build something intelligent together.</p>

    <section className="section-grid">
      <a className="glow-btn" href="mailto:ryanmichaledewey@gmail.com" target="_blank">Email</a>
      <a className="glow-btn" href="https://github.com/RyanMDewey" target="_blank">GitHub</a>
      <a className="glow-btn" href="https://www.linkedin.com/in/ryan-dewey-b486a11ab" target="_blank">LinkedIn</a>
    </section>

    <footer>© 2025 Ryan Dewey</footer>
  </main>
);

export default Contact
