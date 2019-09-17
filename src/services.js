import $ from 'jquery';
import domUpdates from "./domUpdates";

class Services {
	constructor(data) {
		this.data = data;
		this.dailyTotal = 0;
		this.customerTotal = 0;
		this.dailyRevenue = 0;
	}
}

export default Services;