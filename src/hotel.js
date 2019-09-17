import $ from 'jquery';
import domUpdates from "./domUpdates";

class Hotel {
	constructor(customers, roomsData, bookingsData, roomServicesData) {
		this.customers = customers;
		this.roomsData = roomsData;
		this.bookingsData = bookingsData;
		this.roomServicesData = roomServicesData;
		this.currentDate = "2019/10/31";
		this.availableRooms = 0;
		this.occupiedPercentage = 0;
		this.dailyRevenue = 0;
		this.dateList = [];
		this.dailyTotal = 0;
		this.customerTotal = 0;
		this.maxDates = 0;
		this.minDates = 100;
		this.popularDate = '';
		this.unpopularDate = '';
		this.bookedRoomNumbers = [];
		this.roomTypes = [];
	}

	dailyBookings() {
		this.bookedRoomNumbers = [];
		$('.main-bookings-room').text('');
		$('.rooms-available').text('');
		this.dailyRevenue = 0;
		let currentBookings = this.bookingsData.filter(booking => {
	    return (booking.date.includes(this.currentDate));
	  })
	  this.availableRooms = 50 - currentBookings.length;
	  this.occupiedPercentage = (currentBookings.length / 50) * 100; 
  	currentBookings.map(booking => { 
  		this.bookedRoomNumbers.push(booking.roomNumber);
  		$('.main-bookings-text').text(`Rooms Booked:`);
  		$('.main-bookings-percent').text(`${this.occupiedPercentage}%`);
  		$('.main-bookings-room').append(`  ${booking.roomNumber}  `);
  		$('.main-bookings-header').text(`Rooms Available:`);
  		$('.main-bookings-available').text(`${this.availableRooms}`);
  		this.roomsData.filter(room => {
  			if (room.number === booking.roomNumber) {
  				this.dailyRevenue += room.costPerNight
  			}
  		})
  	})
  	this.roomsData.filter(room => {
  	  if (!this.bookedRoomNumbers.includes(room.number)) {
  	  	$('.rooms-available-header').text('Rooms Available: ');
  	  	$('.rooms-available').append(`  ${room.number}  `);
  		}
  	})
	}

	dailyRoomInfo() {
		if (this.customers.currentCustomer.name === undefined) {
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
		$('.orders-services-food').css("color", "black");
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
			$('.rooms-least-booked-date').text('');
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
				$('.rooms-btn-book').attr('hidden', true);
				$('.rooms-btn-upgrade').removeAttr('hidden');
			} else {
				$('.rooms-btn-upgrade').attr('hidden', true);
				$('.rooms-btn-book').removeAttr('hidden');
			}
		}
	}

	appendRoomTypeList() {
		$('#room-type-list').text('');
		let $typeSelect = $(`<select></select>`).attr("id", "typeSelect")
		$('#room-type-list').removeAttr('hidden').append($typeSelect);
		this.roomTypes.forEach(type => {
			let $roomType = $(`<option></option>`).attr("id", "room-type-element");
			$roomType.attr('value', type).text(type);
			$typeSelect.append($roomType)
		})
	}

	appendRoomList() {
		$('#room-available-list').text('');
		let $roomSelect = $(`<select></select>`).attr("id", "roomSelect");
		$('#room-available-list').removeAttr('hidden').append($roomSelect);
		this.roomsData.filter(room => {
  	  if (!this.bookedRoomNumbers.includes(room.number) && $('#typeSelect').val() === room.roomType) {
  	  	let $room = $(`<option></option>`).attr("id", "room-element");
				$room.attr('value', room).text(`Room Number: ${room.number}, Bidet: ${room.bidet}, Number of Beds: ${room.numBeds}, Bed(s) Size: ${room.bedSize}, Cost Per Night: $${room.costPerNight}`);
				$roomSelect.append($room);
  	  }
  	})
	}

	createRoomTypeList() {
		this.roomTypes = this.roomsData.reduce((acc, room) => {
			if (!acc.includes(room.roomType)) {
				acc.push(room.roomType)
			}
			return acc
		},[])
	}
}

export default Hotel;