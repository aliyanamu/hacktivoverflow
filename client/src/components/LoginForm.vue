<template>
  <div>
    <button v-if="isLogin === false" class="g-btn" @click="googleSignIn">G</button>
    <button v-if="isLogin === false" class="plus-btn" @click="openbtn"><i style="width: 30%; float: left; margin-left: 20%;" class="fas fa-sign-in-alt"></i></button>
    <button v-if="isLogin === true" class="plus-btn" @click="logout"><i style="width: 30%; float: left; margin-left: 20%;" class="fas fa-sign-out-alt"></i></button>
    <div v-if="isOpen === true">
    <div class="overlay"></div>
      <div class="logBox">
        <button class="x-close" @click="closebtn">x</button>
        <div class="form">
          <span style="color: red" v-if="this.notif.length > 0"> {{this.notif}} </span>
          <div class="md-form">
            <label for="email"><i class="fa fa-envelope"></i>Email</label>
            <input v-model="email" type="text" id="email" class="form-control" placeholder="Enter your email" required>
          </div>
          <div class="md-form">
            <label for="password"><i class="fa fa-key"></i>Password</label>
            <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter your password" required>
          </div>
        </div>
        <button class="log-btn" @click="signIn">Login</button>
        <span>Create an account? <router-link to="/signup" v-on:click.native="closebtn">Here</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../assets/config.js'
import axios from 'axios'

export default {
  name: 'LoginForm',
  props: ['isLogin'],
  data () {
    return {
      isOpen: false,
      email: '',
      password: '',
      notif: '',
      baseUrl: 'https://viktifoverflow-server.hanabc.xyz'
    }
  },
  methods: {
    openbtn () {
      this.isOpen = true
    },
    closebtn () {
      this.isOpen = false
      this.password = null
      this.email = null
    },
    googleSignIn () {
      let baseProvider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(baseProvider)
        .then(result => {
          let token = result.user.X.O
          let data = {
            email: result.additionalUserInfo.profile.email,
            name: result.additionalUserInfo.profile.name
          }
          axios({
            method: 'POST',
            url: this.baseUrl + `/users/google-signup`,
            data
          })
            .then(function (response) {
              let token = response.data.token
              localStorage.setItem('token', token)
              window.location.reload()
            })
        })
        .catch(err => {
          console.log('failed login', err.response)
        })
    },
    signIn () {
      let self = this
      self.notif = ''
      let data = {
        email: this.email,
        password: this.password
      }
      axios({
        method: 'POST',
        url: this.baseUrl + `/users/login`,
        data
      })
        .then(function (response) {
          console.log(response)
          let token = response.data.token
          localStorage.setItem('token', token)
          self.$emit('logStat', true)
          self.closebtn()
          self.$router.push('/')
        })
        .catch(function (err) {
          if (!self.email) {
            self.notif = 'valid email is required'
          } else if (!self.password) {
            self.notif = 'password is required'
          } else if (!self.email && !self.password) {
            self.notif = 'email and password are required'
          } else {
            self.notif = 'Oops, ' + err.response.data.message
          }
          console.log('failed login')
        })
    },
    logout () {
      firebase
        .auth()
        .signOut()
        .then(result => {
          console.log('You are now disconnected')
          localStorage.clear()
          this.$emit('logStat', false)
          this.$router.push('/')
        })
        .catch(err => {
          console.log('Oops ', err.message)
        })
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  width: 120%;
  height: 120%;
  margin: -10%;
  opacity: 0.5;
  z-index: 1000;
  filter: alpha(opacity=50);
  background-color: #000;
}

.logBox {
  position: fixed;
  color: #000;
  background: #ffffffee;
  top: 17%;
  left: 39%;
  display: inline-table;
  min-width: 31rem;
  padding: 3rem;
  transition: box-shadow 0.25s;
  z-index: 10000000;
  border-radius: 20px;
}

.plus-btn,
.g-btn {
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  background: #42b983;
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.plus-btn {
  bottom: 50px;
  right: 3%;
}

.g-btn {
  bottom: 120px;
  right: 3%;
}

.plus-btn:hover,
.g-btn:hover {
  transform: scale(1.5);
  transition: all 0.1s linear 0.1s;
}

.md-form {
  display: table;
}

.md-form input {
  width: 350px;
  margin-left: 15px;
  float: right;
}

.md-form label {
  margin: 10px 20px;
  display: inherit;
  font-size: 16px;
}

.x-close,
.log-btn {
  background: #42b983;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #fffccc;
}

.x-close {
  margin: 0 auto 0 80%;
  border-radius: 50%;
  padding: 10px 20px;
}

.log-btn {
  margin: 20px 20px 0;
  border-radius: 20px;
  padding: 10px 30px;
}

.x-close:hover,
.x-close:focus,
.log-btn:focus,
.log-btn:hover {
  background: #42b983;
  opacity: 0.7;
  filter: alpha(opacity=70);
  color: #000;
}

input[type="text"]:focus:not([readonly]) {
  border-bottom: 1px solid #42b983;
  box-shadow: 0 1px 0 0 #42b983;
}

.fa-envelope, .fa-key {
  margin-right: 10px;
}

label,
::placeholder {
  color: dimgray;
}

a,
button {
  cursor: pointer;
}
</style>
