import React, { useEffect } from 'react';
import qs from 'qs';
import oauthGithub from '@services/auth/oauth-github';

const LoggingInPage = ({ history, location }) => {
  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(async () => {
    try {
      await oauthGithub(code);
      history.push('/issues');
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <></>;
};

export default LoggingInPage;
