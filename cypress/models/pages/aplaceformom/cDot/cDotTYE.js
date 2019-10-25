class cDotTYE{

    constructor(){        
        this.localOptions = ".thank-you-view";  
    }

    get getlocalOptionsElement(){
        if(this.localOptions){
            return cy.get(this.localOptions).find('div.progress-icons__cta a').as('locationBtn');
        }else{
            throw new Error("No selector provided to get a next button element");
        } 
    }
              
}

export default cDotTYE;