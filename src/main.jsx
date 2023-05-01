import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './tailwind.css';
import App from './App';

const root = document.getElementById('root');

root.render(
  <Router>
    <App />
  </Router>
)