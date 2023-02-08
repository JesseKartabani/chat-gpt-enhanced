import { render, fireEvent } from "@testing-library/react";
import ModeChanger from "../Components/ModeChanger";

const setSelectedModel = jest.fn();
const clearChat = jest.fn();
const clearInput = jest.fn();
const setIsRateLimited = jest.fn();
const setResponseFailed = jest.fn();
const user = true;

describe("ModeChanger component", () => {
  it("Calls the required functions on button click", () => {
    const { getByText } = render(
      <ModeChanger
        user={user}
        setSelectedModel={setSelectedModel}
        selectedModel="code-davinci-002"
        clearChat={clearChat}
        clearInput={clearInput}
        isLoading={false}
        setResponseFailed={setResponseFailed}
        setIsRateLimited={setIsRateLimited}
      />
    );
    fireEvent.click(getByText("Coding Mode"));

    expect(setSelectedModel).toHaveBeenCalledWith("text-davinci-003");
    expect(clearChat).toHaveBeenCalled();
    expect(clearInput).toHaveBeenCalled();
    expect(setIsRateLimited).toHaveBeenCalledWith(false);
    expect(setResponseFailed).toHaveBeenCalledWith(false);
  });

  it("Displays the correct button text based on the selected model", () => {
    const { getByText, rerender } = render(
      <ModeChanger
        user={user}
        setSelectedModel={setSelectedModel}
        selectedModel="code-davinci-002"
        clearChat={clearChat}
        clearInput={clearInput}
        isLoading={false}
        setResponseFailed={setResponseFailed}
        setIsRateLimited={setIsRateLimited}
      />
    );
    expect(getByText("Coding Mode")).toBeInTheDocument();

    rerender(
      <ModeChanger
        user={user}
        setSelectedModel={setSelectedModel}
        selectedModel="text-davinci-003"
        clearChat={clearChat}
        clearInput={clearInput}
        isLoading={false}
        setResponseFailed={setResponseFailed}
        setIsRateLimited={setIsRateLimited}
      />
    );
    expect(getByText("Text Mode")).toBeInTheDocument();
  });
});
