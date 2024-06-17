import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { getEvents, extractLocations } from "../api";

describe("<CitySearch /> component", () => {
  let view;
  beforeEach(() => {
    view = render(<CitySearch />);
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

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    view.rerender(<CitySearch allLocations={allLocations} />);

    // user types "Berlin" in city textbox
    const cityTextBox = view.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }): [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = view.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });
});
