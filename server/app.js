require('dotenv').config();

const express = require('express'),
      app = express(),
      cors = require('cors'),
      jwt = require('jsonwebtoken'),
      bodyParser= require('body-parser');

const indexRouter = require('./routes/index'),
      usersRouter = require('./routes/users'),
      questionsRouter = require('./routes/questions'),
      answersRouter = require('./routes/answers');

let PORT = 3000 || PORT;


//Connecting to Mongoose
const mongoose   = require('mongoose'),
      urltest = `mongodb://localhost:27017/hackover-test`
      // url = `mongodb://illion01:illion01@ds213183.mlab.com:13183/hackover`;

// if (process.env.NODE_ENV === 'test') {
    console.log('ready to test our server')
    mongoose.connect(urltest,{ useNewUrlParser: true });
// } else {
//     mongoose.connect(url,{ useNewUrlParser: true });
// }

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
});


app.listen (PORT, () => {
  console.log(`Application listening on port: ${PORT}`);
});


app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors());


app
  .use('/', indexRouter)
  .use('/users', usersRouter)
  .use('/questions', questionsRouter)
  .use('/answers', answersRouter);

module.exports = app