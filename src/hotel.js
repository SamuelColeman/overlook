import $ from 'jquery';
import domUpdates from "./domUpdates";

class Hotel {
	constructor(customersData, roomsData, bookingsData, roomServicesData) {
		this.customersData = customersData;
		this.roomsData = roomsData;
		this.bookingsData = bookingsData;
		this.roomServicesData = roomServicesData;
		this.currentCustomer = {};
		this.currentDate = "2019/10/31";
		this.availableRooms = 0;
		this.occupiedPercentage = 0;
		this.dailyRevenue = 0;
		this.dateList = [];
	}

	customerSearchDisplay() {
	 	this.customersData.filter(customer => {
	 		if (customer.name.toUpperCase().includes($('.customers-search').val().toUpperCase())) {
	 			 this.currentCustomer = customer;
    		$('.customers-name').text(`Overlook - ${customer.name}`)
	 		}
	    // if (customer.name.toUpperCase().includes($('.customers-search').val().toUpperCase())) {
	    // 	let $customerName = $(`<li></li>`).attr("id", "customer-list-element")
	    // 	$customerName.text(customer.name)
	    // 	$('#customer-list').append($customerName);
	    // };
	  })
	}

	customerSearch() {
		$('#customer-list').text('')
		this.customersData.filter(customer => {
		  if (customer.name.toUpperCase().includes($('.customers-search').val().toUpperCase())) {
		   let $customerName = $(`<li></li>`).attr("id", "customer-list-element")
		   $customerName.text(customer.name)
		   $('#customer-list').append($customerName);
		  }
		})
  }

	addCustomer() {
		this.currentCustomer = {id: this.customersData.length, name: $('.customers-search').val()};
		domUpdates.appendUserInfo(this.currentCustomer)
	}

	dailyBookings() {
		$('.main-bookings-room').text('');
		this.dailyRevenue = 0;
		let currentBookings = this.bookingsData.filter(booking => {
	    return (booking.date.includes(this.currentDate));
	  })
	  this.availableRooms = 50 - currentBookings.length;
	  this.occupiedPercentage = (currentBookings.length / 50) * 100; 
  	currentBookings.map(booking => {
  		$('.main-bookings-text').text(`Rooms Booked:`);
  		$('.main-bookings-percent').text(`${this.occupiedPercentage}%`);
  		$('.main-bookings-room').append(`  ${booking.roomNumber}  `);
  		$('.main-bookings-header').text(`Rooms Available:`);
  		$('.main-bookings-available').text(`${this.availableRooms}`);
  		let roomRevenue = this.roomsData.filter(room => {
  			if (room.number === booking.roomNumber) {
  				this.dailyRevenue += room.costPerNight
  			}
  		})
  	})
	}

	dailyRoomInfo() {
		let currentServices = this.roomServicesData.filter(service => {
	    return (service.date.includes(this.currentDate));
	  })
  	currentServices.map(service => {
  		this.dailyRevenue += service.totalCost;
  		$('.orders-date').text(`${this.currentDate}`);
  		$('.orders-services-text').text(`Room Services:`);
  		$('.orders-services-food').append(`  ${service.food}:  $${service.totalCost}  `);
  	})
  	$('.main-revenue-header').text(`Daily Revenue:`);
  	$('.main-revenue').text(`$${this.dailyRevenue.toFixed(2)}`);
	}

	createDateList() {
		this.bookingsData.filter(booking => {
			if (!this.dateList.includes(booking.date)) {
				this.dateList.push(booking.date)
			}
			return this.dateList.sort().reverse()
		})
	}

	appendDateLists(element) {
	  let $dateSelect = $('<select></select>').attr("id", "mySelect");
	  $(element).append($dateSelect);
	  this.dateList.forEach(date => {
	    let $option = $('<option></option>');
	    $option.attr("value", date).text(date);
	    $dateSelect.append($option);
  	})
	}
}

export default Hotel;