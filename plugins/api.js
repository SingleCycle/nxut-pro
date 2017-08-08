'use strict'


import Utils from './utils.js'
import Qs from 'qs'
import axios from 'axios'

const serviceUrl = process.env.baseUrl
console.log(process.env)
//console.log(serviceUrl)
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

/*执行多个并发请求*/
function axiosAll (callback,...arg) {
return axios.all(arg)
  .then(axios.spread(function (...res) {
    // 两个请求现在都执行完成
    console.log(res)
    res.forEach(item=>{
    	item.forEach(i =>{
    		console.log(i)
    	})

    })
    //callback(res)
  }))
  .catch(function (error) {
    console.log(error);
  });
}
/*
	首页
*/
function getHomePageInfoWithCity (data,callback) {
return ajax.get('/quhu/accompany/public/V2/getHomePageInfoWithCity',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
套餐列表数据
method:post
params:
cityId:"110100"//城市id，目前固定值北京--110100
goodsType:"0" //商品类别，
*/
function getSetList (data,callback) {
return ajax.post('/quhu/accompany/public/getSetList',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
套餐详情数据
method:post
params:
orderType:"0"//订单类别
setId:"0" //套餐id
*/
function getSetInfoBySetIdOrOrderType (data, callback) {
return ajax.post('/quhu/accompany/public/getSetInfoBySetIdOrOrderType',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
下单页面服务列表数据
method:post
params:
setId:"0" //套餐id
*/
function getServiceListBySetId (data, callback) {
return ajax.post('quhu/accompany/public/getServiceListBySetId',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
下单页面 时间数据
method:post
params:
setId:"0" //套餐id
*/
function getSelectiveAccompanyTimeSchedule (data, callback) {
return ajax.post('quhu/accompany/public/getSelectiveAccompanyTimeSchedule',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
下单页面 获取医院数据
method:post
params:
cityId:"0" //套餐id
kId:"0" // 区域id（选填，districtList中选择任意项的kid）
latitude:"0" //套餐id
level:"0" // 医院等级（选填，levelList中选择）
longitude:"0" //套餐id
setId:"0" //套餐id
type：1  // 1-> 附近; 2->搜索
*/
function filterHospitalList (data, callback) {
return ajax.post('quhu/accompany/public/filterHospitalList',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
下单页面 获取医院数据
method:post
params:
cityId:"0" //套餐id
kId:"0" // 区域id（选填，districtList中选择任意项的kid）
latitude:"0" //套餐id
level:"0" // 医院等级（选填，levelList中选择）
longitude:"0" //套餐id
setId:"0" //套餐id
type：1  // 1-> 附近; 2->搜索
*/
function filterHospitalList (data, callback) {
return ajax.post('quhu/accompany/public/filterHospitalList',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
下单页面 获取验证码
method:post
params:
phoneNumber:"18810882434“ //套餐id
*/
function messageCode (data, callback) {
return ajax.post('quhu/accompany/public/U/messageCode',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
下单页面 登录接口
method:post
params:
password:"13234 //验证码
source:'guanwang'固定
username:"U_18810882434"  用户名 注意是U_加上手机号
*/
function registerOrRefresh (data, callback) {
return axios.ajax.post('quhu/accompany/public/registerOrRefresh',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
下单页面 登录成功以后 获取token
Content-Type:application/x-www-form-urlencoded
method:post
params:
grant_type:password //给定
username:U_18810883834
password:981390 //验证码
*/
function token (data, callback) {
var username = "accompany-user-client";
var password = "ccbPASSquyiyuan20154421";
//var Authorization = "Basic "+$.base64.btoa(username+":"+password);
var Authorization = 'Basic YWNjb21wYW55LXVzZXItY2xpZW50OmNjYlBBU1NxdXlpeXVhbjIwMTU0NDIx'
var headers = {
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':Authorization}
return axios.ajax.post('oauth/token',data,headers)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
下单页面 创建订单
method:post
params:
actId:null //是否是第三方下单--获取没有该属性
hospitalId:"0" // 医院id
idCardNo:"0" //身份证号
insuranceState:"1" // 是否有保险，默认是给1， 默认保险
isF2F:"0" //套餐id
isShuttle:false //套餐id
name:sdf//就诊人姓名
patientPhoneNo:1889348343  // 手机号
scheduleTime：2017-08-06 17:40:00//预约时间
setId：234//套餐id

注意请求需要在header中加  Authorization
*/
function createCommonOrder (data, callback) {

return axios.ajax.post('quhu/accompany/user/order/createCommonOrder',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
支付  调用支付
method:post
params:
goodsType:0 //商品类型
orderNo:"0" // 订单号
webBaseUrl:"" //支付成功回调页面，即支付成功页面

接口回调成功以后 window.location.href="https://mapi.alipay.com/gateway.do?"+res.data.data.paramStr;直接复用
*/
function generatePayParams (data, callback) {
return axios.ajax.post('quhu/accompany/user/pay/alipay/WEB/generatePayParams',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
支付  支付回调 订单状态查询  是否支付成功
method:post
params:
out_trade_no:out_trade_no //商品类型
orderNo:"0" // 订单号
webBaseUrl:"" //支付成功回调页面，即支付成功页面

接口回调成功以后 window.location.href="https://mapi.alipay.com/gateway.do?"+res.data.data.paramStr;直接复用
*/
function orderquery (data, callback) {
return axios.ajax.post('quhu/accompany/user/pay/orderquery',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
订单 订单详情查询
method:get
params:
id:orderId //订单id

接口回调成功以后 window.location.href="https://mapi.alipay.com/gateway.do?"+res.data.data.paramStr;直接复用
*/
function orderquery (data, callback) {
return axios.ajax.post('quhu/accompany/user/queryOrderDetails',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}
/*
订单 取消订单
method:get
params:
orderId:orderId //订单id

接口回调成功以后 window.location.href="https://mapi.alipay.com/gateway.do?"+res.data.data.paramStr;直接复用
*/
function orderquery (data, callback) {
return axios.ajax.post('quhu/accompany/user/order/cancelOrder',data)
  .then(function (response) {
  	if(response.status){
  		if(response.data.status=='SUCCESS')
  			callback(response.data);
  		else
  			Utils.toast(response.data.message)
  	} 
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default {
  axiosAll:axiosAll,
  getHomePageInfoWithCity: getHomePageInfoWithCity,	
  getSetList: getSetList,	
  getSetInfoBySetIdOrOrderType: getSetInfoBySetIdOrOrderType,	
  getServiceListBySetId: getServiceListBySetId,	
  getSelectiveAccompanyTimeSchedule: getSelectiveAccompanyTimeSchedule,	
 
}

