// src/components/Navbar.tsx

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Crypto Price Tracker</div>
    </nav>
  );
};

// 🔧 inline styles - better UI
const styles = {
  nav: {
    backgroundColor: "#3a3a3a",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #333",
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#a8a8a8",
    letterSpacing: "1px",
    fontFamily: "Inter, Montserrat, sans-serif",
  },
};

export default Navbar;
