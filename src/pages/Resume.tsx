import React, { useEffect, useState } from 'react';

const Resume: React.FC = () => {
  const candidates = [
    '/Ryan_Dewey_Resume.pdf.pdf',
    '/resume/Ryan_Dewey_Resume.pdf.pdf',
    '/resume/RyanDeweyResume.pdf',
    '/RyanDeweyResume.pdf',
  ];

  const [resumePath, setResumePath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    const detectPath = async () => {
      for (const path of candidates) {
        try {
          const res = await fetch(path, { method: 'HEAD' });
          const contentType = res.headers.get('content-type') || '';

          if (res.ok && contentType.includes('pdf')) {
            if (!canceled) {
              setResumePath(path);
              setError(null);
            }
            return;
          }
        } catch {
          // ignore and try next
        }
      }

      if (!canceled) {
        setError('Unable to locate a resume PDF file. Confirm the file exists in public/ and path match.');
      }
    };

    detectPath();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <main className="resume-page">
      <h1 className="glitch">Resume</h1>
      <p className="tagline">Tap into the neural résumé.</p>

      <section className="content-section">
        <h2>Resume Preview</h2>

        {!resumePath && !error && <p>Checking resume path...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {resumePath && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                📄 Resume Preview — Works best on desktop
              </p>
              <a className="glow-btn" href={resumePath} download style={{ marginRight: '1rem' }}>
                📥 Download PDF
              </a>
              <a className="glow-btn" href={resumePath} target="_blank" rel="noopener noreferrer">
                🔗 Open in Browser
              </a>
            </div>
            <iframe
              src={resumePath + '#view=FitH'}
              style={{ 
                width: '100%', 
                height: '70vh',
                minHeight: '800px',
                border: '2px solid #38bdf8', 
                borderRadius: '8px',
                display: 'block'
              }}
              title="Resume Preview"
            />
          </>
        )}
      </section>
    </main>
  );
};

export default Resume;
