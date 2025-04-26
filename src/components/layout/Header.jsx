import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes, FaHome, FaFileAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import styles from './Header.module.css';

// Accept theme and toggleTheme as props instead of using context
const Header = ({ theme = 'dark', toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Handle scroll events to show/hide header and apply scrolled styles
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 70; // Amount of scroll before applying scrolled style
      const scrollDifference = 50; // Minimum difference to trigger hide/show

      // Apply scrolled styling
      setIsScrolled(currentScrollY > scrollThreshold);

      // Show/hide header based on scroll direction
      if (Math.abs(currentScrollY - lastScrollY) > scrollDifference) {
        // Don't hide when near the top
        if (currentScrollY < 150) {
          setIsHeaderVisible(true);
        } else {
          setIsHeaderVisible(currentScrollY < lastScrollY);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const headerClass = `${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${!isHeaderVisible ? styles.headerHidden : ''}`;

  return (
    <header className={headerClass}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>Melvin Peralta</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                <FaHome className={styles.navIcon} /> Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                <FaUser className={styles.navIcon} /> About Me
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/resume" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                <FaFileAlt className={styles.navIcon} /> Resume
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/contact" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                <FaEnvelope className={styles.navIcon} /> Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Controls Section with fixed toggle button */}
        <div className={styles.controls}>
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <div className={styles.toggleTrack}>
              <div className={`${styles.toggleKnob} ${theme === 'dark' ? styles.toggleDark : styles.toggleLight}`}>
                {theme === 'dark' ? <FaMoon /> : <FaSun />}
              </div>
            </div>
          </button>

          <button 
            className={styles.mobileMenuBtn}
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.open : ''}`}
          onClick={closeMenu}
        ></div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenuHeader}>
            <h3 className={styles.mobileMenuTitle}>Menu</h3>
            <button 
              className={styles.closeMenu}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              <li className={styles.mobileNavItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  <FaHome className={styles.mobileNavIcon} /> Home
                </NavLink>
              </li>
              <li className={styles.mobileNavItem}>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  <FaUser className={styles.mobileNavIcon} /> About Me
                </NavLink>
              </li>
              <li className={styles.mobileNavItem}>
                <NavLink
                  to="/resume"
                  className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  <FaFileAlt className={styles.mobileNavIcon} /> Resume
                </NavLink>
              </li>
              <li className={styles.mobileNavItem}>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  <FaEnvelope className={styles.mobileNavIcon} /> Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;