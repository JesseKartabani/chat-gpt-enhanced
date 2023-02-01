import { render, screen } from "@testing-library/react";
import Disclaimer from "../Components/Disclaimer";
import { MemoryRouter } from "react-router-dom";

describe("Disclaimer", () => {
  it("Renders disclaimer text", () => {
    render(
      <MemoryRouter>
        <Disclaimer />
      </MemoryRouter>
    );
    expect(
      screen.getByText("Not affiliated with or endorsed by OpenAI")
    ).toBeInTheDocument();
  });

  it("Development log link is present and navigable", () => {
    render(
      <MemoryRouter>
        <Disclaimer />
      </MemoryRouter>
    );
    expect(
      screen.getByText(
        "Development Progress, Bug Reports, and Feature Requests"
      )
    ).toBeInTheDocument();
    expect(
      screen
        .getByText("Development Progress, Bug Reports, and Feature Requests")
        .closest("a")
    ).toHaveAttribute("href", "/developer-logs");
  });
});
