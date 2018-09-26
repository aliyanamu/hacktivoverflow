const express = require('express'),
    router = express.Router(),
    { isLogin } = require("../middlewares/auth"),
    { addQuest, getAllQuest, getOneQuest, updQuest, delQuest, upvoteQuest, downvoteQuest } = require('../controllers/questions');

/* GET questions listing. */
router

    .post('/add', isLogin, addQuest)

    .get('/all', getAllQuest)

    .get('/:id', getOneQuest)

    .put('/edit/:id', isLogin, updQuest)

    .delete('/delete/:id', isLogin, delQuest)

    .put('/upvote/:id', isLogin, upvoteQuest)

    .put('/downvote/:id', isLogin, downvoteQuest)

module.exports = router;
