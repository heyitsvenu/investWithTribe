const path = require('path');
const connectDB = require('./db/connect');
require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/user');

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
