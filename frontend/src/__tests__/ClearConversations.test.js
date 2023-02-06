import { remove, ref } from "firebase/database";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ClearConversations from "../Components/ClearConversations";

jest.mock("firebase/database", () => {
  return {
    ref: jest.fn(() => "ref"),
    remove: jest.fn(() => Promise.resolve()),
  };
});

describe("Clear Conversations", () => {
  let user;
  let db;

  beforeEach(() => {
    user = { uid: 123 };
    db = "db";
  });

  it("Should display a confirm button when clear conversations is clicked", () => {
    const { getByText } = render(<ClearConversations user={user} db={db} />);
    fireEvent.click(getByText("Clear conversations"));
    expect(getByText("Confirm clear conversations")).toBeInTheDocument();
  });

  it("Should call firebase remove function when confirm is clicked", async () => {
    const { getByText } = render(<ClearConversations user={user} db={db} />);
    fireEvent.click(getByText("Clear conversations"));
    fireEvent.click(getByText("Confirm clear conversations"));
    expect(remove).toHaveBeenCalled();
  });
});
