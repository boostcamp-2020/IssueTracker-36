import apiRequest from '@utils/api-request';
import labelService from './label';
// import auth from './auth';

const Service = () => {
  return {
    ...labelService(apiRequest),
    // ...auth(),
  };
};

export default Service();
