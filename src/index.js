// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { AuthProvider } from './AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap App with both BrowserRouter and AuthProvider */}
    <BrowserRouter>
      <AuthProvider> {/* Ensure AuthProvider wraps the entire app */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
