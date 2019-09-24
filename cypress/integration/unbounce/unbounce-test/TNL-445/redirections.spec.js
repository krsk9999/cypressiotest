/// <reference types="Cypress" />
import { sep } from "path"
import { isRegExp } from "util"

describe("Redirections", () => {
	context("Setting up testing data", () => {
        let options;
        let domainData;
        
        let timeLineSelect = "#timeline";
        let roomTypeSelect = "#room_type";
        let budgetSelect = "#budget";
        let submitButton = "button[type='submit']";

        let urlUrgent;
        let urlNormal;
        let baseUrl;

		before(() => {
			
			cy.fixture("betterPathSelections.json").then(d => {
				options = d
            });
            cy.fixture("UnbounceData.json").then(d => {
                domainData = d;
                urlUrgent = `${domainData.testPage.url}the-better-path-get-options-v2-urgent/`;
                urlNormal = `${domainData.iDot.url}the-better-path-get-options-v2/`;
                baseUrl = `${domainData.testPage.url}`;
            });
			cy.viewport("macbook-15")
        })
        
        it('Select URGENT',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.urgent);
            cy.get("@submit").click();

            cy.url().should("eq",urlUrgent);

        });

        it('Select 30 Days',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.thirtyDays);
            cy.get("@submit").click();

            cy.url().should("eq", urlNormal);

        });

        it('Select 60 Days',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.sixtyDays);
            cy.get("@submit").click();

            cy.url().should("eq", urlNormal);

        });

        it('Select No Rush',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.noRush);
            cy.get("@submit").click();

            cy.url().should("eq", urlNormal);

        });

        it('Select No Rush - Shared',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(roomTypeSelect).as("roomType");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.noRush);
            cy.get("@roomType").select(options.roomType.shared);
            cy.get("@submit").click();

            cy.url().should("eq", urlNormal);

        });

        it('Select No Rush - Private One Bedroom',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(roomTypeSelect).as("roomType");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.noRush);
            cy.get("@roomType").select(options.roomType.privateOneBedroom);
            cy.get("@submit").click();

            cy.url().should("eq", urlNormal);

        });

        it('Select No Rush - Private Two Bedroom',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(roomTypeSelect).as("roomType");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.noRush);
            cy.get("@roomType").select(options.roomType.privateTwoBedroom);
            cy.get("@submit").click();

            cy.url().should("eq", urlNormal);

        });

        it('Select No Rush - Unsure',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(budgetSelect).as("budget");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.noRush);
            cy.get("@budget").select(options.budget.unsure);
            cy.get("@submit").click();

            cy.url().should("eq", urlNormal);

        });

        it('Select No Rush - Standard',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(budgetSelect).as("budget");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.noRush);
            cy.get("@budget").select(options.budget.standard);
            cy.get("@submit").click();

            cy.url().should("eq", urlNormal);

        });

        it('Select No Rush - Luxury',() =>{

            cy.navigate(`${baseUrl}the-better-path-selections-v2/`, null)
            
            cy.get(timeLineSelect).as("timeLine");
            cy.get(budgetSelect).as("budget");
            cy.get(submitButton).as("submit");

            cy.get("@timeLine").select(options.timeLine.noRush);
            cy.get("@budget").select(options.budget.luxury);
            cy.get("@submit").click();

            cy.url().should("eq", urlNormal);

        });

	})
})
