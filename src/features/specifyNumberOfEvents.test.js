import { render, waitFor, within } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 events are shown by default.", ({
    given,
    when,
    then,
  }) => {
    let view;
    let AppDOM;
    given("a list of events is displayed", () => {
      view = render(<App />);
      AppDOM = view.container;
    });

    let EventListDOM;
    when("the user did not specify how many to display", () => {
      EventListDOM = within(AppDOM).queryByRole("list");
    });

    then("32 events should be displayed", async () => {
      const events = await within(EventListDOM).findAllByRole("listitem");

      expect(events.length).toBe(32);
    });
  });

  test("User can change the number of events displayed.", ({
    given,
    when,
    then,
  }) => {
    let view;
    let AppDOM;
    given("a list of events is displayed", () => {
      view = render(<App />);
      AppDOM = view.container;
    });

    const setNumberOfEvents = 7;
    when("the user specified a number of events to display", async () => {
      const user = userEvent.setup();
      const textboxes = within(AppDOM).queryAllByRole("textbox");
      let boxNumberOfEvents;
      for (let box of textboxes) {
        if (within(box).queryAllByLabelText("Number of events: ")) {
          boxNumberOfEvents = box;
        }
      }

      await user.type(
        boxNumberOfEvents,
        `{backspace}{backspace}${setNumberOfEvents}`
      );
      //console.log(boxNumberOfEvents.value)
    });

    then("as many events as the specified number should be displayed", () => {
      const shownEvents = within(AppDOM).queryAllByRole("listitem");
      //console.log(shownEvents)
      expect(shownEvents.length).toBe(setNumberOfEvents);
    });
  });
});
