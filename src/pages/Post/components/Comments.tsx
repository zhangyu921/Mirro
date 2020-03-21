import React, { useState } from 'react';
import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';

import Button from '../../../components/Button';
import { GET_COMMENTS } from '../../../services/queries';
import LoadingIndicator from '../../../components/LoadingIndicator';

const { user, repository } = window.config;

export interface Props {
  issueNumber: number;
  totalCount: number;
}

const Comments: React.FC<Props> = ({ issueNumber, totalCount }) => {
  const [commentSum, setCommentSum] = useState(0);

  const handleViewClick = () => {
    setCommentSum(totalCount);
  };

  return (
    <div>
      <Query
        query={GET_COMMENTS}
        variables={{
          first: commentSum,
          number: issueNumber
        }}
      >
        {({ data, loading }: QueryResult) => {
          if (loading) {
            return <LoadingIndicator />;
          }
          const {
            repository: {
              issue: {
                comments: {
                  edges: comments,
                  pageInfo: { hasNextPage }
                }
              }
            }
          } = data;

          return (
            <>
              <CommentList>
                {comments.map(
                  (
                    data: {
                      node: {
                        bodyHTML: string;
                        updatedAt: string;
                        author: {
                          url: string;
                          login: string;
                          avatarUrl: string;
                        };
                      };
                    },
                    i: number
                  ) => {
                    const { bodyHTML, updatedAt } = data.node;
                    const { url, login, avatarUrl } = data.node.author || {
                      url: 'https://github.com/ghost',
                      login: 'ghost',
                      avatarUrl:
                        'https://avatars0.githubusercontent.com/u/10137?v=3'
                    };
                    return (
                      <CommentItem key={i}>
                        <a href={url} className="author">
                          <img src={avatarUrl} alt={login} />
                        </a>
                        <div className="comment-body">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={url}
                          >
                            {login}
                          </a>
                          <span>
                            on {new Date(updatedAt).toLocaleDateString()}
                          </span>
                          <div
                            className={`markdown-body`}
                            dangerouslySetInnerHTML={{ __html: bodyHTML }}
                          />
                        </div>
                      </CommentItem>
                    );
                  }
                )}
              </CommentList>

              {totalCount === 0 || !hasNextPage ? (
                <CommentBtn
                  href={`https://github.com/${user}/${repository}/issues/${issueNumber}#new_comment_field`}
                  target="_blank"
                >
                  Add Comments
                </CommentBtn>
              ) : (
                <CommentBtn onClick={handleViewClick}>
                  View Comments (
                  {commentSum === 0
                    ? totalCount
                    : `${commentSum}/${totalCount}`}
                  )
                </CommentBtn>
              )}
            </>
          );
        }}
      </Query>
    </div>
  );
};

const CommentList = styled.ul`
  margin: 0;
  padding: 0;
  font-weight: normal;

  &:before {
    display: block;
    width: 30%;
    content: '';
    height: 1px;
    background: #f1f1f1;
    margin: 50px auto;
  }
`;

const CommentItem = styled.li`
  list-style: none;
  margin-top: 20px;
  position: relative;
  padding: 10px 0 10px 70px;

  .author {
    border: 1px solid #eee;
    position: absolute;
    left: 0;
    top: 10px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;

    > img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .comment-body {
    border: 1px solid #dee1e2;
    padding: 14px 14px 14px 18px;
    border-radius: 3px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      border: 1px solid transparent;
      border-top-color: #dee1e2;
      border-left-color: #dee1e2;
      width: 5px;
      height: 5px;
      background-color: #fff;
      left: -5px;
      top: 20px;
      transform: rotate(-45deg);
    }

    > a {
      color: #333;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
    }

    > span {
      font-size: 14px;
      color: #767676;
      margin-left: 10px;
    }

    .markdown-body {
      margin-top: 10px;
      font-size: 14px;
      white-space: pre-wrap;
    }
  }
`;

const CommentBtn = styled(Button)`
  margin: 50px auto 0;
  max-width: 170px;
`;

export default Comments;
