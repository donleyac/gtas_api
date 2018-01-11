const resolvers = {
  Query: {
    passenger(root, args) {
      return { id: 1, firstName: 'Hello', lastName: 'World' };
    },
    allPassengers() {
      return [{ id: 1, firstName: 'Hello', lastName: 'World' }];
    }
  },
  Passenger: {
    flightPaxs(passenger) {
      return [
        { id: 1, embarkation: 'IAD', debarkation: 'DCA' },
        { id: 2, embarkation: 'BWI', debarkation: 'MIA' }
      ];
    }
  },
  Flight: {
    flightPaxs(flight) {
      return [
        { id: 1, embarkation: 'IAD', debarkation: 'DCA'},
        { id: 2, embarkation: 'BWI', debarkation: 'MIA' }
      ];
    }
  },
  FlightPax: {
    flight(flightpax) {
      return {id: 1, flightNumber: 'ABC', origin:'IAD', destination: 'MIA'}
    },
    passenger(flightpax) {
      return {id: 1, firstName: John, lastName: Doe}
    }
  }
};

export default resolvers;
