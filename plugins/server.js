/*
 * @Author: 李平勇
 * @Date: 2020-02-14 11:02:53
 * @desc:axios封装
 */
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，
import md5 from 'md5'
import LRU from 'lru-cache'

// 给api加3秒缓存
const CACHED = new LRU({
 max: 1000,
 maxAge: 1000 * 60 * 15
})

// 环境的切换，切换基路径
 //let hostName =  location.hostname.substring(0,location.hostname.indexOf('8')+1)   //192.168
//  let protocol = window.location.protocol; //协议
// if()



if(process.env.NODE_ENV == 'development'){
    axios.defaults.baseURL = 'http://192.168.123.189:8088/';
}else if (process.env.NODE_ENV == 'debug') { //测试环境
    axios.defaults.baseURL = 'http://192.168.123.189:8088/';
}
else if (process.env.NODE_ENV == 'production') { //生产环境
    axios.defaults.baseURL = 'http://192.168.123.189:8088/';
}


//设置请求超时
axios.defaults.timeout = 10000

//post请求的时候在这里进行一个默认的设置，即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


// //请求拦截器
axios.interceptors.request.use(
    config => {
        // let key
        // // 服务端才加缓存，浏览器端就不管了
        // if (config.cache && !process.browser) {
        //     const { params = {}, data = {} } = config
        //     key = md5(config.url + JSON.stringify(params) + JSON.stringify(data))
        //     if (CACHED.has(key)) {
        //         // 缓存命中
        //         return Promise.resolve(CACHED.get(key))
        //     }
        // }
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        // console.log(config)
        return config
        // return axios(config)
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    },
    error => {
        return Promise.error(error);
})



// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Message({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;

                // 404请求不存在
                case 404:
                    Message({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }

})

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    // let data = CACHED.get(url);
    // if (data) {
    //     return JSON.parse(data);
    // }
    if(params==undefined){
        params = ''
    }
    console.log(params)
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params,
            cache: true
        }).then(res => {
            // CACHED.set(url, JSON.stringify(res.data));
            resolve(res.data)
        }).catch(err =>{
            reject(err.data)
    })
})}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    
    // let data = CACHED.get(url);
    // if (data) {
    //     return JSON.parse(data);
    // }
    return new Promise((resolve, reject) => {
         axios.post(url, params)
     
        .then(res => {
            // CACHED.set(url, JSON.stringify(res.data));
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    })
}
/**
 * put方法,对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params){
    return new Promise((resolve, reject) => {
        axios.put(url, QS.stringify(params))
       .then(res => {
           resolve(res.data);
       })
       .catch(err =>{
           reject(err.data)
       })
   })
}

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
      axios.patch(url,data)
           .then(response => {
             resolve(response.data);
           },err => {
             reject(err)
           })
    })
  }