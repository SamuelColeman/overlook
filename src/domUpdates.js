import $ from 'jquery';

export default {

	appendUserInfo(customer) {
		$('.customers-name').text(customer.name)
	}
}