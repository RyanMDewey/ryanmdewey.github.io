export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '2rem', fontStyle: 'italic', color: '#aaa' }}>
      © {new Date().getFullYear()} Ryan Dewey – Powered by the Dewey Runtime Core.
    </footer>
  );
}

