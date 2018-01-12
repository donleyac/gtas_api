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

const FlightPaxModel = db.define('flight_pax', {
  embarkation: { type: Sequelize.STRING },
  debarkation: { type: Sequelize.STRING },
});

PassengerModel.hasMany(FlightPaxModel);
FlightPaxModel.belongsTo(PassengerModel);
FlightModel.hasMany(FlightPaxModel);
FlightPaxModel.belongsTo(FlightModel);

const Passenger = db.models.passenger;
const Flight = db.models.flight;
const FlightPax = db.models.flight_pax;


export { Passenger, FlightPax, Flight};
