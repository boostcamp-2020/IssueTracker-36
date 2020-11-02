import React from 'react';

const Login = () => {
  const endpoint = 'https://github.com/login/oauth/authorize';
  const GITHUB_CLIENT_ID = 'f7b2106d984fcad19336';

  return <a href={`${endpoint}?client_id=${GITHUB_CLIENT_ID}`}>로그인하기</a>;
};

export default Login;
