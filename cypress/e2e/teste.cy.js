

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
    cy.get('#open-text-area').type(longText, { delay: 0 }) // passa um objeto com valor 0 

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

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')

      })
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
        console.log($input)
        expect($input[0].files[0].name).to.equal('dia.jpg')


      })
  })

  it('seleciona um arquivo simulando drag-and-drop', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/dia.jpg', { action: 'drag-drop' }) //passa um objeto com valor drag-drop
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('dia.jpg')

      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('dia.jpg').as('aquivoExemplo')
    cy.get('#file-upload')
      .selectFile('@aquivoExemplo')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('dia.jpg')

      })

  })

  it('verifica que a política de privacidade abre em outra aba sem necessidade de um clique', function () {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it('verifica que a politica de privacidade e abre em uma outra aba sem a necessidade de clicar', function () {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })

  it('Fazendo o uso das funcionalidades clock e tick', () => {

    cy.clock()

    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('Gonca')
    cy.get('#email').type('Jack@gmail.com')
    cy.get('#open-text-area').type('test')

    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')

  })

  Cypress._.times(3, () => { // funcionalidade para fazer o teste rodar X vezes

    it('marca o tipo de atendimento feedback', function () {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })

  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', ()=>{ //para usar essa funcionalidade é preciso que tenha o display none
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')

      cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')

  })

  it.only('preenche a area de texto usando o comando invoke',()=>{
    const textoLongo = Cypress._.repeat('0123456789', 10)

    cy.get('#open-text-area')
      .invoke('val', textoLongo)
      .should('have.value', textoLongo)

  })

  it('encontra o gato escondido', ()=>{
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')

    cy.get('#title')  
      .invoke('text', 'Mudando texto')
  })

})

