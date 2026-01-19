
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Entry point for the Astraea Deep-Space Industrial Terminal.
 * This file mounts the main React App component into the #app-root container.
 * 
 * FIX: Replaced redundant standalone DOM manipulation logic with standard React 
 * initialization to resolve 'Cannot redeclare' and 'Duplicate implementation' 
 * errors caused by clashing with index.js and constants.ts.
 */
const container = document.getElementById('app-root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Critical Error: Failed to find the app-root element for mounting the React application.');
}
