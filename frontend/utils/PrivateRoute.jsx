import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import userAuthenticate from '@utils/user-authenticate';

/**
 *  PrivateRoute
 *  로그아웃 상태일 때는 로그인페이지로 Redirect 시킵니다.
 *  그 외에는 Route 컴포넌트와 같습니다.
 */
const PrivateRoute = ({ component, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(userAuthenticate.isAuthorized);
  const [isPending, setIsPending] = useState(userAuthenticate.isPending);

  useEffect(() => {
    if (isPending) userAuthenticate.checkUserAuth(setIsAuthorized, setIsPending);
  }, []);

  if (isPending) return <>확인 중</>;
  if (isAuthorized) return <Route {...rest} render={() => React.createElement(component)} />;
  return (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
