import apiRequest from '@utils/api-request';
import labelService from './label';
import milestoneService from './milestones';
import issueService from './issue';
import userService from './users';
import commentService from './comment/index';
// import auth from './auth';

const Service = () => {
  return {
    ...labelService(apiRequest),
    ...milestoneService(apiRequest),
    ...issueService(apiRequest),
    ...userService(apiRequest),
    ...commentService(apiRequest),
    // ...auth(),
  };
};

export default Service();
