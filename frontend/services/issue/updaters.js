const updaters = (apiRequest) => {
  const updateIssue = (id, body) => {
    return apiRequest.patch(`/api/issue/${id}`, body );
  };
  const patchIssues = (issuesId, isClosed) => {
    return apiRequest.patch(`/api/issues`, { issuesId, isClosed });
  };

  return {
    updateIssue,
    patchIssues,
  };
};

export default updaters;
