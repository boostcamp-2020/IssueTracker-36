// import adders from './adders';
import getters from './getters';
// import updaters from './updaters'
// import deleters from './deleters'

const labelService = (apiRequest) => {
  return {
    // ...adders(),
    ...getters(apiRequest),
    // ...updaters(axios),
    // ...deleters(axios),
  };
};

export default labelService;
