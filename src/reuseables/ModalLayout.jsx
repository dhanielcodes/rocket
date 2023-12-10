import React from "react";
import styled from "styled-components";

export default function ModalLayout({
  children,
  closeModal,
  maxWidth,
  padding,
}) {
  return (
    <ModalLayoutStyle onClick={closeModal}>
      <ModalBody
        style={{ maxWidth: maxWidth, padding: padding }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </ModalBody>
    </ModalLayoutStyle>
  );
}

const ModalLayoutStyle = styled.div`
  background: #0000005d;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  display: grid;
  place-items: center;
  padding: 40px 0;
`;

const ModalBody = styled.div`
  background: white;
  width: 90%;
  max-width: 450px;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 80px;
`;
