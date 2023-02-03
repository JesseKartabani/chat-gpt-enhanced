import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ClearConversations from "../Components/ClearConversations";
import { remove } from "firebase/database";

jest.mock("firebase/database", () => ({
  remove: jest.fn(() => Promise.resolve()),
}));

describe("Clear Conversations", () => {
  it("Shows the confirm button when the clear conversations button is clicked", async () => {
    const db = {};
    const user = { uid: "123" };
    const { getByText } = render(<ClearConversations db={db} user={user} />);

    fireEvent.click(getByText("Clear conversations"));
    expect(getByText("Confirm clear conversations")).toBeInTheDocument();
  });

  it("Calls the remove function from firebase/database when the confirm button is clicked", async () => {
    const db = {};
    const user = { uid: "123" };
    const { getByText } = render(<ClearConversations db={db} user={user} />);

    fireEvent.click(getByText("Clear conversations"));
    fireEvent.click(getByText("Confirm clear conversations"));
    expect(remove).toHaveBeenCalledWith(`messages/${user.uid}`, db);
  });
});
