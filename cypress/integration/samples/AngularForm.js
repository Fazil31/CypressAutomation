/// <reference types = 'Cypress'/>


describe('Angular Form ', () => {

beforeEach(() =>{
    cy.fixture('Angular/angularForm.json').then(function(data)  {
        
        this.dataz = data
    })
})

    it('First Test: Fill Form', function() {
        cy.visit(Cypress.env('url'))
        cy.get('input[name="name"]:nth-child(2)').type(this.dataz.name)
        cy.get('select#exampleFormControlSelect1').select(this.dataz.gender)
        // validating an element's attribute's value. for example: minLength attribute of ainput field
        cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minLength', '2')

        cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.dataz.name)

        // validating if an element/option is disabled on the screen
        cy.get('#inlineRadio3').should('be.disabled')
    })


    it('Add to cart', function() {
        cy.visit(Cypress.env('url'))
        cy.get('li:nth-child(2) > a').click()
        // Building custom cypress command
        cy.addToCart('Blackberry') // ****** cy.pause() to pause the test *******

        
        // parameterised test using data from JSON file
        this.dataz.products.forEach(function(product) {
            cy.addToCart(product) // ****** can use .debug() for debugging ******           
        })
        cy.get('a.nav-link.btn.btn-primary').click()
        cy.get('button.btn.btn-success').click()
        cy.get("input#country").type('India')
        Cypress.config('defaultCommandTimeout', 10000) // scope of this timeout is only to this test case
        cy.get('body > app-root > app-shop > div > app-checkout > div > div.suggestions > ul > li > a').click()
        cy.get('input#checkbox2').click({force: true})
        cy.get('input.btn.btn-success.btn-lg').click()
        cy.get('.alert').then(function (el) {
            const actualText = el.text()
            expect(actualText.includes("Success")).to.be.true
        })
    })
})