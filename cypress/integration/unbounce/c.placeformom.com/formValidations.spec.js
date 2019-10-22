describe("cDot form validations", () => {
	context("Setting up testing data", () => {
		let domainsData;
		let url;
		let variant;
		let bodyTag;
		let sourceId;
		let creativeId;
		let responseBody;

		//Variables
		let location = Cypress.env("location") || "New York, NY"
		let name = Cypress.env("name") || "testdotcall"
		let email = Cypress.env("email") || "testdotcall@aplaceformom.com"
		let phone = Cypress.env("phone") || "(555) 555-5555"

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d;
				url = domainsData.cDot.url;
				variant = domainsData.cDot.variants.e.url;
				bodyTag = domainsData.cDot.variants.e.bodyTag;
				sourceId = domainsData.cDot.variants.e.sourceId;
				creativeId = domainsData.cDot.variants.e.creativeId;
			})
			cy.viewport("macbook-15")
		})

		it.only("Fields are required cDot no Variant", () => {
			cy.navigate(url, variant)

			cy.server()
			cy.route(
				"POST",
				"https://gw.aplaceformom.com/Prod/api/ws3/leads/v1"
			).as("leadSubmitRequest")

			//Page Elements
			cy.get("#location_identifier").as("location")
			cy.get("#full_name").as("name")
			cy.get("#email").as("email")
			cy.get("#phone_number").as("phone")
			cy.get('form button[type="submit"]').as("submitBtn")

			cy.get("form")
				.invoke("attr", "data-pa-formid")
				.should("eq", "1110")
			cy.get("form")
				.invoke("attr", "data-pa-formtype")
				.should("eq", "One step")

			//Validate no errors were triggered before submitting a lead
			cy.get("@location").should("not.have.class", "error")
			cy.get("@name").should("not.have.class", "error")
			cy.get("@email").should("not.have.class", "error")
			cy.get("@phone").should("not.have.class", "error")

			//Click submit without entering required data
			cy.get("@submitBtn").click()

			//Validate lead was not submitted and fields are marked as required
			cy.url().should("eq", url+variant)
			cy.get("@location").should("have.class", "error")
			cy.get("@name").should("have.class", "error")
			cy.get("@email").should("have.class", "error")
			cy.get("@phone").should("have.class", "error")

			//Entering Lead Data
			cy.get("@location").type(location)
			cy.get("@location").should("have.value", location)
			cy.get("@name").type(name)
			cy.get("@name").should("have.value", name)
			cy.get("@email").type(email)
			cy.get("@email").should("have.value", email)
			cy.get("@phone").type(phone)

			//Submitting Lead
			cy.get("@submitBtn").click()

			//Validate Lead was successfully sent
			cy.url().should("contain", "thank-you")
			cy.getCookie("leadsubmit").should("have.property", "value", "true")

			cy.wait("@leadSubmitRequest")

			//Assert on XHR
			cy.get("@leadSubmitRequest").then(function(xhr) {
				responseBody = JSON.parse(xhr.response.body)
				expect(xhr.status).to.eq(201)
				expect(responseBody.CreativeId).to.eq(creativeId)
				expect(responseBody.SourceId).to.eq(sourceId)
			})

			cy.get('.thank-you-view a[href*="aplaceformom"]').as('listings');
			cy.get('@listings').invoke("attr", "href").should("eq","//www.aplaceformom.com/assisted-living/Washington/Bellevue");
		})

		it("Validate FDEs cDot no Variant", () => {
			cy.navigate(url, variant)

			cy.get("body.lp-pom-body")
				.invoke("attr", "data-pa-sitetype")
				.should("eq", bodyTag)
			cy.get("form")
				.invoke("attr", "data-pa-formid")
				.should("eq", "1110")
			cy.get("form")
				.invoke("attr", "data-pa-formtype")
				.should("eq", "One step")
		})

	})
})
