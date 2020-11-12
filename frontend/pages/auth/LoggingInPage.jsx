import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import oauthGithub from '@services/auth/oauth-github';
import tokenStorage from '@utils/tokenStorage';
import AuthPageLayout from '@layouts/AuthPageLayout';
import { UserContext } from '@store/UserProvider';
import { userActions } from '@store/actions';

const LoggingInPage = ({ history, location }) => {
  const [, dispatch] = useContext(UserContext);
  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(async () => {
    try {
      const data = await oauthGithub(code);
      const { token, id, nickName, img_url } = data;
      console.log(data);
      dispatch({
        type: userActions.LOGIN,
        payload: { token, id, nickName, img_url },
      });
      history.push('/issues?isClosed=false');
    } catch (err) {
      alert('로그인 중 오류가 발생했습니다.');
      history.push('/');
    }
  }, []);

  return (
    <AuthPageLayout>
      <></>
    </AuthPageLayout>
  );
};

LoggingInPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default LoggingInPage;
