import { render, fireEvent } from "@testing-library/react";
import GoogleAuthButtons from "../Components/GoogleAuthButtons";

const handleLogin = jest.fn();
const handleLogout = jest.fn();

describe("Google Auth Buttons", () => {
  it("Renders login button if user is not logged in", () => {
    const { getByText } = render(
      <GoogleAuthButtons
        user={null}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    );

    const loginButton = getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
  });

  it("Renders logout button if user is logged in", () => {
    const { getByText } = render(
      <GoogleAuthButtons
        user={true}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    );

    const logoutButton = getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();
  });

  it("Calls handleLogin when login button is clicked", () => {
    const { getByText } = render(
      <GoogleAuthButtons
        user={null}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    );

    const loginButton = getByText(/Login/i);
    fireEvent.click(loginButton);
    expect(handleLogin).toHaveBeenCalled();
  });

  it("Calls handleLogout when logout button is clicked", () => {
    const { getByText } = render(
      <GoogleAuthButtons
        user={true}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    );

    const logoutButton = getByText(/Logout/i);
    fireEvent.click(logoutButton);
    expect(handleLogout).toHaveBeenCalled();
  });
});
