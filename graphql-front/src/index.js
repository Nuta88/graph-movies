import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import cache from './cache';

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:3005/graphql',
  fetchOptions: {
    mode: 'no-cors',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
