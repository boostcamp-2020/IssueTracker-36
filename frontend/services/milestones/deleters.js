const deleters = (apiRequest) => {
  const deleteMilestone = (id) => {
    return apiRequest.delete(`/api/milestone/${id}`);
  };

  return {
    deleteMilestone,
  };
};

export default deleters;
