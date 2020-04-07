/// <reference types= "Cypress" />

describe ('My third test suite', () => {
    it('My First test case', () => {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice')
        // Cypress auto accepts alert pop-up 
        cy.get('input#alertbtn').click()
        // Cypress auto accepts confirmation pop-up
        cy.get('input#confirmbtn').click()
        // verifying alert pop-up message
        cy.on('window:alert', (alertMessage) => {
            expect(alertMessage).equal('Hello , share this practice page and share your knowledge')
        })
        // verifying confirmation pop-up message
        cy.on('window:confirm', (confirmMessage) => {
            expect(confirmMessage).equal('Hello , Are you sure you want to confirm?')
        })

        

    })


    it('My Second test case', () => {
        // Handling child-tab with cypress's invoke and JQuery's removeattr
        cy.visit('http://qaclickacademy.com/practice.php')
        cy.get('#opentab').invoke('removeAttr', 'target').click() // removing target attribute to open new url in same tab
        // verifying re-directed url
        cy.url().should('include', 'rahulshettyacademy')
        
        // Navigating back and forward in browser
        cy.go('back')
        // Retrieving an element's attribute value
        cy.get('#opentab').then((el) => {
            const hrefValue = el.prop('href')
            cy.log(hrefValue)
        })
        cy.go('forward')
    })

    it('Third Test case', () => {
        // handling tables
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice')
        cy.get('tr td:nth-child(2)').each(($el, index, $list)  => {
            const courseName = $el.text()
            if(courseName.includes('Python')){
                cy.get('tr td:nth-child(2)').eq(index).next().then((priceColumn)=> {
                    const priceValue = priceColumn.text()
                    expect(priceValue).equal('25')
                } ) 
            }
        })
    })


    /* ++++ JQuery functions that are used ++++
        text()
        .invoke('removeAttr', 'target')     ----> JQuery method is removeAttr(attribute)
        .invoke('show')                     ----> JQuery method is show()
    */

    it ('Fourth Test Case', () => {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice')
        // handling mouse hover using JQuery show() method
        // need to use the show() method on the IMMEDIATE parent of the hidden options which are visible when mouse is hovered over them
        cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include', 'top')

        // force click hidden element
        cy.contains('Top').click({force:true})
        cy.url().should('include', 'top')
    })




    it('Fifth Test Case', () => {
        // Cypress allows to visit() different sub domains in a single test case
        // But, it doesn't allow to visit() a different main domain
        // Cypress has no direct support or workaround for handling iFrames

    })
})