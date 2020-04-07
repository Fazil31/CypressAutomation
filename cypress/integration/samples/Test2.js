/// <reference types="Cypress" />

describe('My second test suite', () => {
    it('Test 1', () => {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice')
        // Check boxes
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.a.checked')
        cy.get('input[type="checkbox"]').check(['option2', 'option3']).should('be.checked')

        // Static drop-down
        cy.get('select#dropdown-class-example').select('option3').should('have.value', 'option3')

        //dynamic drop-down
        cy.get('input#autocomplete').type('au')
        cy.get('ul li.ui-menu-item div.ui-menu-item-wrapper').each((el, index, list) => {
            if(el.text().includes('Saud')){
                el.click()
            }
        })
        cy.get('input#autocomplete').should('contain.value', 'Saudi Arabia')


        // hidden and visible elements
        cy.get('input#displayed-text').should('be.visible')
        cy.get('input#hide-textbox').click()
        cy.get('input#displayed-text').should('not.be.visible')
        cy.get('input#show-textbox').click()
        cy.get('input#displayed-text').should('be.visible')

        // radio buttons
        cy.get('[type="radio"').check(['radio1', 'radio2', 'radio3']).should('be.checked')


    })

})