import adders from './adders';
import getters from './getters';
// import updaters from './updaters'
import deleters from './deleters';

const MilestoneService = (apiRequest) => {
  return {
    ...adders(apiRequest),
    ...getters(apiRequest),
    // ...updaters(axios),
    ...deleters(apiRequest),
  };
};

export default MilestoneService;
