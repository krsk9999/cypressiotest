class alzheimerTY {
	constructor() {
		this.localOptions = "#lp-pom-button-80";
	}

	get getlocalOptionsElement() {
		if (this.localOptions) {
			return cy.get(this.localOptions).as("locationBtn");
		} else {
			throw new Error(
				"No selector provided to get the show me my listings button"
			);
		}
	}
}

export default alzheimerTY;
