import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

When('I open the datastore app', () => {
    cy.visit('/')
})

Then('I should see the Namespaces heading and the datastore tabs', () => {
    cy.get('[data-test="page-header"]').should('exist').contains('Namespaces')
    cy.get('[data-test="datastore-tab-bar-tabs"]').should('exist')
    cy.get('[data-test="centered-loader"]').should('exist')
})

Then('I can click on the datastore tabs', () => {
    cy.get('[data-test="datastore-tab"]').should('have.text', 'DataStore')
    cy.get('[data-test="user-datastore-tab"]')
        .should('have.text', 'UserDataStore')
        .click()
    cy.get('#search').should('exist')
    cy.get('[data-test="create-button"]').should('exist')
    cy.get('[data-test="datastore-items-table"]').should('exist')
})

When('I click the new namespace button', () => {
    cy.visit('/')
    cy.get('[data-test="create-button"]').click()
})

Then('it should launch a new namespace dialog', () => {
    cy.get('[data-test="create-modal"]').should('exist')
    cy.contains('Add New Namespace').should('exist')
    cy.get('#namespace')
    cy.get('#key')
    cy.get('[data-test="cancel-btn"]')
    cy.get('[data-test="add-btn"]')
})

Then('validation of new namespace and key names happens', () => {
    cy.get('#namespace').type('testNamespace')
    cy.get('#key').type('testKey')
    cy.get('[data-test="add-btn"]').click()
})

When('I click on a row in the namespace table', () => {
    cy.visit('/')
    cy.get('[data-test="datastore-items-table"]').should('exist')
    cy.contains('testNamespace').should('exist').click()
})

Then("it should route to the clicked namespace's edit page", () => {
    cy.get('[data-test="keys-panel"]').should('exist')
    cy.contains('Datastore').should('exist')
    cy.contains('testNamespace').should('exist')
    cy.get('#search').should('exist')
    cy.get('[data-test="create-button"]')
        .should('exist')
        .should('have.text', 'New Key')
    cy.get('[data-test="datastore-items-table"]').should('exist')

    cy.get('[data-test="editor-panel"]').should('exist')
    cy.get('[data-test="empty-editor-panel-label"]')
        .should('exist')
        .contains(/Choose a key to start editing/)
})

Then('I can search for keys in the namespace', () => {
    cy.get('#search').type('randomKey')
    cy.get('[data-test="dhis2-uicore-datatablecell"]').should(
        'have.text',
        'No items found'
    )
    cy.get('#search').clear().type('testKey')
    cy.contains('testKey').should('exist')
})

Then('clicking on a key opens the editor panel', () => {
    cy.get('[data-test="editor"]').should('not.exist')
    cy.get('[data-test="close-editor-button"]').should('not.exist')
    cy.get('[data-test="save-changes-button"]').should('not.exist')

    cy.contains('testKey').click()

    cy.get('[data-test="editor-panel-key-label"]')
        .should('exist')
        .contains(/testKey/)
})

// Then("I can create a new key", () => {
//     cy.get('[data-test="create-modal"]').should('exist')
//     cy.contains('Add New Namespace').should('exist')
//     cy.get('#namespace')
//     cy.get('#key')
//     cy.get('[data-test="cancel-btn"]')
//     cy.get('[data-test="add-btn"]')

// })
