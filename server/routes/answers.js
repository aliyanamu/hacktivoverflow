const express = require('express'),
    router = express.Router(),
    { isLogin } = require("../middlewares/auth"),
    { addAns, editAns, upvoteAns, downvoteAns } = require('../controllers/answers');

/* GET answers listing. */
router
    .post('/add/:id', isLogin, addAns)

    .put('/edit/:id', isLogin, editAns)

    .put('/upvote/:id', isLogin, upvoteAns)

    .put('/downvote/:id', isLogin, downvoteAns)

module.exports = router;
