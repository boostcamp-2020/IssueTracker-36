import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { userActions } from '@store/actions';
import tokenStorage from '@utils/tokenStorage';

const UserContext = React.createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case userActions.LOGIN:
      return {
        ...state,
        token: payload.token,
        id: payload.id,
        nickName: payload.nickName,
        authorized: !!payload.token,
      };
    case userActions.LOGOUT:
      return {
        ...state,
        token: '',
        id: null,
        nickName: null,
        authorized: false,
      };
    default:
      return state;
  }
};
const token = tokenStorage.getToken();
const user = tokenStorage.getUser();

const initialValue = {
  token: token || '',
  nickName: user?.nickName,
  id: user?.id,
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
