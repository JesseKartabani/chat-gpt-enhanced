import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StoreButton from "../Components/StoreButton";

describe("Store Button", () => {
  it("Displays the store button if user is logged in", () => {
    render(
      <MemoryRouter>
        <StoreButton user />
      </MemoryRouter>
    );

    expect(screen.getByText("Store")).toBeInTheDocument();
  });

  it("Does not display the store button if user is not logged in", () => {
    render(
      <MemoryRouter>
        <StoreButton />
      </MemoryRouter>
    );

    expect(screen.queryByText("Store")).toBeNull();
  });

  it("Links to store page", () => {
    render(
      <MemoryRouter>
        <StoreButton user />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link", { name: "Store" });
    expect(linkElement.getAttribute("href")).toBe("/store");
  });
});
