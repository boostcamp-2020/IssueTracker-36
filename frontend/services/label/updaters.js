const updaters = (apiRequest) => {
  const updateLabel = (id, updatingInfo) => {
    return apiRequest.patch(`/api/label/${id}`, updatingInfo);
  };

  return {
    updateLabel,
  };
};

export default updaters;
