import labelService from './label';
// import auth from './auth';

const Service = () => {
  return {
    ...labelService(),
    // ...auth(),
  };
};

export default Service();
