import { render, fireEvent } from "@testing-library/react";
import FeatureRequestModal from "../Components/FeatureRequestModal";
import { db } from "../App";

const mockLog = jest.fn();
console.log = mockLog;

test("Feature request form works as expected", () => {
  const { getByPlaceholderText, getByText } = render(
    <FeatureRequestModal db={db} />
  );

  // Open the modal by clicking the "Request Feature" button
  fireEvent.click(getByText("Request Feature"));

  // Enter some text into the form textarea
  const textarea = getByPlaceholderText("Describe the feature/idea");
  fireEvent.change(textarea, { target: { value: "Test feature" } });

  // Submit the form
  fireEvent.submit(getByText("Submit"));

  // Check that the feature was logged to the console
  expect(mockLog).toHaveBeenCalledWith("Test feature");
});
