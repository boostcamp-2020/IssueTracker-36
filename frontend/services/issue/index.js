import adders from './adders';
// import deleters from './deleters';
import getters from './getters';
// import updaters from './updaters'

const issueService = (apiRequest) => {
  return {
    ...adders(apiRequest),
    ...getters(apiRequest),
    // ...updaters(axios),
    // ...deleters(axios),
  };
};

export default issueService;
