const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true, // this is put so it cen trust heroku as a proxy
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        done(null, existingUser);
      } else {
      const user =  await new User({ googleId: profile.id }).save()
        
        done(null, user);
      }
    }
  )
);

/* (accessToken, refreshToken, profile, done) =>{
    User.findOne({googleId: profile.id})
    .then((existingUser) =>{
        if(existingUser){
            done(null, existingUser );
        } else {
            new User({ googleId: profile.id}).save()
            .then(user=>{
                done(null, user);
            });
        } */
