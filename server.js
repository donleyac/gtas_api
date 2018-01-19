import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import uuid from 'node-uuid';

require('./auth.js');

const app = express();
const PORT = 3000;

//passport's session piggy-backs on express-session
app.use(session({
  genid: function(req) {
   return uuid.v4();
  },
  secret: 'CHANGEME'
}));
app.use(passport.initialize());
app.use(passport.session());
//Security middleware that prevents certain types of requests
app.use(helmet());
//Logs all http requests to console
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }) );
// curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
// curl -v http://127.0.0.1:3000/?access_token=123456789
app.use('/graphql',
  passport.authenticate('bearer', { session: false }),
  graphqlExpress({ schema })
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${PORT}/graphiql`
  )
);
