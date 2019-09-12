import $ from 'jquery';
import './css/base.scss';
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
    console.log(combinedData)
    return combinedData;
});

