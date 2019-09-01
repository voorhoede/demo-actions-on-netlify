context(`Demo (${Cypress.config().baseUrl})`, () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    describe('Home page', () => {
      it('contains heading', () => {
        cy.get('h1')
            .contains('Demo')
      })
    })
  })
  