import $ from 'jquery';
import domUpdates from "./domUpdates";

class Hotel {
	constructor(customersData, roomsData, bookingsData, roomServicesData) {
		this.customersData = customersData;
		this.roomsData = roomsData;
		this.bookingsData = bookingsData;
		this.roomServicesData = roomServicesData;
		this.currentCustomer = {};
		this.currentDate = "2019/10/09";
		this.availableRooms = 0;
		this.occupiedPercentage = 0;
	}

	customerSearch() {
	  let searchInput = $('.customers-search').val().toUpperCase();
	  let searchName = this.customersData.filter(customer => {
	    return (customer.name.toUpperCase().includes(searchInput));
	  })
  	searchName.map(customer => {
  		this.currentCustomer = customer;
    	$('.customers-name').text(customer.name)
  	})
	}

	addCustomer() {
		this.currentCustomer = {id: this.customersData.length, name: $('.customers-search').val().toUpperCase()};
		domUpdates.appendUserInfo(this.currentCustomer)
	}

	dailyBookings() {
		let currentBookings = this.bookingsData.filter(booking => {
	    return (booking.date.includes(this.currentDate));
	  })
	  this.availableRooms = 50 - currentBookings.length;
	  this.occupiedPercentage = (currentBookings.length / 50) * 100; 
  	currentBookings.map(booking => {
  		$('.main-date').text(`${this.currentDate}`)
  		$('.main-bookings-text').text(`Rooms Booked:`);
  		$('.main-bookings-percent').text(`${this.occupiedPercentage}%`);
  		$('.main-bookings-room').append(`  ${booking.roomNumber}  `);
  		$('.main-bookings-header').text(`Rooms Available:`);
  		$('.main-bookings-available').text(`${this.availableRooms}`);
  	})
	}

	dailyRoomServices() {
		let currentServices = this.roomServicesData.filter(service => {
	    return (service.date.includes(this.currentDate));
	  })
  	currentServices.map(service => {
  		$('.orders-date').text(`${this.currentDate}`)
  		$('.orders-services-text').text(`Room Services:`);
  		$('.orders-services-food').append(`  ${service.food}:  $ ${service.totalCost}  `);
  	})
	}

	calculateDailyValues() {

	}
}

export default Hotel;