import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Resume: React.FC = () => {
  const candidates = [
    '/Ryan_Dewey_Resume.pdf.pdf',
    '/resume/Ryan_Dewey_Resume.pdf.pdf',
    '/resume/RyanDeweyResume.pdf',
    '/RyanDeweyResume.pdf',
  ];

  const [resumePath, setResumePath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(Math.min(window.innerWidth - 24, 1024));

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

    const updateWidth = () => setContainerWidth(Math.min(window.innerWidth - 24, 1024));
    window.addEventListener('resize', updateWidth);

    return () => {
      canceled = true;
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

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
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <a className="glow-btn" href={resumePath} download style={{ marginRight: '1rem' }}>
                📥 Download PDF
              </a>
              <a className="glow-btn" href={resumePath} target="_blank" rel="noopener noreferrer">
                🔗 Open in Browser
              </a>
            </div>

            <div style={{
              width: '100%',
              maxWidth: '1024px',
              margin: '0 auto',
              background: '#111',
              padding: '1rem',
              borderRadius: '8px',
            }}>
              <Document
                file={resumePath}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<p>Loading PDF…</p>}
                error={<p style={{ color: 'red' }}>Unable to render PDF preview. Use download/open buttons instead.</p>}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} width={containerWidth} />
                ))}
              </Document>
            </div>

            {numPages > 0 && (
              <p style={{ marginTop: '1rem', color: '#ccc' }}>
                Displaying {numPages} page{numPages === 1 ? '' : 's'}.
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Resume;
