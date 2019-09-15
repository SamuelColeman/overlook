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
		this.dailyTotal = 0;
		this.customerTotal = 0;
	}

	customerSearchDisplay() {
	 	this.customersData.filter(customer => {
	 		if (customer.name.toUpperCase().includes($('.customers-search').val().toUpperCase())) {
	 			 this.currentCustomer = customer;
    		$('.customers-name').text(`Overlook - ${customer.name}`)
	 		}
	  })
	}

	customerSearch() {
		$('#customer-list').text('')
		this.customersData.filter(customer => {
		  if (customer.name.toUpperCase().includes($('.customers-search').val().toUpperCase())) {
		   let $customerName = $(`<li></li>`).attr("id", "customer-list-element");
		   $customerName.text(customer.name);
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
		if (this.currentCustomer.name === undefined) {
			$('.orders-services-food').text('');
			let currentServices = this.roomServicesData.filter(service => {
		    return (service.date.includes(this.currentDate));
		  })
		  if (currentServices.length === 0) {
	  		$('.orders-services-food').append(`None`);
	  		$('.orders-services-food').css("color", "red");
		  }
	  	currentServices.map(service => {
	  		this.dailyRevenue += service.totalCost;
	  		$('.orders-services-food').append(`  ${service.food}  $${service.totalCost}  `);
	  		$('.orders-services-food').css("color", "black");
	  	})
	  	$('.main-revenue-header').text(`Daily Revenue:`);
	  	$('.main-revenue').text(`$${this.dailyRevenue.toFixed(2)}`);
  	}
	}

	createDateList() {
		this.bookingsData.filter(booking => {
			if (!this.dateList.includes(booking.date)) {
				this.dateList.push(booking.date)
			}
			return this.dateList.sort().reverse()
		})
	}

	appendDateLists() {
	  let $dateSelect = $('<select></select>').attr("id", "mySelect");
	  $('.main-date-list').append($dateSelect);
	  this.dateList.forEach(date => {
	    let $option = $('<option></option>');
	    $option.attr("value", date).text(date);
	    $dateSelect.append($option);
  	})
	}

	appendUserRoomServices() {
		this.dailyTotal = 0;
		this.customerTotal = 0;
		$('.orders-services-all').text('');
		$('.orders-services-daily').text('');
		$('.orders-services-food').css("color", "black");
		if (this.currentCustomer.name !== undefined) {
			$('.orders-services-food').text('');
			let customerServices = this.roomServicesData.filter(service => {
				if (service.userID === this.currentCustomer.id) {
					return service
				};
			})
			customerServices.map(service => {
				this.customerTotal += service.totalCost;
	  		$('.orders-services-food').append(`  ${service.date}: ${service.food} $${service.totalCost}  `);
	  		if (service.date.includes(this.currentDate)) {
	  			this.dailyTotal += service.totalCost;
	  		} 
	  	})
	  	$('.orders-services-header').text('Customer All-Time Total: ')
	  	$('.orders-services-all').append(`$${this.customerTotal.toFixed(2)}`);
	  	$('.orders-services-customer').text('Daily Service Total: ')
	  	$('.orders-services-daily').append(`$${this.dailyTotal}`);
		}
	}
}

export default Hotel;