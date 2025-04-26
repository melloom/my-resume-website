import React, { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ message = "Loading..." }) => {
  const [customMessage, setCustomMessage] = useState(message);
  const [showAlmostThere, setShowAlmostThere] = useState(false);

  useEffect(() => {
    // Check if it's an internal navigation from footer
    const isFooterNav = sessionStorage.getItem('footerNavigation') === 'true';
    const isInternalNav = sessionStorage.getItem('internalNavigation') === 'true';
    
    // For internal navigation show "Almost there..." after a delay
    if (isInternalNav || isFooterNav) {
      const timer = setTimeout(() => {
        setShowAlmostThere(true);
        setCustomMessage("Almost there...");
      }, 800);
      
      return () => {
        clearTimeout(timer);
        // Clean up the session storage flag when component unmounts
        sessionStorage.removeItem('footerNavigation');
        sessionStorage.removeItem('internalNavigation');
      };
    }
  }, []);

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <div className={styles.spinner}></div>
        <div className={styles.loadingText}>
          <p>{customMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
