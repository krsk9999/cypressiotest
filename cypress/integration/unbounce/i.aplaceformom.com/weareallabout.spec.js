import iDot from "../../../models/pages/aplaceformom/iDot/iDot.js";
import iDotTY from "../../../models/pages/aplaceformom/iDot/iDotTY.js";
var moment = require("moment");
moment().format();

describe("We are all about community", () => {
	context("Form Validations and Lead submissions", () => {
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
		let pagePhone;
		let selections;

		//Variables
		let location = Cypress.env("location") || "New York, NY";
		let dateF = moment();
		let name = `testdonotcall${dateF.valueOf()}` || Cypress.env("name");
		let email =
			`automation${dateF.valueOf()}@aplaceformom.com` ||
			Cypress.env("email");
		let phone = Cypress.env("phone") || "(555) 555-5555";

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d.iDotWAAAC;
				url = domainsData.url;
				variant = domainsData.variants.a.url;
				bodyTag = domainsData.variants.a.bodyTag;
				sourceId = domainsData.variants.a.sourceId;
				creativeId = domainsData.variants.a.creativeId;
				dataPaFormId = domainsData.variants.a.dataPaFormid;
				dataPaFormType = domainsData.variants.a.dataPaFormtype;
				dataPaTechStack = domainsData.variants.a.dataPaTechstack;
				touUrl = domainsData.variants.a.touUrl;
				ppUrl = domainsData.variants.a.ppUrl;
				pagePhone = domainsData.variants.a.phone;
				navigationUrl = `${url}${variant}`;
			});

			cy.fixture("dynamicLocations.json").then(d => {
				dynamicLocationData = d;
			});

			cy.fixture("betterPathSelections.json").then(d => {
				selections = d;
			});

			mainPage = new iDot();
			tyPage = new iDotTY();
		});

		beforeEach(() => {
			cy.viewport("macbook-15");
		});

		it.only("Fields are required", () => {
			mainPage.visit(url + variant);
			cy.screenshot();

			cy.server();
			cy.route(
				"POST",
				"https://gw.aplaceformom.com/Prod/api/ws3/leads/v1"
			).as("leadSubmitRequest");

			mainPage.getLocationElement.as("location");

			//Initial state
			cy.get("@location").should("not.have.class", "error");
			cy.get("div#lp-pom-text-13 span")
				.invoke("text")
				.then($text => {
					expect(
						$text
							.replace(/[^\w\s]/gi, "")
							.replace(/\n/g, "")
							.replace(/\s/g, "")
					).to.contain(pagePhone);
				});

			mainPage.getNextElement.as("nextBTN");

			//Validate Errors
			cy.get("@nextBTN").click();
			cy.get("@location").should("have.class", "error");

			//Entering Data
			cy.get("@location")
				.type(location)
				.should("have.value", location);

			cy.get("@nextBTN").click();

			cy.url().should(
				"contain",
				domainsData.variants.a.steps.stepOne.url
			);
			cy.screenshot();

			mainPage.getSelectionsElement.find("#timeline").as("timeline");
			mainPage.getSelectionsElement.find("#room_type").as("roomtype");
			mainPage.getSelectionsElement.find("#budget").as("budget");

			//Select dropdowns
			cy.get("@timeline").select(selections.timeLine.urgent);

			cy.get("@roomtype").select(selections.roomType.privateOneBedroom);

			cy.get("@budget").select(selections.budget.luxury);

			//Continue to step 2
			cy.get("@nextBTN").click();

			//Validate Community Builder
			cy.get(".builder-container").should("exist");

			//Step 2 Options
			cy.url().should(
				"contain",
				domainsData.variants.a.steps.stepTwo.url
			);
			cy.screenshot();

			//initial State
			mainPage.getNameElement.as("name");
			mainPage.getEmailElement.as("email");
			mainPage.getPhoneElement.as("phone");

			cy.get(".location-hl")
				.as("subheadline")
				.should("have.text", location);
			//cy.get('#caretype-hl').as('subheadline').should("have.text", location);

			cy.get("@name").should("not.have.class", "error");
			cy.get("@email").should("not.have.class", "error");
			cy.get("@phone").should("not.have.class", "error");

			//Validate required fields are highlighted in red
			cy.get("@nextBTN").click();

			cy.get("@name").should("have.class", "error");
			cy.get("@email").should("have.class", "error");
			cy.get("@phone").should("have.class", "error");

			//Entering data
			cy.get("@name")
				.type(name)
				.should("have.value", name);
			cy.get("@email")
				.type(email)
				.should("have.value", email);
			cy.get("@phone")
				.type(phone)
				.should("have.value", "(555) 555-5555");

			mainPage.getSubmitElement.click();

			//Validate Lead was successfully sent
			cy.url().should("contain", "thank-you");
			cy.screenshot();
			cy.getCookie("leadsubmit").should("have.property", "value", "true");

			cy.wait("@leadSubmitRequest");

			//Assert on XHR
			cy.get("@leadSubmitRequest").then(function(xhr) {
				responseBody = JSON.parse(xhr.response.body);
				expect(xhr.status).to.eq(201);
				expect(responseBody.CreativeId).to.eq(creativeId);
				expect(responseBody.SourceId).to.eq(sourceId);
				//Uncomment this assertion once code is promoted to prod
				//cy.validateGoogleClientId(responseBody);
			});

			tyPage.getlocalOptionsElement.as("listings");

			cy.get("@listings").click();

			cy.url().should(
				"contain",
				".aplaceformom.com/assisted-living/washington/bellevue"
			);

			let db = new Array();
			var a = document.createElement("a");
			a.href = url;

			let options = {
				env: {
					_SITE: a.hostname,
				},
			};

			cy.exec(`npm run db`, options).then($result => {
				console.log($result);
			});

			cy.fixture("results/db.json").then($data => {
				db = $data.recordsets[0];
				cy.log(
					db.filter(
						p => p.source_id == sourceId && p.address == email
					)[0]
				);
				expect(
					db.filter(
						p => p.source_id == sourceId && p.address == email
					).length,
					"Lead Found in DB?"
				).to.be.greaterThan(0);
			});
		});

		it("Dynamic Location - Lead Submission & Subheadline Validations", () => {
			mainPage.visit(
				`${navigationUrl}${dynamicLocationData.first.queryString}`
			);

			cy.server();
			cy.route(
				"POST",
				"https://gw.aplaceformom.com/Prod/api/ws3/leads/v1"
			).as("leadSubmitRequest");

			mainPage.getLocationElement.as("location");

			//Initial state
			cy.get("@location").should("not.have.class", "error");
			cy.get("div#lp-pom-text-13 span")
				.invoke("text")
				.then($text => {
					expect(
						$text
							.replace(/[^\w\s]/gi, "")
							.replace(/\n/g, "")
							.replace(/\s/g, "")
					).to.contain(pagePhone);
				});

			mainPage.getNextElement.as("nextBTN");

			//Entering Data
			cy.get("@location").should("have.value", "South Lake Morton, FL");

			cy.get("@nextBTN").click();

			cy.url().should(
				"contain",
				domainsData.variants.a.steps.stepOne.url
			);

			mainPage.getSelectionsElement.find("#timeline").as("timeline");
			mainPage.getSelectionsElement.find("#room_type").as("roomtype");
			mainPage.getSelectionsElement.find("#budget").as("budget");

			//Select dropdowns
			cy.get("@timeline").select(selections.timeLine.urgent);

			cy.get("@roomtype").select(selections.roomType.privateOneBedroom);

			cy.get("@budget").select(selections.budget.luxury);

			//Continue to step 2
			cy.get("@nextBTN").click();

			//Validate Community Builder
			cy.get(".builder-container").should("exist");

			//Step 2 Options
			cy.url().should(
				"contain",
				domainsData.variants.a.steps.stepTwo.url
			);

			//initial State
			mainPage.getNameElement.as("name");
			mainPage.getEmailElement.as("email");
			mainPage.getPhoneElement.as("phone");

			cy.get(".location-hl")
				.as("subheadlineLocation")
				.should("have.text", "South Lake Morton, FL");
			cy.get(".caretype-hl")
				.as("subheadlineCaretype")
				.should("contain.text", "Nursing Home");

			cy.get("@name").should("not.have.class", "error");
			cy.get("@email").should("not.have.class", "error");
			cy.get("@phone").should("not.have.class", "error");

			//Validate required fields are highlighted in red
			cy.get("@nextBTN").click();

			cy.get("@name").should("have.class", "error");
			cy.get("@email").should("have.class", "error");
			cy.get("@phone").should("have.class", "error");

			//Entering data
			cy.get("@name")
				.type(name)
				.should("have.value", name);
			cy.get("@email")
				.type(email)
				.should("have.value", email);
			cy.get("@phone")
				.type(phone)
				.should("have.value", "(555) 555-5555");

			mainPage.getSubmitElement.click();

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
				//Uncomment this assertion once code is promoted to prod
				//cy.validateGoogleClientId(responseBody);
			});

			tyPage.getlocalOptionsElement.as("listings");

			cy.get("@listings").click();

			cy.url().should(
				"contain",
				"aplaceformom.com/nursing-homes/florida/lakeland"
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
			cy.navigate(
				"https://unbounce-test.aplaceformom.com/community-options-tnl-551/"
			);

			cy.get(
				`a[href="clkn/https/www.aplaceformom.com/terms-of-use"]`
			).click();

			cy.url().should("eq", touUrl);
		});

		it("Validate Privacy Policy link", () => {
			cy.navigate(
				"https://unbounce-test.aplaceformom.com/community-options-tnl-551/"
			);

			cy.get(`a[href="clkn/https/www.aplaceformom.com/privacy"]`).click();

			cy.url().should("eq", ppUrl);
		});

		it("Validate Dynamic Locations First Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let first = `${navigationUrl}${dynamicLocationData.first.queryString}`;

			//Expected Values
			let firstLocation = dynamicLocationData.first.expectedLocation;
			cy.navigate(first, null);
			cy.get("#location_identifier").should("have.value", firstLocation);
		});

		it("Validate Dynamic Locations Second Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let second = `${navigationUrl}${dynamicLocationData.second.queryString}`;

			//Expected Values
			let secondLocation = dynamicLocationData.second.expectedLocation;

			cy.navigate(second, null);
			cy.get("#location_identifier").should("have.value", secondLocation);
		});

		it("Validate Dynamic Locations Third Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let third = `${navigationUrl}${dynamicLocationData.third.queryString}`;

			//Expected Values
			let thirdLocation = dynamicLocationData.third.expectedLocation;

			cy.navigate(third, null);
			cy.get("#location_identifier").should("have.value", thirdLocation);
		});

		it("Validate Dynamic Locations Fourth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fourth = `${navigationUrl}${dynamicLocationData.fourth.queryString}`;

			//Expected Values
			let fourthLocation = dynamicLocationData.fourth.expectedLocation;

			cy.navigate(fourth, null);
			cy.get("#location_identifier").should("have.value", fourthLocation);
		});

		it("Validate Dynamic Locations Fifth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fifth = `${navigationUrl}${dynamicLocationData.fifth.queryString}`;

			//Expected Values
			let fifthLocation = dynamicLocationData.fifth.expectedLocation;

			cy.navigate(fifth, null);
			cy.get("#location_identifier").should("have.value", fifthLocation);
		});

		it("Validate Dynamic Locations Sixth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let sixth = `${navigationUrl}${dynamicLocationData.sixth.queryString}`;

			//Expected Values
			let sixthLocation = dynamicLocationData.sixth.expectedLocation;

			cy.navigate(sixth, null);
			cy.get("#location_identifier").should("have.value", sixthLocation);
		});

		it("Validate Dynamic Locations Septh Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let septh = `${navigationUrl}${dynamicLocationData.septh.queryString}`;

			//Expected Values
			let septhLocation = dynamicLocationData.septh.expectedLocation;

			cy.navigate(septh, null);
			cy.get("#location_identifier").should("have.value", septhLocation);
		});

		it("Validate Dynamic Locations Eighth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let eighth = `${navigationUrl}${dynamicLocationData.eighth.queryString}`;

			//Expected Values
			let eighthLocation = dynamicLocationData.eighth.expectedLocation;

			cy.navigate(eighth, null);
			cy.get("#location_identifier").should("have.value", eighthLocation);
		});

		it("Validate Dynamic Locations Nineth Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let nineth = `${navigationUrl}${dynamicLocationData.nineth.queryString}`;

			//Expected Values
			let ninethLocation = dynamicLocationData.nineth.expectedLocation;

			cy.navigate(nineth, null);
			cy.get("#location_identifier").should("have.value", ninethLocation);
		});
	});
});
