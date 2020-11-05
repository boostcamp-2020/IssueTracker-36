const adders = (apiRequest) => {
  const addLabel = (body) => {
    return apiRequest.post(`/api/label`, body);
  };

  return {
    addLabel,
  };
};

export default adders;
