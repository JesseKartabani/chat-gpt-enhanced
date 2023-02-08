import { render, fireEvent } from "@testing-library/react";
import ModeChanger from "../Components/ModeChanger";

const setSelectedModel = jest.fn();
const handleNewChat = jest.fn();
const user = true;

describe("ModeChanger component", () => {
  it("Calls the required functions on button click", () => {
    const { getByText } = render(
      <ModeChanger
        user={user}
        setSelectedModel={setSelectedModel}
        selectedModel="code-davinci-002"
        isLoading={false}
        handleNewChat={handleNewChat}
      />
    );
    fireEvent.click(getByText("Coding Mode"));

    expect(setSelectedModel).toHaveBeenCalledWith("text-davinci-003");
    expect(handleNewChat).toHaveBeenCalled();
  });

  it("Displays the correct button text based on the selected model", () => {
    const { getByText, rerender } = render(
      <ModeChanger
        user={user}
        setSelectedModel={setSelectedModel}
        selectedModel="code-davinci-002"
        isLoading={false}
        handleNewChat={handleNewChat}
      />
    );
    expect(getByText("Coding Mode")).toBeInTheDocument();

    rerender(
      <ModeChanger
        user={user}
        setSelectedModel={setSelectedModel}
        selectedModel="text-davinci-003"
        isLoading={false}
        handleNewChat={handleNewChat}
      />
    );
    expect(getByText("Text Mode")).toBeInTheDocument();
  });
});
