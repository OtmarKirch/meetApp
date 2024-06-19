# meetApp
 
This project involves building a serverless, progressive web application (PWA) using React and a test-driven development (TDD) approach. The application leverages the Google Calendar API to fetch upcoming events. By combining serverless and PWA concepts, the application benefits from no backend maintenance, scalability, availability, no idle time costs, instant loading, offline support, push notifications, "add to home screen" prompt, responsive design, and cross-platform compatibility. The TDD approach ensures high-quality code by writing tests before actual functionality. The application also includes data visualization through graphs, enhancing its visual appeal and data interpretation. Users can search for a city and get a list of events hosted in that city. The data visualization component includes a scatter plot showing the number of events in each location and a pie chart visualizing the popularity of event genres.

## Serverless functions
Serverless AWS lambda functions will be used to implement the fuctionality of the app. This includes user access by obtaining and refreshing OAuth2 tokens. The use of the serverless function will allow to scale the app dynamically along with growing user demand.

## User Stories

1. FilterEventsbyCity: As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.

2. Show/HideEventDetails: As a user, I should be able toggle the view of event details so that I make the event details visible or not visible

3. SpecifyNumberofEvents: As a user, I should be able to specify a number of events, so that I am displayed only a list that holds a maximum number of events.

4. UsetheAppWhenOffline: As a user, I should be able to use an offline mode, so that the functionality of the app remains even when offline

5. AddanAppShortcuttotheHomeScreen: As a user, I should be able to click on a Home Button, so that I get to the home screen from anywhere in the app

6. DisplayChartsVisualizingEventDetails: As a user, I should have an option for visualization available, so that I am shown a visualization of the event details.

## Scenarios

### Feature 1: Filter Events By City
#### Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
- Given user hasn’t searched for any city;
- When the user opens the app;
- Then the user should see a list of upcoming events.
#### Scenario 2: User should see a list of suggestions when they search for a city.
- Given the main page is open;
- When user starts typing in the city textbox;
- Then the user should receive a list of cities (suggestions) that match what they’ve typed.
#### Scenario 3: User can select a city from the suggested list.
- Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
- When the user selects a city (e.g., “Berlin, Germany”) from the list;
- Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.
  
### Feature 2: Show/Hide Event Details
#### Scenario 1: An event element is collapsed by default.
- Given a list of events is displayed
- When the user toggles event details
- Then event details of all events should be expanded if they weren't before and vice versa.
#### Scenario 2: User can expand an event to see details.
- A list of events was displayed
- When the user clicked on an event
- Then the selected event should be expanded with its details
#### Scenario 3: User can collapse an event to hide details.
- A list of events is displayed with at least one event expanded
- When the user clicked on an expanded event
- Then the view of the selected event should collapse
- 
### Feature 3: Specify Number of Events
#### Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
- A list of events is displayed
- When the user did not specify how many to display
- Then 32 events should be displayed
#### Scenario 2: User can change the number of events displayed.
- A list of events is displayed
- When the user specified a number of events to display
- Then as many events as the specified number should be displayed
### Feature 4: Use the App When Offline
#### Scenario 1: Show cached data when there’s no internet connection.
- The internet connection was severed
- When the user openes the app
- Then the events should be listed as usual with data from the cache
#### Scenario 2: Show error when user changes search settings (city, number of events).
- The internet connection was severed
- when the user changes the search setting
- Then an error should be displayed that an internet connection is required to change the search

### Feature 5: Add an App Shortcut to the Home Screen
#### Scenario 1: User can install the meet app as a shortcut on their device home screen.
- The user decided to install a shortcut for the meet app
- When the user clicked on "Create home shortcut"
- Then the shortcut should appear on the home screen

### Feature 6: Display Charts Visualizing Event Details
#### Scenario 1: Show a chart with the number of upcoming events in each city.
- The details of an event where displayed
- When the user clicked on a "Visualize event details"
- Then the event details should appear visualized
