import basePage from '../../basePage.js';

class mobileDotA extends basePage{

    constructor(){
        super();
        this.location= "#location_identifier";
        this.name = "#full_name";
        this.email = "#email";
        this.phone = "#phone_number";     
        this.nextButton = "#lp-pom-button-59";
        this.submit = "#lp-pom-button-31";  
    }

    get getNextElement(){
        if(this.nextButton){
            return cy.get(this.nextButton).as('nextBtn');
        }else{
            throw new Error("No selector provided to get a next button element");
        } 
    }
              
}

export default mobileDotA;