// components/Header.jsx
export default function Header() {
  return (
    <header className="site-header">                       {/* Dark navy banner */}
      <div className="header-inner">                       {/* Wrapper to constrain width */}
        <h1 className="site-title">Haven Estates</h1>      {/* Big centered brand name */}
        <p className="site-tagline">Find Your Place to Call Home</p>
        <p className="site-sub">Discover properties that match your lifestyle, budget, and future plans.</p>
      </div>
    </header>
  );
}
