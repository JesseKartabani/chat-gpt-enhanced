import { render, fireEvent } from "@testing-library/react";
import ChatMessage from "../Components/ChatMessage";

describe("Chat Messages", () => {
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    delete HTMLElement.prototype.scrollIntoView;
  });

  it("Renders chat messages", () => {
    const message = { message: "Hello", user: "gpt" };
    const { getByTestId } = render(<ChatMessage message={message} />);
    const parentElement = getByTestId("ai-message");

    setTimeout(() => {
      expect(parentElement).toHaveTextContent("Hello");
    }, 500);
  });

  it("Renders an avatar for user", () => {
    const message = { message: "Hello", user: "me" };
    const { getByTestId } = render(<ChatMessage message={message} />);
    expect(getByTestId("user-avatar")).toBeInTheDocument();
  });

  it("renders an avatar for AI", () => {
    const message = { message: "Hello", user: "gpt" };
    const { getByTestId } = render(<ChatMessage message={message} />);
    expect(getByTestId("ai-avatar")).toBeInTheDocument();
  });
});
