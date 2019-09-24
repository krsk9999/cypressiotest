/// <reference types="Cypress" />
import { sep } from "path";
import { isRegExp } from "util";

describe("Body Tag Validations", () => {
	context("Setting up testing data", () => {
		let domainsData

		before(() => {
			cy.fixture("UnbounceData.json").then(d => {
				domainsData = d
			})
			cy.viewport("macbook-15")
        })

        it("Local, Simple, Free body tag validations ", () => {
			let url = domainsData.localSimpleFree.url
            let variant = domainsData.localSimpleFree.variants.a.url;
            let bodyTag = domainsData.localSimpleFree.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-gtm-sitetype').should('eq', bodyTag)
            
        });
        
		it("cDot Joan Lunden TV1 body tag validations ", () => {
			let url = domainsData.cDotTv1.url
            let variant = domainsData.cDotTv1.variants.a.url;
            let bodyTag = domainsData.cDotTv1.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-gtm-sitetype').should('eq', bodyTag)
            
        });
        
        it("cDot Joan Lunden TV2 body tag validations ", () => {
			let url = domainsData.cDotTv2.url
            let variant = domainsData.cDotTv2.variants.a.url;
            let bodyTag = domainsData.cDotTv2.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-gtm-sitetype').should('eq', bodyTag)
            
        });
        
        it("iDot Veterans Variant 'a' body tag validations ", () => {
			let url = domainsData.iDotVeterans.url
            let variant = domainsData.iDotVeterans.variants.a.url;
            let bodyTag = domainsData.iDotVeterans.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });  
        
        it("iDot Luxury Variant 'j' body tag validations ", () => {
			let url = domainsData.iDotLuxury.url
            let variant = domainsData.iDotLuxury.variants.j.url;
            let bodyTag = domainsData.iDotLuxury.variants.j.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        }); 

        it("iDot Luxury TY Page Variant 'a' body tag validations ", () => {
			let url = domainsData.iDotLuxuryTY.url
            let variant = domainsData.iDotLuxuryTY.variants.a.url;
            let bodyTag = domainsData.iDotLuxuryTY.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        }); 

        it("iDot Better-Path-Email body tag validations ", () => {
            let url = domainsData.iDotTBPE.url
            let variant = domainsData.iDotTBPE.variants.a.url;
            let bodyTag = domainsData.iDotTBPE.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });
        
        it("iDot Better-Path-Selections body tag validations ", () => {
            let url = domainsData.iDotTBPS.url
            let variant = domainsData.iDotTBPS.variants.a.url;
            let bodyTag = domainsData.iDotTBPS.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("iDot Better-Path-Get-Options body tag validations ", () => {
            let url = domainsData.iDotTBPGO.url
            let variant = domainsData.iDotTBPGO.variants.a.url;
            let bodyTag = domainsData.iDotTBPGO.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("iDot Variant 'p' body tag validations ", () => {
            let url = domainsData.iDot.url
            let variant = domainsData.iDot.variants.p.url;
            let bodyTag = domainsData.iDot.variants.p.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("iDot Better-Path-Selections-V2 body tag validations ", () => {
            let url = domainsData.iDotTBPSV2.url
            let variant = domainsData.iDotTBPSV2.variants.a.url;
            let bodyTag = domainsData.iDotTBPSV2.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("iDot Better-Path-Get-Options-V2 body tag validations ", () => {
            let url = domainsData.iDotTBPGOV2.url
            let variant = domainsData.iDotTBPGOV2.variants.a.url;
            let bodyTag = domainsData.iDotTBPGOV2.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });
        
        it("cDot Mobile Variant 'b' body tag validations ", () => {
            let url = domainsData.cDotMobile.url
            let variant = domainsData.cDotMobile.variants.b.url;
            let bodyTag = domainsData.cDotMobile.variants.b.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("Facebook Step-One-V1 Variant 'b' body tag validations ", () => {
            let url = domainsData.fbStepOneV1.url
            let variant = domainsData.fbStepOneV1.variants.b.url;
            let bodyTag = domainsData.fbStepOneV1.variants.b.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("Facebook Step-Two-V1 Variant 'b' body tag validations ", () => {
            let url = domainsData.fbStepTwoV1.url
            let variant = domainsData.fbStepTwoV1.variants.b.url;
            let bodyTag = domainsData.fbStepTwoV1.variants.b.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("Facebook Step-Three-V1 Variant 'b' body tag validations ", () => {
            let url = domainsData.fbStepThreeV1.url
            let variant = domainsData.fbStepThreeV1.variants.b.url;
            let bodyTag = domainsData.fbStepThreeV1.variants.b.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("Facebook Step-Four-V1 Variant 'b' body tag validations ", () => {
            let url = domainsData.fbStepFourV1.url
            let variant = domainsData.fbStepFourV1.variants.b.url;
            let bodyTag = domainsData.fbStepFourV1.variants.b.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("cDot Variant 'e' body tag validations ", () => {
            let url = domainsData.cDot.url
            let variant = domainsData.cDot.variants.e.url;
            let bodyTag = domainsData.cDot.variants.e.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });
        
        it("iDOt Hello Krystof Variant 'a' body tag validations ", () => {
            let url = domainsData.iDotHelloKrystof.url
            let variant = domainsData.iDotHelloKrystof.variants.a.url;
            let bodyTag = domainsData.iDotHelloKrystof.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });
        
        it("landingDot Clickbooth Variant 'a' body tag validations ", () => {
            let url = domainsData.lClickBooth.url
            let variant = domainsData.lClickBooth.variants.a.url;
            let bodyTag = domainsData.lClickBooth.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("landingDot Clickbooth Step 1 Variant 'a' body tag validations ", () => {
            let url = domainsData.lClickBoothS1.url
            let variant = domainsData.lClickBoothS1.variants.a.url;
            let bodyTag = domainsData.lClickBoothS1.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("landingDot Clickbooth Step 2 Variant 'a' body tag validations ", () => {
            let url = domainsData.lClickBoothS2.url
            let variant = domainsData.lClickBoothS2.variants.a.url;
            let bodyTag = domainsData.lClickBoothS2.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("landingDot Clickbooth Step 3 Variant 'a' body tag validations ", () => {
            let url = domainsData.lClickBoothS3.url
            let variant = domainsData.lClickBoothS3.variants.a.url;
            let bodyTag = domainsData.lClickBoothS3.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("landingDot Dexyp 1 Variant 'a' body tag validations ", () => {
            let url = domainsData.landingDexyp1.url
            let variant = domainsData.landingDexyp1.variants.a.url;
            let bodyTag = domainsData.landingDexyp1.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("landingDot Dexyp 2 Variant 'a' body tag validations ", () => {
            let url = domainsData.landingDexyp2.url
            let variant = domainsData.landingDexyp2.variants.a.url;
            let bodyTag = domainsData.landingDexyp2.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("landingDot Dexyp 3 Variant 'a' body tag validations ", () => {
            let url = domainsData.landingDexyp3.url
            let variant = domainsData.landingDexyp3.variants.a.url;
            let bodyTag = domainsData.landingDexyp3.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

        it("landingDot Dexyp 4 Variant 'a' body tag validations ", () => {
            let url = domainsData.landingDexyp4.url
            let variant = domainsData.landingDexyp4.variants.a.url;
            let bodyTag = domainsData.landingDexyp4.variants.a.bodyTag;

            cy.navigate(url, variant);
            cy.get('body.lp-pom-body').invoke('attr','data-pa-sitetype').should('eq', bodyTag)
            
        });

	})
})
