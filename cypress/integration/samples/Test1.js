/// <reference types="Cypress" />

describe('sample suite', function(){
    
    it('sample test case', function() {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        // narrowing down to visible items only
        cy.get('.product:visible').should('have.length', 4)
        // narrowing down using parent - child chaining with element index
        cy.get('.products').as('productLocator') // using aliases to store locator string
        // console.log is not from cypress, so manually handling the async promise below
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then(()=> console.log('CLICKED'))
        // narrowing down using parent-child chaining by iterating element's
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const vegName = $el.find('h4.product-name').text()
            if(vegName.includes('Cashews')){
                $el.find('button').click()
            }
        })
        // when grabbing element's text in a different line than the one from its parent line
        // working on GreenKart logo
        cy.get('.brand').then((logoElement) => {
            cy.log(logoElement.text())
        })
        cy.get('.brand.greenLogo').should('have.include.text', 'GREEN')

        // proceeding to check out in the application
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        
    })
})