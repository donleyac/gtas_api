import {Passenger, Flight, Apis, Pnr, PnrPassenger, PnrFlight} from './connectors.js';
const resolvers = {
  Query: {
    passenger(_, args) {
      return Passenger.find({where: args});
    },
    allPassengers(_, args) {
      return Passenger.findAll();
    },
    apis(_,args) {
      return Apis.find({where: args});
    },
    allPnr(_,args) {
      return Pnr.findAll();
    },
    allFlights(_,args) {
      return Flight.findAll();
    }
  },
  Passenger: {
    apis(passenger) {
      return Apis.findAll({where: {passengerId: passenger.id}});
    }
  },
  Flight: {
    apis(flight) {
      return Apis.findAll({where: {flightId: flight.id}});
    }
  },
  Pnr: {
    passengers(pnr){
      let options = {
        where: {pnrId: pnr.id},
        include: [Passenger],
      }
      //Situation where include tablenames where provided as key names
      //This prevented mapping to Graphql
      return PnrPassenger.findAll(options).then(result=> {
        return result.map(elem=>{
          return elem.passenger.dataValues
        });
      });
    },
    flights(pnr){
      let options = {
        where: {pnrId: pnr.id},
        include: [Flight],
      }
      //Situation where include tablenames where provided as key names
      //This prevented mapping to Graphql
      return PnrFlight.findAll(options).then(result=> {
        return result.map(elem=>{
          return elem.flight.dataValues
        });
      });
    }
  },
  Apis: {
    flight(apis) {
      return apis.getFlight();
    },
    passenger(apis) {
      return apis.getPassenger();
    }
  }

};

export default resolvers;
