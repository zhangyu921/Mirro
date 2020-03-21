import 'github-markdown-css';
import React from 'react';
import styled from 'styled-components';

const { user, repository } = window.config;

export interface Props {
  post: {
    labels: {
      edges: Array<{
        node: {
          name: string;
        };
      }>;
    };
    bodyHTML: string;
  };
}

const PostBody: React.FC<Props> = ({ post }) => {
  const labels = post.labels.edges;
  return (
    <Wrap>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.bodyHTML }}
      />

      <div className="labels">
        {labels.map(label => (
          <a
            key={label.node.name}
            href={`https://github.com/${user}/${repository}/labels/${label.node.name}`}
          >
            #{label.node.name}
          </a>
        ))}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  .markdown-body {
    font-size: 14px;
  }

  .labels {
    margin-top: 30px;

    > a {
      margin-right: 10px;
      text-decoration: underline;
      color: #666;
      font-size: 14px;
    }
  }
`;

export default PostBody;
