import { render, fireEvent } from "@testing-library/react";
import NewChatButton from "../Components/NewChatButton";

const handleNewChat = jest.fn();

const isLoading = false;

describe("New Chat Button", () => {
  it("Calls the handleClick function when the button is clicked", () => {
    const { getByText } = render(
      <NewChatButton handleNewChat={handleNewChat} isLoading={isLoading} />
    );
    const button = getByText("New Chat");
    fireEvent.click(button);
    expect(handleNewChat).toHaveBeenCalled();
  });

  it("Disables the button while a message is loading", () => {
    const { getByText } = render(
      <NewChatButton handleNewChat={handleNewChat} isLoading={true} />
    );
    const button = getByText("New Chat");
    expect(button).toBeDisabled();
  });
});
