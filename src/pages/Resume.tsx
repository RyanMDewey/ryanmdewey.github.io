import React, { useEffect, useState } from 'react';

const Resume: React.FC = () => {
  const candidates = [
    '/resume/Ryan_Dewey_Resume.pdf.pdf',
    '/Ryan_Dewey_Resume.pdf.pdf',
    '/resume/RyanDeweyResume.pdf',
    '/RyanDeweyResume.pdf',
    '/resume/Ryan_Dewey_Resume.pdf',
    '/Ryan_Dewey_Resume.pdf',
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
            <p>
              If this does not display, verify your static file exists at one of:
              {candidates.map((c) => (
                <span key={c}> <code>{c}</code></span>
              ))}
            </p>
          </>
        )}
      </section>
    </main>
  );
};

export default Resume;
