import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
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

  const userResult: QueryResult = useQuery(
    organization ? GET_ORGANIZATION_INFO : GET_USER_INFO
  );

  const postListResult: QueryResult = useQuery(GET_POSTS_LIST, {
    variables: {
      [getVariables(type)]: perPage,
      order,
      [type]: cursor
    }
  });

  const [posts, pageInfo] = useMemo(() => {
    const posts = postListResult.data?.repository.issues.edges;
    const pageInfo = postListResult.data?.repository.issues.pageInfo;

    return [posts, pageInfo];
  }, [postListResult]);

  return (
    <div>
      {!userResult.error && <UserPanel user={userResult.data?.user} />}

      {postListResult.loading && <LoadingIndicator />}
      {!postListResult.error && posts && pageInfo && (
        <PostList posts={posts} pageInfo={pageInfo} />
      )}
      <PageFooter />
    </div>
  );
};

function getVariables(type: string) {
  return type === 'before' ? 'last' : 'first';
}

export default HomePage;
