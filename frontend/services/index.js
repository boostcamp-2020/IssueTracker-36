import apiRequest from '@utils/api-request';
import labelService from './label';
import milestoneService from './milestones';
import issueService from './issue';
import userService from './users';

const Service = () => {
  return {
    ...labelService(apiRequest),
    ...milestoneService(apiRequest),
    ...issueService(apiRequest),
    ...userService(apiRequest),
  };
};

export default Service();
