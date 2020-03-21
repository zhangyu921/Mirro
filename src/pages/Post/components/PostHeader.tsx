import * as React from 'react';
import styled from 'styled-components';

import { ReactComponent as BackIMG } from '../../../images/back.svg';

export interface Props {
  goBack(): void;
  post: {
    title: string;
    updatedAt: string;
  };
}

const PostHeader: React.FC<Props> = ({ goBack, post }) => {
  const date = React.useMemo(
    () => new Date(post.updatedAt).toLocaleDateString(),
    [post]
  );

  return (
    <Wrap>
      <Back onClick={goBack}>
        <BackIMG />
      </Back>
      <h1>{post.title}</h1>
      <p>
        Updated at <span>{date}</span>
      </p>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  padding-top: 80px;

  & > h1 {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.4;
    color: #3d4348;
    margin: 0;

    @media (max-width: 800px) {
      font-size: 20px;
    }
  }

  & > p {
    font-size: 14px;
    color: #788590;
    margin-top: 10px;
  }

  &::after {
    display: block;
    content: '';
    height: 1px;
    width: 5%;
    background: #f1f1f1;
    margin: 30px 0 10px;
  }
`;

const Back = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  left: -50px;
  top: 55%;
  transform: translateY(-50%);
  cursor: pointer;

  @media (max-width: 800px) {
    top: 25%;
    left: 2px;
  }

  svg {
    fill: #949fa9;
  }
`;

export default PostHeader;
