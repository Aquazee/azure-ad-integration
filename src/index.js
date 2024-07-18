import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from "react-router-dom";
import { MsalProvider } from '@azure/msal-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { msalConfig } from "./config/authConfig";
import { PublicClientApplication } from '@azure/msal-browser';

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
