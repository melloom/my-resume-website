import { Workbox } from 'workbox-window';

// Register service worker for production builds
export function registerServiceWorker() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    const wb = new Workbox('/serviceWorker.js');
    
    // Add event listeners for various Service Worker states
    wb.addEventListener('installed', event => {
      if (event.isUpdate) {
        // If this is an update, show refresh notification
        if (confirm('New content is available! Click OK to refresh.')) {
          window.location.reload();
        }
      }
    });

    wb.addEventListener('waiting', () => {
      // If a waiting worker is found (update waiting to activate)
      console.log('A new service worker is waiting to activate.');
    });

    wb.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        console.log('Service worker activated for the first time!');
      }
    });

    wb.addEventListener('controlling', () => {
      console.log('Service worker is now controlling the page.');
    });

    wb.addEventListener('message', event => {
      console.log(`Message received from service worker: ${event.data}`);
    });

    // Register the service worker
    wb.register()
      .then(registration => {
        console.log('Service worker registered successfully:', registration);
        
        // Check for updates every 2 hours
        setInterval(() => {
          wb.update();
        }, 2 * 60 * 60 * 1000);
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });

    // Check if the app was installed
    window.addEventListener('appinstalled', (event) => {
      console.log('Application was installed', event);
    });
  }
}

// Add a function to check if the app can be installed
export function checkInstallable(setInstallable) {
  if ('BeforeInstallPromptEvent' in window) {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      window.deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      if (setInstallable) {
        setInstallable(true);
      }
    });
  }
}

// Add a function to install the app
export function installApp() {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  promptEvent.userChoice.then((result) => {
    console.log('User installation choice:', result.outcome);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
  });
}
