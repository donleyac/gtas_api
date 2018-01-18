import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionSequelize from 'connect-session-sequelize';
import Sequelize from 'sequelize';


const GRAPHQL_PORT = 3000;
const app = express();
const SequelizeStore = sessionSequelize(session.Store);

app.use(helmet());
app.use(cookieParser());
// app.use(session({
//   secret: 'secret code',
//   store: new SequelizeStore({
//     db: db
//   }),
//   resave: false,
//   proxy: false
// }));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
