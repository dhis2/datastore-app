import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

When("I open the datastore app", () => {
    cy.visit("/")
})

Then("I should see the Namespaces heading", () => {
    cy.get("[data-test='page-header']")
    .should('exist')
    .contains('Namespaces')
})