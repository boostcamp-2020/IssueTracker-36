const updaters = (apiRequest) => {
  const updateIssue = (id, body) => {
    return apiRequest.patch(`/api/issue/${id}`, body );
  };
  return {
    updateIssue,
  };
};
export default updaters;
