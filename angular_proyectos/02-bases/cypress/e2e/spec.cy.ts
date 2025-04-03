const indexFile = "http://localhost:4200/";

describe('template spec', () => {
  beforeEach(() => {
    cy.visit(indexFile);
  })
  it('passes', () => {
    cy.get('input[type="text"]').type("Spiderman");
    cy.get('input[type="number"]').type("34");
    cy.get('button[type="submit"]').click();
  })
})