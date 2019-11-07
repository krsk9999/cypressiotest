import cDot from "../../../../models/pages/aplaceformom/cDot/unbounce/cDot.js";
import cDotTY from "../../../../models/pages/aplaceformom/cDot/unbounce/cDotTY.js";

describe("cDot main form validations", () => {
	context("Form Validations and Lead submissions variant 'M'", () => {
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
		let phone;

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d.cDotJoanTBP;
				url = domainsData.url;
				variant = domainsData.variants.m.url;
				bodyTag = domainsData.variants.m.bodyTag;
				sourceId = domainsData.variants.m.sourceId;
				creativeId = domainsData.variants.m.creativeId;
				dataPaFormId = domainsData.variants.m.dataPaFormid;
				dataPaFormType = domainsData.variants.m.dataPaFormtype;
				dataPaTechStack = domainsData.variants.m.dataPaTechstack;
				touUrl = domainsData.variants.m.touUrl;
				ppUrl = domainsData.variants.m.ppUrl;
				phone = domainsData.variants.m.phone;
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

			//Step 1
			mainPage.getLocationElement.as("location");
			// cy.get("#lp-pom-text-76 p")
			// 	.invoke("text")
			// 	.then($p => {
			// 		expect(
			// 			$p
			// 				.replace(/[^\w\s]/gi, "")
			// 				.replace(/\n/g, "")
			// 				.replace(/\s/g, "")
			// 		).to.eq(phone);
			// 	});
			cy.url().should("eq", url + variant);
			cy.get("@location").should("not.have.class", "error");
			mainPage.getSubmitElement.as("submitBtn");
			cy.get("@submitBtn").click();
			//Error Message
			mainPage.getLocationErrorElement.should(
				"have.text",
				"Please enter a valid City & State, or Zip"
			);
			cy.get("@location").should("have.class", "error");
			cy.get("@location")
				.type(location)
				.should("have.value", location);
			cy.get("@submitBtn").click();

			//Step 2
			mainPage.getEmailElement.as("email");
			cy.url().should(
				"eq",
				"https://unbounce-test.aplaceformom.com/new-brand-experience-step-2/"
			);
			cy.get("@email").should("not.have.class", "error");
			mainPage.getSubmitElement.as("submitBtn");
			cy.get("@submitBtn").click();
			cy.get("#container_email label.error")
				.as("errorMessageS2")
				.should("have.text", "Please enter a valid email address");
			cy.get("@email").should("have.class", "error");

			cy.get("@email").type("kenneth.ramirez");
			cy.get("@submitBtn").click();
			cy.get("@errorMessageS2").should(
				"have.text",
				"Please enter a valid email address"
			);
			cy.get("@email").should("have.class", "error");

			cy.get("@email")
				.clear()
				.type(email)
				.should("have.value", email);
			cy.get("@submitBtn").click();

			//Step 3
			mainPage.getSelectionsElement.as("selections");
			cy.get("@selections")
				.get("select#timeline")
				.as("timeLine");
			cy.get("@timeLine").select("within 60 days");
			cy.get("@selections")
				.get("select#room_type")
				.as("roomType");
			cy.get("@roomType").select("private one bedroom");
			cy.get("@selections")
				.get("select#budget")
				.as("budget");
			cy.get("@budget").select("luxury");
			cy.get("@submitBtn").click();

			//Community Builder
			cy.get("div#lp-pom-root-color-overlay").should("exist");
			//TODO include cards validations for community builder

			//Step 4
			mainPage.getNameElement.as("name");
			mainPage.getPhoneElement.as("phone");

			cy.get("@name").should("not.have.class", "error");
			cy.get("@phone").should("not.have.class", "error");

			cy.get("@submitBtn").click();

			cy.get("@name").should("have.class", "error");
			cy.get("@phone").should("have.class", "error");

			cy.get("#container_full_name label.error")
				.as("nameError")
				.should("have.text", "Full Name is required");

			cy.get("#container_phone_number label.error")
				.as("phoneError")
				.should(
					"have.text",
					"Please enter a valid 10 digit phone number"
				);

			cy.get("@name")
				.type(name)
				.should("have.value", name);

			cy.get("@phoneError").should(
				"have.text",
				"Please enter a valid 10 digit phone number"
			);

			cy.get("@phone").type(phone);

			cy.get("@name").should("not.have.class", "error");
			cy.get("@phone").should("not.have.class", "error");

			cy.get("@submitBtn").click();

			//Validate Lead was successfully sent
			cy.url().should("contain", "thank-you");
			cy.getCookie("leadsubmit").should("have.property", "value", "true");

			cy.wait("@leadSubmitRequest");

			//Assert on XHR
			cy.get("@leadSubmitRequest").then(function(xhr) {
				responseBody = JSON.parse(xhr.response.body);
				expect(xhr.status).to.eq(201);
				//expect(responseBody.CreativeId).to.eq(creativeId);
				expect(responseBody.SourceId).to.eq(sourceId);
				cy.validateGoogleClientId(responseBody);
			});
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

		it("Validate Privacy Policy link", () => {
			cy.navigate(
				"https://unbounce-test.aplaceformom.com/new-brand-experience-step-4/"
			);

			cy.get(`a[href="clkn/https/www.aplaceformom.com/privacy"]`).should(
				"exist"
			);
		});
	});
});
