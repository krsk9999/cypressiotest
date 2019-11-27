describe('testing db connection', ()=>{

    it('test 1',()=>{
        let db = new Array();

        let options = {
            env: {
                "_SITE": "unbounce-test.aplaceformom.com/general-cdot-dev"
            }
        }

        cy.exec(`npm run db`,options).then($result=>{
            cy.log($result)
        })

        cy.fixture('results/db.json').then($data =>{
            db = $data.recordsets[0];
            cy.log(db.filter(p => p.source_id == 5688 && p.address == "kenneth.ramirez@aplaceformom.com"))
            expect(db.filter(p => p.source_id == 5688 && p.address == "kenneth.ramirez@aplaceformom.com").length).to.be.greaterThan(0)
        })

    })


})