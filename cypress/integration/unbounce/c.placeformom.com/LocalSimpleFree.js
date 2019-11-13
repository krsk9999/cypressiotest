describe("Local, Simple, Free new Landing Page", () => {
	context("Setting up testing data", () => {
		let domainsData
		let dynamicLocationData

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d
			})
			cy.fixture("dynamicLocations.json").then(d => {
				dynamicLocationData = d
			})
			cy.viewport("macbook-15")
		})

		it("Fields are required cDot no Variant", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url
			let fullUrl = url + variant

			cy.navigate(url, variant)

			//Page Elements
			cy.get("#location_identifier").as("location")
			cy.get("#full_name").as("name")
			cy.get("#email").as("email")
			cy.get("#phone_number").as("phone")
			cy.get('form button[type="submit"]').as("submitBtn")

			//Validate no errors were triggered before submitting a lead
			cy.get("@location").should("not.have.class", "error")
			cy.get("@name").should("not.have.class", "error")
			cy.get("@email").should("not.have.class", "error")
			cy.get("@phone").should("not.have.class", "error")

			//Click submit without entering required data
			cy.get("@submitBtn").click()

			//Validate lead was not submitted and fields are marked as required
			cy.url().should("eq", fullUrl)
			cy.get("@location").should("have.class", "error")
			cy.get("@name").should("have.class", "error")
			cy.get("@email").should("have.class", "error")
			cy.get("@phone").should("have.class", "error")
		})

		it("Lead Submission cDot no Variant", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url

			cy.navigate(url, variant)
			cy.singleFormSubmit()
		})

		it("Lead Submission cDot no Variant", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let phoneNumber = domainsData.localSimpleFree.variants.a.phone;
			let htmlPhone;

			cy.navigate(url, variant)

			//Page Elements
			cy.get('#lp-pom-text-15>p>span').invoke("text").then((text) => {
				let phone = text.replace(/-/g,"").replace(/s/g,"");
				expect(phone).to.contain(phoneNumber);
			})
			
		})


		it("Validate Dynamic Locations First Scenario variant a", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let first = `${navigationUrl}${dynamicLocationData.first.queryString}`;
			
			//Expected Values
			let firstLocation = dynamicLocationData.first.expectedLocation;
			cy.navigate(first, null);
			cy.get('#location_identifier').should("have.value", firstLocation);
		});

		it("Validate Dynamic Locations Second Scenario variant a", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let second = `${navigationUrl}${dynamicLocationData.second.queryString}`;
			
			//Expected Values
			let secondLocation = dynamicLocationData.second.expectedLocation;

			cy.navigate(second, null);
			cy.get('#location_identifier').should("have.value", secondLocation);
			
		});

		it("Validate Dynamic Locations Third Scenario variant a", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let third = `${navigationUrl}${dynamicLocationData.third.queryString}`;
			
			//Expected Values
			let thirdLocation = dynamicLocationData.third.expectedLocation;

			cy.navigate(third, null);
			cy.get('#location_identifier').should("have.value", thirdLocation);
			
		});

		it("Validate Dynamic Locations Fourth Scenario variant a", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fourth = `${navigationUrl}${dynamicLocationData.fourth.queryString}`;
			
			//Expected Values
			let fourthLocation = dynamicLocationData.fourth.expectedLocation;

			cy.navigate(fourth, null);
			cy.get('#location_identifier').should("have.value", fourthLocation);
			
		});

		it("Validate Dynamic Locations Fifth Scenario variant a", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fifth = `${navigationUrl}${dynamicLocationData.fifth.queryString}`;
			
			//Expected Values
			let fifthLocation = dynamicLocationData.fifth.expectedLocation;

			cy.navigate(fifth, null);
			cy.get('#location_identifier').should("have.value", fifthLocation);
			
		});

		it("Validate Dynamic Locations Sixth Scenario variant a", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let sixth = `${navigationUrl}${dynamicLocationData.sixth.queryString}`;
			
			//Expected Values
			let sixthLocation = dynamicLocationData.sixth.expectedLocation;

			cy.navigate(sixth, null);
			cy.get('#location_identifier').should("have.value", sixthLocation);
			
		});

		it("Validate Dynamic Locations Septh Scenario variant a", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let septh = `${navigationUrl}${dynamicLocationData.septh.queryString}`;
			
			//Expected Values
			let septhLocation = dynamicLocationData.septh.expectedLocation;

			cy.navigate(septh, null);
			cy.get('#location_identifier').should("have.value", septhLocation);
			
		});

		it("Validate Dynamic Locations Eighth Scenario variant a", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let eighth = `${navigationUrl}${dynamicLocationData.eighth.queryString}`;
			
			//Expected Values
			let eighthLocation = dynamicLocationData.eighth.expectedLocation;

			cy.navigate(eighth, null);
			cy.get('#location_identifier').should("have.value", eighthLocation);
			
		});

		it("Validate Dynamic Locations Nineth Scenario variant a", () => {
			let url = domainsData.localSimpleFree.url
			let variant = domainsData.localSimpleFree.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let nineth = `${navigationUrl}${dynamicLocationData.nineth.queryString}`;
			
			//Expected Values
			let ninethLocation = dynamicLocationData.nineth.expectedLocation;

			cy.navigate(nineth, null);
			cy.get('#location_identifier').should("have.value", ninethLocation);
		});

	})
})
