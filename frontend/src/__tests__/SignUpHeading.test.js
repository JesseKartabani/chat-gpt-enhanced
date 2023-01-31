import React from "react";
import { render, screen } from "@testing-library/react";
import SignUpHeading from "../Components/SignUpHeading";

describe("Sign Up Heading", () => {
  it("Displays the 'Login' text", () => {
    render(<SignUpHeading />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("Does not display the loading spinner by default", () => {
    render(<SignUpHeading />);
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  it("Displays the loading spinner when `isLoggingIn` prop is true", () => {
    render(<SignUpHeading isLoggingIn />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
