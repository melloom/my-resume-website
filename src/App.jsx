import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { registerServiceWorker } from './pwaRegistration';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageLoader from './components/common/PageLoader';
import InstallPWA from './components/common/InstallPWA';
import { preloadAllRouteComponents } from './utils/routePreloader';

// Lazy loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Resume = lazy(() => import('./pages/Resume'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Register service worker for PWA functionality
  useEffect(() => {
    registerServiceWorker();
    preloadAllRouteComponents();
  }, []);

  // Reset scroll position when navigating to a new page
  useEffect(() => {
    if (location.hash === '') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <HelmetProvider>
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      
      <Footer />
      <InstallPWA />
    </HelmetProvider>
  );
}

export default App;