
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
            //cy.get('.day-cell').not('.bounding-month').contains(new RegExp("^\s?" + futureDate + "\s?$")).click()
            cy.get('.day-cell').not('.bounding-month').contains(new RegExp("^\\s?" + futureDate + "\\s?$")).click()
        }
    })
    return dateAssert
}

export class DatepickerPage{

    selectCommonDatepickerDateFromToday(dayFromToday){
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
        cy.wrap(input).click()
        let dateAssert =  selectDayFromCurrent(dayFromToday)
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)

        })
    }
    selectDatepickerWithRangeFromToday(firstDay, secondDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssertFirst =  selectDayFromCurrent(firstDay)
            let dateAssertSecond =  selectDayFromCurrent(secondDay)
            const finalDate = dateAssertFirst + ' - ' + dateAssertSecond
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            cy.wrap(input).should('have.value', finalDate)
        })
    }
}

export const onDatepickerPage = new DatepickerPage()