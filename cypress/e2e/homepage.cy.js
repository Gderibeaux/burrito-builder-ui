describe('homepage', () => {
    beforeEach('visit homepage', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            fixture: 'orderExample.json'
        })

        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
            fixture: 'orderExample2.json'
            
        })
        cy.visit('http://localhost:3000/')
    })

it('Should say pass if true is equal to true', () => {
    expect(true).to.equal(true)
});

//What a user should see on page load
it('Should see a header', () => {
    cy.get('h1').contains('Burrito Builder')
})

it('should have a card that contains a burrito build', () => {
    cy.get('section')
      .get('.order')
})

it('should have a name and ingredients on order card', () => {
    cy.get('.order')
      .get('h3').contains('Pat')
      .get('.ingredient-list')
      .children().should('have.length', 5)
})

it('should have a form with a list of ingredients, input and sumbit button', () => {
    cy.get('form')
      .get('input')
      .get('[name]').should('have.length', 16)
      .get('p')
      .get(':nth-child(15)')
})

//A user should be able click on ingredients and see what they are adding to their order before submitting it
it('should update the order on ingredient clicks', () => {
    cy.get('input[name="name"]').type('John')
      .get('button[name="beans"]').click()
      .get('button[name="steak"]').click()
      .get('button[name="lettuce"]').click()
      .get('p').contains("Order: beans, steak, lettuce")
})

//Once it sumbitted a user should be able to see the new order card
it('should be able to make a post request and see the new order', () => {
    cy.get('input[name="name"]').type('John')
        .should('have.value', 'John')
      .get('button[name="beans"]').click()
      .get('button[name="steak"]').click()
      .get('button[name="lettuce"]').click()
      .get('p').contains("Order: beans, steak, lettuce")
      .get(':nth-child(15)').click()
     cy.get('.order').should('have.length', 2)
     cy.get('section > :nth-child(2)')
      .get(':nth-child(2) > h3').contains('John')
      .get(':nth-child(2) > .ingredient-list')
      .children().should('have.length', 3)
})
})