describe('testing db connection', ()=>{

    it('test 1',()=>{
        let data = new Array();

        cy.exec('npm run db').then($result=>{
            cy.log($result)
        })

        cy.fixture('results/db.json').then($data =>{
            data = $data.recordsets[0];
            cy.log(data);
            cy.log('Varifying information');
            cy.log(data.filter(p => p.source_id == 5688 && p.google_client_id == "433385840.1574874136"))
        })

       
    })


})