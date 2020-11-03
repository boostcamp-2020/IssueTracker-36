import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import userInfo from '@utils/user-info';

/**
 *  PrivateRoute
 *  로그아웃 상태일 때는 로그인페이지로 Redirect 시킵니다.
 *  그 외에는 Route 컴포넌트와 같습니다.
 */
const PrivateRoute = ({ component, ...rest }) =>
  userInfo.authorized ? (
    <Route {...rest} render={() => React.createElement(component)} />
  ) : (
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

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
