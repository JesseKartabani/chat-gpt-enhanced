import { render, screen, act } from "@testing-library/react";
import NotSubscribedHeading from "../Components/NotSubscribedHeading";
import { MemoryRouter } from "react-router-dom";

describe("Not Subscribed Heading", () => {
  it("Links to the store", async () => {
    render(
      <MemoryRouter>
        <NotSubscribedHeading />
      </MemoryRouter>
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/store");
  });

  it("Renders the heading", async () => {
    render(
      <MemoryRouter>
        <NotSubscribedHeading />
      </MemoryRouter>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const heading = screen.getByText("Visit The Store to Start");
    expect(heading).toBeInTheDocument();
  });
});
