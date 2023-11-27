/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

// CSS styles for the modal
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    position: "relative",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  closeButton: {
    position: "absolute",
    top: "10px",
    fontSize: "20px",
    right: "10px",
    cursor: "pointer",
  },

  span: {
    width: "300px",
    display: "grid",
    placeItems: "center",
    justifyContent: "center",
  },
};

function ReusableModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <span onClick={onClose} style={modalStyles.closeButton}>
          &#x2715;
        </span>
        <div style={modalStyles.span}>{children}</div>
      </div>
    </div>
  );
}

export default ReusableModal;
