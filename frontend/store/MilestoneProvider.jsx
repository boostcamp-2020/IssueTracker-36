import React, { useEffect, useReducer, useContext } from 'react';
import service from '@services';
import PropTypes from 'prop-types';
import { milestoneActions } from '@store/actions';
import { UserContext } from '@store/UserProvider';

const MilestoneContext = React.createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case milestoneActions.ADD_MILESTONES:
      return {
        open: [...state.open, ...payload.open],
        close: [...state.close, ...payload.close],
      };
    case milestoneActions.ADD_MILESTONE:
      const { isClosed } = payload;
      return {
        open: isClosed ? [...state.open] : [...state.open, ...payload],
        close: isClosed ? [...state.close, ...payload] : [...state.close],
      };
    case milestoneActions.DELETE_MILESTONE:
      return {
        open: [...state.open.filter((milestone) => milestone.id !== payload)],
        close: [...state.close.filter((milestone) => milestone.id !== payload)],
      };
    default:
      return state;
  }
};

const MilestoneProvider = ({ children }) => {
  const [milestones, dispatch] = useReducer(reducer, { open: [], close: [] });
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (!user.authorized) return;
    Promise.all([service.getMilestones({ isClosed: 0 }), service.getMilestones({ isClosed: 1 })])
      .then(([{ data: open }, { data: close }]) => {
        dispatch({
          type: milestoneActions.ADD_MILESTONES,
          payload: { open, close },
        });
      })
      .catch(console.log);
  }, [user.authorized]);

  return <MilestoneContext.Provider value={[milestones, dispatch]}>{children}</MilestoneContext.Provider>;
};

MilestoneProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { MilestoneProvider, MilestoneContext };
