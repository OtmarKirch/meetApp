import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import * as api from "../api";

describe("<CitySearch /> component", () => {
  let view;
  beforeEach(() => {
    view = render(<CitySearch allLocations={[]}/>);
  });
  test("shows cities matching string", () => {
    const cityTextBox = view.queryByRole("textbox");

    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestion list is hidden by default", () => {
    const suggestionList = view.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    const user = userEvent.setup();
    const cityTextBox = view.queryByRole("textbox");
    await user.click(cityTextBox);
    const suggestionList = view.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await api.getEvents();
    const allLocations = api.extractLocations(allEvents);
    view.rerender(<CitySearch allLocations={allLocations} />);

    // user types "Berlin" in city textbox
    const cityTextBox = view.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = view.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await api.getEvents();
    const allLocations = api.extractLocations(allEvents);
    view.rerender(<CitySearch allLocations={allLocations} />);

    const cityTextBox = view.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = view.queryAllByRole("listitem")[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe("<CitySearch /> integration", () => {
  let view;
  beforeAll(() => {
    view = render(<App />);
  });

  test("renders suggestion list, when app is rendered", async () => {
    const user = userEvent.setup();
    view.rerender(<App />);
    const AppDOM = view.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const cityTextBox = within(CitySearchDOM).queryByRole("textbox");

    await user.click(cityTextBox);

    const allEvents = await api.getEvents();
    const allLocations = api.extractLocations(allEvents);

    const suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(allLocations.length + 1);
  });
});
