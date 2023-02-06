import React from "react";
import { render } from "@testing-library/react";
import RateLimitError from "../Components/RateLimitError";

const clearChat = jest.fn();
const setIsLoading = jest.fn();

describe("Rate Limit Error", () => {
  it("Renders the error message", () => {
    const { getByText } = render(
      <RateLimitError clearChat={clearChat} setIsLoading={setIsLoading} />
    );
    const errorMessage = getByText(
      "Too many requests in 1 hour. Try again later."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("Calls the clearChat function and sets isLoading to false", () => {
    render(
      <RateLimitError clearChat={clearChat} setIsLoading={setIsLoading} />
    );
    expect(clearChat).toHaveBeenCalled();
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });
});
