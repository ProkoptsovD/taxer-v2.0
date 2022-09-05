import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CertificateContextProvider, StoreContextProvider } from './contexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContextProvider>
    <CertificateContextProvider>
      <App />
    </CertificateContextProvider>
  </StoreContextProvider>
);

