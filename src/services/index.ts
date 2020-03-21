import ApolloClient from 'apollo-boost';

import { de } from '../helper/secret';

const { hash } = window.config;
const auth = de(hash);

export const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    get Authorization() {
      return 'Bearer ' + auth;
    }
  }
});
