import { render } from "@testing-library/react";
import FreeTrial from "../Components/FreeTrial";

describe("Free Trial Component", () => {
  it("Renders the component", () => {
    const { getByText } = render(<FreeTrial />);
    const text = getByText("1 Day Free Trial Active");

    expect(text).toBeInTheDocument();
  });
});
