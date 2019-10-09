class basePage {
    constructor() {
        this.url = "",
        this.location = "",
        this.name = "",
        this.email = "",
        this.phone = "",
        this.submit = ""
    }

    /** 
     * @param {String} visitUrl 
     */
    visit(visitUrl) {
        this.url = visitUrl;
        if(this.url){
            cy.navigate(this.url);
        }else{
            throw new Error("No Url to visit has been provided")
        }        
    }
    
    get getLocationElement(){
        if(this.location){
            return cy.get(this.location).as('location');
        }else{
            throw new Error("No selector provided to get a location element")
        } 
    }
    
    get getEmailElement(){
        if(this.email){
            return cy.get(this.email).as('email');
        }else{
            throw new Error("No selector provided to get an email element")
        } 
    }

    get getNameElement(){
        if(this.name){
            return cy.get(this.name).as('name');
        }else{
            throw new Error("No selector provided to get a name element")
        } 
    }

    get getPhoneElement(){
        if(this.phone){
            return cy.get(this.phone).as('phone');
        }else{
            throw new Error("No selector provided to get a phone element")
        } 
    }

    get getSubmitElement(){
        if(this.phone){
            return cy.get(this.submit).as('submitBtn');
        }else{
            throw new Error("No selector provided to get a submit button element")
        } 
    }

  }
  
  export default basePage;