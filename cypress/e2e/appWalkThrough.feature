Feature: Datastore App

    Scenario: on page load of the datastore app
        When I open the datastore app
        Then I should see the Namespaces heading and the datastore tabs
        Then I can click on the datastore tabs

    Scenario: create a new namespace in the Datastore 
        When I click the new namespace button
        Then it should launch a new namespace dialog
        Then validation of new namespace and key names happens

    Scenario: going to the edit page
        When I click on a row in the namespace table
        Then it should route to the clicked namespace's edit page
        Then I can search for keys in the namespace
        Then clicking on a key opens the editor panel