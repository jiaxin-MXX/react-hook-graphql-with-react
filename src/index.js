import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import App from './views/App.jsx';

import client from "./graphql/index.js";
ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
   </ApolloProvider>,
  document.getElementById('root')
);