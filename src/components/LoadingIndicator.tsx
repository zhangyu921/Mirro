import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  text-align: center;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.95);

  &:after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  > div {
    display: inline-block;
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
  }

  > div:before {
    content: '';
    width: 26px;
    height: 26px;
    display: block;
    margin: 8px auto 0;
    border-radius: 20px;
    animation: loading 0.5s linear forwards infinite;
    border-top: 4px solid #0089fa;
    border-right: 4px solid #ff002b;
    border-bottom: 4px solid #ffa900;
    border-left: 4px solid #00a753;

    @keyframes loading {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const LoadingIndicator: React.FC = () => {
  return (
    <Wrap>
      <div />
    </Wrap>
  );
};

export default LoadingIndicator;
