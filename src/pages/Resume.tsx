import React from 'react';

const Resume: React.FC = () => {
  const resumePath = '/resume/RyanDeweyResume.pdf.pdf';

  return (
    <>
      <main className="resume-page">
        <h1 className="glitch">Resume</h1>
        <p className="tagline">Tap into the neural résumé.</p>
        <section className="content-section">
          <h2>Resume Preview</h2>
          <iframe
            src={resumePath}
            width="100%"
            height="800px"
            style={{ border: '1px solid #444', borderRadius: '8px' }}
            title="Resume Preview"
            loading="lazy"
          />
          <br />
          <a className="glow-btn" href={resumePath} download>
            📄 Download Resume
          </a>
        </section>
      </main>
    </>
  );
};

export default Resume;
