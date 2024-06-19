import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

describe("<NumberOfEvents /> component", () => {
  let view;
  beforeEach(() => {
    view = render(<NumberOfEvents setCurrentNOE={(val)=>{
      console.log("Mock setCurrentNOE called with value: ", val)
    }}/>);
  });

  test('contains an element with role "textbox"', () => {
    const boxElement = view.getByRole("textbox");
    expect(boxElement).toBeInTheDocument();
  });

  test("default number of events is 32", () => {
    const boxElement = view.getByRole("textbox");
    expect(boxElement).toHaveValue("32");
  });

  test("value of number of events changes when user types in the textbox", async () => {  
    const user = userEvent.setup();
    const boxElement = view.getByRole("textbox");
    await user.type(boxElement, '{backspace}{backspace}10');
    expect(boxElement).toHaveValue("10");
  });
});
