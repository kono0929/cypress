describe("our first test", () => {

  it("first test", () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // by tag name
    cy.get('input');

    //by ID
    cy.get('#inputEmail1')

    //by Class name
    cy.get('.input-full-width')

    //by Attribute name
    cy.get('[placeholder]')

    //by Attribute name and value
    cy.get('[placeholder="Email"]')

    //by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by Tag name and Attribute with value
    cy.get('input[placeholder="Email"]')

    //by two different attributes
    cy.get('[placeholder="Email"][fullwidth]')

    //by tag name, Attribute with value, ID and Class name
    cy.get('input[placeholder="Email"]#inputmail1.input-full-width')

    //The most recommended way by Cypress
    cy.get('[data-cy="inputEmail"]')


  });

});