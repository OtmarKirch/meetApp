import { render } from "@testing-library/react";
import Event from "../components/Event";
import * as api from "../api";



describe("<Event /> component", () => {
  let view;
  beforeEach(() => {
    view = render(<Event />);
  });

  test("renders an event's title", async () => {
    const events = await api.getEvents();
    const singleEvent = events[0];
    const title = singleEvent.summary;

    view.rerender(<Event singleEvent={singleEvent} />);
    const titleView = view.queryByText(title);
    expect(titleView).toBeInTheDocument();
  });
});
