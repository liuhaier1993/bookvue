import Vue from 'vue'
import Router from 'vue-router'

// 将页面组件引入,这里引入的组件都是一个单独的页面,并配置相关的路由(可以不写后缀名)
import Index from './views/Index'
import Details from './views/Details'
import Login from './views/Login'
import Reg from './views/Reg'
import Bookcase from './views/Bookcase'
import Personal from './views/Personal'




Vue.use(Router)


// 配置路由与组件的对应关系
export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      component: Index
    },
    // 详情页(要通过路由传参)
    {
      path: '/details/:id',
      component: Details,
      props:true

    },
    //登陆页面
    {
      path: '/login',
      component: Login
    },
    //注册页面
    {
      path: '/reg',
      component: Reg
    },
    //收藏书架页面
    {
      path: '/bookcase',
      component: Bookcase
    },
    // 个人信息页
    {
      path: '/personal',
      component: Personal
    },

  ]
})
