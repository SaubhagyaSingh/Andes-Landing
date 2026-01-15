import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';
import './normalize.css';

import { AuthProvider } from './components/AuthContext.jsx'; // ⬅️ Import your context

ReactDOM.render(
  <HelmetProvider>
    <AuthProvider> {/* ⬅️ Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </HelmetProvider>,
  document.getElementById('root')
);
