import React from "react";
import { render, screen } from "@testing-library/react";
import Error404Page from "../Pages/Error404Page";

describe("Error 404 Page", () => {
  it("Renders page not found text", () => {
    render(<Error404Page />);

    const heading = screen.getByText("PAGE NOT FOUND");
    expect(heading).toBeInTheDocument();
  });

  it("Renders a return to home button", () => {
    render(<Error404Page />);

    const button = screen.getByRole("button", { name: "Return To Home" });
    expect(button).toBeInTheDocument();
  });

  it("The return to home button has a working link", () => {
    render(<Error404Page />);

    const link = screen.getByRole("link", { name: "Return To Home" });
    expect(link.getAttribute("href")).toBe(
      "https://chat-gpt-enhanced.web.app/"
    );
  });
});
