// components/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();                  // Show the current year automatically
  return (
    <footer className="site-footer">                      {/* Dark navy strip at the bottom */}
      <p className="footer-tag">Find yours with confidence and clarity</p>
      <p className="footer-copy">© {year} Estate Agent Property Search Platform</p>
    </footer>
  );
}
