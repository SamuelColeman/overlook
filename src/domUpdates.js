import $ from 'jquery';

export default {

// methods invoked in hotel
	clearDailyBookings() {
		$('.main-revenue').text('');
		$('.main-bookings-room').text('');
		$('.rooms-available').text('');
	},

	appendDailyBookings(booking, occupiedPercentage, availableRooms) {
		$('.main-bookings-text').text(`Rooms Booked:`);
  	$('.main-bookings-percent').text(`${occupiedPercentage}%`);
  	$('.main-bookings-room').append(`  ${booking.roomNumber}  `);
  	$('.main-bookings-header').text(`Rooms Available:`);
  	$('.main-bookings-available').text(`${availableRooms}`);
	},

	appendAvailableRooms(room) {
		$('.rooms-available-header').text('Rooms Available: ');
  	$('.rooms-available').append(`  ${room.number}  `);
	},

	appendDailyRevenue(revenue) {
		$('.main-revenue-header').text(`Daily Revenue:`);
		$('.main-revenue').text(`$${revenue.toFixed(2)}`)
	},

	clearDailyServices() {
		$('.orders-services-food').text('');
	},

	appendEmptyServices() {
		$('.orders-services-food').append(`None`);
	},

	appendDailyServices(service) {
		$('.orders-services-food').append(`  ${service.date}: ${service.food} $${service.totalCost}  `);
	},

	clearCustomerServices() {
		$('.orders-services-all').text('');
		$('.orders-services-daily').text('');
	},

	appendServicesCost(customerTotal, dailyTotal) {
		$('.orders-services-header').text('Customer All-Time Total: ')
	  $('.orders-services-all').append(`$${customerTotal.toFixed(2)}`);
	  $('.orders-services-customer').text('Daily Service Total: ')
	  $('.orders-services-daily').append(`$${dailyTotal}`);
	},

	clearBookings() {
		$('.rooms-most-booked-date').text('');
		$('.rooms-least-booked-date').text('');
	},

	appendBookings(popularDate, maxDates, unpopularDate, minDates) {
		$('.rooms-most-booked').text('Most Booked Date: ');
		$('.rooms-most-booked-date').append(`${popularDate}: ${maxDates}`);
		$('.rooms-least-booked').text('Least Booked Date: ');
		$('.rooms-least-booked-date').append(`${unpopularDate}: ${minDates}`);
	},

	addBookingAttribute() {
		$('.rooms-least-booked-date').attr('display', 'table-caption');
	},

	appendBookingHistory(booking) {
		$('.rooms-least-booked').text('Booking History: ');
		$('.rooms-least-booked-date').append(`  ${booking.date}: Room ${booking.roomNumber}  `);
	},

	appendCurrentBooking(booking) {
		$('.rooms-most-booked').text('Current Booking: ');
		$('.rooms-most-booked-date').append(`  ${booking.date}: Room ${booking.roomNumber}  `);
	},

	showSelectButton() {
		$('.rooms-btn-select').attr('hidden', true);
		$('.rooms-btn-upgrade').removeAttr('hidden');
	},

	showUpgradeButton() {
		$('.rooms-btn-upgrade').attr('hidden', true);
		$('.rooms-btn-select').removeAttr('hidden');
	},

	hideRoomSelection() {
		$('#typeSelect').attr('hidden', true);
		$('#roomSelect').attr('hidden', true);
		$('.rooms-btn-book').attr('hidden', true);
	},

// methods invoked in customer
	clearCustomerList() {
		$('#customer-list').text('');
	},

	appendCustomerName(customer) {
		$('.customers-name').text(`Overlook - ${customer.name}`)
	},

	appendUserInfo(customer) {
		$('.customers-name').text(`Overlook - ${customer.name}`)
	},

// methods invoked in rooms
	clearAvailableList() {
		$('#room-available-list').text('');
	},

	clearTypeList() {
		$('#room-type-list').text('');
	}
}