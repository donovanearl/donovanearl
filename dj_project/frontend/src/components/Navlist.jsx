import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavList.css";

/**
 * Single source of truth for your nav. Each entry is either:
 *   - a plain page:      { label: "Home", to: "/" }
 *   - a dropdown item:   { label: "Features", children: [{ label, to }, ...] }
 *
 * Usage:
 * <NavList items={[
 *   { label: "Home", to: "/" },
 *   { label: "Features", children: [
 *       { label: "Analytics", to: "/features/analytics" },
 *       { label: "Automation", to: "/features/automation" },
 *   ]},
 *   { label: "About", to: "/about" },
 *   { label: "Contact", to: "/contact" },
 * ]} />
 */

export default function NavList({ items }) {
  // Tracks which item's dropdown is open by index. null = none open.
  // Only one dropdown open at a time is the standard navbar behavior.
  const [openIndex, setOpenIndex] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav ref={navRef}>
      <ul className="nav-list">
        {items.map((item, index) => {
          const hasChildren = Boolean(item.children);
          const isOpen = openIndex === index;

          return (
            <li key={item.label} className="nav-item">
              {hasChildren ? (
                <button
                  type="button"
                  className={`nav-link nav-link-button ${isOpen ? "active" : ""}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  {item.label}
                  <svg
                    className={`nav-chevron ${isOpen ? "flipped" : ""}`}
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  {item.label}
                </NavLink>
              )}

              {hasChildren && (
                <ul className={`nav-dropdown ${isOpen ? "open" : ""}`} role="menu">
                  {item.children.map((child) => (
                    <li key={child.to}>
                      <NavLink
                        to={child.to}
                        role="menuitem"
                        className="nav-dropdown-link"
                        onClick={() => setOpenIndex(null)}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}