const express = require('express'),
    router = express.Router(),
    { googleAuth, getSelf } = require("../middlewares/auth"),
    { list, register, login, googleSignUp } = require('../controllers/users')

/* GET users listing. */
router

    .post('/register', register)

    .post('/login', login)

    .post('/google-signup', googleAuth, googleSignUp)

    .get('/self', getSelf)

module.exports = router
