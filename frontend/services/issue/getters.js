// const querystring = require('querystring');

const getters = (apiRequest) => {
  const initialGetIssues = (count) => {
    const params = {
      page: 1,
      count,
      closed: 'false',
    };
    return apiRequest.get(`/api/issues`, { params });
  };
  const getIssue = (id) => {
    return apiRequest.get(`/api/issue/${id}`);
  };
  return {
    initialGetIssues,
    getIssue,
  };
};

export default getters;
