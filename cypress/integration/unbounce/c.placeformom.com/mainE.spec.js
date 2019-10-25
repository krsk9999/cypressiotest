import cDot from "../../../models/pages/aplaceformom/cDot/cDotE.js";
import cDotTY from "../../../models/pages/aplaceformom/cDot/cDotTYE.js";

describe("cDot main form validations", () => {
	context("Form Validations and Lead submissions variant 'E'", () => {
		let domainsData;
		let url;
		let variant;
		let bodyTag;
		let sourceId;
		let creativeId;
		let responseBody;
		let dataPaFormId;
		let dataPaFormType;
		let dataPaTechStack;
		let mainPage;
		let tyPage;
		let touUrl;
		let ppUrl;

		//ENV Variables
		let location = Cypress.env("location") || "New York, NY";
		let name = Cypress.env("name") || "testdotcall";
		let email = Cypress.env("email") || "testdotcall@aplaceformom.com";
		let phone = Cypress.env("phone") || "(555) 555-5555";

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d.cDot;
				url = domainsData.url;
				variant = domainsData.variants.e.url;
				bodyTag = domainsData.variants.e.bodyTag;
				sourceId = domainsData.variants.e.sourceId;
				creativeId = domainsData.variants.e.creativeId;
				dataPaFormId = domainsData.variants.e.dataPaFormid;
				dataPaFormType = domainsData.variants.e.dataPaFormtype;
				dataPaTechStack = domainsData.variants.e.dataPaTechstack;
				touUrl = domainsData.variants.e.touUrl;
				ppUrl = domainsData.variants.e.ppUrl;
			});

			mainPage = new cDot();
			tyPage = new cDotTY();
		});

		beforeEach(() => {
			cy.viewport("macbook-15");
		});

		it("Fields are required", () => {
			mainPage.visit(url + variant);

			cy.server();
			cy.route(
				"POST",
				"https://gw.aplaceformom.com/Prod/api/ws3/leads/v1"
			).as("leadSubmitRequest");

			//Page Elements
			mainPage.getLocationElement.as("location");
			mainPage.getNameElement.as("name");
			mainPage.getEmailElement.as("email");
			mainPage.getPhoneElement.as("phone");
			mainPage.getSubmitElement.as("submitBtn");

			//Validate no errors were triggered before submitting a lead
			cy.get("@location").should("not.have.class", "error");
			cy.get("@name").should("not.have.class", "error");
			cy.get("@email").should("not.have.class", "error");
			cy.get("@phone").should("not.have.class", "error");

			//Click submit without entering required data
			cy.get("@submitBtn").click();

			//Validate lead was not submitted and fields are marked as required
			cy.url().should("eq", url + variant);
			cy.get("@location").should("have.class", "error");
			cy.get("@name").should("have.class", "error");
			cy.get("@email").should("have.class", "error");
			cy.get("@phone").should("have.class", "error");

			//Entering Lead Data
			cy.get("@location").type(location);
			cy.get("@location").should("have.value", location);
			cy.get("@name").type(name);
			cy.get("@name").should("have.value", name);
			cy.get("@email").type(email);
			cy.get("@email").should("have.value", email);
			cy.get("@phone").type(phone);

			//Submitting Lead
			cy.get("@submitBtn").click();

			//Validate Lead was successfully sent
			cy.url().should("contain", "thank-you");
			cy.getCookie("leadsubmit").should("have.property", "value", "true");

			cy.wait("@leadSubmitRequest");

			//Assert on XHR
			cy.get("@leadSubmitRequest").then(function(xhr) {
				responseBody = JSON.parse(xhr.response.body);
				expect(xhr.status).to.eq(201);
				expect(responseBody.CreativeId).to.eq(creativeId);
				expect(responseBody.SourceId).to.eq(sourceId);
				cy.validateGoogleClientId(responseBody);
			});

			tyPage.getlocalOptionsElement.as("listings");

			cy.get("@listings").click();

			cy.url().should(
				"contain",
				".aplaceformom.com/assisted-living/washington/bellevue"
			);
		});

		it("Validate FDEs", () => {
			cy.navigate(url, variant);

			cy.get("body.lp-pom-body")
				.invoke("attr", "data-pa-sitetype")
				.should("eq", bodyTag);
			cy.get("form")
				.invoke("attr", "data-pa-formid")
				.should("eq", dataPaFormId);
			cy.get("form")
				.invoke("attr", "data-pa-formtype")
				.should("eq", dataPaFormType);
			cy.get("form")
				.invoke("attr", "data-pa-techstack")
				.should("eq", dataPaTechStack);
			cy.get("form")
				.invoke("attr", "data-pa-version")
				.then(date => {
					try {
						let d = new Date(date);
						expect(
							d instanceof Date && !isNaN(d),
							"Is a valid date?"
						).to.true;
					} catch (err) {
						expect.fail("Not a valid date");
					}
				});
		});

		it("Validate Therms of Use link", () => {
			cy.navigate(url, variant);

			cy.get(
				`a[href="clkn/https/www.aplaceformom.com/terms-of-use"]`
			).click();

			cy.url().should("eq", touUrl);
		});

		it("Validate Privacy Policy link", () => {
			cy.navigate(url, variant);

			cy.get(`a[href="clkn/https/www.aplaceformom.com/privacy"]`).click();

			cy.url().should("eq", ppUrl);
		});
	});
});
