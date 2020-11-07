const getters = (apiRequest) => {
  const getUsers = () => {
    return apiRequest.get(`/api/users`);
  };
  return {
    getUsers,
  };
};
export default getters;
