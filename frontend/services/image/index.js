import adders from './adders';

const imageService = (apiRequest) => {
  return {
    ...adders(apiRequest),
  };
};

export default imageService;
