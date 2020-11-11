import React, { useEffect, useReducer } from 'react';
import service from '@services';
import userInfo from '@utils/user-info';
import PropTypes from 'prop-types';

const LabelContext = React.createContext();

const reducer = (state, action) => {
  return [...state, ...action];
};

const LabelProvider = ({ children }) => {
  const [labels, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (!userInfo.authorized) return;
    service
      .getLabels()
      .then(({ data }) => dispatch(data))
      .catch(console.log);
  }, []);

  return <LabelContext.Provider value={[labels, dispatch]}>{children}</LabelContext.Provider>;
};

LabelProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { LabelProvider, LabelContext };
