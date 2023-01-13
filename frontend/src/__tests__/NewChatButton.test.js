import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewChatButton from "../Components/NewChatButton";

describe("New Chat Button", () => {
  it("should render New Chat button", () => {
    const { getByText } = render(<NewChatButton />);
    const div = getByText(/New Chat/);
    expect(div).toHaveClass("new-chat-button");
    expect(div.firstChild).toHaveTextContent("+");
  });

  it("clears messages and input when clicked", () => {
    const clearChat = jest.fn();
    const clearInput = jest.fn();
    const { getByText } = render(
      <NewChatButton clearChat={clearChat} clearInput={clearInput} />
    );
    const button = getByText(/New Chat/);
    fireEvent.click(button);
    expect(clearChat).toHaveBeenCalled();
    expect(clearInput).toHaveBeenCalled();
  });
});
