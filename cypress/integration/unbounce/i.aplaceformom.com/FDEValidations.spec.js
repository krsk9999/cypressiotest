describe("iDot FDE Validations", () => {
	context("Setting up testing data", () => {
		let domainsData

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d
			})
			cy.viewport("macbook-15")
		})

		it("Validate FDEs iDot variant j", () => {
			let url = domainsData.iDot.url
			let variant = domainsData.iDot.variants.j.url;

			cy.navigate(url, variant)

			cy.get('form').invoke('attr','data-pa-formid').should('eq','1101')
            cy.get('form').invoke('attr','data-pa-formtype').should('eq','sem one step')
            cy.get('form').invoke('attr','data-pa-techstack').should('eq','unbounce')
		})

		it("Validate FDEs iDot variant n", () => {
			let url = domainsData.iDot.url
			let variant = domainsData.iDot.variants.n.url;

			cy.navigate(url, variant)

			cy.get('form').invoke('attr','data-pa-formid').should('eq','1111.1')
            cy.get('form').invoke('attr','data-pa-formtype').should('eq','sem-u four step - step 1')
            cy.get('form').invoke('attr','data-pa-techstack').should('eq','unbounce')            
        })

        it("Validate FDEs iDot variant p", () => {
			let url = domainsData.iDot.url
			let variant = domainsData.iDot.variants.p.url;

			cy.navigate(url, variant)

			cy.get('form').invoke('attr','data-pa-formid').should('eq','1112.1')
            cy.get('form').invoke('attr','data-pa-formtype').should('eq','sem-u three step - step 1')
            cy.get('form').invoke('attr','data-pa-techstack').should('eq','unbounce')
        })
        
        it("Validate FDEs iDot The Better Path Email ", () => {
			let url = domainsData.iDotTBPE.url

			cy.navigate(url, null)

			cy.get('form').invoke('attr','data-pa-formid').should('eq','1111.2')
            cy.get('form').invoke('attr','data-pa-formtype').should('eq','sem-u four step - step 2')
            cy.get('form').invoke('attr','data-pa-techstack').should('eq','unbounce')
        })

        it("Validate FDEs iDot The Better Path Selections", () => {
			let url = domainsData.iDotTBPS.url

            cy.navigate(url, null)

			cy.get('form').invoke('attr','data-pa-formid').should('eq','1111.3')
            cy.get('form').invoke('attr','data-pa-formtype').should('eq','sem-u four step - step 3')
            cy.get('form').invoke('attr','data-pa-techstack').should('eq','unbounce')
        })
        
        it("Validate FDEs iDot The Better Path Get Options", () => {
			let url = domainsData.iDotTBPGO.url

            cy.navigate(url, null)

			cy.get('form').invoke('attr','data-pa-formid').should('eq','1111.4')
            cy.get('form').invoke('attr','data-pa-formtype').should('eq','sem-u four step - step 4')
            cy.get('form').invoke('attr','data-pa-techstack').should('eq','unbounce')
        })

    })
})
