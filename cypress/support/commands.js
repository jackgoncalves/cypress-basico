Cypress.Commands.add('preencheFormulario', function(){

    const longText = 'Teste teste tete teste Teste teste tete teste Teste teste tete teste'
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('Gonca')
    cy.get('#email').type('Jack@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
})


// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
