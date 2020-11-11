const deleters = (apiRequest) => {
  const deleteReaction = ({ commentId, reactionId }) => {
    return apiRequest.delete(`/api/comment/${commentId}/reaction/${reactionId}`);
  };

  return {
    deleteReaction,
  };
};

export default deleters;
