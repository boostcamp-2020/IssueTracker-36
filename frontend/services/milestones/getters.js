const getters = (apiRequest) => {
  const getMilestones = ({ isClosed = '0' }) => {
    return apiRequest.get(`/api/milestones`, {
      params: {
        isClosed,
      },
    });
  };
  return {
    getMilestones,
  };
};
export default getters;
