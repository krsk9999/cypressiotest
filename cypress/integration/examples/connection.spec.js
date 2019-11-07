import sql from "mssql";

const config = {
	user: "kenneth.ramirez",
	password: "Passw0rd!",
	server: "EDWProd",
	database: "YGL_LeadGen",
	domain: "apfm",
};

describe("cDot main form validations", () => {
	context("Creating JSON file for automation", () => {
		let data;

		before("Loading Criteria IDs", () => {
			cy.fixture("locations.txt").then(d => {
				data = d;
			});
		});

		it.only("test database", () => {
			let collection = data.replace(/\s/g, "").split(",");
			let responseBody;

			collection.forEach(d => {			
                
                cy.server();
                cy.route(
					"GET",
					`https://gw.aplaceformom.com/Prod/api/ws3/location/v1?criteriaID=${d}`
                ).as(`locationRequest`);

				cy.visit(
					`https://c.aplaceformom.com/?&kw=3234-NB:G:NAT:S:Nursing:K:E&kwg=N:NM:X:H:X:X:E:nursing%20homes%20near%20me&keyword=nursing%20homes%20near%20me&match=e&device=m&network=g&account=AL.com%20Generic%20-%20US%20-%20Google&campaignid=1687941325&adgroupid=69567877321&ad_id=330774038351&AdPosition=1t1&geo=9058077&distrib=s&targetID=kwd-37174470709&interest=${d}&hl=nursing-homes%7C19%20Nursing%20Home&location=CTY%7COH%7CCincinnati&ds_rl=1259864&ds_rl=1265127&ds_rl=1259864&gclid=CjwKCAiAiJPkBRAuEiwAEDXZZbqr1u4MqkqUKWi_xhfz52jbIObzoT2cON-3oE3_5W7LNO0zB`
				);
            
				cy.wait("@locationRequest");

				//Assert on XHR
				cy.get("@locationRequest").then(function(xhr) {
                    responseBody = JSON.parse(xhr.response.body);
                    cy.get('#location_identifier').should("have.value",responseBody.location);					
				});
			});
		});

	});
});
