import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../../components/Button';

const { order } = window.config;

interface Post {
  node: {
    number: string;
    title: string;
    createdAt: string;
    labels: {
      edges: Array<any>;
    };
  };
}

export interface Props {
  posts: Post[];
  pageInfo: any;
}

const PostList: React.FC<Props> = ({ posts, pageInfo }) => {
  function getDateStr(order: string, date: string) {
    const d = new Date(date).toLocaleDateString();
    return `${d}`;
  }

  return (
    <Wrap>
      {posts.map(item => {
        const post = item.node;
        return (
          <Post key={post.number} to={`/post/${post.number}`}>
            <h2 className="name">{post.title}</h2>
            <p className="describe">{getDateStr(order, post.createdAt)}</p>
            <div className="label">
              {post.labels.edges.map(({ node: l }) => (
                <span key={l.name}>#{l.name}</span>
              ))}
            </div>
          </Post>
        );
      })}

      <BtnGroup>
        {pageInfo.hasPreviousPage && (
          <Button to={`/before/${pageInfo.startCursor}`}>Previous</Button>
        )}
        <div style={{ width: 10 }} />
        {pageInfo.hasNextPage && (
          <Button to={`/after/${pageInfo.endCursor}`}>Next</Button>
        )}
      </BtnGroup>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 0;

  @media (max-width: 800px) {
    padding: 0 6vw;
  }
`;

const Post = styled(Link)`
  padding: 20px 10px;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  display: block;

  &:hover {
    background: #f6f7f7;
  }

  .name {
    color: #485763;
    font-size: 16px;
    line-height: 1.4;
    font-weight: 500;
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;

    @media (max-width: 800px) {
      width: 100%;
      font-size: 15px;
    }
  }
  .describe {
    font-size: 14px;
    color: #788590;
    margin: 14px 0 0 1px;
    @media (max-width: 800px) {
      font-size: 13px;
    }
  }

  .label {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 800px) {
      display: none;
    }

    > span {
      margin: 0 3px;
      font-size: 13px;
      color: #565b65;
      border: 1px solid #e1e1e1;
      background: #e8e8e8;
      border-radius: 3px;
      padding: 1px 3px 2px;
    }
  }
`;

const BtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;

  > a {
    min-width: 100px;
  }
`;

export default PostList;
