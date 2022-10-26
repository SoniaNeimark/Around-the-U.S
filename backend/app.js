const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const process = require('node:process');
const { errors } = require('celebrate');
const usersRout = require('./routes/users');
const cardsRout = require('./routes/cards');
const wrongRout = require('./routes/wrongs');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middleware/auth');
const {
  userCredentialsBodyValidation,
  validateRequest,
} = require('./helpers/requestsValidation');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;

app.use(express.json());

app.post('/signin', validateRequest({ ...userCredentialsBodyValidation }), login);
app.post('/signup', validateRequest({ ...userCredentialsBodyValidation }), createUser);
app.use(auth);

app.use(usersRout);

app.use(cardsRout);

app.use(wrongRout);

app.use(errors());
app.use((err, req, res, next) => {
  const iff = (condition, then, otherwise) => (condition ? then : otherwise);
  res
    .status(
      iff(
        err.statusCode,
        err.statusCode,
        iff(
          err.name === 'ValidationError',
          400,
          err.name === 'JsonWebTokenError' ? 401 : 500,
        ),
      ),
    )
    .send(err.message + err.name);
});

app.listen(PORT);
