import adders from './adders';
import deleters from './deleters';

const issueService = (apiRequest) => {
  return {
    ...adders(apiRequest),
    ...deleters(apiRequest),
  };
};

export default issueService;
