import Router from 'vue-router'
import Vue from 'vue'
import Home from '../pages/Home'

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',redirect:'/home'
    },{
      path:'/home',
      name:'home',
      component:Home
    }
  ]
})
