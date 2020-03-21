import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Link } from '../../../images/link.svg';
import { ReactComponent as GitHub } from '../../../images/github.svg';
import { ReactComponent as Email } from '../../../images/email.svg';

function getWebsite(websiteUrl: string | undefined): string {
  if (!websiteUrl) {
    return '';
  }
  if (/^(http:|https:)/.test(websiteUrl)) {
    return websiteUrl;
  }
  return `//${websiteUrl}`;
}

export interface Props {
  user: {
    websiteUrl?: string;
    email?: string;
    organizationBillingEmail?: string;
    avatarUrl?: string;
    name?: string;
    bio?: string;
    url?: string;
  };
}

const UserPanel: React.FC<Props> = ({ user = {} }) => {
  const websiteUrl = getWebsite(user.websiteUrl);
  const email = user.email || user.organizationBillingEmail;
  return (
    <Wrap>
      <img className="avatar" src={user.avatarUrl} alt="avatar" />
      <h1 className="name">{user.name}</h1>
      {user.bio && <p className="describe">{user.bio}</p>}

      <div className="social">
        <a href={user.url} rel="noopener noreferrer" target="_blank">
          <GitHub />
        </a>
        {websiteUrl && (
          <a href={websiteUrl} rel="noopener noreferrer" target="_blank">
            <Link />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}>
            <Email />
          </a>
        )}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 0 30px;

  @media (max-width: 800px) {
    padding: 40px 0 20px;
  }

  &::after {
    display: block;
    width: 50%;
    content: '';
    height: 1px;
    background: #f1f1f1;
  }

  .avatar {
    border-radius: 50%;
    height: 100px;
    width: 100px;
    padding: 4px;
    border: solid 1px #eaeaea;

    @media (max-width: 800px) {
      width: 75px;
      height: 75px;
    }
  }

  .name {
    font-size: 26px;
    color: #42505a;
    font-weight: 600;
    margin: 16px 0;

    @media (max-width: 800px) {
      font-size: 20px;
      margin: 10px 0;
    }
  }

  .describe {
    color: #5e656b;
    font-size: 16px;
    line-height: 1.4;
    margin: 8px 0;

    @media (max-width: 800px) {
      font-size: 14px;
      margin: 6px 0;
    }
  }

  .social {
    & > a {
      display: inline-block;
      padding: 10px 5px;
      margin: 0 2px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }

      & > svg {
        display: block;
        width: 22px;
        height: 22px;
        fill: #333;

        @media (max-width: 800px) {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

export default UserPanel;
