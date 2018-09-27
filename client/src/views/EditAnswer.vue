<template>
  <div class="form">
    <h1 class="title">You are now editing your answer...</h1>
    <wysiwyg v-model="answer" style="border: 1px solid dimgrey" />
    <button @click="editAns">Edit</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'edit-answer',
  data () {
    return {
      answer: '',
      owner: '',
      notif: '',
      baseUrl: 'https://viktifoverflow-server.hanabc.xyz'
    }
  },
  methods: {
    editAns () {
      axios({
        method: 'PUT',
        url: this.baseUrl + `/answers/edit/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          answer: this.answer
        }
      })
        .then(response => {
          console.log('update', response)
          this.$router.push('/dashboard')
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
