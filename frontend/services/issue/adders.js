const adders = (apiRequest) => {
  const addIssue = (title, content, assigneeIds, labelIds, milestoneId) => {
    return apiRequest.post(`/api/issue`, { title, content, assigneeIds, labelIds, milestoneId });
  };

  return {
    addIssue,
  };
};

export default adders;
