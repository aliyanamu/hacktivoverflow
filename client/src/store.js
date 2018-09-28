import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    question: {},
    self: {},
    voteCount: '',
    voteAnsCount: '',
    updQuest: 0
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
    },
    setVoteCount (state, payload) {
      state.voteCount = payload
    },
    setVoteAnsCount (state, payload) {
      state.voteAnsCount = payload
    },
    setUpdQuest (state, payload) {
      state.updQuest = payload
    }
  },
  actions: {
    getSelf (context) {
      axios
        .get('https://viktifoverflow-server.hanabc.xyz/users/self', {
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
        .get(`https://viktifoverflow-server.hanabc.xyz/questions/${id}`)
        .then(response => {
          context.commit('setQuestionById', response.data.question)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    getQuestions (context) {
      axios
        .get('https://viktifoverflow-server.hanabc.xyz/questions/all', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
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
        url: `https://viktifoverflow-server.hanabc.xyz/questions/upvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.dispatch(`getQuestionById`, id)
          context.commit('setVoteCount', response)
          this.$router.push(`/questions/${id}`)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    downvoteQuest (context, id) {
      axios({
        method: 'PUT',
        url: `https://viktifoverflow-server.hanabc.xyz/questions/downvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.dispatch(`getQuestionById`, id)
          context.commit('setVoteCount', response)
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
        url: `https://viktifoverflow-server.hanabc.xyz/answers/upvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          // context.dispatch(`getQuestionById`, id)
          context.commit('setVoteAnsCount', response)
          this.$router.push(`/dashboard`)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    downvoteAns (context, id) {
      axios({
        method: 'PUT',
        url: `https://viktifoverflow-server.hanabc.xyz/answers/downvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          // context.dispatch(`getQuestionById`, id)
          context.commit('setVoteAnsCount', response)
          this.$router.push(`/dashboard`)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    }
  }
})
