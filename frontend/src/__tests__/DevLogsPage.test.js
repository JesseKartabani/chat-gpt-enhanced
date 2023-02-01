import React from "react";
import { render, screen } from "@testing-library/react";
import DevLogsPage from "../Pages/DevLogsPage";
import { MemoryRouter as Router } from "react-router-dom";
import { db } from "../App";

describe("Dev Logs Page", () => {
  it("Renders heading text", () => {
    render(
      <Router>
        <DevLogsPage db={db} />
      </Router>
    );
    expect(screen.getByText("Developer Logs")).toBeInTheDocument();
  });

  it("Renders Return to Home link and is navigable", () => {
    render(
      <Router>
        <DevLogsPage db={db} />
      </Router>
    );
    const returnLink = screen.getByText("Return to Home");
    expect(returnLink).toBeInTheDocument();
    expect(returnLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("Renders Upcoming Updates header", () => {
    render(
      <Router>
        <DevLogsPage db={db} />
      </Router>
    );
    expect(screen.getByText("Upcoming Updates")).toBeInTheDocument();
  });

  it("Renders Recent Updates header", () => {
    render(
      <Router>
        <DevLogsPage db={db} />
      </Router>
    );
    expect(screen.getByText("Recent Updates")).toBeInTheDocument();
  });

  it("Renders Other AI Projects By Me header", () => {
    render(
      <Router>
        <DevLogsPage db={db} />
      </Router>
    );
    expect(screen.getByText("Other AI Projects By Me")).toBeInTheDocument();
  });

  it("Renders the bug report modal", () => {
    render(
      <Router>
        <DevLogsPage db={db} />
      </Router>
    );
    const bugReportModal = screen.getByText("Report Bugs");
    expect(bugReportModal).toBeInTheDocument();
  });

  it("Renders the feature request modal", () => {
    render(
      <Router>
        <DevLogsPage db={db} />
      </Router>
    );
    const featureRequestModal = screen.getByText("Request Feature");
    expect(featureRequestModal).toBeInTheDocument();
  });
});
