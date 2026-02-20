import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';

//Wrap an instance of MSAL

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
     <FluentProvider theme={webLightTheme}>
        <MsalProvider instance = {msalInstance}>
            <App />
        </MsalProvider>
    </FluentProvider>
   
)