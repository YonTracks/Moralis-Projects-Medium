import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./index.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { BrowserRouter as Router } from "react-router-dom";
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);
const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL

root.render(
  <React.StrictMode>
    <MoralisProvider
      initializeOnMount
      appId={APP_ID}
      serverUrl={SERVER_URL}
    >
      <NotificationProvider>
        <Router>
          <App />
        </Router>
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>
);


