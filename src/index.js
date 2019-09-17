import $ from 'jquery';
import './css/base.scss';
import Hotel from './hotel';
import Orders from './orders';
import Rooms from './rooms';
import Customers from './customers';

let hotel, customers;

// import './images/turing-logo.png'
$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav li:first').addClass('tab-active');

$('.tabs-nav a').on('click', function(event){
  event.preventDefault();
  $('.tabs-nav li').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});

let usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(function(response){ 
         return response.json()
});

let roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(function(response){
         return response.json()
});

let bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(function(response){
         return response.json()
});

let roomServicesData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices').then(function(response){
         return response.json()
});

let combinedData = {"usersData":{},"roomsData":{}, "bookingsData":{}, "roomServicesData":{}};

Promise.all([usersData, roomsData, bookingsData, roomServicesData]).then(function(values){
    combinedData["usersData"] = values[0];
    combinedData["roomsData"] = values[1];
    combinedData["bookingsData"] = values[2];
    combinedData["roomServicesData"] = values[3];
    return combinedData;
});

setTimeout(function() {
  customers = new Customers(combinedData.usersData.users);
  hotel = new Hotel(customers, combinedData.roomsData.rooms, combinedData.bookingsData.bookings, combinedData.roomServicesData.roomServices);
  hotel.dailyBookings();
  hotel.dailyRoomInfo();
  hotel.createDateList();
  hotel.appendDateList();
  hotel.appendBookingInfo();
  hotel.createRoomTypeList();
}, 300)

$('.customers-search').keyup(() => {
  customers.customerSearch();
});

$('.customers-btn').click(() => {
  customers.customerSearchDisplay();
  hotel.appendUserRoomServices();
  hotel.appendCustomerBooking();
});

$('.customers-new-btn').click(() => {
  customers.addCustomer();
});

$('.main-date-list').change(() => {
  hotel.currentDate = $('#mySelect').val();
  hotel.dailyBookings();
  hotel.dailyRoomInfo();
  hotel.appendUserRoomServices();
  hotel.appendCustomerBooking();
  hotel.appendBookingInfo();
})

$('.rooms-btn-book').click(() => {
  hotel.appendRoomTypeList();
})

$('#room-type-list').change(() => {
  hotel.appendRoomList();
})