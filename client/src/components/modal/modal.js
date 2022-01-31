import * as React from "react";
import { Modal } from "react-tiny-modal";
import "./modal.styles.css";

const AppModal = ({ isOpen, handleClose, message }) => {
  return (
    <>
      <Modal
        className="modal"
        onClose={() => handleClose(false)}
        isOpen={isOpen}
      >
        <div className="modal-container">
          <p className="error-message">{message}, please try again</p>
          <button className="btn" onClick={() => handleClose(false)}>
            close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AppModal;
