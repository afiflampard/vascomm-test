import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../config/index.js";
import db from "../models/index.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(null, false);

        let user = await db.User.findOne({ where: { email } });

        if (!user) {
          user = await db.User.create({
            first_name: profile.name.givenName || "Google",
            last_name: profile.name.familyName || "User",
            email,
            password: null,
            role: "USER",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
