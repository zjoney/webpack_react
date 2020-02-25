
/* 接口封装 */
import axios from 'axios';
import Qs from 'qs'; // 序列化post类型数据
import { message } from 'antd';

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




