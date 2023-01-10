import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewChatButton from "../Components/NewChatButton";

describe("NewChatButton", () => {
  it("should render New Chat button", () => {
    const { getByText } = render(<NewChatButton />);
    const div = getByText(/New Chat/);
    expect(div).toHaveClass("new-chat-button");
    expect(div.firstChild).toHaveTextContent("+");
  });

  it("calls the clearChat prop when clicked", () => {
    const clearChat = jest.fn();
    const { getByText } = render(<NewChatButton clearChat={clearChat} />);
    const button = getByText(/New Chat/);
    fireEvent.click(button);
    expect(clearChat).toHaveBeenCalled();
  });
});
