const getters = (apiRequest) => {
  const getClosedMilestones = () => {
    return apiRequest.get(`/api/milestones`, {
      params: {
        isClosed: '1',
      },
    });
  };
  const getOpenMilestones = () => {
    return apiRequest.get(`/api/milestones`, {
      params: {
        isClosed: '0',
      },
    });
  };
  return {
    getOpenMilestones,
    getClosedMilestones,
  };
};
export default getters;
