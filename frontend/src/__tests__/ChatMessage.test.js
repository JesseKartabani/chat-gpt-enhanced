import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ChatMessage from "../Components/ChatMessage";

jest.mock("react-syntax-highlighter", () => {
  return {
    Prism: jest.fn(({ children }) => children),
  };
});

describe("ChatMessage component", () => {
  it("Renders message correctly", () => {
    const message = {
      message: "Hello there!",
      user: "me",
    };
    const { getByText } = render(<ChatMessage message={message} />);
    expect(getByText("Hello there!")).toBeInTheDocument();
  });

  it("Renders the correct user avatar", () => {
    const message = {
      message: "Hello there!",
      user: "gpt",
    };
    const { getByTestId } = render(<ChatMessage message={message} />);
    expect(getByTestId("ai-avatar")).toBeInTheDocument();

    const message2 = {
      message: "Hello there!",
      user: "me",
    };
    const { getByTestId: getByTestId2 } = render(
      <ChatMessage message={message2} />
    );
    expect(getByTestId2("user-avatar")).toBeInTheDocument();
  });

  it("Displays the copy button after typing is done", () => {
    const message = {
      message: "Hello there!",
      user: "gpt",
    };
    const { getByText, queryByText } = render(
      <ChatMessage message={message} />
    );
    expect(queryByText("Copy")).not.toBeInTheDocument();
    // Wait for the typewriter animation to finish
    setTimeout(() => {
      expect(getByText("Copy")).toBeInTheDocument();
    }, 1500);
  });

  it("Copies the text to clipboard", () => {
    const message = {
      message: "Hello there!",
      user: "gpt",
    };
    const { getByText } = render(<ChatMessage message={message} />);
    // Wait for the typewriter animation to finish and the copy button to show
    setTimeout(() => {
      const copyButton = getByText("Copy");
      fireEvent.click(copyButton);
      expect(copyButton.innerHTML).toBe("Copied");
    }, 1500);
  });
});
