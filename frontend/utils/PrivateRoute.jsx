import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *  PrivateRoute
 *  로그아웃 상태일 때는 로그인페이지로 Redirect 시킵니다.
 *  그 외에는 Route 컴포넌트와 같습니다.
 */
const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? ( // TODO: true/false 자리에 로그인 여부를 판단하는 조건으로 교체
          React.createElement(component)
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
