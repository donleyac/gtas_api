import {Passenger, Flight, FlightPax} from './connectors.js';
const resolvers = {
  Query: {
    passenger(_, args) {
      return Passenger.find({where: args});
    },
    allPassengers(_, args) {
      return Passenger.findAll();
    },
    flightPax(_,args) {
      return FlightPax.find({where: {passenger_id: args.passengerId, flight_id:args.flightId}});
    },
    allFlightPaxs(_, args) {
      return FlightPax.findAll();
    },
    allFlights(_,args) {
      return Flight.findAll();
    }
  },
  Passenger: {
    flightPaxs(passenger) {
      return FlightPax.findAll({where: {passenger_id: passenger.id}});
    }
  },
  Flight: {
    flightPaxs(flight) {
      return FlightPax.findAll({where: {flight_id: flight.id}});
    }
  },
  FlightPax: {
    flight(flightPax) {
      console.log(flightPax);
      return flightPax.getFlight();
    },
    passenger(flightPax) {
      return flightPax.getPassenger();
    }
  }
};


export default resolvers;
