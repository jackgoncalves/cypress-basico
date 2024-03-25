Cypress.Commands.add('preencheFormulario', () => {
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('gonca')
    cy.get('#email').type('jack@hotmail.com')
    cy.get('#open-text-area').type('MENSAGEM DE TESTE')

    cy.get('button[type="submit"]').click()
    cy.get('.success')
      .should('be.visible')
      // .should('have.text', 'Mensagem enviada com sucesso.')
      //ou
      .contains('Mensagem enviada com sucesso.')
})

Cypress.Commands.add('preenche', (nome, sobrenome, email) => {
    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
    
})

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
