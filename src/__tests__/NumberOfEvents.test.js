import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let view
    beforeEach(() => {
    view = render(<NumberOfEvents />);
  });

  test('contains an element with role "textbox"', () => {
    const boxElement = view.getByRole("textbox");
    expect(boxElement).toBeInTheDocument();
  });

  test("default number of events is 32", () => {
    const boxElement = view.getByRole("textbox");
    expect(boxElement).toHaveValue("32");
  }
    );
});
