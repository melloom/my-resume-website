import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { registerServiceWorker, protectThemeSetting } from './pwaRegistration';
import './assets/styles/global.css';

// Protect theme setting from service worker interference
protectThemeSetting();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// Register service worker for PWA support
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  // Delay service worker registration to ensure theme settings are stable
  setTimeout(() => {
    registerServiceWorker();
  }, 1000);
}