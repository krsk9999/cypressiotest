describe("cDot form validations", () => {
	context("Setting up testing data", () => {
		let domainsData

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d
			})
			cy.viewport("macbook-15")
		})

		it("Fields are required cDot no Variant", () => {
			let url = domainsData.cDot.url
			let variant = null

			cy.navigate(url, variant)

			//Page Elements
			cy.get("#location_identifier").as("location")
			cy.get("#full_name").as("name")
			cy.get("#email").as("email")
			cy.get("#phone_number").as("phone")
			cy.get('form button[type="submit"]').as("submitBtn")

			cy.get('form').invoke('attr','data-pa-formid').should('eq','1110')
			cy.get('form').invoke('attr','data-pa-formtype').should('eq','One step')
			
			//Validate no errors were triggered before submitting a lead
			cy.get("@location").should("not.have.class","error");
			cy.get("@name").should("not.have.class","error");
			cy.get("@email").should("not.have.class","error");
			cy.get("@phone").should("not.have.class","error");
			
			//Click submit without entering required data
			cy.get("@submitBtn").click()

			//Validate lead was not submitted and fields are marked as required
			cy.url().should("eq", url);
			cy.get("@location").should("have.class","error");
			cy.get("@name").should("have.class","error");
			cy.get("@email").should("have.class","error");
			cy.get("@phone").should("have.class","error");
		})

		it("Validate FDEs cDot no Variant", () => {
			let url = domainsData.cDot.url
			let variant = null

			cy.navigate(url, variant)

			cy.get('form').invoke('attr','data-pa-formid').should('eq','1110')
			cy.get('form').invoke('attr','data-pa-formtype').should('eq','One step')
		})

		it("Lead Submission cDot no Variant", () => {
			let url = domainsData.cDot.url
			let variant = null

			cy.navigate(url, variant)
			cy.singleFormSubmit()
		})
	})
})
