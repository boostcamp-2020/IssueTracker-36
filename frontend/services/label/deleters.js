const deleters = (apiRequest) => {
  const deleteLabel = (id) => {
    return apiRequest.delete(`/api/label/${id}`);
  };

  return {
    deleteLabel,
  };
};

export default deleters;
