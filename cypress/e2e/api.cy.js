it('fazendo uma requisição HTTP',()=>{
    cy.request({
        method: 'GET',
        url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    }).then((resposta)=>{
        console.log(resposta)
        expect(resposta.status).to.equal(200)
        expect(resposta.statusText).to.equal('OK')
        expect(resposta.body).is.not.empty
        expect(resposta.body).to.include('CAC TAT')

    })

})

it('Fazendo requisição http', ()=>{
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should((resp)=>{
            console.log(resp)
            const { status, statusText, body } = resp
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
})