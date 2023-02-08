import { render } from "@testing-library/react";
import ResponseFailedError from "../Components/ResponseFailedError";

describe("Response Failed Error", () => {
  it("Renders the error message", () => {
    const { getByText } = render(<ResponseFailedError />);
    const errorMessage = getByText(
      /There was an error generating your response. Try refreshing./
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
