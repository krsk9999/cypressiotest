// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
/// <reference types="Cypress" />
import "cypress-wait-until"
import { createCipher } from "crypto"

Cypress.Commands.add("locationStepValidations", Uri => {
	//Page Elements
	cy.get('div.fg-step-1 input[name="location"]').as("location")
	cy.get("div.fg-step-1 button").as("submitBtn")
	cy.get("div.fg-step-1 div.input-container").as("inputContainer")

	//Validate no errors were triggered before submitting a lead
	cy.get("@inputContainer").should("not.have.class", "error")

	//Click submit without entering required data
	cy.get("@submitBtn").click()

	//Validate lead was not submitted and fields are marked as required
	cy.url().should("eq", Uri)
	cy.get("@inputContainer").should("have.class", "error")
})

Cypress.Commands.add("selectionsStepValidations", () => {
	let locationEl = "div.fg-step-1 input[name='location']"
	let submitBtnEl = "div.fg-step-1 button[type='button']"
	let locationError = "div.fg-step-1 div.flex-container>div.input-container"

	cy.get(locationError).should("not.have.class", "error")

	cy.get(submitBtnEl).as("submitBtn")
	cy.get(locationEl).as("location")

	cy.get("@submitBtn").click()

	cy.get(locationError).should("have.class", "error")
})

Cypress.Commands.add("personalInfoStepValidations", () => {})

Cypress.Commands.add("validateCommunityBuilder", () => {
	cy.server()

	//This is the post call we are interested in capturing
	cy.route(
		"POST",
		"https://unbounce-test.aplaceformom.com/fsg?pageId=5220db5e-a03b-4fde-afa0-11b52908682e&variant=a&lp-form-submit-method=ajax"
	).as("communityBuilder")

	cy.get("div.builder-container").should("be.visible")

	cy.wait("@communityBuilder")

	//Assert on XHR
	cy.get("@communityBuilder").then(function(xhr) {
		expect(xhr.status).to.eq(200)
	})
})

Cypress.Commands.add("navigate", (url, variant) => {
	let navUrl = url || null
	let navVariant = variant || null
	cy.clearLocalStorage()
	cy.clearCookies()
	if (navVariant) {
		cy.visit(`${navUrl}${navVariant}`)
	} else {
		cy.visit(`${navUrl}`)
	}
})

Cypress.Commands.add("LogIntoUnbounce", () => {
	try {
			let emailId = "#js_auth_email";
			let passId = "#js_auth_password";
			let rememberMe = "#remember-checkbox";
			let submitBtnId = "#login_btn";

			let ubUrl = Cypress.env("ubUrl");
			let ubUser = Cypress.env("ubUser");
			let ubPass = Cypress.env("ubPass");

			cy.navigate(ubUrl, null);

			cy.get(emailId)
				.should("be.visible")
				.should("be.enabled")
				.as("email")
				.type(ubUser);
			cy.get(passId)
				.should("be.visible")
				.should("be.enabled")
				.as("pass")
				.type(ubPass);
			cy.get(submitBtnId)
				.should("be.visible")
				.should("be.enabled")
				.as("submit")
				.click();

			//TODO
			if (false) {
				cy.get(rememberMe)
					.should("be.visible")
					.should("be.enabled")
					.as("remember");
			}
		} catch (error) {
		throw error
	}
})

Cypress.Commands.add("singleFormSubmit", () => {
	try {
		//Variables
		let location = Cypress.env("location") || "New York, NY"
		let name = Cypress.env("name") || "testdotcall"
		let email = Cypress.env("email") || "testdotcall@aplaceformom.com"
		let phone = Cypress.env("phone") || "(555) 555-5555"

		//Page Elements
		cy.get("#location_identifier").as("location")
		cy.get("#full_name").as("name")
		cy.get("#email").as("email")
		cy.get("#phone_number").as("phone")
		cy.get('form button[type="submit"]').as("submitBtn")

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
	} catch (error) {
		throw error
	}
})

Cypress.Commands.add("validateGoogleClientId", xhrResponseJson => {
	if (xhrResponseJson.CustomData[0].Key == "GoogleClientId") {
		expect(xhrResponseJson.CustomData[0].Value).to.not.equal('1')
		expect(xhrResponseJson.CustomData[0].Value).to.not.equal("")
	}else{
		expect(xhrResponseJson.CustomData[0].Key).to.equal('GoogleClientId')
	}
})
