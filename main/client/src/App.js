import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import HomePage from './pages/HomePage';
import 'bootstrap/'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  console.log(`TOKEN: ${token}`);
  return {
    headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router basename='react-website'>
        <div>
          <div>
            <Route exact path="/">
              <HomePage />
            </Route>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
