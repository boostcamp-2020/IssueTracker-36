import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { userActions } from '@store/actions';

const UserContext = React.createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case userActions.LOGIN:
      return {
        ...state,
        token: payload?.token,
        authorized: !!payload?.token,
      };
    case userActions.LOGOUT:
      return {
        ...state,
        token: '',
        authorized: false,
      };
    default:
      return state;
  }
};
const token = window.localStorage.getItem('userToken');
const initialValue = {
  token: token || '',
  nickName: '',
  authorized: !!token,
};

const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialValue);

  return <UserContext.Provider value={[user, dispatch]}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export { UserProvider, UserContext };
