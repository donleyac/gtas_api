import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import jwt from 'jsonwebtoken';

var records = [
  {id: 1, username: 'alex', email:'donleyac@gmail.com', password: 'password'},
  {id: 2, username: 'john', email:'john@gmail.com', password:'secure'}
];
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
  // database dummy - find user and verify password
  for(let i=0; i<records.length; i++) {
    if(records[i]['username']===username && records[i]['password']===password) {
      cb(null, records[i]);
    }
  }
  cb(null, false);
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
