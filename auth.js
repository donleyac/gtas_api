import passport from 'passport';
import {Strategy} from 'passport-http-bearer';
import {findByToken} from './data/tokenStore.js';

// The Bearer strategy requires a `verify` function which receives the
// credentials (`token`) contained in the request.  The function must invoke
// `cb` with a user object, which will be set at `req.user` in route handlers
// after authentication.
passport.use(new Strategy(
  function(token, cb) {
    findByToken(token, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));
