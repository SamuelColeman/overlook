import chai from 'chai';
import Customers from '../src/customers';
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

  it('should be able to search for a customer', () => {
 		customers.customerSearch();
 		 expect(domUpdates.clearCustomerList).to.have.been.called(1);
 	})

 	it('should be able to add a customer', () => {
 		customers.addCustomer();
 		expect(domUpdates.appendUserInfo).to.have.been.called(1);
 		expect(customers.currentCustomer).to.equal({});
 	})
});