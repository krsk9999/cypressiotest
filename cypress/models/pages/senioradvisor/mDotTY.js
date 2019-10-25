class mDotTY {
	constructor() {
		this.localOptions = "#lp-pom-button-26";
	}

	get getlocalOptionsElement() {
		if (this.localOptions) {
			return cy.get(this.localOptions).as("locationBtn");
		} else {
			throw new Error(
				"No selector provided to get a next button element"
			);
		}
	}
}

export default mDotTY;
