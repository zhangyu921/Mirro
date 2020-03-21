import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { match } from 'react-router-dom';

import UserPanel from './components/UserPanel';
import PostList from './components/PostList';
import PageFooter from '../../components/PageFooter';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  GET_ORGANIZATION_INFO,
  GET_POSTS_LIST,
  GET_USER_INFO
} from '../../services/queries';

const { organization, perPage, order } = window.config;

type TParams = {
  type: string;
  cursor: string;
};

export interface Props {
  match: match<TParams>;
}

const HomePage: React.FC<Props> = ({ match }) => {
  const { type, cursor } = match.params;

  function getVariables() {
    return type === 'before' ? 'last' : 'first';
  }

  return (
    <div>
      <Query query={organization ? GET_ORGANIZATION_INFO : GET_USER_INFO}>
        {({ data, loading }: QueryResult) => {
          if (loading) return null;
          const { user } = data;
          return <UserPanel user={user} />;
        }}
      </Query>

      <Query
        query={GET_POSTS_LIST}
        variables={{
          [getVariables()]: perPage,
          order,
          [type]: cursor
        }}
      >
        {({ data, loading }: QueryResult) => {
          if (loading) return <LoadingIndicator />;
          const posts = data.repository.issues.edges;
          const pageInfo = data.repository.issues.pageInfo;
          return <PostList posts={posts} pageInfo={pageInfo} />;
        }}
      </Query>

      <PageFooter />
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
