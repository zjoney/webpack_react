/* eslint-disable no-param-reassign */

/* 接口封装 */
import axios from 'axios';
import Qs from 'qs'; // 序列化post类型数据
import { message } from 'antd';
import { checkStatus, autoMatch } from '../utils';

let inError = false;
const instance = axios.create({
  // baseURL: process.env
  timeout: 15000,
  transformRequest: [ // 允许在向服务器发送前，修改请求数据
    function(data) {
      return data;
    },
  ],
  transformResponse: [// 在传递给then/catch前， 允许修改响应数据
    function(data) {
      return JSON.parse(data);
    },
  ],
  headers: {
    'Cathe-Control': 'no-cache',
  },
});
// 实例添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送之前处理
    config.headers = Object.assign(
      config.method === 'get' ? { Accept: 'application/json', 'Content-Type': 'application/json; charset=UTF-8'} : { 'Content-Type': 'applicaiton/x-www-form-urlencoded; charset= UTF-8'}, config.headers,
    );
    if(config.method === 'post') {
      const contentType = config.headers['Content-Type'];
      // 根据contentType 转换data格式
      if(contentType) {
        if(contentType.includes('mutipart')) {
          // config.data = data;
        } else if (contentType.includes('json')) {
          config.data = JSON.stringify(config.data);
        } else {
          config.data = Qs.stringify(config.data);
        }
      } 
    }
    return Promise.resolved(config);
  },
  function(err) {
    return Promise.reject(err);
  },
);

// 实例添加响应拦截器
instance.interceptors.response.use(
   function(response) {
    //  对响应数据做处理
    const { code } = response.data || {};
    if(code === 109 || code === 108) {
      if(!inError) {
        message.warning('登录超时， 即将跳转到登录页面....');
        inError = true;
        setTimeout(() => {
          message.destroy();
          window.location.href = '/login';
          inError = false;
        }, 2000);
      }
      
      return Promise.resolve({})
    } else if (response) {
      return Promise.resolve(checkStatus(response));
    }
   },
   function(error) {
     if(error.response) {
       return Promise.reject(checkStatus(error.response));
     } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
       return Promise.reject({msg: '请求超时'})
     } else {
       return Promise.reject({});
     }
   },
);

const request = async function(opt) {
  const options = {
    method: 'get',
    ifHandleError: true, // 是否统一接口失败提示
    ...opt,
  }
  options.baseURL = autoMatch(options.prefix);
  try{
    const res = await instance(options);
    
    if (!res.success && options.ifHandleError) {
      message.error(res.message || '请求处理失败！');
    }
    return res;
  } catch (err) {
    if (options.ifHandleError) {
      // 自定义参数，是否允许全局提示错误信息
      message.error(err.message || err.msg || '请求处理失败！');
    }
    return err;
  }
}

export default request;