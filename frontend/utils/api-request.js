import axios from 'axios';

const DEBUG = process.env.NODE_ENV === 'development';

const apiRequest = axios.create({
  baseURL: DEBUG ? 'http://localhost:3000' : 'http://118.67.132.217:3000',
});

apiRequest.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: { Authorization: window.localStorage.getItem('userToken') },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiRequest.interceptors.response.use(
  (response) => {
    if (response.status === 400) alert('잘못된 형식의 요청입니다');
    else if (response.status === 401) alert('로그인 후 진행해주세요');
    else if (response.status === 500) alert('서버에서 오류가 발생했습니다');
    else if (response.status !== 200) alert('알 수 없는 오류가 발생했습니다');

    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  },
);

export default apiRequest;
