import chai from 'chai';
import Customers from '../src/customers';
import BookingsData from './bookings-data.js';
import CustomerserviceData from './customerservice-data.js';
import RoomsData from './rooms-data.js';
import CustomersData from './customers-data.js';
import domUpdates from '../src/domUpdates.js';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

chai.spy.on(domUpdates, ['clearCustomerList', 'appendCustomerName', 'appendUserInfo'], () => {});

describe('Customers', function () {
  let customers;
  beforeEach(() => {
  	customers = new Customers(CustomersData);
  });

  it('should be a function', function () {
    expect(Customers).to.be.a('function');
  })

});