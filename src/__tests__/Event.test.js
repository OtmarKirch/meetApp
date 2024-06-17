import { render } from "@testing-library/react";
import Event from "../components/Event";
import * as api from "../api";

describe("<Event /> component", () => {
  let view;
  let event;
  let title;

  beforeAll(async () => {
    const allEvents = await api.getEvents();
    event = allEvents[0];
    title = event.summary;
  });

  beforeEach(() => {
    view = render(<Event event={event} />);
  });

  test("renders an event's title", () => {
    view.rerender(<Event event={event} />);
    const titleView = view.queryByText(title);
    expect(titleView).toBeInTheDocument();
  });

  test("renders an events's start time", () => {
    view.rerender(<Event event={event} />);
    const startTimeView = view.queryByText(event.created);
    expect(startTimeView).toBeInTheDocument();
  });

  test("renders an event's location", () => {
    view.rerender(<Event event={event} />);
    const locationView = view.queryByText(event.location);
    expect(locationView).toBeInTheDocument();
  });

  test("renders an event's details button with the title (show details)", () => {
    view.rerender(<Event event={event} />);
    const detailsButton = view.queryByText("Show Details");
    expect(detailsButton).toBeInTheDocument();
  });

  test("by default, the event's details are not shown", () => {
    view.rerender(<Event event={event} />);
    const details = view.container.querySelector(".details");
    expect(details).not.toBeInTheDocument();
  })

});
