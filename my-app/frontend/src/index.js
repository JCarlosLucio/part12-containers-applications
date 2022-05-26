import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import storage from './utils/storage';

const authLink = setContext((_, { headers }) => {
  const token = storage.loadToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_HTTP_LINK_URI || 'http://localhost:4000/graphql/',
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_LINK_URI || 'ws:localhost:4000/graphql/',
  options: { reconnect: true },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
