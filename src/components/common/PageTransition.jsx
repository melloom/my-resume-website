import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PageTransition.module.css';

const PageTransition = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Add transition class when route changes
    const pageContent = document.querySelector(`.${styles.pageContent}`);
    if (pageContent) {
      pageContent.classList.add(styles.transitioning);
      
      // Remove the class after animation completes
      const timer = setTimeout(() => {
        pageContent.classList.remove(styles.transitioning);
      }, 500); // Match this with CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContent}>
        {children}
      </div>
    </div>
  );
};

export default PageTransition; 