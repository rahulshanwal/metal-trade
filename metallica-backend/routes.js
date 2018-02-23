var express = require('express');
var router = express.Router();
var User = require('./models/User');
var cfg = require("./config"); 
var jwt = require("jwt-simple"); 

// Register new users
router.post('/register', function(req, res) {
  if (!req.body.email || !req.body.password || req.body.password.length < 6) {
    res.status(401).send({message: 'Email or password not valid'});
  } else {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err, user) {
      if (err) {
        res.status(401).send({message: 'Email address already exists.'});
      }
      let token = jwt.encode({id: user.id}, cfg.jwtSecret);
      res.json({
        token: token,
        expiresIn: 3600,
        userId: user.id
      });
    });
  }
});

router.get('/', function(req, res) {
    res.json('Auth service is up');
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
        res.status(401).send({message: 'User not found.'});
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
            console.log('user id ------------------> '+user.id);
            // Create token if the password matched and no error was thrown
            let token = jwt.encode({id: user.id}, cfg.jwtSecret);
            res.json({
                token: token,
                userId: user.id,
                expiresIn: 3600
            });
        }
        else {
            res.status(401).send({message: 'Authentication failed. Passwords did not match.'});
        }
      });
    }
  });
});

module.exports = router;