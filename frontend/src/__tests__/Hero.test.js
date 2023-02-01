import { render, cleanup } from "@testing-library/react";
import Hero from "../Components/Hero";

describe("Hero", () => {
  afterEach(cleanup);

  it("Renders the hero heading", () => {
    const { getByText } = render(<Hero />);
    const heroHeading = getByText("ChatGPT Enhanced");

    expect(heroHeading).toBeInTheDocument();
  });

  it("Renders the Examples section", () => {
    const { getByText } = render(<Hero />);
    const examplesHeading = getByText("Examples");
    const firstExample = getByText("Explain quantum computing in simple terms");

    expect(examplesHeading).toBeInTheDocument();
    expect(firstExample).toBeInTheDocument();
  });

  it("Renders the Capabilities section", () => {
    const { getByText } = render(<Hero />);
    const capabilitiesHeading = getByText("Capabilities");
    const firstCapability = getByText(
      "Remembers what user said earlier in the conversation"
    );

    expect(capabilitiesHeading).toBeInTheDocument();
    expect(firstCapability).toBeInTheDocument();
  });

  it("Renders the Limitations section", () => {
    const { getByText } = render(<Hero />);
    const limitationsHeading = getByText("Limitations");
    const firstLimitation = getByText(
      "May occasionally generate incorrect information"
    );

    expect(limitationsHeading).toBeInTheDocument();
    expect(firstLimitation).toBeInTheDocument();
  });
});
