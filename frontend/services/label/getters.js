import axios from 'axios';

const getLabels = () => {
  return axios.get(`http://localhost:3000/api/labels`);
};

const getters = () => {
  return {
    getLabels,
  };
};

export default getters;
