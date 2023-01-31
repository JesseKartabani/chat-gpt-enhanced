import Modal from "react-overlays/Modal";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import "./BugReportModal.css";
import { ref, push } from "firebase/database";

const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

function BugReportModal({ db }) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");

  // Create the backdrop component for the modal
  const renderBackdrop = (props) => <Backdrop {...props} />;

  // Connect to the firebase database
  const chatRef = ref(db, "bugs");

  function handleSubmit() {
    console.log(`${input}`);
    // Push the bug to database with a timestamp
    push(chatRef, {
      bug: input,
      timestamp: Date.now(),
    })
      .then(() => {
        console.log("Bug Submitted");
        setInput("");
      })
      .catch((error) => {
        console.log("The write failed...", error);
      });
  }

  return (
    <div className="modal-example">
      {/* Open modal button */}
      <button
        type="button"
        className="open-modal-button"
        onClick={() => setShow(true)}
      >
        Report Bugs
      </button>

      {/* The Modal component */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
        className="modal"
      >
        <div className="modal-inner-container">
          {/* Modal label */}
          <h3 id="modal-label">Submit Bug</h3>
          {/* Introduction to bug report */}
          <p>
            If you have stumbled onto a bug, I will need as much detail as
            possible to find and fix it. Using the field below, please describe
            the issue:
          </p>

          {/* Tips for submitting a bug report */}
          <ul>
            <li>
              <b>Be specific</b> about every step that leads to the problem.
            </li>
            <li>
              <b>Avoid typos or abbreviations,</b> which make bugs much harder
              to track down.
            </li>
            <li>
              Include <b>how long</b> you have been seeing the problem, and{" "}
              <b>how often</b> (if more than once)
            </li>
          </ul>

          {/* The bug report form */}
          <form onSubmit={handleSubmit} className="bug-form">
            <textarea
              className="bug-form-textarea"
              maxLength="1000"
              required={true}
              placeholder="Describe the bug"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <button className="submit-bug-button">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default BugReportModal;
