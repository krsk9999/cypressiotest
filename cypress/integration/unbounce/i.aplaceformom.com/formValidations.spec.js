describe("iDot form validations", () => {
	context("Setting up testing data", () => {
		let domainsData

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d
			})
			cy.viewport("macbook-15")
		})

		it.only("Local. Simple. Free", () => {
			let url = domainsData.iDotLocalSimpleFree.url
			let variant = domainsData.iDotLocalSimpleFree.variants.a.url
			let location = Cypress.env("location")
			let bodyTag = domainsData.iDotLocalSimpleFree.variants.a.bodyTag
			let responseBody

			cy.server()

			//This is the post call we are interested in capturing
			cy.route(
				"POST",
				"https://gw.aplaceformom.com/Prod/api/ws3/leads/v1"
			).as("leadSubmitRequest")

			cy.navigate(url, variant)

			cy.locationStepValidations(url + variant)

			//cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)

			//Page Elements Step 1
			cy.get('div.fg-step-1 input[name="location"]').as("location")
			cy.get("div.fg-step-1 button").as("submitBtn")

			cy.get("@location").type(location)
			cy.get("@location").should("have.value", location)
			cy.get("@submitBtn").click()

			//Page Elements Step 2
			cy.get("div.fg-step-2 div.dropdown-input-container")
				.first()
				.as("timeline")
			cy.get("div.fg-step-2 div.dropdown-input-container.middle-item").as(
				"roomtype"
			)
			cy.get("div.fg-step-2 div.dropdown-input-container")
				.last()
				.as("budget")
			cy.get("div.fg-step-2 button").as("submitBtn")

			//Form Validations Step 2
			cy.get("@submitBtn")
				.last()
				.click()

			cy.get("@timeline").should("have.class", "error")
			cy.get("@roomtype").should("have.class", "error")
			cy.get("@budget").should("have.class", "error")

			cy.url().should("eq", `${url}${variant}`)

			cy.get("@timeline").click()
			cy.get("@timeline")
				.first()
				.find("ul.dropdown-menu li")
				.as("timelinemenu")
			cy.get("@timelinemenu").should("exist")
			cy.get("@timelinemenu")
				.first()
				.click()

			cy.get("@roomtype").click()
			cy.get("@roomtype")
				.first()
				.find("ul.dropdown-menu li")
				.as("roomtypemenu")
			cy.get("@roomtypemenu").should("exist")
			cy.get("@roomtypemenu")
				.last()
				.click()

			cy.get("@budget").click()
			cy.get("@budget")
				.first()
				.find("ul.dropdown-menu li")
				.as("budgetmenu")
			cy.get("@budgetmenu").should("exist")
			cy.get("@budgetmenu")
				.last()
				.click()

			cy.get("@timeline").should("not.have.class", "error")
			cy.get("@roomtype").should("not.have.class", "error")
			cy.get("@budget").should("not.have.class", "error")

			cy.get("@submitBtn").click()

			//Page Elements Step 3
			let name = Cypress.env("name")
			let email = Cypress.env("email")
			let phone = Cypress.env("phone")

			cy.get('div.fg-step-3 input[name="fullName"]').as("name")
			cy.get('div.fg-step-3 input[name="email"]').as("email")
			cy.get('div.fg-step-3 input[name="phoneNumber"]').as("phone")
			cy.get("div.fg-step-3 div.input-container:nth-child(2)").as(
				"namevalidator"
			)
			cy.get("div.fg-step-3 div.input-container:nth-child(3)").as(
				"emailvalidator"
			)
			cy.get("div.fg-step-3 div.input-container:nth-child(4)").as(
				"phonevalidator"
			)
			cy.get("div.fg-step-3 button").as("submitBtn")

			cy.get("@submitBtn").click()

			cy.get("@namevalidator").should("have.class", "error")
			cy.get("@emailvalidator").should("have.class", "error")
			cy.get("@phonevalidator").should("have.class", "error")

			cy.url().should("eq", `${url}${variant}`)

			cy.get("@name").type(name)
			cy.get("@name").should("have.value", name)
			cy.get("@email").type(email)
			cy.get("@email").should("have.value", email)
			cy.get("@phone").type(phone)
			cy.get("@phone").should("have.value", phone)

			cy.get("@namevalidator").should("not.have.class", "error")
			cy.get("@emailvalidator").should("not.have.class", "error")
			cy.get("@phonevalidator").should("not.have.class", "error")

			cy.get("@submitBtn").click()

			cy.wait("@leadSubmitRequest")

			//Assert on XHR
			cy.get("@leadSubmitRequest").then(function(xhr) {
				responseBody = JSON.parse(xhr.response.body)
				expect(xhr.status).to.eq(201)
				expect(responseBody.CreativeId).to.eq("APFM|DT|Primary|R")
				expect(responseBody.SourceId).to.eq("5666")
			})
		})

		it("Fields are required iDot variant j", () => {
			let url = domainsData.iDot.url
			let variant = domainsData.iDot.variants.j.url

			cy.navigate(url, variant)

			//Page Elements
			cy.get("#location_identifier").as("location")
			cy.get("#location_identifier+label").as("locationError")
			cy.get("button.form-submit-btn")
				.first()
				.as("submitBtn")

			//Validate no errors were triggered before submitting a lead
			cy.get("@location").should("not.have.class", "error")
			cy.get("@locationError")
				.invoke("val")
				.should("not.have.length")

			//Click submit without entering required data
			cy.get("@submitBtn").click()

			//Validate lead was not submitted and fields are marked as required
			cy.url().should("eq", `${url}${variant}`)
			cy.get("@location").should("have.class", "error")
		})
	})
})
