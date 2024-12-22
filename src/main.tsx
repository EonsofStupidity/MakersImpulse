import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

console.log('Starting application initialization');

// Create root with error boundary
const root = ReactDOM.createRoot(document.getElementById('root')!)

// Development error logging
if (process.env.NODE_ENV === 'development') {
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global error:', { message, source, lineno, colno, error });
  };
}

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)