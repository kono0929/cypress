import { navigateTo } from "../support/page_objects/navigationPage";
import { onFormLayoutPage } from "../support/page_objects/formLayoutPage";
import { onDatepickerPage } from "../support/page_objects/datepickerPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

// Add comment
describe("Test with Page Objects", () => {
  beforeEach("open application", () => {
    cy.openHomePage();
  });
  it("verify navigation across the pages", () => {
    navigateTo.formLayoutPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });

  it.only(
    "should submit Inline and Basic form and select tomorrow date in the calendar",
    {},
    () => {
      //navigateTo.formLayoutPage()
      //onFormLayoutPage.submitInlineFormWithNameAndEmail('Kaori', 'kaori@test.com')
      //onFormLayoutPage.submitBasicFormWithNameAndEmail('kaori@test.com', 'password')
      // navigateTo.datepickerPage()
      // onDatepickerPage.selectCommonDatepickerDateFromToday(1)
      // onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)
      navigateTo.smartTablePage();
      onSmartTablePage.addNewRecordWithFirstAndLastName("Artem", "Bondar");
      onSmartTablePage.updateAgeByFirstName("Artem", 25);
      onSmartTablePage.deleteRowByIndex(1);
    }
  );
});
