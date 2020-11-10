const getters = (apiRequest) => {
  const getIssue = (id) => {
    return apiRequest.get(`/api/issue/${id}`);
  };
  const getIssues = (pathname, queries) => {
    return apiRequest.get(`/api${pathname}${queries}`);
  };
  return {
    getIssues,
    getIssue,
  };
};

export default getters;
