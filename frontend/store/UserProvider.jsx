import React, { useEffect, useReducer } from 'react';
import service from '@services';
import userInfo from '@utils/user-info';
import PropTypes from 'prop-types';
import { userActions } from '@store/actions';

const UserContext = React.createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case userActions.SET_USER:
      return [...payload];
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (!userInfo.authorized) return;
    service
      .getUsers()
      .then(({ data }) =>
        dispatch({
          type: userActions.SET_USER,
          payload: data,
        }),
      )
      .catch(console.log);
  }, []);

  return <UserContext.Provider value={[user, dispatch]}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export { UserProvider, UserContext };
