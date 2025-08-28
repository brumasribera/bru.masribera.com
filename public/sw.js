// Dynamic cache name based on current version - this ensures cache invalidation on updates
const CACHE_NAME = 'stretch-timer-v1.1.7-' + Date.now();
const VERSION = '1.1.7';

const urlsToCache = [
  '/',
  '/tools/timer',
  '/tools/timer/',
  '/favicons/favicon-timer.svg',
  '/timer-sounds/start-gong.mp3',
  '/timer-sounds/middle-gong.mp3',
  '/timer-sounds/1m-gong.mp3',
  '/timer-sounds/end-gong.mp3',
  '/tools/timer/manifest.webmanifest'
];

// Timer Service Worker - Version 1.1.8 - Released 2025-08-28 14:48:21// Timer functionality for background operation
let timerStartTime = null;
let timerDuration = 8 * 60; // 8 minutes in seconds
let animationFrameId = null;
let isTimerRunning = false;
let isTimerCompleted = false;
let currentTimeLeft = 8 * 60;
let lastGongTime = 0; // Track last gong to prevent duplicates

// High-precision timer using performance.now() and requestAnimationFrame
function startBackgroundTimer() {
  if (isTimerRunning) return;
  
  timerStartTime = performance.now();
  isTimerRunning = true;
  isTimerCompleted = false;
  currentTimeLeft = timerDuration;
  lastGongTime = 0;
  
  console.log('Background timer started with microsecond precision');
  
  // Use requestAnimationFrame for maximum precision
  function animate(currentTime) {
    if (!isTimerRunning) return;
    
    const elapsed = (currentTime - timerStartTime) / 1000; // Convert to seconds
    const timeLeft = Math.max(0, timerDuration - elapsed);
    
    // Update current time left with high precision
    const newTimeLeft = Math.ceil(timeLeft);
    if (newTimeLeft !== currentTimeLeft) {
      currentTimeLeft = newTimeLeft;
      // Send update to main app only when time changes
      sendTimerUpdate();
    }
    
    // Play start gong after 1 second (but only once)
    if (timeLeft <= timerDuration - 1 && timeLeft > timerDuration - 2 && lastGongTime !== 'start') {
      playBackgroundGong('start');
      sendGongUpdate('start');
      lastGongTime = 'start';
    }
    
    // Play minute gongs (but only once per minute)
    if (timeLeft > 0 && timeLeft % 60 === 0 && lastGongTime !== timeLeft) {
      playBackgroundGong('minute');
      sendGongUpdate('minute');
      lastGongTime = timeLeft;
    }
    
    // Play middle gong at 4 minutes (but only once)
    if (timeLeft === 4 * 60 && lastGongTime !== 'middle') {
      playBackgroundGong('middle');
      sendGongUpdate('middle');
      lastGongTime = 'middle';
    }
    
    // Timer complete
    if (timeLeft <= 0 && !isTimerCompleted) {
      isTimerCompleted = true;
      playBackgroundGong('end');
      sendGongUpdate('end');
      stopBackgroundTimer();
      return;
    }
    
    // Continue animation frame loop
    if (isTimerRunning) {
      animationFrameId = requestAnimationFrame(animate);
    }
  }
  
  animationFrameId = requestAnimationFrame(animate);
}

function stopBackgroundTimer() {
  isTimerRunning = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  timerStartTime = null;
  currentTimeLeft = 8 * 60;
  lastGongTime = 0;
  sendTimerUpdate();
  console.log('Background timer stopped');
}

function resetBackgroundTimer() {
  stopBackgroundTimer();
  currentTimeLeft = 8 * 60;
  isTimerCompleted = false;
  lastGongTime = 0;
  sendTimerUpdate();
  console.log('Background timer reset');
}

function sendTimerUpdate() {
  // Send timer state to all connected clients
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'TIMER_UPDATE',
        timeLeft: currentTimeLeft,
        isRunning: isTimerRunning,
        isCompleted: isTimerCompleted
      });
    });
  });
}

function sendGongUpdate(gongType) {
  // Send gong update to all connected clients
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'TIMER_UPDATE',
        timeLeft: currentTimeLeft,
        isRunning: isTimerRunning,
        isCompleted: isTimerCompleted,
        gongType: gongType
      });
    });
  });
}

function playBackgroundGong(type) {
  // Try to play audio even in background
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a simple beep sound that works in background
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different gongs
    let frequency = 800; // Default
    let duration = 0.5;
    
    switch(type) {
      case 'start':
        frequency = 1000;
        duration = 0.3;
        break;
      case 'middle':
        frequency = 600;
        duration = 0.5;
        break;
      case 'minute':
        frequency = 800;
        duration = 0.3;
        break;
      case 'end':
        frequency = 400;
        duration = 1.0;
        break;
    }
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
    
    // Clean up
    setTimeout(() => {
      audioContext.close();
    }, (duration + 0.1) * 1000);
    
    console.log(`Background gong played: ${type}`);
  } catch (error) {
    console.log('Failed to play background gong:', error);
  }
}

// Listen for messages from the main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TIMER_CONTROL') {
    switch (event.data.action) {
      case 'START':
        startBackgroundTimer();
        break;
      case 'STOP':
        stopBackgroundTimer();
        break;
      case 'RESET':
        resetBackgroundTimer();
        break;
      case 'TIMER_SYNC':
        // Sync with main app state
        if (event.data.data) {
          currentTimeLeft = event.data.data.timeLeft || currentTimeLeft;
          isTimerRunning = event.data.data.isRunning || isTimerRunning;
          isTimerCompleted = event.data.data.isCompleted || isTimerCompleted;
        }
        break;
      case 'VISIBILITY_CHANGE':
        // Handle visibility changes
        console.log('Visibility changed:', event.data.data?.isVisible);
        break;
      case 'PAGE_FOCUS':
        console.log('Page gained focus');
        break;
      case 'PAGE_BLUR':
        console.log('Page lost focus');
        break;
    }
  }
});

// Keep service worker alive
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
