import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

// 引入全局组件的文件(这里不加文件的拓展名)
import Bookhead from './components/Bookhead'
import Bookfoot from './components/Bookfoot'

// 创建全局组件(注意这里的book-head要遵守标签名规范)
Vue.component("book-head",Bookhead)
Vue.component("book-foot",Bookfoot)


// 配置默认的后端路由
axios.defaults.baseURL="http://176.209.103.9:8000/";

// http request拦截器 添加一个请求拦截器(因为每次向后端请求数据都要带上token)
axios.interceptors.request.use(function (config) {
  // 获取token
  var token = window.localStorage.getItem("reader_token")
  if (token) {
      config.headers.Authorization = token;    //将token放到请求头发送给服务器(也可以这样写)
      // config.headers['Authorization'] = token;  
      return config;    
    }else{
      return config;
    }
}, 
function (error) {
  return Promise.reject(error)}

);


Vue.prototype.axios=axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')