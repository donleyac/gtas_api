import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';
import resolvers from './resolvers.js';
const typeDefs = `
type Query {
  passenger(firstName: String, lastName: String): Passenger
  allPassengers: [Passenger]
  getFortuneCookie: String # we'll use this later
}
type Passenger {
  id: Int
  firstName: String
  lastName: String
  flightPaxs: [FlightPax]
}
type Flight {
  id: Int
  flightNumber: String
  origin: String
  destination: String
  flightPaxs: [FlightPax]
}
type FlightPax {
  id: Int
  passenger: Passenger
  flight: Flight
  embarkation: String
  debarkation: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });


export default schema;
