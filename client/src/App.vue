<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> ||
      <router-link to="/dashboard">Dashboard</router-link>
      <login-form :isLogin="isLogin" @logStat="unLog"></login-form>
    </div>
    <router-view :isLogin="isLogin"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import LoginForm from '@/components/LoginForm.vue'
import db from './config.js'
import firebase from 'firebase'

export default {
  name: 'home',
  components: {
    HelloWorld,
    LoginForm
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    unLog (value) {
      this.isLogin = value
    },
    check () {
      let currentUser = firebase.auth().currentUser
      console.log(currentUser)
    }
  },
  created () {
    let datatoken = localStorage.getItem('token')
    if (datatoken) {
      this.isLogin = true
    }
  },
  computed: {
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  height: 70px;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
