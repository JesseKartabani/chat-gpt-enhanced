import Modal from "react-overlays/Modal";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import "./FeatureRequestModal.css";
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

function FeatureRequestModal({ db }) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");

  // Create the backdrop component for the modal
  const renderBackdrop = (props) => <Backdrop {...props} />;

  const chatRef = ref(db, "features");

  function handleSubmit() {
    console.log(`${input}`);

    // Push the feature to database with a timestamp
    push(chatRef, {
      feature: input,
      timestamp: Date.now(),
    })
      .then(() => {
        console.log("feature Submitted");
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
        Request Feature
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
          <h3 id="modal-label">Request Feature</h3>
          {/* Introduction to feature request */}
          <p>
            If you have any feature requests or ideas for improvement, please
            let me know by filling out this form.
          </p>

          {/* Tips for submitting a feature request */}
          <ul>
            <li>Be as specific as possible.</li>
          </ul>

          {/* The feature request form */}
          <form onSubmit={handleSubmit} className="feature-form">
            <textarea
              className="feature-form-textarea"
              maxLength="1000"
              required={true}
              placeholder="Describe the feature/idea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <button className="submit-feature-button">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default FeatureRequestModal;
