import { fireEvent, render } from "@testing-library/react";
import ChatInputForm from "../Components/ChatInputForm";

describe("Chat Input Form", () => {
  it("should render the textarea element", () => {
    const { getByTestId } = render(<ChatInputForm />);
    expect(getByTestId("chat-input-textarea")).toBeInTheDocument();
  });

  it("should render the submit button", () => {
    const { getByTestId } = render(<ChatInputForm />);
    expect(getByTestId("submit-button")).toBeInTheDocument();
  });

  it("should call the handleSubmit prop when the form is submitted", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ChatInputForm handleSubmit={handleSubmit} />
    );
    fireEvent.submit(getByTestId("chat-input-form"));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should call the setInput prop when the value of the textarea changes", () => {
    const setInput = jest.fn();
    const { getByTestId } = render(<ChatInputForm setInput={setInput} />);
    fireEvent.change(getByTestId("chat-input-textarea"), {
      target: { value: "Test input" },
    });
    expect(setInput).toHaveBeenCalledWith("Test input");
  });

  it("should disable the submit button when the isLoading prop is set to true", () => {
    const { getByTestId } = render(<ChatInputForm isLoading={true} />);
    expect(getByTestId("submit-button").disabled).toBe(true);
  });

  it("should enable the submit button when the isLoading prop is set to false", () => {
    const { getByTestId } = render(<ChatInputForm isLoading={false} />);
    expect(getByTestId("submit-button").disabled).toBe(false);
  });
});
