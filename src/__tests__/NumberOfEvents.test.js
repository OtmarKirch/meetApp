import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let view
    beforeEach(() => {
    view = render(<NumberOfEvents />);
  });

  test('contains an element with role "textbox"', () => {
    view.rerender(<NumberOfEvents />);
    const boxElement = view.getByRole("textbox");
    expect(boxElement).toBeInTheDocument();
  });
});
