import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import jwt from 'jsonwebtoken';
import {ApiAccess} from './data/connectors.js';
import bcrypt from 'bcrypt';
// Local Strategy, used to initially get token
passport.use(new LocalStrategy(
  function(username, password, cb) {
    findByCreds(username, password, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));
//Required because passport will not call default defaul when session:false
export function serializeUser(req, res, next) {
  req.user = {
    id: req.user.id
  };
  next();
}
export function findByCreds(username, password, cb) {
  ApiAccess.find({where: {username:username}})
    .then(user=>{
        !user
          ?cb("User not found", false)
          :bcrypt.compare(password, user.dataValues.password)
            .then(res=> {
              res?cb(null, user):cb("Incorrect Password",false);
            });
      },
      reason=>cb(reason, false));
}
export function generateToken(req, res, next) {
  //expiresIn seconds
  req.token = jwt.sign({id: req.user.id}, 'CHANGEME', {expiresIn: 120*60});
  next();
}
export function localResponse(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}
