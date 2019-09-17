import $ from 'jquery';

class Rooms {
	constructor(data) {
		this.data = data;
		this.bookedRoomNumbers = [];
		this.roomTypes = [];
	}

	appendRoomList() {
		$('#room-available-list').text('');
		let $roomSelect = $(`<select></select>`).attr("id", "roomSelect");
		$('#room-available-list').removeAttr('hidden').append($roomSelect);
		this.data.filter(room => {
  	  if (!this.bookedRoomNumbers.includes(room.number) && $('#typeSelect').val() === room.roomType) {
  	  	let $room = $(`<option></option>`).attr("id", "room-element");
				$room.attr('value', room.number).text(`Room Number: ${room.number}, Bidet: ${room.bidet}, Number of Beds: ${room.numBeds}, Bed(s) Size: ${room.bedSize}, Cost Per Night: $${room.costPerNight}`);
				$roomSelect.append($room);
  	  }
  	})
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

	createRoomTypeList() {
		this.roomTypes = this.data.reduce((acc, room) => {
			if (!acc.includes(room.roomType)) {
				acc.push(room.roomType)
			}
			return acc
		},[])
	}
}

export default Rooms;