import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import userAuthenticate from '@utils/user-authenticate';
import GithubIconImage from '@static/github-icon-48.png';

const LoginPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(userAuthenticate.isAuthorized);
  const [isPending, setIsPending] = useState(userAuthenticate.isPending);
  const endpoint = 'https://github.com/login/oauth/authorize';
  const GITHUB_CLIENT_ID = 'f7b2106d984fcad19336';

  useEffect(() => {
    if (isPending) userAuthenticate.checkUserAuth(setIsAuthorized, setIsPending);
  }, []);
  if (isPending) return <></>;
  if (isAuthorized)
    return (
      <Redirect
        to={{
          pathname: '/issues',
        }}
      />
    );
  return (
    <Wrapper>
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

const Wrapper = styled.div`
  position: absolute;
  display: 'flex';
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
