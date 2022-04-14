import axios from 'axios'

// 配置項
const axiosOption = {
    baseURL: '/api',
    timeout: 5000
}

// 創建一個單例
const instance = axios.create(axiosOption);

// 添加請求攔截器
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // 對請求錯誤做些什麼
  return Promise.reject(error);
});

// 添加響應攔截器
instance.interceptors.response.use(function (response) {
  // 對響應數據做點什麼
  return response.data;
}, function (error) {
  // 對響應錯誤做點什麼
  return Promise.reject(error);
});

export default instance;
