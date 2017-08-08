import axios from 'axios'
import Qs from 'qs'
import Utils from './utils.js'
  const serviceUrl = process.env.API_ROOT
  const version = '1.4.10'
  const instance = axios.create({
    baseURL: serviceUrl,
    timeout: 20000,
    headers: {
      "sysos":"h5",
      "apptype":"user",
      "appversion":version
    }
  });
  // 添加请求拦截器
  instance.interceptors.request.use(function (config) {
      Utils.indicator();
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      Utils.closeIn();
      return response;
    }, function (error) {
      // 对响应错误做点什么
      console.log(error)
      return Promise.reject(error);
    });
  // instance.interceptors.response.use(function (response) {
  //   return response;
  // }, function (error) {
  //   // 处理统一的验证失效错误.
  //   return Promise.reject(error);
  // });
  let ajax = {
    request:function(method,url,data){
      return instance.request({
        method: method,
        url: url,
        data: data
      })
      .catch(function (error) {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          alert(error.message);
          // Something happened in setting up the request that triggered an Error
          //console.log('Error', error.message);
        }
        //console.log(error.config);
      });
    },
    post:function(url,data,headers){
      if(headers){
        instance.defaults.headers.common['Authorization'] = headers.Authorization;
      }
      return this.request('post',url,data)
    },
    // get:function(url,data){
    //   return this.request('get',url,data)
    // },
    get:function(url,data){
      return instance.get(url, {params: data})
    },
    all:function(...arg){
      return instance.all(arg)
    },
    allRequest:function(...arg){
      return axios.all(arg)
      .then(axios.spread(function (...res) {
        
      }));
    }
  }
  export default { 
    ajax : ajax
  }

  function handleError(error) {
    toast.toastDanger(error.message || 'request error');
    console.error(error)
    Promise.reject(error)
  }