import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignupForm.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: '/questions/create',
          name: 'creates',
          component: () => import('./views/CreatePost.vue'),
          props: true
        },
        {
          path: '/questions/:id',
          name: 'details',
          component: () => import('./views/ShowPage.vue'),
          props: true
        },
        {
          path: '/questions/edit/:id',
          name: 'edits',
          component: () => import('./views/EditPost.vue'),
          props: true
        },
        {
          path: '/answers/edit/:id',
          name: 'editans',
          component: () => import('./views/EditAnswer.vue'),
          props: true
        }
      ]
    }
  ]
})

export default router
