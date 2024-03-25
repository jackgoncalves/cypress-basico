/// <reference types="cypress" />

describe('Central de atendimento ao cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos e envia o formulário', () => {
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('gonca')
    cy.get('#email').type('jack@hotmail.com')
    cy.get('#open-text-area').type('MENSAGEM DE TESTE')

    cy.get('button[type="submit"]').click()
    cy.get('.success')
      .should('be.visible')
      // .should('have.text', 'Mensagem enviada com sucesso.')
      //ou
      .contains('Mensagem enviada com sucesso.').should('be.visible')

  })

  it('inserindo um texto grande no campo descriçao de forma rápida', () => {
    const longText = 'teste teste teste teste teste teste teste teste'

    cy.get('#open-text-area').type(longText, { delay: 0 })
  })

  it('validar e-mail com formatação inválida', () => {
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('gonca')
    cy.get('#email').type('jack@hotmailcom')
    cy.get('#open-text-area').type('MENSAGEM DE TESTE')

    cy.get('button[type="submit"]').click()
    cy.get('.error')
      .should('be.visible')
      // .should('have.text', 'Valide os campos obrigatórios!')
      //ou
      .contains('Valide os campos obrigatórios!').should('be.visible')
  })

  it('Campo telefone contínua vazio com valor não númerico', () => {
    cy.get('#phone')
      .type('texto')
      .should('have.value', '')
  })

  it('Valida campo telefone quando o mesmo se torna obrigatório', () => {

    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('gonca')
    cy.get('#email').type('jack@hotmailcom')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('MENSAGEM DE TESTE')

    cy.get('button[type="submit"]').click()
    cy.get('.error')
      .should('be.visible')
      // .should('have.text', 'Valide os campos obrigatórios!')
      // ou
      .contains('Valide os campos obrigatórios!').should('be.visible')
  })

  it('preenche e limpa os campos', () => {
    cy.get('#firstName')
      .type('Jack')
      .should('have.value', 'Jack')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Gonca')
      .should('have.value', 'Gonca')
      .clear()
      .should('have.value', '')
  })

  it('Validar que os campos obrigatórios não foram preenchidos', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  it('envia formulário usando comandos personalizados', () => {
    cy.preencheFormulario()
  })

  it('comando personalizado para preencher nome e sobrenome', () => {
    cy.preenche('jack', 'gonca', 'teste@gmail.com')

  })

  it('usando contains para encontrar elemento', () =>{
    cy.contains('button', 'Enviar').click()
  })

  it('Seleciona o produto (youtube) pelo seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })  

  it('seleciona o produto (Mentoria) pelo seu valor', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona o produto (blog) pelo seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio)=>{
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
        
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')  
      .last()
      .uncheck()
      .should('not.be.checked')
      
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/dia.jpg')
    .should(($input) => {
      console.log($input)
      expect($input[0].files[0].name).to.equal('dia.jpg')
    })

  })

  it('seleciona arquivo simulando drag-and-drop', () => {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/dia.jpg', { action: 'drag-drop'})
    .should(($input) => {
      console.log($input)
      expect($input[0].files[0].name).to.equal('dia.jpg')
    })

  })

  it('seleciona um arquivo utilizando uma fixtures na qual foi dada um alias', () => {
    cy.fixture('dia.jpg').as('arquivoExemplo')
    cy.get('input[type="file"]#file-upload')
      .selectFile('@arquivoExemplo')
      .should(($input) => {
        console.log($input)
        expect($input[0].files[0].name).to.equal('dia.jpg')
      })
  })

  it('verifica que a politica de privacidade abre em outra aba sem a ncessidade de um clique', () => {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it.only('acessa a página de política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')
      //ou
        .should('have.text', 'Talking About Testing')
  })

})