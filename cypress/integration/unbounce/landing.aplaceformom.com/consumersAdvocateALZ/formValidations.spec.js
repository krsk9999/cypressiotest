import alzheimerPage from "../../../../models/pages/aplaceformom/landing/alzheimer.js";
import alzheimerTYPage from "../../../../models/pages/aplaceformom/landing/alzheimerTY.js";

describe("Consumers Advocate ALZ", () => {
	context("Form Validations and Lead submissions", () => {
		let domainsData;
		let mainPage;
		let tyPage;
		let location = Cypress.env("location");
		let name = Cypress.env("name");
		let phone = Cypress.env("phone");
		let email = Cypress.env("email");
		let url, variant, touUrl, ppUrl;

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d;
				url = domainsData.landingConsumersAdvocateALZ.url;
				variant =
					domainsData.landingConsumersAdvocateALZ.variants.a.url;
				touUrl =
					domainsData.landingConsumersAdvocateALZ.variants.a.touUrl;
				ppUrl =
					domainsData.landingConsumersAdvocateALZ.variants.a.ppUrl;
			});
		});

		beforeEach(() => {
			cy.viewport("macbook-15");
		});

		it("Validate Therms of Use link", () => {
			cy.navigate(url, variant);

			cy.get(
				`a[href="clkn/https/www.alzheimers.net/terms-of-use/"]`
			).click();

			cy.url().should("eq", touUrl);
		});

		it("Validate Privacy Policy link", () => {
			let url = domainsData.landingConsumersAdvocateALZ.url;
			let variant =
				domainsData.landingConsumersAdvocateALZ.variants.a.url;

			cy.navigate(url, variant);

			cy.get(
				`a[href="clkn/https/www.alzheimers.net/privacy-policy/"]`
			).click();

			cy.url().should("eq", ppUrl);
		});

		it("Fields are required variant 'a'", () => {
			let typUrl =
				domainsData.landingConsumersAdvocateALZ.variants.a.tyPage;
			let pagePhone =
				domainsData.landingConsumersAdvocateALZ.variants.a.phone;
			let fullUrl = url + variant;
			let bodyTag =
				domainsData.landingConsumersAdvocateALZ.variants.a.bodyTag;
			let responseBody;
			let sourceId =
				domainsData.landingConsumersAdvocateALZ.variants.a.sourceId;

			cy.server();
			cy.route(
				"POST",
				"https://gw.aplaceformom.com/Prod/api/ws3/leads/v1"
			).as("leadSubmitRequest");

			mainPage = new alzheimerPage();
			mainPage.visit(fullUrl);

			//Phone number
			cy.get("#lp-pom-text-13 p span")
				.as("phone")
				.should("exist");
			cy.get("@phone")
				.invoke("text")
				.then(text => {
					let rplPhone = text.replace(/\./g, "").trim();
					expect(rplPhone).to.contain(pagePhone);
				});

			//Body attribute validation
			cy.get("body")
				.invoke("attr", "data-pa-sitetype")
				.should("eq", bodyTag);

			//Page elements selection
			mainPage.getLocationElement
				.as("location")
				.should("not.have.class", "error");
			mainPage.getNameElement
				.as("name")
				.should("not.have.class", "error");
			mainPage.getEmailElement
				.as("email")
				.should("not.have.class", "error");
			mainPage.getPhoneElement
				.as("phone")
				.should("not.have.class", "error");
			mainPage.getSubmitElement.click();
			cy.url().should("eq", fullUrl);

			mainPage.getLocationElement.should("have.class", "error");
			mainPage.getNameElement.should("have.class", "error");
			mainPage.getEmailElement.should("have.class", "error");
			mainPage.getPhoneElement.should("have.class", "error");

			//Fill the Lead form
			mainPage.getLocationElement
				.type(location)
				.should("have.value", location);
			mainPage.getNameElement.type(name).should("have.value", name);
			mainPage.getEmailElement.type(email).should("have.value", email);
			mainPage.getPhoneElement.type(phone).should("have.value", phone);

			mainPage.getSubmitElement.click();

			cy.url().should("eq", typUrl);

			cy.wait("@leadSubmitRequest");

			//Assert on XHR
			cy.get("@leadSubmitRequest").then(function(xhr) {
				responseBody = JSON.parse(xhr.response.body);
				expect(xhr.status).to.eq(201);
				//expect(responseBody.CreativeId).to.eq("APFM|DT|Primary|R")
				expect(responseBody.SourceId).to.eq(sourceId);
			});

			tyPage = new alzheimerTYPage();
			tyPage.getlocalOptionsElement.click();
			cy.url().should(
				"eq",
				"https://www.alzheimers.net/find-dementia-care/"
			);
		});
	});
});
