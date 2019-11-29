import cDot from "../../../models/pages/aplaceformom/cDot/cDotE.js";
import cDotTY from "../../../models/pages/aplaceformom/cDot/cDotTYE.js";
var moment = require('moment');
moment().format();

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
		let navigationUrl;
		let dynamicLocationData;

		//Variables
		let location = Cypress.env('location') || 'New York, NY';
		let dateF = moment();
		let name = `testdonotcall${dateF.valueOf()}` || Cypress.env('name');
		let email =
			`automation${dateF.valueOf()}@aplaceformom.com` ||
			Cypress.env('email');
		let phone = Cypress.env('phone') || '(555) 555-5555';

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
				navigationUrl = `${url}${variant}`;
			});

			cy.fixture("dynamicLocations.json").then(d => {
				dynamicLocationData = d
			})

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

			cy.sqlServer({domain : url, email : email}).then($result => {
				expect($result.filter(p => p.source_id == sourceId && p.address == email).length > 0, 'Lead Stored in Database?').to.be.true;
				cy.log($result.filter(p => p.source_id == sourceId && p.address == email));
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

		it("Validate Dynamic Locations First Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let first = `${navigationUrl}${dynamicLocationData.first.queryString}`;
			
			//Expected Values
			let firstLocation = dynamicLocationData.first.expectedLocation;
			cy.navigate(first, null);
			cy.get('#location_identifier').should("have.value", firstLocation);
		});

		it("Validate Dynamic Locations Second Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let second = `${navigationUrl}${dynamicLocationData.second.queryString}`;
			
			//Expected Values
			let secondLocation = dynamicLocationData.second.expectedLocation;

			cy.navigate(second, null);
			cy.get('#location_identifier').should("have.value", secondLocation);
			
		});

		it("Validate Dynamic Locations Third Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let third = `${navigationUrl}${dynamicLocationData.third.queryString}`;
			
			//Expected Values
			let thirdLocation = dynamicLocationData.third.expectedLocation;

			cy.navigate(third, null);
			cy.get('#location_identifier').should("have.value", thirdLocation);
			
		});

		it("Validate Dynamic Locations Fourth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fourth = `${navigationUrl}${dynamicLocationData.fourth.queryString}`;
			
			//Expected Values
			let fourthLocation = dynamicLocationData.fourth.expectedLocation;

			cy.navigate(fourth, null);
			cy.get('#location_identifier').should("have.value", fourthLocation);
			
		});

		it("Validate Dynamic Locations Fifth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fifth = `${navigationUrl}${dynamicLocationData.fifth.queryString}`;
			
			//Expected Values
			let fifthLocation = dynamicLocationData.fifth.expectedLocation;

			cy.navigate(fifth, null);
			cy.get('#location_identifier').should("have.value", fifthLocation);
			
		});

		it("Validate Dynamic Locations Sixth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let sixth = `${navigationUrl}${dynamicLocationData.sixth.queryString}`;
			
			//Expected Values
			let sixthLocation = dynamicLocationData.sixth.expectedLocation;

			cy.navigate(sixth, null);
			cy.get('#location_identifier').should("have.value", sixthLocation);
			
		});

		it("Validate Dynamic Locations Septh Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let septh = `${navigationUrl}${dynamicLocationData.septh.queryString}`;
			
			//Expected Values
			let septhLocation = dynamicLocationData.septh.expectedLocation;

			cy.navigate(septh, null);
			cy.get('#location_identifier').should("have.value", septhLocation);
			
		});

		it("Validate Dynamic Locations Eighth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let eighth = `${navigationUrl}${dynamicLocationData.eighth.queryString}`;
			
			//Expected Values
			let eighthLocation = dynamicLocationData.eighth.expectedLocation;

			cy.navigate(eighth, null);
			cy.get('#location_identifier').should("have.value", eighthLocation);
			
		});

		it("Validate Dynamic Locations Nineth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let nineth = `${navigationUrl}${dynamicLocationData.nineth.queryString}`;
			
			//Expected Values
			let ninethLocation = dynamicLocationData.nineth.expectedLocation;

			cy.navigate(nineth, null);
			cy.get('#location_identifier').should("have.value", ninethLocation);
		});
	});
});
