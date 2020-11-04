// import adders from './adders';
import getters from './getters';
// import updaters from './updaters'
// import deleters from './deleters'

const labelService = () => {
  return {
    // ...adders(),
    ...getters(),
    // ...updaters(axios),
    // ...deleters(axios),
  };
};

export default labelService;
