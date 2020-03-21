import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledA = styled.a`
  text-decoration: none;
  line-height: 30px;
  height: 30px;
  display: block;
  text-align: center;
  border: 2px solid #c3c2c9;
  color: #686868;
  border-radius: 5px;
  font-size: 14px;
  background: #fff;
  overflow: hidden;
  position: relative;
  transition: background-color 0.5s ease;

  &:hover {
    background: #f6f7f7;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  line-height: 30px;
  height: 30px;
  display: block;
  text-align: center;
  border: 2px solid #c3c2c9;
  color: #686868;
  border-radius: 5px;
  font-size: 14px;
  background: #fff;
  overflow: hidden;
  position: relative;
  transition: background-color 0.5s ease;

  &:hover {
    background: #f6f7f7;
  }
`;

export interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
}

const Button: React.FC<Props> = ({ children, to, ...props }) => {
  if (to) {
    return (
      <StyledLink to={to} {...props}>
        {children}
      </StyledLink>
    );
  }
  return <StyledA {...props}>{children}</StyledA>;
};

export default Button;
