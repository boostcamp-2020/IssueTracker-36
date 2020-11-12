const updaters = (apiRequest) => {
  const updateLabel = ({ id, title, description, color }) => {
    return apiRequest.patch(`/api/label/${id}`, { title, description, color });
  };

  return {
    updateLabel,
  };
};

export default updaters;
