import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '../node_modules/@apollo/client';
import {setContext} from '../node_modules/@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://ypk.hasura.app/v1/graphql',
});

const authLink = setContext((_, {headers}) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret':
        'E7v2cA2oCXG7xYcNaSeEFzOQo4p42UAGTdInXtmz4h7ZfS52XWmqKMzZq50AIEHD',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
