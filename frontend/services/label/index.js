import adders from './adders';
import deleters from './deleters';
import getters from './getters';
import updaters from './updaters';

const labelService = (apiRequest) => {
  return {
    ...adders(apiRequest),
    ...getters(apiRequest),
    ...updaters(apiRequest),
    ...deleters(apiRequest),
  };
};

export default labelService;
