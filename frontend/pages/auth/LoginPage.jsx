import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isAuth from '@services/auth/is-auth';
import GithubIconImage from '@static/github-icon-48.png';

const LoginPage = ({ history }) => {
  const [showLogin, setShowLogin] = useState(false);
  const endpoint = 'https://github.com/login/oauth/authorize';
  const GITHUB_CLIENT_ID = 'f7b2106d984fcad19336';

  useEffect(async () => {
    try {
      if (!window.localStorage.getItem('userToken')) setShowLogin(true);
      else {
        const response = await isAuth();
        if (response.data.isAuthorized) history.push('/issues');
        else setShowLogin(true);
      }
    } catch (err) {
      setShowLogin(true);
    }
  }, []);

  return (
    <Wrapper showLogin={showLogin}>
      <Title>Issue Tracker</Title>
      <LoginWrapper>
        <GithubLoginButton href={`${endpoint}?client_id=${GITHUB_CLIENT_ID}`}>
          <div>Github로 로그인하기</div>
          <GithubIcon src={GithubIconImage} alt='github icon' />
        </GithubLoginButton>
      </LoginWrapper>
    </Wrapper>
  );
};

LoginPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.object()).isRequired,
};

const Wrapper = styled.div`
  position: absolute;
  display: ${(props) => (props.showLogin ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1.5rem;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const GithubLoginButton = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 2.2rem;
  background-color: rgba(104, 104, 104, 0.8);
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  &:visited {
    color: inherit;
  }
  div {
    color: white;
  }
`;

const GithubIcon = styled.img`
  width: 1.8rem;
  margin: 0 0.5rem;
`;

export default LoginPage;
