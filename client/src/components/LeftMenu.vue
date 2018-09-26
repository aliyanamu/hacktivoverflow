<template>
  <div class="title-list">
    <router-link :to='{name:"creates"}' v-if="self"><button class="add">+</button></router-link>
    <h1 v-if="questions.length === 0">No Question</h1>
    <ul v-else>
      <li v-if="questions" v-for="question in questions" :key="question._id">
        <router-link :to='{name:"details", params: {id: question._id}}'>
          <div class="event-card">
            <div class="row">
              <div style="padding: 0.8em 1.3em; margin: 0 5%">
                <div>
                  <h3 class="name">{{ question.title }}</h3>
                  <span style="display: inline-flex">
                    <h5 class="date">{{ question.author.name }}</h5>
                    <router-link v-if="question.author._id === self" class="edit" :to='{name:"edits", params:{id: question._id}}'>Edit</router-link>
                    <a class="del" v-if="question.author._id === self" @click="delQuestion(question._id)">Delete</a>
                  </span>
                </div>
                <div>
                  <p class="desc">{{ question.question.substring(0, 88) }}</p>
                </div>
              </div>
            </div>
            <div style="min-width: 50px; margin: auto 20px; text-align: center; color: #42b983;">
              <h1>{{ question.vote }}</h1>
              <p>votes</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'left-menu',
  data () {
    return {
      notif: '',
      // self: '',
      baseUrl: 'http://localhost:3000'
    }
  },
  props: ['isLogin'],
  methods: {
    ...mapActions([
      'getQuestions',
      'getQuestionById',
      'upvoteQuest',
      'downvoteQuest',
      'getSelf'
    ]),
    delQuestion (id) {
      axios
        .delete(this.baseUrl + `/questions/delete/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log('delete success')
          this.$router.push('/dashboard')
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    }
  },
  created () {
  },
  mounted () {
    this.getQuestions()
  },
  computed: {
    ...mapState([
      'questions',
      'question',
      'self'
    ])
  }
}
</script>

<style scoped>
a, a:hover, a:visited {
  text-decoration: none;
  color: inherit;
}

.add {
  margin: 20px 10%;
  background: #42b983;
  padding: 0.2em 0.6em;
  border-radius: 50%;
  box-shadow: 0 0.1875rem 1.5rem #000;
  font-size: 40px;
  border: none;
}

ul {
  text-decoration: none;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  text-align: left;
  padding: 0 10%;
}

.notif {
  position: fixed;
  background: lightsalmon;
  left: 45%;
  top: 35%;
  width: auto;
  height: auto;
  padding: 20px;
}

.edit {
  margin: auto 0 auto 30px;
  color: #42b983!important;
  font-size: 16px;
  font-weight: bold;
}

.del {
  margin: auto 0 auto 20px;
  color: tomato!important;
  font-size: 16px;
  font-weight: bold;
}

.event-card {
  display: flex;
  flex-direction: row;
  background: white;
  box-shadow: 0 0.1875rem 1.5rem #000;
  border-radius: 0.375rem;
  margin: 40px 0;
  overflow: hidden;
}
</style>
