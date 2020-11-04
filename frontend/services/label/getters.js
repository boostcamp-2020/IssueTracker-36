const getters = (apiRequest) => {
  const getLabels = () => {
    return apiRequest.get(`/api/labels`);
  };

  return {
    getLabels,
  };
};

export default getters;
