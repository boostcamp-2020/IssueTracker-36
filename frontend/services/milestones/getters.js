const getters = (apiRequest) => {
  const getMilestones = ({ isClosed = '0' }) => {
    return apiRequest.get(`/api/milestones`, {
      params: {
        isClosed,
      },
    });
  };
  const getMilestone = (id) => {
    return apiRequest.get(`/api/milestone/${id}`);
  };
  return {
    getMilestones,
    getMilestone,
  };
};
export default getters;
