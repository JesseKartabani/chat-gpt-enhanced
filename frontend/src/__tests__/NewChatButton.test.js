import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewChatButton from "../Components/NewChatButton";

describe("New Chat Button", () => {
  it("Calls the handleClick function when the button is clicked", () => {
    const clearChat = jest.fn();
    const clearInput = jest.fn();
    const handleNewChat = jest.fn();
    const isLoading = false;

    const { getByText } = render(
      <NewChatButton
        clearChat={clearChat}
        clearInput={clearInput}
        handleNewChat={handleNewChat}
        isLoading={isLoading}
      />
    );
    const button = getByText("New Chat");
    fireEvent.click(button);
    expect(clearChat).toHaveBeenCalled();
    expect(clearInput).toHaveBeenCalled();
    expect(handleNewChat).toHaveBeenCalled();
  });

  it("Disables the button while a message is loading", () => {
    const { getByText } = render(
      <NewChatButton
        clearChat={() => {}}
        clearInput={() => {}}
        handleNewChat={() => {}}
        isLoading={true}
      />
    );
    const button = getByText("New Chat");
    expect(button).toBeDisabled();
  });
});
