import { render, within, waitFor } from "@testing-library/react";
import EventList from "../components/EventList";
import App from "../App";
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

describe("<EventList /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    const view = render(<App />);
    const AppDOM = view.container.firstChild;
    const EventListDOM = AppDOM.querySelector("#event-list");
    await waitFor(()=>{
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(32);
    })
  });
});