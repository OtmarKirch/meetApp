Feature: Show/Hide Event Details
 Scenario: An event element is collapsed by default.
  Given a list of events is displayed
  When the user has not toggled event details
  Then event details of all events should be collapsed
 Scenario: User can expand an event to see details.
  Given a list of events was displayed
  When the user clicked on an event
  Then the selected event should be expanded with its details
Scenario: User can collapse an event to hide details.
  Given list of events is displayed with at least one event expanded
  When the user clicked on an expanded event
  Then the view of the selected event should collapse