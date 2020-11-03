import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GithubIconImage from '@static/github-icon-48.png';

const MainPageLayout = ({ children }) => {
  return (
    <Container>
      <Header>
        <GithubLogo src={GithubIconImage} alt='github icon' />
        <IssueButton href='/issues'>Issues</IssueButton>
        <LogoutButton href='/'>로그아웃</LogoutButton>
      </Header>
      <Main>{children}</Main>
    </Container>
  );
};

MainPageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: grey;
`;
const Header = styled.div`
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
  font-size: 30px;
  text-decoration: none;
`;
const LogoutButton = styled.button`
  width: 10%;
  height: 40%;
  color: black;
  font-weight: bold;
  line-height: 20px;
  font-size: 15px;
  border: transparent;
  border-radius: 4px;
  outline: 0;
  &:hover {
    background-color: white;
    color: gray;
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 600px;
`;

export default MainPageLayout;
