import chai from 'chai';
import Rooms from '../src/rooms';
import BookingsData from './bookings-data.js';
import CustomerserviceData from './customerservice-data.js';
import RoomsData from './rooms-data.js';
import CustomersData from './customers-data.js';
import domUpdates from '../src/domUpdates.js';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

chai.spy.on(domUpdates, ['clearAvailableList', 'clearTypeList'], () => {});

describe('Rooms', function () {
  let rooms;
  beforeEach(() => {
  	rooms = new Rooms(RoomsData);
  });

 	it('should be a function', function () {
    expect(Rooms).to.be.a('function');
  })

 	it('should be able to append the room list', () => {
 		rooms.appendRoomList();
 		 expect(domUpdates.clearAvailableList).to.have.been.called(1);
 	})

 	it('should be able to append the room type list', () => {
 		rooms.appendRoomTypeList();
 		 expect(domUpdates.clearTypeList).to.have.been.called(1);
 	})

 	it('should be able to create the room type list', () => {
 		rooms.createRoomTypeList();
 		 expect(rooms.roomTypes.length).to.equal(4);
 	})
});