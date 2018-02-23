var passport = require("passport");  
var passportJWT = require("passport-jwt");  
var cfg = require("./config.js");  
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('auth_token')
};
var User = require('./models/User');

module.exports = function() {  
    var strategy = new Strategy(params, function(payload, done) {
        User.findById(payload.id, (err, user) => {
            if (err) {
              return done(err, false);
            }
            if (user) {
              done(null, user);
            } else {
              done(null, false);
            }
          });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};