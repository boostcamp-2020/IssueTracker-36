const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        milestones: action.data,
      };
    case 'setNumber':
      return {
        ...state,
        open: action.open,
        close: action.close,
      };
    case 'delete':
      return action.isClosed
        ? {
            ...state,
            close: state.close - 1,
            milestones: state.milestones.filter((milestone) => milestone.id !== action.id),
          }
        : {
            ...state,
            open: state.open - 1,
            milestones: state.milestones.filter((milestone) => milestone.id !== action.id),
          };

    case 'changeClosed':
      // TODO: milestone close action
      return state;
    default:
      return state;
  }
};

export default reducer;
