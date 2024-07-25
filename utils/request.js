// axios的封裝處理
import axios from 'axios';
// 1.根域名配置
// 2.超市時間
// 3。請求攔截器/響應攔截器

const request = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 5000
})

// 請求攔截器
request.interceptors.request.use((config)=> {
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 響應攔截器
request.interceptors.response.use((response)=> {
    return response.data
  }, (error)=> {
  return Promise.reject(error)
});

export { request }
