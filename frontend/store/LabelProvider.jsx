import React, { useEffect, useReducer } from 'react';
import service from '@services';
import userInfo from '@utils/user-info';
import PropTypes from 'prop-types';
import { labelActions } from '@store/actions';

const LabelContext = React.createContext();

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case labelActions.ADD_LABELS:
      return [...state, ...action.payload];
    case labelActions.ADD_LABEL:
      return [...state, action.payload];
    case labelActions.DELETE_LABEL:
      return [...state.filter((label) => label.id !== action.payload)];
    default:
      return state;
  }
};

const LabelProvider = ({ children }) => {
  const [labels, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (!userInfo.authorized) return;
    service
      .getLabels()
      .then(({ data }) =>
        dispatch({
          type: labelActions.ADD_LABELS,
          payload: data,
        }),
      )
      .catch(console.log);
  }, []);

  return <LabelContext.Provider value={[labels, dispatch]}>{children}</LabelContext.Provider>;
};

LabelProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { LabelProvider, LabelContext };
