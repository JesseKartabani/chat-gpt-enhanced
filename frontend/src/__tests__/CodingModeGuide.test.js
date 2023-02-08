import { render, screen } from "@testing-library/react";
import CodingModeGuide from "../Components/CodingModeGuide";

describe("Coding Mode Guide", () => {
  it("Renders nothing when selectedModel is not code-davinci-002", () => {
    render(<CodingModeGuide selectedModel="" />);

    expect(screen.queryByText("Learn how to use coding mode")).toBeNull();
  });

  it("Renders correct link when selectedModel is code-davinci-002", () => {
    render(<CodingModeGuide selectedModel="code-davinci-002" />);
    const link = screen.getByText("Learn how to use coding mode");

    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe(
      "https://platform.openai.com/docs/guides/code/best-practices"
    );
    expect(link.getAttribute("target")).toBe("_blank");
  });
});
