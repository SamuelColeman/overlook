import $ from 'jquery';
import domUpdates from "./domUpdates";

class Hotel {
	constructor(customersData, roomsData, bookingsData, roomServicesData) {
		this.customersData = customersData;
		this.roomsData = roomsData;
		this.bookingsData = bookingsData;
		this.roomServicesData = roomServicesData;
		this.currentCustomer = {};
		this.currentDate = "2019/10/19";
	}

	customerSearch() {
	  let searchInput = $('.customers-search').val().toUpperCase();
	  let searchName = this.customersData.filter(customer => {
	    return (customer.name.toUpperCase().includes(searchInput));
	  })
  	searchName.map(customer => {
  		this.currentCustomer = customer;
    	domUpdates.appendUserInfo(customer);
  	})
	}

	addCustomer() {
		this.currentCustomer = {id: this.customersData.length, name: $('.customers-search').val().toUpperCase()};
		domUpdates.appendUserInfo(this.currentCustomer)
	}

	dailyBookings() {
		let currentBookings = this.bookingsData.filter(booking => {
	    return (booking.date.toUpperCase().includes(this.currentDate));
	  })
  	currentBookings.map(booking => {
  		$('.main-bookings-date').text(`Rooms Booked for ${this.currentDate}:`);
  		$('.main-bookings-room').append(`  ${booking.roomNumber}  `);
  	})
	}

	dailyRoomServices() {

	}
}

export default Hotel;