import React from "react";
import { render } from "@testing-library/react";
import RateLimitError from "../Components/RateLimitError";

describe("Rate Limit Error", () => {
  it("Renders the error message", () => {
    const { getByText } = render(<RateLimitError />);
    const errorMessage = getByText(
      "Too many requests in 1 hour. Try again later."
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
