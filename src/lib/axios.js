import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://casamaniocabe-okmn.onrender.com/api/v1',
  //baseURL: 'http://localhost:10000/api/v1',
  timeout: 60000,
  headers: {
    'Accept': 'application/json'
  }
});

axiosInstance.interceptors.response.use((response) => response,
  (error) => { 
    return Promise.reject((error.response && error.response.data) || 'Something went wrong'); 
  });

axiosInstance.interceptors.request.use(function (config) {
  let user = JSON.parse(localStorage.getItem('user'));
    
  if(user?.access_token != null && user?.access_token != undefined){
      config.headers.Authorization = user.access_token;
  };

  return config;
});

export default axiosInstance;