import $ from 'jquery';
import domUpdates from "./domUpdates";

class Hotel {
	constructor(customers, rooms, bookingsData, roomServicesData) {
		this.customers = customers;
		this.rooms = rooms;
		this.bookingsData = bookingsData;
		this.roomServicesData = roomServicesData;
		this.currentDate = "2019/10/31";
		this.dateList = [];
		this.dailyRevenue = 0;
		this.dailyTotal = 0;
		this.customerTotal = 0;
		this.maxDates = 0;
		this.minDates = 100;
		this.popularDate = '';
		this.unpopularDate = '';
		this.availableRooms = 0;
		this.occupiedPercentage = 0;
	}

	dailyBookings() {
		$('.main-revenue').text('');
		this.rooms.bookedRoomNumbers = [];
		$('.main-bookings-room').text('');
		$('.rooms-available').text('');
		this.dailyRevenue = 0;
		let currentBookings = this.bookingsData.filter(booking => {
	    return (booking.date.includes(this.currentDate));
	  })
	  this.availableRooms = 50 - currentBookings.length;
	  this.occupiedPercentage = (currentBookings.length / 50) * 100; 
  	currentBookings.map(booking => { 
  		this.rooms.bookedRoomNumbers.push(booking.roomNumber);
  		$('.main-bookings-text').text(`Rooms Booked:`);
  		$('.main-bookings-percent').text(`${this.occupiedPercentage}%`);
  		$('.main-bookings-room').append(`  ${booking.roomNumber}  `);
  		$('.main-bookings-header').text(`Rooms Available:`);
  		$('.main-bookings-available').text(`${this.availableRooms}`);
  		this.rooms.data.filter(room => {
  			if (room.number === booking.roomNumber) {
  				this.dailyRevenue += room.costPerNight
  			}
  		})
  	})
  	this.rooms.data.filter(room => {
  	  if (!this.rooms.bookedRoomNumbers.includes(room.number)) {
  	  	$('.rooms-available-header').text('Rooms Available: ');
  	  	$('.rooms-available').append(`  ${room.number}  `);
  		}
  	})
  	$('.main-revenue').text(`$${this.dailyRevenue.toFixed(2)}`)
	}

	dailyRoomInfo() {
		if (this.customers.currentCustomer.name === undefined) {
			$('.orders-services-food').text('');
			let currentServices = this.roomServicesData.filter(service => {
		    return (service.date.includes(this.currentDate));
		  })
		  if (currentServices.length === 0) {
	  		$('.orders-services-food').append(`None`);
		  }
	  	currentServices.map(service => {
	  		this.dailyRevenue += service.totalCost;
	  		$('.orders-services-food').append(`  ${service.food}  $${service.totalCost}  `);
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

	appendDateList() {
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
		if (this.customers.currentCustomer.name !== undefined) {
			$('.orders-services-food').text('');
			let customerServices = this.roomServicesData.filter(service => {
				if (service.userID === this.customers.currentCustomer.id) {
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

	appendBookingInfo() {
		if (this.customers.currentCustomer.name === undefined) {
			$('.rooms-most-booked-date').text('');
			$('.rooms-least-booked-date').text('');
			this.dateList.map(date => {
				let dates = this.bookingsData.reduce((acc, booking) => {
					if (date === booking.date) {
						acc.push(date);
					}
				return acc
				}, [])
				if (dates.length > this.maxDates) {
					this.maxDates = dates.length;
					this.popularDate = dates[0];
				}
				if (dates.length < this.minDates) {
					this.minDates = dates.length;
					this.unpopularDate = dates[0];
				}
			})
			$('.rooms-most-booked').text('Most Booked Date: ');
			$('.rooms-most-booked-date').append(`${this.popularDate}: ${this.maxDates}`);
			$('.rooms-least-booked').text('Least Booked Date: ');
			$('.rooms-least-booked-date').append(`${this.unpopularDate}: ${this.minDates}`);
		}
	}

	appendCustomerBooking() {
		if (this.customers.currentCustomer.name !== undefined) {
			$('.rooms-most-booked-date').text('');
			$('.rooms-least-booked-date').text('').attr('display', 'table-caption')
			this.bookingsData.filter(booking => {
				if (booking.userID === this.customers.currentCustomer.id) {
					$('.rooms-least-booked').text('Booking History: ');
					$('.rooms-least-booked-date').append(`  ${booking.date}: Room ${booking.roomNumber}  `);
				}
				$('.rooms-most-booked').text('Current Booking: ');
				if (booking.userID === this.customers.currentCustomer.id && booking.date === this.currentDate) {
					$('.rooms-most-booked-date').append(`  ${booking.date}: Room ${booking.roomNumber}  `);
				}
			})
			if ($('.rooms-most-booked-date').text() !== '') {
				$('.rooms-btn-select').attr('hidden', true);
				$('.rooms-btn-upgrade').removeAttr('hidden');
			} else {
				$('.rooms-btn-upgrade').attr('hidden', true);
				$('.rooms-btn-select').removeAttr('hidden');
			}
		}
	}

	bookRoom() {
		$('#typeSelect').attr('hidden', true);
		$('#roomSelect').attr('hidden', true);
		$('.rooms-btn-book').attr('hidden', true);
		let selectedRoom = this.rooms.data.filter(room => {
			if (room.number === parseInt($('#roomSelect').val())) {
				this.bookingsData.push({userID: this.customers.currentCustomer.id, date: this.currentDate, roomNumber: room.number});
			};
		})
	}
}

export default Hotel;