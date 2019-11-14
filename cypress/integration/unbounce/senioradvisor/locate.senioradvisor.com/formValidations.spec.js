import locateDotSA from '../../../../models/pages/senioradvisor/mDot.js';
import locateDotTYSA from '../../../../models/pages/senioradvisor/mDotTY.js';

var moment = require('moment');
moment().format();

describe('locate.senioradvisor.com', () => {
	context('Form Validations and Lead submissions', () => {
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
		let dynamicLocationData;
		let pagePhone;
		let ppUrl;

		//Variables
		let location = Cypress.env('location') || 'New York, NY';
		let dateF = moment();
		let name = `testdonotcall${dateF.valueOf()}` || Cypress.env('name');
		let email =
			`automation${dateF.valueOf()}@aplaceformom.com` ||
			Cypress.env('email');
		let phone = Cypress.env('phone') || '(555) 555-5555';

		before(() => {
			cy.fixture('UnbounceData.json').then(d => {
				domainsData = d.locateDotSA;
				url = domainsData.url;
				variant = domainsData.variants.a.url;
				bodyTag = domainsData.variants.a.bodyTag;
				sourceId = domainsData.variants.a.sourceId;
				creativeId = domainsData.variants.a.creativeId;
				dataPaFormId = domainsData.variants.a.dataPaFormid;
				dataPaFormType = domainsData.variants.a.dataPaFormtype;
				dataPaTechStack = domainsData.variants.a.dataPaTechstack;
				ppUrl = domainsData.variants.a.ppUrl;
				pagePhone = domainsData.variants.a.phone;
				console.log(domainsData);
			});
			cy.fixture('dynamicLocations.json').then(d => {
				dynamicLocationData = d;
			});
			mainPage = new locateDotSA();
		});

		beforeEach(() => {
			cy.viewport('macbook-15');
			cy.clearLocalStorage();
			cy.clearCookies();
		});

		afterEach(() => {
			cy.clearLocalStorage();
			cy.clearCookies();
		});

		it("Validate login after submit a Lead - Variant 'a'", () => {
			cy.server();

			//This is the post call we are interested in capturing
			cy.route(
				'POST',
				'https://gw.aplaceformom.com/Prod/api/ws3/leads/v1'
			).as('leadSubmitRequest');

			mainPage.visit(url + variant);

			//Phone number
			cy.get(`a[href="clkn/tel/${pagePhone}"]`).should('exist');

			cy.get('a#lp-pom-button-12 span')
				.invoke('text')
				.then(text => {
					expect(
						text
							.replace(/[^\w\s]/gi, '')
							.replace(/\n/g, '')
							.replace(/\s/g, '')
					).to.eq(pagePhone);
				});

			//FDE Data validations
			//TODO - Add Body Data Attribute Validation
			cy.get('form')
				.invoke('attr', 'data-pa-formid')
				.should('eq', dataPaFormId);
			cy.get('form')
				.invoke('attr', 'data-pa-formtype')
				.should('eq', dataPaFormType);
			cy.get('body')
				.invoke('attr', 'data-pa-sitetype')
				.should('eq', bodyTag);

			//First Step - Location Step

			mainPage.getLocationElement.should('not.have.class', 'error');
			mainPage.getEmailElement.should('not.have.class', 'error');

			cy.get('#lp-pom-button-20')
				.as('nextBtn')
				.click();

			mainPage.getLocationElement.should('have.class', 'error');
			mainPage.getEmailElement.should('have.class', 'error');

			mainPage.getLocationElement
				.type(location)
				.should('have.value', location);
			mainPage.getEmailElement.type(email).should('have.value', email);

			cy.get('@nextBtn').click();

			//Second Step - Email Step

			mainPage.getNameElement.should('not.have.class', 'error');
			mainPage.getPhoneElement.should('not.have.class', 'error');

			mainPage.getSubmitElement.click();

			mainPage.getNameElement.should('have.class', 'error');
			mainPage.getPhoneElement.should('have.class', 'error');

			mainPage.getNameElement.type(name).should('have.value', name);
			mainPage.getPhoneElement.type(phone).should('have.value', phone);

			mainPage.getSubmitElement.click();

			cy.url().should(
				'eq',
				'https://locate.senioradvisor.com/thank-you/'
			);

			cy.wait('@leadSubmitRequest');

			//Assert on XHR
			cy.get('@leadSubmitRequest').then(function(xhr) {
				responseBody = JSON.parse(xhr.response.body);
				expect(xhr.status).to.eq(201);
				//expect(responseBody.CreativeId).to.eq("APFM|DT|Primary|R")
				expect(responseBody.SourceId).to.eq(sourceId);
			});

			tyPage = new locateDotTYSA();

			tyPage.getlocalOptionsElement.click();

			cy.url().should('contain', 'bellevue-wa');
			//TODO - Add Unlock Pricing validations
			//cy.getCookie('logged_in').should('have.property', 'value', 'true');

			cy.get('.welcome').click();

			cy.get('.dropdown-menu a[href*="/users/edit."]').click();

			cy.get('#user_first_name').should('have.value', name);

			cy.get('#user_email').should('have.value', email);
		});
		/*
		it("Validate Dynamic Locations First Scenario variant a", () => {
			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let first = `${navigationUrl}${dynamicLocationData.first.queryString}`;

			//Expected Values
			let firstLocation = dynamicLocationData.first.expectedLocation;
			cy.navigate(first, null);
			cy.get("#location_identifier").should("have.value", firstLocation);
		});

		it("Validate Dynamic Locations Second Scenario variant a", () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let second = `${navigationUrl}${dynamicLocationData.second.queryString}`;

			//Expected Values
			let secondLocation = dynamicLocationData.second.expectedLocation;

			cy.navigate(second, null);
			cy.get("#location_identifier").should("have.value", secondLocation);
		});

		it("Validate Dynamic Locations Third Scenario variant a", () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let third = `${navigationUrl}${dynamicLocationData.third.queryString}`;

			//Expected Values
			let thirdLocation = dynamicLocationData.third.expectedLocation;

			cy.navigate(third, null);
			cy.get("#location_identifier").should("have.value", thirdLocation);
		});

		it("Validate Dynamic Locations Fourth Scenario variant a", () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fourth = `${navigationUrl}${dynamicLocationData.fourth.queryString}`;

			//Expected Values
			let fourthLocation = dynamicLocationData.fourth.expectedLocation;

			cy.navigate(fourth, null);
			cy.get("#location_identifier").should("have.value", fourthLocation);
		});

		it("Validate Dynamic Locations Fifth Scenario variant a", () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fifth = `${navigationUrl}${dynamicLocationData.fifth.queryString}`;

			//Expected Values
			let fifthLocation = dynamicLocationData.fifth.expectedLocation;

			cy.navigate(fifth, null);
			cy.get("#location_identifier").should("have.value", fifthLocation);
		});

		it("Validate Dynamic Locations Sixth Scenario variant a", () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let sixth = `${navigationUrl}${dynamicLocationData.sixth.queryString}`;

			//Expected Values
			let sixthLocation = dynamicLocationData.sixth.expectedLocation;

			cy.navigate(sixth, null);
			cy.get("#location_identifier").should("have.value", sixthLocation);
		});

		it("Validate Dynamic Locations Septh Scenario variant a", () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let septh = `${navigationUrl}${dynamicLocationData.septh.queryString}`;

			//Expected Values
			let septhLocation = dynamicLocationData.septh.expectedLocation;

			cy.navigate(septh, null);
			cy.get("#location_identifier").should("have.value", septhLocation);
		});

		it("Validate Dynamic Locations Eighth Scenario variant a", () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let eighth = `${navigationUrl}${dynamicLocationData.eighth.queryString}`;

			//Expected Values
			let eighthLocation = dynamicLocationData.eighth.expectedLocation;

			cy.navigate(eighth, null);
			cy.get("#location_identifier").should("have.value", eighthLocation);
		});

		it("Validate Dynamic Locations Nineth Scenario variant a", () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let nineth = `${navigationUrl}${dynamicLocationData.nineth.queryString}`;

			//Expected Values
			let ninethLocation = dynamicLocationData.nineth.expectedLocation;

			cy.navigate(nineth, null);
			cy.get("#location_identifier").should("have.value", ninethLocation);
		});
		*/
	});
});
