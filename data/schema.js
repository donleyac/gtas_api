import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers.js';
const typeDefs = `
type Query {
  passenger(firstName: String, lastName: String): Passenger
  allPassengers: [Passenger]
  apis(passengerId: Int, flightId: Int, refNumber: String): Apis
  allPnr: [Pnr]
  allFlights: [Flight]
}
type Passenger {
  id: Int
  firstName: String
  lastName: String
  apis: [Apis]
}
type Flight {
  id: Int
  flightNumber: String
  origin: String
  destination: String
  apis: [Apis]
}
type Pnr {
  id: Int
  recordLocator: String
  formOfPayment: String
  baggageWeight: Float
  totalBagCount: Int
  excessBagCount: Int
  passengers: [Passenger]
  flights: [Flight]
}
type Apis {
  id: Int
  passenger: Passenger
  passengerId: Int
  flight: Flight
  flightId: Int
  embarkation: String
  debarkation: String
  refNumber: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
