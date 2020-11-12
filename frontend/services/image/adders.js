const adders = (apiRequest) => {
  const addImage = (file) => {
    const formData = new FormData();
    formData.append('img', file);
    return apiRequest.post(`/api/image`, formData);
  };

  return {
    addImage,
  };
};

export default adders;
