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

	calculateDailyBookings() {
		domUpdates.clearDailyBookings();
		this.rooms.bookedRoomNumbers = [];
		this.dailyRevenue = 0;
		let currentBookings = this.bookingsData.filter(booking => {
	    return (booking.date.includes(this.currentDate));
	  })
	  this.availableRooms = 50 - currentBookings.length;
	  this.occupiedPercentage = (currentBookings.length / 50) * 100; 
  	currentBookings.map(booking => { 
  		this.rooms.bookedRoomNumbers.push(booking.roomNumber);
  		domUpdates.appendDailyBookings(booking, this.occupiedPercentage, this.availableRooms)
  		this.rooms.data.filter(room => {
  			if (room.number === booking.roomNumber) {
  				this.dailyRevenue += room.costPerNight
  			}
  		})
  	})
  	this.rooms.data.filter(room => {
  	  if (!this.rooms.bookedRoomNumbers.includes(room.number)) {
 				domUpdates.appendAvailableRooms(room);
  		}
  	})
  	domUpdates.appendDailyRevenue(this.dailyRevenue);
	}

	calculateDailyServices() {
		if (this.customers.currentCustomer.name === undefined) {
			domUpdates.clearDailyServices();
			let currentServices = this.roomServicesData.filter(service => {
		    return (service.date.includes(this.currentDate));
		  })
		  if (currentServices.length === 0) {
	  		domUpdates.appendEmptyServices();
		  }
	  	currentServices.map(service => {
	  		this.dailyRevenue += service.totalCost;
	  		domUpdates.appendDailyServices(service);
	  	})
	  	domUpdates.appendDailyRevenue(this.dailyRevenue);
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
		domUpdates.clearCustomerServices();
		if (this.customers.currentCustomer.name !== undefined) {
			domUpdates.clearDailyServices();
			let customerServices = this.roomServicesData.filter(service => {
				if (service.userID === this.customers.currentCustomer.id) {
					return service
				};
			})
			customerServices.map(service => {
				this.customerTotal += service.totalCost;
	  		domUpdates.appendDailyServices(service)
	  		if (service.date.includes(this.currentDate)) {
	  			this.dailyTotal += service.totalCost;
	  		} 
	  	})
			domUpdates.appendServicesCost(this.customerTotal, this.dailyTotal)
		}
	}

	appendBookingInfo() {
		if (this.customers.currentCustomer.name === undefined) {
			domUpdates.clearBookings();
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
			domUpdates.appendBookings(this.popularDate, this.maxDates, this.unpopularDate, this.minDates)
		}
	}

	appendCustomerBooking() {
		if (this.customers.currentCustomer.name !== undefined) {
			domUpdates.clearBookings();
			domUpdates.addBookingAttribute();
			this.bookingsData.filter(booking => {
				if (booking.userID === this.customers.currentCustomer.id) {
					domUpdates.appendBookingHistory(booking);
				}
				if (booking.userID === this.customers.currentCustomer.id && booking.date === this.currentDate) {
					domUpdates.appendCurrentBooking(booking);
				}
			})
			if ($('.rooms-most-booked-date').text() !== '') {
				domUpdates.showSelectButton();
			} else {
				domUpdates.showUpgradeButton();
			}
		}
	}

	bookRoom() {
		domUpdates.hideRoomSelection();
		let selectedRoom = this.rooms.data.filter(room => {
			if (room.number === parseInt($('#roomSelect').val())) {
				this.bookingsData.push({userID: this.customers.currentCustomer.id, date: this.currentDate, roomNumber: room.number});
			};
		})
	}
}

export default Hotel;