import Sequelize from 'sequelize';
import casual from 'casual';

const db = new Sequelize('gtas', 'root', 'admin', {
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
});

db.authenticate()
  .then(()=>{
    console.log('Connection has been established successfully.');
  })
  .catch(err=> {
    console.error('Unable to connect to the database:', err);
  });

const PassengerModel = db.define('passenger', {
  firstName: { type: Sequelize.STRING, field: 'first_name'},
  lastName: { type: Sequelize.STRING, field: 'last_name'},
});

const FlightModel = db.define('flight', {
  flightNumber: { type: Sequelize.STRING, field: 'full_flight_number'},
  origin: { type: Sequelize.STRING },
  destination: { type: Sequelize.STRING },
});

const ApisModel = db.define('flight_pax', {
  embarkation: { type: Sequelize.STRING },
  debarkation: { type: Sequelize.STRING },
  refNumber: {type: Sequelize.STRING, field: 'ref_number'},
  passengerId: {type: Sequelize.BIGINT, field: 'passenger_id'},
  flightId: {type: Sequelize.BIGINT, field: 'flight_id'}
});

const PnrModel = db.define('pnr', {
  recordLocator: {type: Sequelize.STRING, field: 'record_locator'},
  formOfPayment: {type: Sequelize.STRING, field: 'form_of_payment'},
  baggageWeight: {type: Sequelize.DOUBLE, field: 'baggage_weight'},
  totalBagCount: {type: Sequelize.INTEGER, field: 'total_bag_count'},
  excessBagCount: {type: Sequelize.INTEGER, field: 'bag_count'}
});

const PnrPassengerModel = db.define('pnr_passenger', {
  pnrId: {primaryKey: true, type: Sequelize.BIGINT, field: 'pnr_id', references: 'pnr'},
  passengerId: {primaryKey: true, type: Sequelize.BIGINT, field: 'passenger_id'}
})
const PnrFlightModel = db.define('pnr_flight', {
  pnrId: {primaryKey: true, type: Sequelize.BIGINT, field: 'pnr_id', references: 'pnr'},
  flightId: {primaryKey: true, type: Sequelize.BIGINT, field: 'flight_id'}
})


PassengerModel.hasMany(ApisModel);
FlightModel.hasMany(ApisModel);
ApisModel.belongsTo(PassengerModel);
ApisModel.belongsTo(FlightModel);

PassengerModel.hasMany(PnrPassengerModel);
PnrModel.hasMany(PnrPassengerModel);
PnrPassengerModel.belongsTo(PassengerModel);
PnrPassengerModel.belongsTo(PnrModel);

FlightModel.hasMany(PnrFlightModel);
PnrModel.hasMany(PnrFlightModel);
PnrFlightModel.belongsTo(FlightModel);
PnrFlightModel.belongsTo(PnrModel);

const Passenger = db.models.passenger;
const Flight = db.models.flight;
const Apis = db.models.flight_pax;
const Pnr = db.models.pnr;
const PnrPassenger = db.models.pnr_passenger;
const PnrFlight = db.models.pnr_flight;

export {Passenger, Apis, Flight, Pnr, PnrPassenger, PnrFlight};
