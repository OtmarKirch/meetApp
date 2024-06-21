import { render, waitFor, within } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import userEvent from "@testing-library/user-event";
import App from "../App";
import * as api from "../api";
import EventList from "../components/EventList";

const feature = loadFeature("./src/features/showHideEventDetails.feature");

defineFeature(feature, (test) => {
  // Scenario 1
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let view;
    let AppDOM;
    let EventListDOM;
    given("a list of events is displayed", () => {
      view = render(<App />);
      AppDOM = view.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");
    });

    when("the user has not toggled event details", async () => {
      await waitFor(() => {
        const eventsShown = within(EventListDOM).queryAllByRole("listitem");
        expect(eventsShown.length).toBe(32);
      });
    });

    then("event details of all events should be collapsed", async () => {
      const eventDetails = AppDOM.querySelector(".details");
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  // Scenario 2
  test("User can expand an event to see details.", ({ given, when, then }) => {
    let view;
    let AppDOM;
    let EventListDOM;
    given("a list of events was displayed", () => {
      view = render(<App />);
      AppDOM = view.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");
    });

    when("the user clicked on an event", async () => {
      await waitFor(() => {
        const eventsShown = within(EventListDOM).queryAllByRole("listitem");
        expect(eventsShown.length).toBe(32);
      });
    });

    let showHideButtons;
    then("the selected event should be expanded with its details", async () => {
      const user = userEvent.setup();
      showHideButtons = within(EventListDOM).queryAllByRole("button");
      for (let button of showHideButtons) {
        await user.click(button);
        expect(button.innerHTML).toBe("Hide Details");
      }
    });
  });

  // Scenario 3
  test("User can collapse an event to hide details.", ({
    given,
    when,
    then,
  }) => {
    let view;
    let AppDOM;
    let EventListDOM;
    given(
      "list of events is displayed with at least one event expanded",
      async () => {
        view = render(<App />);
        AppDOM = view.container;

        EventListDOM = within(AppDOM).queryByRole("list");
      }
    );

    when("the user clicked on an expanded event", async () => {
      const eventsShown = await within(EventListDOM).findAllByRole("listitem");
      expect(eventsShown.length).toBe(32);

      const user = userEvent.setup();
      showHideButtons = within(EventListDOM).queryAllByRole("button");
      for (let button of showHideButtons) {
        await user.click(button);
        expect(button.innerHTML).toBe("Hide Details");
      }
    });

    let showHideButtons;
    then("the view of the selected event should collapse", async () => {
      const user = userEvent.setup();
      showHideButtons = within(EventListDOM).queryAllByRole("button");
      for (let button of showHideButtons) {
        await user.click(button);
        expect(button.innerHTML).toBe("Show Details");
      }
    });
  });
});
