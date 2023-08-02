const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const Blacklist = require("../models/blacklist");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const pathToKey = path.join(__dirname, "../utils", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
  passReqToCallback: true,
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async function (req, jwt_payload, done) {
      // console.log(jwt_payload);
      // console.log(req.headers.authorization.split(" ")[1]);
      const currentToken = req.headers.authorization.split(" ")[1];
      // We will assign the `sub` property on the JWT to the database ID of user
      try {
        const isBlackListed = await Blacklist.findOne({ tokens: currentToken });
        console.log(isBlackListed);
        if (isBlackListed) {
          return done(null, false);
        } else {
          const user = await User.findOne({ _id: jwt_payload.sub });
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
