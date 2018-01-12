import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers.js';
const typeDefs = `
type Query {
  passenger(firstName: String, lastName: String): Passenger
  allPassengers: [Passenger]
  flightPax(passengerId: Int, flightId: Int): FlightPax
  allFlightPaxs: [FlightPax]
  allFlights: [Flight]
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
type Pnr {
  id: Int

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
