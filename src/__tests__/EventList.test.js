import { render } from "@testing-library/react";
import EventList from "../components/EventList";
import * as api from "../api";

describe("<EventList /> component", () => {
  let view;
  beforeEach(() => {
    view = render(
      <EventList />
    );
  });

  test("has an element with 'list' role", () => {
    expect(view.queryByRole("list")).toBeInTheDocument();
  })

  test('renders correct number of events', async () => {
    const allEvents = await api.getEvents(); 
    view.rerender(<EventList events={allEvents} />);
expect(view.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});
