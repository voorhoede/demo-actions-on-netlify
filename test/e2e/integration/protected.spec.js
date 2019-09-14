context(`Demo (${Cypress.config().baseUrl})`, () => {
    beforeEach(() => {
      cy.visit('/protected/', {
        auth: {
          username: 'demo',
          password: 'tryme'
        }
      })
    })
  
    describe('Home page', () => {
      it('contains heading', () => {
        cy.get('h1')
            .contains('Protected')
      })
    })
  })
  