import { render } from "@testing-library/react";
import EventList from "../components/EventList";

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

  test("renders correct number of events", () => {
    view.rerender(
      <EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
    );
    expect(view.getAllByRole("listitem")).toHaveLength(4);
  });
});
