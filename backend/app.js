const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const process = require('node:process');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const usersRout = require('./routes/users');
const cardsRout = require('./routes/cards');
const wrongRout = require('./routes/wrongs');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const {
  userCredentialsBodyValidation,
  validateRequest,
} = require('./helpers/requestValidation');


const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000, BASE_PATH } = process.env;

app.use(express.json());

app.use(requestLogger);

app.use(cors());

app.options('*', cors());

app.post(
  '/signin',
  validateRequest({ ...userCredentialsBodyValidation }),
  login,
);

app.post(
  '/signup',
  validateRequest({ ...userCredentialsBodyValidation }),
  createUser,
);

app.use(auth);

app.use(usersRout);

app.use(cardsRout);

app.use(wrongRout);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
console.log(`oops: ${err.name} ${err.message}`)
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
    .send(`caught ${err.name} error: ${err.message}`);
});

app.listen(PORT);

console.log(`Listening to port${PORT} ${BASE_PATH}`);
// test
