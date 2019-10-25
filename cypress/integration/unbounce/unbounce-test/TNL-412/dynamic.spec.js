describe("Dynamic Locations API", () => {
	context("Location Logic Validation", () => {
		let domainsData
        let dynamicLocationData
        let url

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
                domainsData = d
                url = domainsData.test.url
			})
			cy.fixture("dynamicLocations.json").then(d => {
				dynamicLocationData = d
			})
			cy.viewport("macbook-15")
		})

		it("Validate Dynamic Locations First Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let first = `${url}${dynamicLocationData.first.queryString}`;
			
			//Expected Values
			let firstLocation = dynamicLocationData.first.expectedLocation;
			cy.navigate(first, null);
			cy.get('#location_identifier').should("have.value", firstLocation);
		});

		it("Validate Dynamic Locations Second Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let second = `${url}${dynamicLocationData.second.queryString}`;
			
			//Expected Values
			let secondLocation = dynamicLocationData.second.expectedLocation;

			cy.navigate(second, null);
			cy.get('#location_identifier').should("have.value", secondLocation);
			
		});

		it("Validate Dynamic Locations Third Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let third = `${url}${dynamicLocationData.third.queryString}`;
			
			//Expected Values
			let thirdLocation = dynamicLocationData.third.expectedLocation;

			cy.navigate(third, null);
			cy.get('#location_identifier').should("have.value", thirdLocation);
			
		});

		it("Validate Dynamic Locations Fourth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fourth = `${url}${dynamicLocationData.fourth.queryString}`;
			
			//Expected Values
			let fourthLocation = dynamicLocationData.fourth.expectedLocation;

			cy.navigate(fourth, null);
			cy.get('#location_identifier').should("have.value", fourthLocation);
			
		});

		it("Validate Dynamic Locations Fifth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fifth = `${url}${dynamicLocationData.fifth.queryString}`;
			
			//Expected Values
			let fifthLocation = dynamicLocationData.fifth.expectedLocation;

			cy.navigate(fifth, null);
			cy.get('#location_identifier').should("have.value", fifthLocation);
			
		});

		it("Validate Dynamic Locations Sixth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let sixth = `${url}${dynamicLocationData.sixth.queryString}`;
			
			//Expected Values
			let sixthLocation = dynamicLocationData.sixth.expectedLocation;

			cy.navigate(sixth, null);
			cy.get('#location_identifier').should("have.value", sixthLocation);
			
		});

		it("Validate Dynamic Locations Septh Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let septh = `${url}${dynamicLocationData.septh.queryString}`;
			
			//Expected Values
			let septhLocation = dynamicLocationData.septh.expectedLocation;

			cy.navigate(septh, null);
			cy.get('#location_identifier').should("have.value", septhLocation);
			
		});

		it("Validate Dynamic Locations Eighth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let eighth = `${url}${dynamicLocationData.eighth.queryString}`;
			
			//Expected Values
			let eighthLocation = dynamicLocationData.eighth.expectedLocation;

			cy.navigate(eighth, null);
			cy.get('#location_identifier').should("have.value", eighthLocation);
			
		});

		it("Validate Dynamic Locations Nineth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let nineth = `${url}${dynamicLocationData.nineth.queryString}`;
			
			//Expected Values
			let ninethLocation = dynamicLocationData.nineth.expectedLocation;

			cy.navigate(nineth, null);
			cy.get('#location_identifier').should("have.value", ninethLocation);
		});

	})
})
