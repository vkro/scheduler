describe("Appointments", () => {
  
  it("should book an appointment", () => {
    cy.visit("/");
    cy.contains("Monday");

    cy.get("[alt=Add]")
    .first()
    .click();

  })
});