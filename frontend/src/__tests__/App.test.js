import { render, screen } from "@testing-library/react";
import App from "../App";

test("App Renders", () => {
  render(<App />);
  const linkElement = screen.getByText(/ChatGPT Enhanced/i);
  expect(linkElement).toBeInTheDocument();
});
