/*
*date: 2020-02-25 17:16
*
*/
const isDev = process.env.NODE_ENV === 'development';

export function autoMatch(prefix) {
  let baseUrl = '';
  if (isDev) {
    // 开发环境配置，通过proxy转发请求
    baseUrl = `/${prefix || 'testapi'}`;
  } else {
    // 生产环境配置 
    // switch (prefix) {
    //   case 'baidu':
    //     baseUrl = window.location.baidu;
    //     break;
    //   default:
    //     baseUrl = window.location.default;
    // }
  }
  return baseUrl;
}

export function checkStatus(params) {
  const status = params.status || -1000;
  if(status === 304 || (status >=200 && status < 300 )) {
    return params.data;
  } else {
    let errorInfo = '';
    switch(status) {
      case -1: 
        errorInfo = '远程服务器响应失败， 请稍后再重试';
        break;
      case 400: 
        errorInfo = '400: 错误请求';
        break;
      case 401: 
        errorInfo = '401: 访问令牌失效或已过期';
        break;
      case 403:
        errorInfo = '';
        break;
      default:

    }
    return {
      status,
      msg: errorInfo
    }
  }
}

export function splitUrl (params) {
  const str = params.split('?')[1];
  const items = (str && str.split('&')) || [];
  let arr =[];
  const json={};
  for (let i = 0; i<items.length; i++ ) {
    arr = items[i].split('=');
    json[arr[0]] = arr[1];
  }
  return json
}

