import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Components/Helpers/Auth/Auth';
import { SearchProvider } from './Components/Helpers/Auth/SearchAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* AuthProvider ligger rundt om App 
    så kan login/token tilgåes på hele hjemmesiden */}
    <AuthProvider>
    {/* SearchProvider ligger rundt om App 
    så kan søgeing tilgåes på hele hjemmesiden */}
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);


