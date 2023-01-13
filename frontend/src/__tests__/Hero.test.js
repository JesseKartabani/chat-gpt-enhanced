import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "../Components/Hero";

describe("Hero component", () => {
  it("renders heading", () => {
    render(<Hero />);
    const heading = screen.getByText("ChatGPT Enhanced");
    expect(heading).toBeInTheDocument();
  });

  it("renders examples section", () => {
    render(<Hero />);
    const examplesHeading = screen.getByText("Examples");
    expect(examplesHeading).toBeInTheDocument();
  });

  it("renders capabilities section", () => {
    render(<Hero />);
    const capabilitiesHeading = screen.getByText("Capabilities");
    expect(capabilitiesHeading).toBeInTheDocument();
  });

  it("renders limitations section", () => {
    render(<Hero />);
    const limitationsHeading = screen.getByText("Limitations");
    expect(limitationsHeading).toBeInTheDocument();
  });
});
