const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const AccountModel = require('./connectDB');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server started');
});

app.get('/', (req, res) => {
  indexHtml = path.join(__dirname, 'index.html');
  res.sendFile(indexHtml);
});

app.post('/', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        let token = jwt.sign(data._id.toJSON(), 'secret');
        res.cookie('token', token, { maxAge: 30000 });
        res.redirect('/private')
      } else {
        return res.json('Failure');
      }
    })
    .catch((err) => {
      res.status(500).json('Server error');
      console.log(err);
    });
});

app.get('/private', (req, res, next) => {
  try {
    let token = req.cookies.token;
    let check = jwt.verify(token, 'secret');
    if (check) {
      next();
    }
  } catch (error) {
    res.redirect('/');
  }
},
  (req, res) => {
    res.json('WELCOME');
  }
);

