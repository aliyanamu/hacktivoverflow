<template>
  <div class="form">
    <h1 class="title">Ask your question!</h1>
    <input id="title" v-model="title" type="text" name="title" placeholder="Input title here">
    <wysiwyg v-model="question" style="border: 1px solid dimgrey" />
    <button @click="editPost">Edit</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'edit-page',
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
    firstInput () {
      axios
        .get(this.baseUrl + `/questions/${this.$route.params.id}`)
        .then(response => {
          this.title = response.data.question.title
          this.question = response.data.question.question
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    editPost () {
      axios({
        method: 'PUT',
        url: this.baseUrl + `/questions/edit/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.title,
          question: this.question
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
    this.firstInput()
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
