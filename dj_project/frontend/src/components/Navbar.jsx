// src/components/Navbar.jsx
import AnimatedDropdown from "./AnimatedDropdown";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Home: styled like dropdowns, but just a link */}
      <a href="/" className="nav-item">
        Home 
      </a>

      <AnimatedDropdown label="Products" basePath="products" />
      <AnimatedDropdown label="Services" basePath="services" />
      <AnimatedDropdown label="Contacts" basePath="contacts" />
    </nav>
  );
}