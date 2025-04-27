import React, { useState, useEffect, useTransition, lazy } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes, FaHome, FaFileAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import { preloadRouteComponent } from '../../utils/routePreloader';
import ShareButton from '../common/ShareButton';
import styles from './Header.module.css';

// Accept theme and toggleTheme as props instead of using context
const Header = ({ theme = 'dark', toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isPending, startTransition] = useTransition();
  const location = useLocation();
  const navigate = useNavigate();

  // Track current path for active links
  useEffect(() => {
    // Clear menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Preload components on hover/focus
  const handleLinkHover = (path) => {
    preloadRouteComponent(path);
  };

  // Handle navigation with transitions
  const handleNavigation = (path) => {
    // Close menu first
    setIsMenuOpen(false);

    // Use React's startTransition to mark navigation as non-blocking
    startTransition(() => {
      // Use navigate instead of window.location for client-side routing
      navigate(path);
    });
  };

  const isActive = (path) => location.pathname === path;
  const headerClass = `${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${!isHeaderVisible ? styles.headerHidden : ''}`;

  return (
    <>
      <header className={headerClass}>
        <div className={styles.container}>
          <Link 
            to="/" 
            className={styles.logo} 
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/');
            }}
            onMouseEnter={() => handleLinkHover('/')}
            onFocus={() => handleLinkHover('/')}
          >
            <span className={styles.logoText}>Melvin Peralta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link 
                  to="/" 
                  className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/');
                  }}
                  onMouseEnter={() => handleLinkHover('/')}
                  onFocus={() => handleLinkHover('/')}
                >
                  <FaHome className={styles.navIcon} /> Home
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  to="/about" 
                  className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/about');
                  }}
                  onMouseEnter={() => handleLinkHover('/about')}
                  onFocus={() => handleLinkHover('/about')}
                >
                  <FaUser className={styles.navIcon} /> About Me
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  to="/resume" 
                  className={`${styles.navLink} ${isActive('/resume') ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/resume');
                  }}
                  onMouseEnter={() => handleLinkHover('/resume')}
                  onFocus={() => handleLinkHover('/resume')}
                >
                  <FaFileAlt className={styles.navIcon} /> Resume
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  to="/contact" 
                  className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/contact');
                  }}
                  onMouseEnter={() => handleLinkHover('/contact')}
                  onFocus={() => handleLinkHover('/contact')}
                >
                  <FaEnvelope className={styles.navIcon} /> Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Controls Section with fixed toggle button */}
          <div className={styles.controls}>
            {/* Loading indicator */}
            {isPending && <div className={styles.loadingIndicator}></div>}
            
            {/* Add Share Button - Use 'page' type to show arrow icon consistently */}
            <div className={styles.shareButtonContainer}>
              <ShareButton 
                showLabel={false} 
                size="small" 
                type="page"
                title={`Melvin Peralta | ${location.pathname === '/resume' ? 'Resume' : 'Portfolio'}`}
              />
            </div>
            
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu - Rendered outside the header */}
      <div className={styles.mobileMenuWrapper}>
        {/* Overlay */}
        <div 
          className={`${styles.sidebarOverlay} ${isMenuOpen ? styles.visible : ''}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
        
        {/* Sidebar Content */}
        <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.sidebarHeader}>
            <h3 className={styles.sidebarTitle}>Menu</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Mobile Menu Links - Using Link with proper React Router navigation */}
          <nav className={styles.sidebarNav}>
            <ul className={styles.sidebarList}>
              <li className={styles.sidebarItem}>
                <Link 
                  to="/" 
                  className={`${styles.sidebarLink} ${isActive('/') ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/');
                  }}
                >
                  <FaHome className={styles.sidebarIcon} /> Home
                </Link>
              </li>
              <li className={styles.sidebarItem}>
                <Link 
                  to="/about" 
                  className={`${styles.sidebarLink} ${isActive('/about') ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/about');
                  }}
                >
                  <FaUser className={styles.sidebarIcon} /> About Me
                </Link>
              </li>
              <li className={styles.sidebarItem}>
                <Link 
                  to="/resume" 
                  className={`${styles.sidebarLink} ${isActive('/resume') ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/resume');
                  }}
                >
                  <FaFileAlt className={styles.sidebarIcon} /> Resume
                </Link>
              </li>
              <li className={styles.sidebarItem}>
                <Link 
                  to="/contact" 
                  className={`${styles.sidebarLink} ${isActive('/contact') ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/contact');
                  }}
                >
                  <FaEnvelope className={styles.sidebarIcon} /> Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Theme Toggle and Share */}
          <div className={styles.sidebarFooter}>
            <div className={styles.mobileActions}>
              <div className={styles.mobileThemeToggle}>
                <span className={styles.themeLabel}>
                  {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </span>
                <button 
                  onClick={toggleTheme}
                  className={`${styles.themeButton} ${theme === 'dark' ? styles.darkMode : styles.lightMode}`}
                >
                  {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
              </div>
              
              <div className={styles.mobileShareButton}>
                <span className={styles.shareLabel}>Share this page</span>
                <ShareButton 
                  showLabel={false} 
                  className={styles.sidebarShareBtn} 
                  type={location.pathname === '/resume' ? 'resume' : 'page'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay for transitions */}
      {isPending && <div className={styles.navigationOverlay}></div>}
    </>
  );
};

export default Header;