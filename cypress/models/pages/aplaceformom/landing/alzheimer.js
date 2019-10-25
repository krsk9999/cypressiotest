import basePage from "../../basePage.js";

class alzheimer extends basePage {
	constructor() {
		super();
		this.location = "#location_identifier";
		this.name = "#full_name";
		this.email = "#email";
		this.phone = "#phone_number";
		this.submit = "form button[type='submit']";
	}
}

export default alzheimer;
