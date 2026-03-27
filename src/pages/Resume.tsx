import React from 'react';

const Resume: React.FC = () => (
  <>
    <section className="content-section">
      <h2>Resume Preview</h2>
      <iframe
        src="/Ryan_Dewey_Resume(1).pdf"
        width="100%"
        height="800px"
        style={{ border: '1px solid #444', borderRadius: '8px' }}
      />
      <br />
      <a className="glow-btn" href="/Ryan_Dewey_Resume(1).pdf" download>📄 Download Resume</a>
    </section>
  </>
);

export default Resume;
