import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChatInputForm from "../Components/ChatInputForm";

afterEach(cleanup);

describe("ChatInputForm component", () => {
  const input = "";
  const setInput = jest.fn();
  const handleSubmit = jest.fn();
  const isLoading = false;
  const user = true;

  it("Renders without crashing", () => {
    render(
      <ChatInputForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        user={user}
      />
    );
  });

  it("Should show the chat input if user is signed in", () => {
    const { getByTestId } = render(
      <ChatInputForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        user={user}
      />
    );
    expect(getByTestId("chat-input-form")).toBeVisible();
  });

  it("Should not show the chat input if user is not signed in", () => {
    const { queryByTestId } = render(
      <ChatInputForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        user={false}
      />
    );
    expect(queryByTestId("chat-input-form")).toBeNull();
  });

  it("Should change input correctly", () => {
    const { getByTestId } = render(
      <ChatInputForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        user={user}
      />
    );
    const textarea = getByTestId("chat-input-textarea");

    fireEvent.change(textarea, { target: { value: "test input" } });
    expect(setInput).toHaveBeenCalledWith("test input");
  });

  it("should call handleSubmit when submit button is clicked", () => {
    const { getByTestId } = render(
      <ChatInputForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        user={user}
      />
    );
    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should change isListening on mic button click", () => {
    const { getByLabelText, getByTestId } = render(
      <ChatInputForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        user={user}
      />
    );

    const micButton = getByLabelText("toggle microphone");

    fireEvent.click(micButton);
    expect(micButton).toHaveClass("listening");

    fireEvent.click(micButton);
    expect(micButton).toHaveClass("not-listening");
  });
});
