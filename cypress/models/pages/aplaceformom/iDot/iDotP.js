import basePage from "../../basePage.js";

class iDotP extends basePage {
	constructor() {
		super();
		this.location = "#location_identifier";
		this.name = "#full_name";
		this.email = "#email";
		this.phone = "#phone_number";
		this.nextButton = "form button[type='submit']";
		this.submit = "form button[type='submit']";
		this.selections = "form div.fields";
		this.locationError = "#container_location_identifier label.error";
		this.careType = "span.caretype-hl";
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

	get getLocationErrorElement() {
		if (this.locationError) {
			return cy.get(this.locationError).as("locationError");
		} else {
			throw new Error(
				"No selector provided to get a locationError element"
			);
		}
	}

	get getCareTypeElement() {
		if (this.careType) {
			return cy.get(this.careType).as("careType");
		} else {
			throw new Error(
				"No selector provided to get a careType element"
			);
		}
	}
}

export default iDotP;
