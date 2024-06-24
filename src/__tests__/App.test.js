// src/__tests__/App.test.js

import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as api from "../api";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render city search", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("render number of events", () => {
    expect(AppDOM.querySelector("#event-number")).toBeInTheDocument();
  });
});

describe("<App /> integration", () => {
  let view;
  beforeEach(() => {
    view = render(<App />)
  });

  test("displays list of events matching the city selected by user", async () => {
    const user = userEvent.setup();
    const AppDOM = view.container.firstChild;
    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText("Berlin, Germany");

    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await api.getEvents();
    const berlinEvents = allEvents.filter((event) => event.location === "Berlin, Germany");
    
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
   
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  })

  test("displays a number of events as spedicified by the user", async () => {
    const user = userEvent.setup();
    const AppDOM = view.container.firstChild;
    const NumberDisplayDOM = AppDOM.querySelector("#event-number")
    const NumberDisplayInput = within(NumberDisplayDOM).queryByRole("textbox")
    
    const numberSpecifiedByUser = 11
    await user.type(NumberDisplayInput, `{backspace}{backspace}${numberSpecifiedByUser}`);

    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem")

    const allEvents = await api.getEvents()
    const numberOfEvents = allEvents.slice(0, numberSpecifiedByUser)

    expect(allRenderedEventItems.length).toBe(numberOfEvents.length)

  });

  test("if user types a city not in the list, a warning should appear", async () => {
    const user = userEvent.setup();
    const AppDOM = view.container
    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    await user.type(CitySearchInput, "Berrlin");
    let infoAlert = AppDOM.querySelector(".Alert")
    expect(infoAlert.textContent).toBe("We cannot find the city you are looking for. Please try another city.")

    await user.type(CitySearchInput, `{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Berlin`);
    const infoAlertText = await within(infoAlert).findByText("We cannot find the city you are looking for. Please try another city.")
    expect(infoAlertText).not.toBeInTheDocument()
  })

  test("if user types non number characters for the number of events, a warning should appear", async () =>{
    const user = userEvent.setup();
    const AppDOM = view.container
    const NumberDisplayDOM = AppDOM.querySelector("#event-number")
    const NumberDisplayInput = within(NumberDisplayDOM).queryByRole("textbox")
    
    const valueSpecifiedByUser = "a"
    await user.type(NumberDisplayInput, `${valueSpecifiedByUser}`);

    const infoAlert = AppDOM.querySelector(".Alert")
    expect(infoAlert.textContent).toBe("You can only use numbers to set the number of events shown.")

    await user.type(NumberDisplayInput, `{backspace}`)
    const infoAlertText = await within(infoAlert).findByText("You can only use numbers to set the number of events shown.")
    expect(infoAlertText).not.toBeInTheDocument()

  })
});