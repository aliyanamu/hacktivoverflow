<template>
  <div class="form">
    <h1 class="title">Ask your question!</h1>
    <input id="title" v-model="title" type="text" name="title" placeholder="Input title here">
    <wysiwyg v-model="question" style="border: 1px solid dimgrey" />
    <button @click="createPost">Create</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'create-page',
  data () {
    return {
      title: '',
      question: '',
      author: '',
      notif: '',
      baseUrl: 'http://localhost:3000'
    }
  },
  methods: {
    createPost () {
      axios({
        method: 'POST',
        url: this.baseUrl + `/questions/add`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.title,
          question: this.question
        }
      })
        .then(response => {
          console.log('success', response)
          this.$router.push('/dashboard')
          this.$router.go()
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    }
  },
  created () {
  },
  computed: {
  }
}
</script>

<style scoped>
.form {
  padding-top: 8%;
}

.title {
  text-align: left;
  margin: 0 0 5% 10%;
}
input, .editr {
  width: 80%;
  border: 1px solid lightgrey;
  margin: 0 10% 20px;
  text-align: left;
}

input {
  padding: 10px;
}

button {
  float: right;
  margin-right: 10%;
  font-size: 16px;
  width: 100px;
  height: 50px;
  border: none;
  background: #42b983;
  color: white;
}
</style>
