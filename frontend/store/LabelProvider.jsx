import React, { useEffect, useReducer, useContext } from 'react';
import service from '@services';
import PropTypes from 'prop-types';
import { labelActions } from '@store/actions';
import { UserContext } from '@store/UserProvider';

const LabelContext = React.createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case labelActions.ADD_LABELS:
      return [...state, ...payload];
    case labelActions.ADD_LABEL:
      return [...state, payload];
    case labelActions.DELETE_LABEL:
      return [...state.filter((label) => label.id !== payload)];
    default:
      return state;
  }
};

const LabelProvider = ({ children }) => {
  const [labels, dispatch] = useReducer(reducer, []);
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (!user.authorized) return;
    service
      .getLabels()
      .then(({ data }) =>
        dispatch({
          type: labelActions.ADD_LABELS,
          payload: data,
        }),
      )
      .catch(console.log);
  }, [user.authorized]);

  return <LabelContext.Provider value={[labels, dispatch]}>{children}</LabelContext.Provider>;
};

LabelProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { LabelProvider, LabelContext };
