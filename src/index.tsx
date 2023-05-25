import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App';


import { PublicClientApplication } from '@azure/msal-browser';


import store from './components/redux/store';
import { Provider } from 'react-redux';


const pca = new PublicClientApplication({
  auth: {
    clientId: 'a6cc5516-6f85-48f5-b57a-60da9b229ab0',
    authority: 'https://login.microsoftonline.com/1a062407-a7aa-408a-95d4-55fd212972ab/',
    redirectUri: 'https://jolly-beach-028b40510.3.azurestaticapps.net/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App msalInstance = {pca} />
    </Provider>
  </React.StrictMode>
);

