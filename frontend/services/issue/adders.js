const adders = (apiRequest) => {
  const addIssue = (title, content, assigneeIds, labelIds, milestoneId) => {
    return apiRequest.post(`/api/issue`, { title, content, assigneeIds, labelIds, milestoneId });
  };

  const addIssueUser = (id, userId) => {
    return apiRequest.post(`/api/issue/${id}/user/${userId}`);
  };

  const addIssueLabel = (id, labelId) => {
    return apiRequest.post(`/api/issue/${id}/label/${labelId}`);
  };

  const addIssueMilestone = (id, milestoneId) => {
    return apiRequest.post(`/api/issue/${id}/milestone/${milestoneId}`);
  };

  return {
    addIssue,
    addIssueUser,
    addIssueLabel,
    addIssueMilestone,
  };
};

export default adders;
