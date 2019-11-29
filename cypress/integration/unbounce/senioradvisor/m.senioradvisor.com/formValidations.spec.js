import mDotSA from '../../../../models/pages/senioradvisor/mDot.js';
import mDotTYSA from '../../../../models/pages/senioradvisor/mDotTY.js';

var moment = require('moment');
moment().format();

describe('m.senioradvisor.com', () => {
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
		let mobilePage;
		let tyPage;
		let dynamicLocationData;
		let pagePhone;
		let ppUrl;
		let navigationUrl;
		let dpfi;
		let dpft;

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
				domainsData = d.mDotSA;
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
				bodyTag = domainsData.variants.a.bodyTag;
				dpfi = domainsData.variants.a.dataPaFormid;
				dpft = domainsData.variants.a.dataPaFormtype;
				navigationUrl = url + variant;
			});
			cy.fixture('dynamicLocations.json').then(d => {
				dynamicLocationData = d;
			});
			mobilePage = new mDotSA();
			tyPage = new mDotTYSA();
		});

		beforeEach(() => {
			cy.viewport('iphone-6');
			cy.clearLocalStorage();
			cy.clearCookies();
		});

		afterEach(() => {
			cy.clearLocalStorage();
			cy.clearCookies();
		});

		it.only("Fields are required variant 'a'", () => {

			cy.server();

			//This is the post call we are interested in capturing
			cy.route(
				'POST',
				'https://gw.aplaceformom.com/Prod/api/ws3/leads/v1'
			).as('leadSubmitRequest');

			mobilePage = new mDotSA();
			mobilePage.visit(navigationUrl);

			//Phone number
			cy.get(`a[href="clkn/tel/8666377839"]`).should('exist');

			cy.get('.lp-positioned-content #lp-pom-button-71')
				.should('have.attr', 'href')
				.then(text => {
					expect(text).to.contain(pagePhone);
				});

			//FDE Data validations
			//TODO - Add Body Data Attribute Validation
			cy.get('form')
				.invoke('attr', 'data-pa-formid')
				.should('eq', dpfi);
			cy.get('form')
				.invoke('attr', 'data-pa-formtype')
				.should('eq', dpft);
			cy.get('body')
				.invoke('attr', 'data-pa-sitetype')
				.should('eq', bodyTag);

			//First Step - Location Step

			mobilePage.getLocationElement.should('not.have.class', 'error');

			mobilePage.getNextElement.click();

			mobilePage.getLocationElement.should('have.class', 'error');

			mobilePage.getLocationElement
				.type(location)
				.should('have.value', location);

			mobilePage.getNextElement.click();

			//Second Step - Email Step

			mobilePage.getEmailElement.should('not.have.class', 'error');

			mobilePage.getNextElement.click();

			mobilePage.getEmailElement.should('have.class', 'error');

			mobilePage.getEmailElement.type(email).should('have.value', email);

			mobilePage.getNextElement.click();

			//Third Step - Fullname and Phone Step

			mobilePage.getNameElement.should('not.have.class', 'error');
			mobilePage.getPhoneElement.should('not.have.class', 'error');

			mobilePage.getSubmitElement.click();

			mobilePage.getNameElement.should('have.class', 'error');
			mobilePage.getPhoneElement.should('have.class', 'error');

			mobilePage.getNameElement.type(name).should('have.value', name);
			mobilePage.getPhoneElement.type(phone).should('have.value', phone);

			mobilePage.getSubmitElement.click();

			cy.url().should('eq', 'https://m.senioradvisor.com/thank-you/');

			cy.wait('@leadSubmitRequest');

			//Assert on XHR
			cy.get('@leadSubmitRequest').then(function(xhr) {
				responseBody = JSON.parse(xhr.response.body);
				expect(xhr.status).to.eq(201);
				//expect(responseBody.CreativeId).to.eq("APFM|DT|Primary|R")
				expect(responseBody.SourceId).to.eq('5765');
			});

			tyPage.getlocalOptionsElement.click();

			cy.url().should('contain', 'bellevue-wa');
			
			cy.sqlServer({domain : url, email : email}).then($result => {
				expect($result.filter(p => p.source_id == sourceId && p.address == email).length > 0, 'Lead Stored in Database?').to.be.true;
				cy.log($result.filter(p => p.source_id == sourceId && p.address == email));
			});
		});

		it('Validate Dynamic Locations First Scenario variant a', () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let first = `${navigationUrl}${dynamicLocationData.first.queryString}`;

			//Expected Values
			let firstLocation = dynamicLocationData.first.expectedLocation;
			cy.navigate(first, null);
			cy.get('#location_identifier').should('have.value', firstLocation);
		});

		it('Validate Dynamic Locations Second Scenario variant a', () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let second = `${navigationUrl}${dynamicLocationData.second.queryString}`;

			//Expected Values
			let secondLocation = dynamicLocationData.second.expectedLocation;

			cy.navigate(second, null);
			cy.get('#location_identifier').should('have.value', secondLocation);
		});

		it('Validate Dynamic Locations Third Scenario variant a', () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let third = `${navigationUrl}${dynamicLocationData.third.queryString}`;

			//Expected Values
			let thirdLocation = dynamicLocationData.third.expectedLocation;

			cy.navigate(third, null);
			cy.get('#location_identifier').should('have.value', thirdLocation);
		});

		it('Validate Dynamic Locations Fourth Scenario variant a', () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fourth = `${navigationUrl}${dynamicLocationData.fourth.queryString}`;

			//Expected Values
			let fourthLocation = dynamicLocationData.fourth.expectedLocation;

			cy.navigate(fourth, null);
			cy.get('#location_identifier').should('have.value', fourthLocation);
		});

		it('Validate Dynamic Locations Fifth Scenario variant a', () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let fifth = `${navigationUrl}${dynamicLocationData.fifth.queryString}`;

			//Expected Values
			let fifthLocation = dynamicLocationData.fifth.expectedLocation;

			cy.navigate(fifth, null);
			cy.get('#location_identifier').should('have.value', fifthLocation);
		});

		it('Validate Dynamic Locations Sixth Scenario variant a', () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let sixth = `${navigationUrl}${dynamicLocationData.sixth.queryString}`;

			//Expected Values
			let sixthLocation = dynamicLocationData.sixth.expectedLocation;

			cy.navigate(sixth, null);
			cy.get('#location_identifier').should('have.value', sixthLocation);
		});

		it('Validate Dynamic Locations Septh Scenario variant a', () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let septh = `${navigationUrl}${dynamicLocationData.septh.queryString}`;

			//Expected Values
			let septhLocation = dynamicLocationData.septh.expectedLocation;

			cy.navigate(septh, null);
			cy.get('#location_identifier').should('have.value', septhLocation);
		});

		it('Validate Dynamic Locations Eighth Scenario variant a', () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let eighth = `${navigationUrl}${dynamicLocationData.eighth.queryString}`;

			//Expected Values
			let eighthLocation = dynamicLocationData.eighth.expectedLocation;

			cy.navigate(eighth, null);
			cy.get('#location_identifier').should('have.value', eighthLocation);
		});

		it('Validate Dynamic Locations Nineth Scenario variant a', () => {
			let url = domainsData.mDotSA.url;
			let variant = domainsData.mDotSA.variants.a.url;
			let navigationUrl = `${url}${variant}`;

			//URls for each of the 9 scenarios of the Dynamic Locations validations
			let nineth = `${navigationUrl}${dynamicLocationData.nineth.queryString}`;

			//Expected Values
			let ninethLocation = dynamicLocationData.nineth.expectedLocation;

			cy.navigate(nineth, null);
			cy.get('#location_identifier').should('have.value', ninethLocation);
		});
	});
});
