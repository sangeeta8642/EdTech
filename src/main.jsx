import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import your CSS file here if you have one

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
