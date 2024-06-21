Feature: Specify Number of Events
 Scenario: When user hasn’t specified a number, 32 events are shown by default.
  Given a list of events is displayed
  When the user did not specify how many to display
  Then 32 events should be displayed
 Scenario: User can change the number of events displayed.
  Given a list of events is displayed
  When the user specified a number of events to display
  Then as many events as the specified number should be displayed