// reference types="Cypress"/>

describe('Central de atendimento ao Cliente', function () {
  beforeEach(function () {
    cy.visit('./src/index.html')
  })
  it('verificar o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e enviar formulário', function () {

    const longText = 'Teste teste tete teste Teste teste tete teste Teste teste tete teste'

    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('Gonca')
    cy.get('#email').type('Jack@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

  })

  it('inserir endereço de e-mail inválido', function () {
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('Gonca')
    cy.get('#email').type('Jack@gmail,com')
    cy.get('#open-text-area').type('teste')

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  it('campo de telefone continua vazio quando preenchido com valor não númerico', function () {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')

  })

  it('Campo número de telefone é obrigatório', function () {
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('Gonca')
    cy.get('#email').type('Jack@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check()

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  it('Preencher e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Jack')
      .should('have.value', 'Jack')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('gonca')
      .should('have.value', 'gonca')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('Jack.gonca@gmail.com')
      .should('have.value', 'Jack.gonca@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('1234567')
      .should('have.value', '1234567')
      .clear()
      .should('have.value', '')

  })

  it('enviar formulário sem preencher os campos obrigatórios', function () {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  it('Envia formulário utilizando comando personalizado', function () {
    cy.preencheFormulario()
  })

  it('enviar formulário utilizando (CONTAINS) em vez de (GET)', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('seleciona um produto (YouTube) pelo seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) pelo seu valor', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) pelo seu indice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento feedback', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')

  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3) // length = comprimento, confirma se de fato tem 3 elementos
      .each(function ($radio) {           //each = usado para passar por cada um dos elementos
        cy.wrap($radio).check()          //wrap = usado para empacotar esses dados
        cy.wrap($radio).should('be.checked')

      })

  })

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .should('have.length', 2)
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

  })

  it('seleciona arquivo da pasta fixtures', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/dia.jpg')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('dia.jpg')

      })
  })

  it('seleciona um arquivo simulando drag-and-drop', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/dia.jpg', {action: 'drag-drop'})
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('dia.jpg')

      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual fi dada um alias', function(){
    cy.fixture('dia.jpg').as('aquivoExemplo')
    cy.get('#file-upload')
      .selectFile('@aquivoExemplo')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('dia.jpg')

      })
      
  })

  it('verifica que a política de privacidade abre em outra aba sem necessidade de um clique', function(){
      cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it('verifica que a politica de privacidade e abre em uma outra aba sem a necessidade de clicar', function(){
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')
  })

  


})
