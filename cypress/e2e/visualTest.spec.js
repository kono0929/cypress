describe("visual Test", () => {
  it("visual test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    // cy.get('[for="exampleInputEmail1"]').toMatchImageSnapshot();

    cy.contains("nb-card", "Using the Grid").then(firstForm => {
      cy.wrap(firstForm).toMatchImageSnapshot();
    });
  });
});
