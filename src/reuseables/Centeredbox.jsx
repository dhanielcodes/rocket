import React from "react";
import styled from "styled-components";

const Centeredbox = ({ children }) => {
  return (
    <CenteredboxWrapper>
      <InnerContainer>{children}</InnerContainer>
    </CenteredboxWrapper>
  );
};

export default Centeredbox;

const CenteredboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  // height: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 100%;
  padding: 0 2.5%;
`;
