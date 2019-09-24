describe("iDot form validations", () => {
	context("Setting up testing data", () => {
		let domainsData

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d
			})
			cy.viewport("macbook-15")
		})

		it("Fields are required iDot variant j", () => {
			let url = domainsData.iDot.url
			let variant = domainsData.iDot.variants.j.url;

			cy.navigate(url, variant)

			//Page Elements
			cy.get('#location_identifier').as('location')	
			cy.get('#location_identifier+label').as('locationError')	
			cy.get('button.form-submit-btn').first().as('submitBtn')
		
			//Validate no errors were triggered before submitting a lead
			cy.get("@location").should("not.have.class","error");
			cy.get("@locationError").invoke('val').should("not.have.length")	
			
			//Click submit without entering required data
			cy.get("@submitBtn").click()

			//Validate lead was not submitted and fields are marked as required
			cy.url().should("eq", `${url}${variant}`);
			cy.get("@location").should("have.class","error");
		})


	})
})
