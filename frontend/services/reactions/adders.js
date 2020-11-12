const adders = (apiRequest) => {
  const addReaction = ({ commentId, type }) => {
    return apiRequest.post(`/api/comment/${commentId}/reaction`, { type });
  };

  return {
    addReaction,
  };
};

export default adders;
