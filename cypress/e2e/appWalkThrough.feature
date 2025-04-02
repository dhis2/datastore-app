Feature: Datastore App Namespaces Page

    Scenario: on page load of the datastore app
        When I open the datastore app
        Then I should see the Namespaces heading and the datastore tabs

    Scenario: then i should be able to click on the datatable rows
        When i click on the first row of the table
        Then it should route to the clicked namespace's edit page