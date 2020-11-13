const updaters = (apiRequest) => {
  const changeClosed = (id, newClosesdStatus) => {
    const body = { isClosed: newClosesdStatus };
    return apiRequest.patch(`/api/milestone/${id}`, body);
  };

  const updateMilestone = (id, updatedContents) => {
    return apiRequest.patch(`/api/milestone/${id}`, updatedContents);
  };

  return {
    changeClosed,
    updateMilestone,
  };
};

export default updaters;
