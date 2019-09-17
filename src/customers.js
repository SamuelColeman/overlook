import $ from 'jquery';

class Customers {
	constructor(data) {
		this.data = data;
		this.currentCustomer = {};
	}

	customerSearchDisplay() {
	 	this.data.filter(customer => {
	 		if (customer.name.toUpperCase().includes($('.customers-search').val().toUpperCase())) {
	 			 this.currentCustomer = customer;
    		$('.customers-name').text(`Overlook - ${customer.name}`)
	 		}
	  })
	}

	customerSearch() {
		$('#customer-list').text('')
		this.data.filter(customer => {
		  if (customer.name.toUpperCase().includes($('.customers-search').val().toUpperCase())) {
		   let $customerName = $(`<li></li>`).attr("id", "customer-list-element");
		   $customerName.text(customer.name);
		   $('#customer-list').append($customerName);
		  }
		})
  }

	addCustomer() {
		this.currentCustomer = {id: this.data.length + 1, name: $('.customers-search').val()};
		this.data.push(this.currentCustomer);
		domUpdates.appendUserInfo(this.currentCustomer);
	}
}

export default Customers;