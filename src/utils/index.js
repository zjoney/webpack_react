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

}


