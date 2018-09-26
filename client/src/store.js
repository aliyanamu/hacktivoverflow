import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    question: {},
    self: {}
  },
  mutations: {
    setQuestions (state, payload) {
      state.questions = payload
    },
    setQuestionById (state, payload) {
      state.question = payload
    },
    setSelf (state, payload) {
      state.self = payload
    }
  },
  actions: {
    getSelf (context) {
      axios
        .get('http://localhost:3000/users/self', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          context.commit('setSelf', response.data.user._id)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    getQuestionById (context, id) {
      axios
        .get(`http://localhost:3000/questions/${id}`)
        .then(response => {
          context.commit('setQuestionById', response.data.question)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    getQuestions (context) {
      axios
        .get('http://localhost:3000/questions/all', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          response.data.questions.sort(function (a, b) {
            let keyA = a.vote
            let keyB = b.vote
            if (keyA > keyB) return -1
            if (keyA < keyB) return 1
            return 0
          })
          context.commit('setQuestions', response.data.questions)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    upvoteQuest (context, id) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/questions/upvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.dispatch(`getQuestionById`, id)
          this.$router.push(`/questions/${id}`)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    downvoteQuest (context, id) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/questions/downvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.dispatch(`getQuestionById`, id)
          this.$router.push(`/questions/${id}`)
        })
        .catch(err => {
          console.log('get error', err.response)
          this.$router.push('/dashboard')
        })
    },
    upvoteAns (context, id) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/answers/upvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.dispatch(`getQuestionById`, id)
          this.$router.push(`/answers/${id}`)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    downvoteAns (context, id) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/answers/downvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.dispatch(`getQuestionById`, id)
          this.$router.push(`/answers/${id}`)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    }
  }
})
