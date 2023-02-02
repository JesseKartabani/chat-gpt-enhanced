import { render, screen } from "@testing-library/react";
import Disclaimer from "../Components/Disclaimer";

describe("Disclaimer", () => {
  it("Renders disclaimer text", () => {
    render(<Disclaimer />);
    expect(
      screen.getByText("Not affiliated with or endorsed by OpenAI")
    ).toBeInTheDocument();
  });
});
