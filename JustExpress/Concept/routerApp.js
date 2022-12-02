const express = require('express');
const app = express();
const helmet = require('helmet');
// Middleware at Application Level
app.use(helmet());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));

const router = require('./router');
app.use('/', router);
const userRouter = require('./userRouter');
app.use('/user', userRouter);

app.listen(3002, () => {
  console.log('App listening on port 3002!');
});
