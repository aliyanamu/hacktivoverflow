const express = require('express'),
    router = express.Router();

/* GET articles listing. */
router

    .get('/', (req, res) => {
        res.send('Connected to index')
    })

module.exports = router;
