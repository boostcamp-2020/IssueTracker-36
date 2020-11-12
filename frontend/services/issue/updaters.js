const updaters = (apiRequest) => {
  const patchIssues = (issuesId, isClosed) => {
    return apiRequest.patch(`/api/issues`, { issuesId, isClosed });
  };

  return {
    patchIssues,
  };
};

export default updaters;
