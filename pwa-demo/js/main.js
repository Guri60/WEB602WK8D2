'use strict';

// Service Worker registration
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }
});

// Optional: Simple UI test (you can remove this if not needed)
document.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('status');

  if (status) {
    status.textContent = navigator.onLine
      ? 'You are online'
      : 'You are offline';
  }

  window.addEventListener('online', () => {
    if (status) status.textContent = 'You are online';
  });

  window.addEventListener('offline', () => {
    if (status) status.textContent = 'You are offline';
  });
});