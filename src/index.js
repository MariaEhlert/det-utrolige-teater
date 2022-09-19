import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Components/Helpers/Auth/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* AuthProvider ligger rundt om App 
    så kan login/token tilgåes på hele hjemmesiden */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);


