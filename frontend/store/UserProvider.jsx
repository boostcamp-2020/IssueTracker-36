import React, { useEffect, useReducer } from 'react';
import service from '@services';
import userInfo from '@utils/user-info';
import PropTypes from 'prop-types';

const UserContext = React.createContext();

const reducer = (state, action) => {
  return [...state, ...action];
};

const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (!userInfo.authorized) return;
    service
      .getUsers()
      .then(({ data }) => dispatch(data))
      .catch(console.log);
  }, []);

  return <UserContext.Provider value={[user, dispatch]}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export { UserProvider, UserContext };
