import casual from 'casual';

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    passenger: (root, args) => {
      return { firstName: args.firstName, lastName: args.lastName };
    },
  }),
  Passenger: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Flight: () => ({ flightNumber: () => casual.word, origin: () => casual.state, destination:  () => casual.state }),
  FlightPax: () =>({embarkation: () =>casual.state, debarkation: ()=>casual.state})
};

export default mocks;
