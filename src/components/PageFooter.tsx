import React from 'react';
import styled from 'styled-components';

const { user, repository } = window.config;

const Wrap = styled.div`
  padding: 60px 0 70px 0;
  text-align: center;
  line-height: 1.4;
  font-size: 14px;
  color: #5c6e7b;

  > a {
    color: #37444e;
    text-decoration: underline;
  }
`;

const PageFooter = () => {
  return (
    <Wrap>
      <a
        rel="noopener noreferrer"
        href={`https://github.com/${user}/${repository}/issues`}
        target="_blank"
      >
        Source
      </a>
      <div>© {new Date().getFullYear()} Basil Zhang.</div>
    </Wrap>
  );
};

export default PageFooter;
