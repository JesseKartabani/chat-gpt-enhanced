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

  const renderBackdrop = (props) => <Backdrop {...props} />;

  const chatRef = ref(db, "features");

  function handleSubmit() {
    console.log(`${input}`);

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
      <button
        type="button"
        className="open-modal-button"
        onClick={() => setShow(true)}
      >
        Request Feature
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
        className="modal"
      >
        <div className="modal-inner-container">
          <h3 id="modal-label">Request Feature</h3>
          <p>
            If you have any feature requests or ideas for improvement, please
            let me know by filling out this form.
          </p>

          <ul>
            <li>Be as specific as possible.</li>
          </ul>

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
