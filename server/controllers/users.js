require('dotenv').config();
let hashPass = require("../helpers/hashPass");

const User = require("../models/users"),
  jwt = require('jsonwebtoken'),
  ObjectId = require("mongodb").ObjectId;

module.exports = {
  list: (req, res) => {
    User.find()
      .then(user => {
        res.status(200).json({
          user: user
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  },

  register: (req, res) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        User.findOne({
          email: req.body.email,
          password: hashPass(req.body.password)
        })
          .then(user => {
            jwt.sign({
              id: user._id
            }, process.env.ACCESS_KEY,
              function (err, token) {
                res.status(200).json({
                  name: user.name,
                  token: token
                })
              }
            )
          })
          .catch(function () {
            res.status(500).json({
              message: `email and password didn't match`
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  login: function (req, res) {
    console.log('masuk controllers/users -> login')
    let user = req.user
    User.findOne({
      email: req.body.email,
      password: hashPass(req.body.password)
    })
      .then(user => {
        jwt.sign({
          id: user._id
        }, process.env.ACCESS_KEY,
          function (err, token) {
            res.status(200).json({
              name: user.name,
              token: token
            })
          }
        )
      })
      .catch(function () {
        res.status(500).json({
          message: `email and password didn't match`
        })
      })
  },

  googleSignUp: (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .then(data => {
        if (!data) {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })
            .then(user => {
              res.status(200).json({
                message: `succesfully register user`,
                user: user
              })
              jwt.sign({
                id: user._id
              }, process.env.ACCESS_KEY,
                function (err, token) {
                  res.status(200).json({
                    name: user.name,
                    token: token
                  })
              })
            })
            .catch(err => {
              res.status(500).json({
                message: err.message
              })
            })
        } else {
          jwt.sign({
            id: data._id
          }, process.env.ACCESS_KEY,
            function (err, token) {
              res.status(200).json({
                name: data.name,
                token: token
              })
            }
          )
        }
      })
  },

  remove: (req, res) => {
    User.deleteOne(
      {
        _id: ObjectId(req.params.id)
      },
      function (err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully deleted user`
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
  }
};
