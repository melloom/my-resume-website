import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { installApp } from '../../pwaRegistration';
import styles from './InstallPWA.module.css';

const InstallPWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the app can be installed
    const checkInstallability = () => {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        window.deferredPrompt = e;
        
        // Only show the install button if not installed
        setIsInstallable(true);
        
        // Show the banner after a slight delay
        setTimeout(() => setIsVisible(true), 3000);
      });
    };

    // Check if the app was installed
    window.addEventListener('appinstalled', () => {
      // Hide the install button
      setIsInstallable(false);
      setIsVisible(false);
      
      // Log the installation
      console.log('PWA was installed');
    });

    checkInstallability();

    // Check if already installed via display-mode
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsInstallable(false);
    }
  }, []);

  // Handle install click
  const handleInstall = () => {
    installApp();
    setIsVisible(false);
  };

  // Close banner
  const handleClose = () => {
    setIsVisible(false);
    
    // Remember the user's choice for 7 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    localStorage.setItem('pwaInstallDismissed', expiryDate.toISOString());
  };

  // Check if banner was dismissed recently
  useEffect(() => {
    const dismissedUntil = localStorage.getItem('pwaInstallDismissed');
    
    if (dismissedUntil) {
      const dismissDate = new Date(dismissedUntil);
      if (new Date() < dismissDate) {
        setIsVisible(false);
      } else {
        // Clear expired preference
        localStorage.removeItem('pwaInstallDismissed');
      }
    }
  }, []);

  if (!isInstallable || !isVisible) return null;

  return (
    <div className={`${styles.installBanner} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.bannerContent}>
        <div className={styles.bannerText}>
          <h3>Install this app</h3>
          <p>Add to your home screen for easy access</p>
        </div>
        <div className={styles.bannerActions}>
          <button onClick={handleInstall} className={styles.installButton}>
            <FaDownload /> Install
          </button>
          <button onClick={handleClose} className={styles.dismissButton}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;
