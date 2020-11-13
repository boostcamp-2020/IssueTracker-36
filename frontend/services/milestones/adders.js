const adders = (apiRequest) => {
  const addMilestone = (title, dueDate, description) => {
    const body = { title, dueDate, description };
    return apiRequest.post(`/api/milestone`, body);
  };

  return {
    addMilestone,
  };
};

export default adders;
