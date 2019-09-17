import $ from 'jquery';
import domUpdates from "./domUpdates";
import './css/base.scss';
import Hotel from './hotel';
import Rooms from './rooms';
import Customers from './customers';

let hotel, customers, rooms;

// tab functionality
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

// fetch data
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
  rooms = new Rooms(combinedData.roomsData.rooms);
  customers = new Customers(combinedData.usersData.users);
  hotel = new Hotel(customers, rooms, combinedData.bookingsData.bookings, combinedData.roomServicesData.roomServices);
  hotel.calculateDailyBookings();
  hotel.calculateDailyServices();
  hotel.createDateList();
  hotel.appendDateList();
  hotel.appendBookingInfo();
  rooms.createRoomTypeList();
}, 300)

// event listeners on customer tab
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
  hotel.calculateDailyBookings();
  hotel.calculateDailyServices();
  hotel.appendUserRoomServices();
  hotel.appendCustomerBooking();
  hotel.appendBookingInfo();
})

$('.rooms-btn-select').click(() => {
  rooms.appendRoomTypeList();
})

$('#room-type-list').change(() => {
  rooms.appendRoomList();
})

$('#room-available-list').change(() => {
  $('.rooms-btn-book').removeAttr("hidden");
})

$('.rooms-btn-book').click(() => {
  hotel.bookRoom();
  hotel.appendCustomerBooking();
  hotel.calculateDailyBookings()
})