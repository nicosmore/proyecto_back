const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UsersDao = require('../models/daos/users/users.mongo.dao');
const { formatUserForDB } = require('../utils/users.utils');

const User = new UsersDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Passport Local Strategy

// sign up
passport.use('signup', new LocalStrategy({
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    const userItem = {
      name: req.body.name, 
      address: req.body.address,
      age: req.body.age,  
      email: username,
      password: createHash(password)
    };
    const newUser = formatUserForDB(userItem);
    const user = await User.createUser(newUser);
    console.log("User registration successfull");
    return done(null, user);
  }
  catch(error) {
    console.log("Error signing user up...");
    console.log(error);
    return done(error);
  }
}));

// sign in
passport.use('signin', new LocalStrategy( async (username, password, done) => {
  try {
    const user = await User.getByEmail(username);
    if (!isValidPassword(user, password)) {
      console.log("Invalid user or password");
      return done(null, false);
    }
    return done(null, user);
  }
  catch(error) {
    console.log("Error signing in...");
    return done(error);
  }
}))

// Serialization
passport.serializeUser((user, done) => {
  console.log("Inside Serializer");
  done(null, user._id);
})

// Deserialization
passport.deserializeUser(async (id, done) => {
  console.log("Inside DEserializer");
  const user = await User.getById(id);
  done(null, user);
});

module.exports = passport;