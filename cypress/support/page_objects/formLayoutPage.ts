export class FormLayoutPage{
    submitInlineFormWithNameAndEmail(name, email){
        cy.contains('nb-card', 'Inline form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('.native-input.visually-hidden').check({force: true})
            cy.wrap(form).submit()
        })
    }
    submitBasicFormWithNameAndEmail(email, password){
        cy.contains('nb-card', 'Basic form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('.native-input.visually-hidden').check({force: true})
            cy.wrap(form).submit()
        })
    }
}

export const onFormLayoutPage = new FormLayoutPage()