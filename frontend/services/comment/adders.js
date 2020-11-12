const adders = (apiRequest) => {
  const addComment = (body) => {
    return apiRequest.post('/api/comment', body);
  };
  return {
    addComment,
  };
};
export default adders;
