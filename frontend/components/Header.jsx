import React from 'react';
import styled from 'styled-components';
import GithubIconImage from '@static/github-icon-48.png';

const Header = () => {
  return (
    <Component>
      <GithubLogo src={GithubIconImage} alt='github icon' />
      <IssueButton href='/issues'>Issues</IssueButton>
      <LogoutButton href='/'>로그아웃</LogoutButton>
    </Component>
  );
};

const Component = styled.header`
  width: 100%;
  height: 10%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.theme.color.headerBgColor};
`;
const GithubLogo = styled.img`
  width: 3rem;
  margin: 0 0.5rem;
  filter: invert(100%);
`;
const IssueButton = styled.a`
  color: ${(props) => props.theme.color.whiteColor};
  font-size: ${(props) => props.theme.fontSize.xl};
  border: ${(props) => props.theme.color.borderColor};
  border-radius: 4px;
`;
const LogoutButton = styled(IssueButton)`
  font-weight: bold;
  display: block;
  padding: 10px;
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.color.blackColor};
  background-color: ${(props) => props.theme.color.whiteColor};
  &:hover {
    background-color: ${(props) => props.theme.color.hoverBgColor};
    color: ${(props) => props.theme.color.grayColor};
  }
`;

export default Header;
