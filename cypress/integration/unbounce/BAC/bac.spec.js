describe('Get BAC Information', () => {
	context('e', () => {
		before(() => {});

		beforeEach(() => {});

		it('Login', () => {
			cy.visit('https://www1.sucursalelectronica.com/redir/showLogin.go');

			//Main Page Elements
			cy.get('#productId').as('user');
			cy.get('#pass').as('pass');
            cy.get('#confirm').as('loginBTN');
            
            cy.get('@user').type('kramirezs109');
            cy.get('@pass').type('bsj-Nike032019');
            cy.get('@loginBTN').click();
            //Login
		});
	});
});
