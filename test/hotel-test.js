import chai from 'chai';
import Hotel from '../src/hotel.js';
import Rooms from '../src/rooms';
import Customers from '../src/customers';
import BookingsData from './bookings-data.js';
import CustomerserviceData from './customerservice-data.js';
import RoomsData from './rooms-data.js';
import CustomersData from './customers-data.js';
import domUpdates from '../src/domUpdates.js';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

chai.spy.on(domUpdates, ['appendDailyBookings', 'clearDailyBookings', 'appendAvailableRooms', 'appendDailyRevenue', 'clearDailyServices', 'appendEmptyServices', 'appendDailyServices', 'clearCustomerServices', 'appendServicesCost', 'clearBookings', 'appendBookings', 'addBookingAttribute', 'appendBookingHistory', 'appendCurrentBooking', 'showSelectButton', 'showUpgradeButton', 'hideRoomSelection'], () => {});

describe('Hotel', function () {
  let hotel;
  let rooms;
  let customers;
  beforeEach(() => {
  	rooms = new Rooms(RoomsData);
  	customers = new Customers(CustomersData);
    hotel = new Hotel(customers, rooms, BookingsData, CustomerserviceData);
  });

  it('should be a function', function () {
    expect(Hotel).to.be.a('function');
  })

  it('should be able to calculate the daily bookings', () => {
  	hotel.calculateDailyBookings();
  	expect(domUpdates.clearDailyBookings).to.have.been.called(1);
  	expect(domUpdates.appendDailyBookings).to.have.been.called(12);
  	expect(domUpdates.appendAvailableRooms).to.have.been.called(38);
  	expect(hotel.dailyRevenue.toFixed(2)).to.eql('3609.44');
  	expect(hotel.availableRooms).to.equal(38);
  	expect(hotel.occupiedPercentage).to.equal(24);
  	expect(rooms.bookedRoomNumbers.length).to.equal(12);
  })

  it('should be able to calculate daily services', () => {
  	hotel.calculateDailyServices();
  	expect(domUpdates.clearDailyServices).to.have.been.called(1);
  	expect(domUpdates.appendEmptyServices).to.have.been.called(1);
  	expect(domUpdates.appendDailyRevenue).to.have.been.called(2);
  	expect(hotel.dailyRevenue).to.equal(0);
  })

  it('should be able to create a list of dates', () => {
  	hotel.createDateList();
  	expect(hotel.dateList.length).to.equal(101);
  })

  it('should be able to calculate and append user room services', () => {
  	hotel.appendUserRoomServices();
  	expect(domUpdates.clearCustomerServices).to.have.been.called(1);
  	expect(domUpdates.clearDailyServices).to.have.been.called(1);
  	expect(hotel.dailyTotal).to.equal(0);
  	expect(hotel.customerTotal).to.equal(0);
  })

  it('should be able to append booking information', () => {
  	hotel.appendBookingInfo();
   	expect(domUpdates.clearBookings).to.have.been.called(1);
  	expect(domUpdates.appendBookings).to.have.been.called(1);
  	expect(hotel.popularDate).to.equal('2019/10/28');
  	expect(hotel.unpopularDate).to.equal('2019/07/23');
  	expect(hotel.maxDates).to.equal(27);
  	expect(hotel.minDates).to.equal(10);
  })

  it('should be able to append customer booking information', () => {
    hotel.appendBookingInfo();
    expect(domUpdates.clearBookings).to.have.been.called(1);
    expect(domUpdates.addBookingAttribute).to.have.been.called(1);
  })

  it('should be able to book room', () => {
    hotel.bookRoom();
    expect(domUpdates.hideRoomSelection).to.have.been.called(1);
  })
});