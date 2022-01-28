const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { username } = req.body;
    const mailData = {
      from: process.env.email,
      to: username,
      subject: 'Hello',
      text: 'Welcome to Hello World',
      html: '<p>Welcome to Hello World</p>',
    };
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        return res
          .status(200)
          .send({ msg: 'mail sent', msg_id: info.messageId });
      }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { createUser };
