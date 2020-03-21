import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { match } from 'react-router-dom';
import * as H from 'history';
import styled from 'styled-components';

import PageFooter from '../../components/PageFooter';
import LoadingIndicator from '../../components/LoadingIndicator';
import PostHeader from './components/PostHeader';
import PostBody from './components/PostBody';
import { GET_POST } from '../../services/queries';
import Comments from './components/Comments';

interface TParams {
  number: string;
}

export interface Props {
  history: H.History;
  match: match<TParams>;
}

const PostPage: React.FC<Props> = ({ history, match }) => {
  const number = Number(match.params.number);
  return (
    <Wrap>
      <Query
        query={GET_POST}
        variables={{
          number
        }}
      >
        {({ data, loading }: QueryResult) => {
          if (loading) return <LoadingIndicator />;
          const post = data.repository.issue;
          const totalCount = post.comments.totalCount;
          return (
            <>
              <PostHeader post={post} goBack={() => history.goBack()} />
              <PostBody post={post} />
              <Comments totalCount={totalCount} issueNumber={number} />
            </>
          );
        }}
      </Query>

      <PageFooter />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 640px;
  padding: 0 20px;
`;

export default PostPage;
