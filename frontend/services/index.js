import apiRequest from '@utils/api-request';
import labelService from './label';
import MilestoneService from './milestones/index';
// import auth from './auth';

const Service = () => {
  return {
    ...labelService(apiRequest),
    ...MilestoneService(apiRequest),
    // ...auth(),
  };
};

export default Service();
