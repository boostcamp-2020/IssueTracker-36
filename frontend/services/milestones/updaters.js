const updaters = (apiRequest) => {
  const changeClosed = (id, newClosesdStatus) => {
    const body = { isClosed: newClosesdStatus };
    return apiRequest.patch(`/api/milestone/${id}`, body);
  };

  return {
    changeClosed,
  };
};

export default updaters;
