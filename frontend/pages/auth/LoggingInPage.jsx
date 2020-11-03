import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
      alert('로그인 중 오류가 발생했습니다.');
      history.push('/');
    }
  }, []);

  return <></>;
};

LoggingInPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default LoggingInPage;
