import React, { useEffect, useReducer } from 'react';
import service from '@services';
import userInfo from '@utils/user-info';
import PropTypes from 'prop-types';

const MilestoneContext = React.createContext();

const reducer = (state, action) => {
  return { ...state, ...action };
};

const MilestoneProvider = ({ children }) => {
  const [milestones, dispatch] = useReducer(reducer, { open: [], close: [] });

  useEffect(() => {
    if (!userInfo.authorized) return;
    Promise.all([service.getMilestones({ isClosed: 0 }), service.getMilestones({ isClosed: 1 })])
      .then(([{ data: open }, { data: close }]) => {
        dispatch({ open, close });
      })
      .catch(console.log);
  }, []);
  return <MilestoneContext.Provider value={[milestones, dispatch]}>{children}</MilestoneContext.Provider>;
};

MilestoneProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { MilestoneProvider, MilestoneContext };
