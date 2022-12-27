describe("our first test", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // by tag name
    cy.get("input");

    //by ID
    cy.get("#inputEmail1");

    //by Class name
    cy.get(".input-full-width");

    //by Attribute name
    cy.get("[placeholder]");

    //by Attribute name and value
    cy.get('[placeholder="Email"]');

    //by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by Tag name and Attribute with value
    cy.get('input[placeholder="Email"]');

    //by two different attributes
    cy.get('[placeholder="Email"][fullwidth]');

    //by tag name, Attribute with value, ID and Class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    
    cy.get('[data-cy="signInButton"]')

    // first Sign in button
    cy.contains('Sign in')
    // second sign in button
    cy.contains('[status="warning"]', 'Sign in')

    cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()

      cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

  });

    it('then and wrap methods', () => {
    cy.visit("/")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    //selenium
    // const firstForm = cy.contains('nb-card', 'Using the Grid')
    // const secondForm = cy.contains('nb-card', 'Basic form')

    // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
    // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
    // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //cypress style
      cy.contains('nb-card', 'Using the Grid').then(firstForm => {
        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
        const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
        expect(emailLabelFirst).to.equal('Email')
        expect(passwordLabelFirst).to.equal('Password')

        cy.contains('nb-card', 'Basic form').then(secondForm => {
          const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
          expect(passwordLabelFirst).to.equal(passwordSecondText)
          // when you want to use cypress commands like should, type, click on an object or jquery element you might want to wrap it first
          // before using the cypress commands.
          // Simply to say, convert non-cypress or non-cypress workable elements or objects into cypress workable things.
          cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
        })

      })

  });

  it('invoke command', () => {

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    
    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then( label => {
      expect(label.text()).to.equal('Email address')
    })

    //3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
      expect(text).to.equal('Email address')
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class') // .attr() method
      //.should('contain', 'checked')
      .then(classValue => {
        expect(classValue).to.contain('checked')
      })

  })

  it.only('assert property', () => {
    cy.visit("/")
    cy.contains("Forms").click()
    cy.contains("Datepicker").click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      cy.get('nb-calendar-day-cell ').contains('17').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', 'Dec 17, 2022')

    })
  })

});
