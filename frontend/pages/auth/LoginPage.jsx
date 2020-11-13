import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import AuthPageLayout from '@layouts/AuthPageLayout';
import { UserContext } from '@store/UserProvider';
import { AiFillGithub } from 'react-icons/ai';

const LoginPage = () => {
  const [user] = useContext(UserContext);
  const endpoint = 'https://github.com/login/oauth/authorize';
  const GITHUB_CLIENT_ID =
    process.env.NODE_ENV === 'development' ? 'f7b2106d984fcad19336' : 'eaced475daf07d8d24e7';

  return user.authorized ? (
    <Route
      render={({ location }) => (
        <Redirect
          to={{
            pathname: '/issues?isClosed=false',
            state: { from: location },
          }}
        />
      )}
    />
  ) : (
    <AuthPageLayout>
      <Title>Issue Tracker</Title>
      <LoginWrapper>
        <GithubLoginButton href={`${endpoint}?client_id=${GITHUB_CLIENT_ID}`}>
          <div>Github로 로그인하기</div>
          <AiFillGithub size={28} />
        </GithubLoginButton>
      </LoginWrapper>
    </AuthPageLayout>
  );
};

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: bold;
  margin: 1.5rem;
  text-align: center;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border: 1px solid ${(props) => props.theme.color.borderColor};
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 5px;
`;

const GithubLoginButton = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 2.7rem;
  background-color: ${(props) => props.theme.color.iconColor};
  border: 1px solid ${(props) => props.theme.color.borderColor};
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  &:visited {
    color: inherit;
  }
  div {
    color: white;
  }
  > svg {
    margin-left: 0.5rem;
  }
`;

export default LoginPage;
