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

  it.only('invoke command', () => {

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    
    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then( label => {
      expect(label.text()).to.equal('Email address')
      expect(label).to.have.class('label')
      expect(label).to.have.text('Email address')
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

  it('assert property', () => {
    cy.visit("/")
    cy.contains("Forms").click()
    cy.contains("Datepicker").click()
    
    function selectDayFromCurrent(day){
      let date = new Date()
      date.setDate(date.getDate() + day)
      let futureDate = date.getDate()
      let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
      let dateAssert = futureMonth + ' ' + futureDate + ', ' + date.getFullYear()
      console.log(dateAssert)
      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
        if(!dateAttribute.includes(futureMonth)){
          cy.get('[data-name="chevron-right"]').click()
          //cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(new RegExp("^" + futureDate + "$")).click()
          selectDayFromCurrent(day)

        }else{
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(new RegExp("^" + futureDate + "$")).click()
        }
      })
      return dateAssert
    }
    
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert =  selectDayFromCurrent(300)
      // cy.get('nb-calendar-day-cell ').contains('17').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)

    })
  })

  it('radio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
      cy.wrap(radioButtons)
        .first()
        .check({force: true})
        .should('be.checked')

      cy.wrap(radioButtons)
      // Get A DOM element at a specific index in an array of elements.
        .eq(1)
        .check({force: true})
      
      cy.wrap(radioButtons)
        //.first()
        .eq(0)
        .should('not.be.checked')
      
      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')

    })
  })

  it('check boxes', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    //This element must be an <input> with type checkbox or radio.
    cy.contains('Toastr').click()

    //Check all checkboxes
    //cy.get('[type="checkbox"]').check({force: true})
    cy.get('[type="checkbox"]').eq(0).click({force: true})
    cy.get('[type="checkbox"]').eq(1).check({force: true})

  })

  it('lists and dropdowns', () => {
    cy.visit('/')
    //1
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    //2
    cy.get('nav nb-select').then( dropdown => {
      cy.wrap(dropdown).click()
      cy.get('.options-list nb-option').each( (listItem, index) => {
        const itemText = listItem.text().trim()

        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }
        
        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
        if( index < 3){
          cy.wrap(dropdown).click()
        }

      })
    })
  })

  it('Web tables', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })

    //2
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then( tableColumns => {
      cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
      cy.wrap(tableColumns).eq(3).should('contain', 'Bondar')
    })

    //3
    const age = [20, 30, 40, 200]

    cy.wrap(age).each( age => {
        cy.get('thead [placeholder="Age"]').click().clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each( tableRow => {
          if(age == 200){
            cy.wrap(tableRow).should('contain', 'No data found')
          }else{
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
          }
      })
    })

  })

  it('tooltip', () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains('nb-card', 'Colored Tooltips')
    cy.contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
  })

  it('dialog box', () => {
    cy.visit("/");
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Are you sure you want to delete?')
    })

    //2
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    //3 when you want to cancel
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)

  })


});
