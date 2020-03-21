import React from 'react';
import styled from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { Switch, Route, Link, HashRouter } from 'react-router-dom';

import { client } from './services';
import HomePage from './pages/Home/HomePage';
import PostPage from './pages/Post/PostPage';

const Wrap = styled.div`
  height: 100vh;
  max-width: 640px;
  margin: 0 auto;
`;

function App() {
  return (
    <HashRouter>
      <ApolloProvider client={client}>
        <Wrap>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/post/:number" component={PostPage} />
            <Route path="/:type/:cursor" exact component={HomePage} />
            <Route path="" component={() => <Link to="/">404</Link>} />
          </Switch>
        </Wrap>
      </ApolloProvider>
    </HashRouter>
  );
}

export default App;
