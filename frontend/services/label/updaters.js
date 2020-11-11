const updaters = (apiRequest) => {
  const updateLabel = ({ id, title, description, color }) => {
    return apiRequest.put(`/api/label/${id}`, { title, description, color });
  };

  return {
    updateLabel,
  };
};

export default updaters;
