/// <reference types = "Cypress" />

describe('XHR Test Suite', function() {
    it('Mocking API calls with Stubs', function () {
        cy.visit('https://example.cypress.io/commands/network-requests')
        cy.server()

        cy.route({
            method: 'PUT',
            url: 'comments/*',
            status : 404,
            response: { error: 'API call failed!!!'},
            delay : 1000
        }).as('UpdateComment')
        // click update comment button
        cy.get('.network-put.btn.btn-warning').click()
        cy.wait('@UpdateComment')
        // retrieve error message
        cy.get('.network-put-comment').should('contain', 'API call failed!!!')
    })

    it('Handling API calls directly without UI', function() {
        //cy.server()
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
            "name" : "Cypress Automation",
            "isbn": "isbn-f1001",
            "aisle" : "f1001",
            "author": "Rahul Shetty"
        }).then(function(response) {
            expect(response.body).to.have.property("Msg", "successfully added")
            expect(response.body).to.have.property("Id", "isbn-f1001f1001")
            expect(response.status).to.eq(200)
            cy.log(response.body)
            cy.log(response.isbn)
            cy.log(response.aisle)
            cy.log(response.author)
        })
    })
})