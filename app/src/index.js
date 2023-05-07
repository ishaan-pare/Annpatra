import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ClientProvider from './context/ClientContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ClientProvider>
        <App />
    </ClientProvider>
);