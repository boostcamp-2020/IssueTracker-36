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
      console.log(err);
    }
  }, []);

  return <></>;
};

LoggingInPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default LoggingInPage;
