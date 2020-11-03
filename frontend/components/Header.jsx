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
  background-color: black;
`;
const GithubLogo = styled.img`
  width: 3rem;
  margin: 0 0.5rem;
  filter: invert(100%);
`;
const IssueButton = styled.a`
  color: white;
  background-color: transparent;
  font-size: 30px;
  border: transparent;
  border-radius: 4px;
  text-decoration: none;
  outline: 0;
`;
const LogoutButton = styled(IssueButton)`
  width: 10%;
  height: 40%;
  color: black;
  background-color: white;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  &:hover {
    background-color: white;
    color: gray;
  }
`;

export default Header;
