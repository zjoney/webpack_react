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
        return Promise.resolve({})
      } else if (response) {
        return Promise.resolve(checkStatus(response));
      }
    }
   }
)


