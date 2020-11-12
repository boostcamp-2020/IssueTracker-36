import apiRequest from '@utils/api-request';
import reactionService from '@services/reactions';
import labelService from './label';
import milestoneService from './milestones';
import issueService from './issue';
import userService from './users';
import commentService from './comment/index';
import imageService from './image';

const Service = () => {
  return {
    ...labelService(apiRequest),
    ...milestoneService(apiRequest),
    ...issueService(apiRequest),
    ...userService(apiRequest),
    ...commentService(apiRequest),
    ...imageService(apiRequest),
    ...reactionService(apiRequest),
  };
};

export default Service();
