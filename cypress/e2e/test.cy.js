///reference types="Cypress"/>
describe('Central de atendimento ao Cliente TAT', ()=>{
    beforeEach(()=>{
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação', ()=>{
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
})