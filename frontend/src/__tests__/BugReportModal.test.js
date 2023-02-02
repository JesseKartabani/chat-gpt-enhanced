import { render, fireEvent } from "@testing-library/react";
import BugReportModal from "../Components/BugReportModal";
import { db } from "../App";

const mockLog = jest.fn();
console.log = mockLog;
const user = true;

test("Bug report form works as expected", () => {
  const { getByPlaceholderText, getByText } = render(
    <BugReportModal db={db} user={user} />
  );

  // Open the modal by clicking the "Report Bugs" button
  fireEvent.click(getByText("Report bugs"));

  // Enter some text into the form textarea
  const textarea = getByPlaceholderText("Describe the bug");
  fireEvent.change(textarea, { target: { value: "Test bug" } });

  // Submit the form
  fireEvent.submit(getByText("Submit"));

  // Check that the bug was logged to the console
  expect(mockLog).toHaveBeenCalledWith("Test bug");
});
