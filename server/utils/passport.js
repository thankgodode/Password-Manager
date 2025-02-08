const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userData = {
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        };
        const user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          const result = await User.create({ userData });
        }
      } catch (err) {
        return done(null, err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => {
  const authenticated = true;
  done(null, authenticated);
});
