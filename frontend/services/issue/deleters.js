const deleters = (apiRequest) => {
  const deleteIssueUser = (id, userId) => {
    return apiRequest.delete(`/api/issue/${id}/user/${userId}`);
  };

  const deleteIssueLabel = (id, labelId) => {
    return apiRequest.delete(`/api/issue/${id}/label/${labelId}`);
  };

  const deleteIssueMilestone = (id, milestoneId) => {
    return apiRequest.delete(`/api/issue/${id}/milestone/${milestoneId}`);
  };

  return {
    deleteIssueUser,
    deleteIssueLabel,
    deleteIssueMilestone,
  };
};

export default deleters;
