// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import your Tailwind CSS file
import App from './App';
import './App.css'; // Import your App.css containing Tailwind CSS
import { UserProvider } from './components/context/UserContext';
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
