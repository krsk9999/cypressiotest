import mobileDot from "../../../models/pages/aplaceformom/mobileDot/mobileDotA.js";
import mobileDotTY from "../../../models/pages/aplaceformom/mobileDot/mobileDotTYA.js";

describe("mobileDot form validations", () => {
	context("Form Validations and Lead submissions variant 'A'", () => {
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
		let aboutUs;
		let ppUrl;
		let touUrl;

		//Variables
		let location = Cypress.env("location") || "New York, NY";
		let name = Cypress.env("name") || "testdotcall";
		let email = Cypress.env("email") || "testdotcall@aplaceformom.com";
		let phone = Cypress.env("phone") || "(555) 555-5555";

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d.mobileDot;
				url = domainsData.url;
				variant = domainsData.variants.o.url;
				bodyTag = domainsData.variants.o.bodyTag;
				sourceId = domainsData.variants.o.sourceId;
				creativeId = domainsData.variants.o.creativeId;
				dataPaFormId = domainsData.variants.o.dataPaFormid;
				dataPaFormType = domainsData.variants.o.dataPaFormtype;
				dataPaTechStack = domainsData.variants.o.dataPaTechstack;
				aboutUs = domainsData.variants.o.aboutUs;
				ppUrl = domainsData.variants.o.ppUrl;
				touUrl = domainsData.variants.o.touUrl;
			});

			mainPage = new mobileDot();
			tyPage = new mobileDotTY();
		});

		beforeEach(() => {
			cy.viewport("iphone-6");
		});

		it("Fields are required", () => {
			mainPage.visit(url + variant);

			cy.server();
			cy.route(
				"POST",
				"https://gw.aplaceformom.com/Prod/api/ws3/leads/v1"
			).as("leadSubmitRequest");

			//First Step
			mainPage.getLocationElement.as("location");
			cy.get("@location").should("not.have.class", "error");
			mainPage.getNextElement.as("nextBtn");
			cy.get("@nextBtn").click();
			cy.url().should("eq", url + variant);
			cy.get("@location").should("have.class", "error");
			cy.get("#container_location_identifier label.error").should(
				"have.text",
				"Please enter a valid City & State, or Zip"
			);
			cy.get("@location").type(location);
			cy.get("@location").should("have.value", location);
            cy.get("@nextBtn").click();
            

            //Second Step
            cy.xpath('//span[contains(text(), "Family member")]').click()
            
            cy.xpath('//span[contains(text(), "Immediate need")]').click()

            cy.xpath('//span[contains(text(), "Yes")]').click()

			cy.get("@nextBtn").click();
			
			cy.pause();


			mainPage.getEmailElement.as("email");
			//cy.get("#location-hl").should("have.text", location);
			cy.get("@email").should("not.have.class", "error");
			cy.get("@nextBtn").click();
			cy.url().should("eq", url + variant);
			cy.get("@email").should("have.class", "error");
			cy.get("#error-messages").should("have.text", "Email is required");
			cy.get("@email").type("test.com");
			cy.get("@nextBtn").click();
			cy.get("#error-messages").should(
				"have.text",
				"Please enter a valid email address"
			);
			cy.get("@email")
				.clear()
				.type(email);
			cy.get("@email").should("have.value", email);
			cy.get("@nextBtn").click();

			//Third Step
			mainPage.getNameElement.as("name");
			mainPage.getPhoneElement.as("phone");
			mainPage.getSubmitElement.as("submitBtn");
			//cy.get("#location-hl").should("have.text", location);
			cy.get("@name").should("not.have.class", "error");
			cy.get("@phone").should("not.have.class", "error");
			cy.get("@submitBtn").click();
			cy.url().should("eq", url + variant);
			//Fields should be sorrounded in red
			cy.get("@name").should("have.class", "error");
			cy.get("@phone").should("have.class", "error");
			cy.get("#last-step-error-messages").should(
				"have.text",
				"Full Name & Phone Number are required"
			);

			cy.get("@phone").type(phone);
			cy.get("@submitBtn").click();
			cy.get("@phone").should("not.have.class", "error");
			cy.get("@name").should("have.class", "error");
			cy.get("#last-step-error-messages").should(
				"have.text",
				"Full Name is required"
			);
			cy.get("@phone").clear();

			cy.get("@name").type(name);
			cy.get("@name").should("have.value", name);
			cy.get("@submitBtn").click();
			cy.get("#last-step-error-messages").should(
				"have.text",
				"Phone Number is required"
			);
			cy.get("@phone").type("555");
			cy.get("#last-step-error-messages").should(
				"have.text",
				"Please specify a valid phone number"
			);
			cy.get("@phone")
				.clear()
				.type(phone);
			cy.get("@phone").should("have.value", phone);
			cy.get("@phone").should("not.have.class", "error");
			cy.get("@submitBtn").click();

			//Validate Lead was successfully sent
			cy.url().should("contain", "thank-you");
			cy.get("#lead-phone-span").should("have.text", "(555) 555-5555");
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

		it("Validate Privacy Policy link", () => {
			cy.navigate(url, variant);

			cy.get(`a[href="clkn/https/www.aplaceformom.com/privacy"]`)
				.first()
				.click();

			cy.url().should("eq", ppUrl);
		});

		it("Validate About Us link", () => {
			cy.navigate(url, variant);

			cy.get(`a[href="clkn/https/www.aplaceformom.com/about"]`)
				.first()
				.click();

			cy.url().should("eq", aboutUs);
		});
	});
});
