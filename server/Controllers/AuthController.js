const User = require("../Models/UserModel");
const {check, validationResult } = require("express-validator");
const jwtToken = require('jsonwebtoken');
const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();
const nodemailer = require("nodemailer");
const validator = require('validator');
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);

  const checkField = async () =>  {
    const username = await User.findOne({username: user.username});
    const email = await User.findOne({email: user.email});
    if (username) {
      return res.status(500).json({error: "Username already in use." });
    } else if (email) {
      return res.status(500).json({error: "Email already in use."});
    } else if (!validator.isEmail(email)) {
      return res.status(500).json({error: "Please enter valid email"})
    }
    else {
      user.save()
      .then(user => {
        res.json({
          id: user._id,
          username: user.username,
          email: user.email,
          highscore: user.highscore,
        });
      })
    }
  }

  checkField();
};

exports.userData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id})
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.updateUserData = async (req, res, next) => {
  const {id} = req.params;
  try {
    const user = await User.findOneAndUpdate({ _id: id}, {...req.body})
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.leaderboard = async (req, res) => {
  try {
    const users = await User.find({}).select("username highscore").sort({highscore: -1}).limit(5);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const {username, password } = req.body;
  await User.findOne({username: `${username}`})
      .then(user => {
        if (!user) {
          return res.status(400).json({
            error: "User not found"
          });
        }
        if (!user.authenticate(password)) {
          return res.status(401).json({
            error: "Username or Password does not exist"
          });
        }
        const token = jwtToken.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.cookie("token", token, {httpOnly: true, secure: true, expire: new Date() + 9999 });
        const { _id, username, email, highscore} = user;
        return res.json({ token, user: { _id, username, email, highscore} });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User has signed out"
  });
};

exports.isSignedIn = jwt({
  secret: process.env.SECRET_KEY,
  userProperty: "auth",
  algorithms: ['HS256'],
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.forgotPassword = async (req, res) => {
  const {email} = req.body;
  await User.findOne({email: `${email}`})
    .then(user => {
        if (!user) {
          return res.status(400).json({error: "User with this email does not exist"});
        }
        const resetToken = jwtToken.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: "15m"})
        const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GOOGLE_EMAIL,
          pass: process.env.GOOGLE_EMAIL_APPS_PW,
        },
      });
      const data = {
        from: 'noreply@gmail.com',
        to: email,
        subject: 'Reset Account Password Link',
        html: `
        <h3>Please click the link below to reset your password</h3>
        <a href="http://localhost:3000/resetpassword/${resetToken}">Reset password link</a>
        `,
      }
      transporter.sendMail(data)
        .then(msg => {
            return res.status(200).json({message: 'Email has been sent, please follow the instructions'})
         })
        .catch(error => {
            return res.status(400).json({error: error.message})
          })
    .catch(error => {
        return res.status(400).json({error: 'reset password link error'});
      })
    })
};


exports.updatePassword = async(req, res) => {
    try {
      const decodedToken = jwtToken.verify(req.headers.authorization.split(' ')[1], process.env.RESET_PASSWORD_KEY);
      if (!decodedToken) {
        return res.status(401).send({error: "Invalid token"});
      }
      const user = await User.findOne({_id: decodedToken._id});
      if (!user) {
        return res.status(401).send({error: "User not found"});
      }
      user.password = req.body.newPassword;
      await user.save();
      return res.status(200).send({message:"Password has been changed"});
    } catch (error) {
      return res.status(500).send({error: error});
    }

};
