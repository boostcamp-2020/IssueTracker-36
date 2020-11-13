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
      return {
        ...state,
        open: [...state.open, payload],
      };
    case milestoneActions.DELETE_MILESTONE:
      return {
        open: [...state.open.filter((milestone) => milestone.id !== payload)],
        close: [...state.close.filter((milestone) => milestone.id !== payload)],
      };
    case milestoneActions.UPDATE_MILESTONE:
      return {
        open: state.open.reduce((acc, milestone) => {
          acc.push(milestone.id === payload.id ? { ...milestone, ...payload } : milestone);
          return acc;
        }, []),
        close: state.close.reduce((acc, milestone) => {
          acc.push(milestone.id === payload.id ? { ...milestone, ...payload } : milestone);
          return acc;
        }, []),
      };
    case milestoneActions.CHANGE_CLOSED:
      const originalMilestone = payload.isClosed ? state.close : state.open;
      const movingMilestone = originalMilestone.find((milestone) => milestone.id === payload.id);
      movingMilestone.isClosed = !payload.isClosed;
      return payload.isClosed
        ? {
            open: [...[...state.open, movingMilestone].sort((first, second) => first.id - second.id)],
            close: [...state.close.filter((milestone) => milestone.id !== payload.id)],
          }
        : {
            open: [...state.open.filter((milestone) => milestone.id !== payload.id)],
            close: [...[...state.close, movingMilestone].sort((first, second) => first.id - second.id)],
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
