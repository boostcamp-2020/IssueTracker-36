import React, { createContext, useReducer, useContext } from 'react';

const StateContext = createContext(null);
const DispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'issue':
      return { ...state, issues: action.payload };

    case 'label':
      return { ...state, labels: action.payload };
    case 'milestone':
      return { ...state, milestones: action.payload };
    default:
      throw new Error('Unhandled action');
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    userInfo: {},
    issueFilter: [],
    labels: [],
    milestones: [],
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useGlobalState = () => {
  const state = useContext(StateContext);
  return state;
};

export const useDispatch = () => {
  const dispatch = useContext(DispatchContext);
  return dispatch;
};
