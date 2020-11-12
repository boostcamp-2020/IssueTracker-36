const updaters = (apiRequest) => {
  const updateComment = (id, body) => {
    return apiRequest.patch(`/api/comment/${id}`, body);
  };
  return {
    updateComment,
  };
};

export default updaters;
