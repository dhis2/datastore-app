import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

When('I open the datastore app', () => {
    cy.visit('/')
})

Then('I should see the Namespaces heading and the datastore tabs', () => {
    cy.get('[data-test="page-header"]').should('exist').contains('Namespaces')
    cy.get('[data-test="datastore-tab-bar-tabs"]').should('exist')
    cy.get('[data-test="centered-loader"]').should('exist')
})

When('i click on the first row of the table', () => {
    cy.visit('/')
    cy.get('[data-test="datastore-items-table"]').should('exist')
    cy.get('[data-test="data-table-cell-0"]').click()
})

Then("it should route to the clicked namespace's edit page", () => {
    cy.get('[data-test="keys-panel"]').should('exist')
    cy.get('[data-test="editor-panel"]').should('exist')
    cy.contains('Datastore').should('exist')
})
