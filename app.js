const path = require('path');
const connectDB = require('./db/connect');
require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const nodemailer = require('nodemailer');

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

app.use('/api/users', userRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, console.log('server is listening on port 5000'));
  } catch (err) {
    console.log(err);
  }
};

start();
