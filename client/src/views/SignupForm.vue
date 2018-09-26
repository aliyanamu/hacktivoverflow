<template>
  <div>
    <div class="logBox">
      <div class="form">
        <div style="color: red" v-if="this.notifs.length > 0">Oops, 
          <span v-for="(notif, index) in notifs" :key="index">
            <span v-if="index !== notifs.length-1">{{ notif }}, </span>
            <span v-else>{{ notif }}</span>
          </span>
        </div>
        <div class="md-form">
          <label for="name"><i class="fa fa-user"></i>Name</label>
          <input v-model="name" type="text" id="name" class="form-control" placeholder="Enter your name" required>
        </div>
        <div class="md-form">
          <label for="email"><i class="fa fa-envelope"></i>Email</label>
          <input v-model="email" type="text" id="email" class="form-control" placeholder="Enter your email" required>
        </div>
        <div class="md-form">
          <label for="password"><i class="fa fa-key"></i>Password</label>
          <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter your password" required>
        </div>
      </div>
      <button class="log-btn" @click="register">Register</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import db from '../assets/config.js'

export default {
  name: 'SignupForm',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      notifs: [],
      baseUrl: 'http://localhost:3000'
    }
  },
  methods: {
    register() {
      let self = this
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      axios({
        method: 'POST',
        url: this.baseUrl + `/users/register`,
        data
      })
        .then(result => {
          let token = result.data.token
          localStorage.setItem('token', token)
          self.$router.go()
          self.$router.push('/')
        })
        .catch(err => {
          self.notifs = []
          if (!self.name) {
            self.notifs.push('name is required')
          }
          if (!self.email) {
            self.notifs.push('valid email is required')
          }
          if (!self.password) {
            self.notifs.push('password is required')
          }
          console.log('failed register', err.response)
        })
    }
  }
}
</script>

<style scoped>
.logBox {
  color: #000;
  background: #ffffffcc;
  display: inline-table;
  margin: 5% auto 0;
  min-width: 31rem;
  padding: 3rem;
  transition: box-shadow 0.25s;
  border-radius: 20px;
}

.plus-btn, .g-btn {
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
  padding: 10px 30px;
  border: none;
  margin: 20px 20px 0;
  font-size: 20px;
  font-weight: bold;
  color: #fffccc;
  border-radius: 20px;
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

input[type=text]:focus:not([readonly]) {
  border-bottom: 1px solid #42b983;
  box-shadow: 0 1px 0 0 #42b983;
}

label, ::placeholder {
  color: dimgray;
}

a, button {
  cursor: pointer;
}

.fa-user, .fa-envelope, .fa-key {
  margin-right: 10px;
}
</style>
