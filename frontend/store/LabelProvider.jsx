import React, { useEffect, useReducer, useContext } from 'react';
import service from '@services';
import PropTypes from 'prop-types';
import { labelActions } from '@store/actions';
import { UserContext } from '@store/UserProvider';

const LabelContext = React.createContext();

const reducer = (state, action) => {
  let index;
  const { type, payload } = action;
  switch (type) {
    case labelActions.ADD_LABELS:
      return [...state, ...payload.map((label) => ({ ...label, isEditing: false }))];
    case labelActions.ADD_LABEL:
      return [...state, { ...payload, isEditing: false }];
    case labelActions.DELETE_LABEL:
      return [...state.filter((label) => label.id !== payload)];
    case labelActions.START_EDIT_LABEL:
      return [...state.map((label) => (label.id !== payload ? label : { ...label, isEditing: true }))];
    case labelActions.END_EDIT_LABEL:
      return [...state.map((label) => (label.id !== payload ? label : { ...label, isEditing: false }))];
    case labelActions.UPDATE_LABEL:
      index = state.findIndex((label) => label.id === payload.id);
      return [...state.slice(0, index), { ...payload, isEditing: false }, ...state.slice(index + 1)];
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
