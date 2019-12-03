import basePage from "../basePage.js";

class mDot extends basePage {
	constructor() {
		super();
		this.location = "#location_identifier";
		this.name = "#full_name";
		this.email = "#email";
		this.phone = "#phone_number";
		this.nextButton = "form button[type='submit']";
		this.submit = "form button[type='submit']";
	}

	get getNextElement() {
		if (this.nextButton) {
			return cy.get(this.nextButton).as("nextBtn");
		} else {
			throw new Error(
				"No selector provided to get a next button element"
			);
		}
	}
}

export default mDot;
