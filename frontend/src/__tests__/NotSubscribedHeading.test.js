import React from "react";
import { render, screen } from "@testing-library/react";
import NotSubscribedHeading from "../Components/NotSubscribedHeading";
import { MemoryRouter } from "react-router-dom";

describe("Not Subscribed Heading", () => {
  it("Links to the store", () => {
    render(
      <MemoryRouter>
        <NotSubscribedHeading />
      </MemoryRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/store");
  });

  it("Renders the heading", () => {
    render(
      <MemoryRouter>
        <NotSubscribedHeading />
      </MemoryRouter>
    );
    const heading = screen.getByText("Visit The Store to Start");
    expect(heading).toBeInTheDocument();
  });
});
