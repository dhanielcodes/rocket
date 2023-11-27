import React from "react";
import styled from "styled-components";

const Box = ({
  children,
  padding,
  margin,
  alignItems,
  justifyContent,
  flexDirection,
}) => {
  return (
    <BoxWrapper
      style={{
        padding: padding ? padding : "20px",
        margin: margin ? margin : "10px 20px",
        flexDirection: flexDirection ? flexDirection : "row",
      }}
    >
      {children}
    </BoxWrapper>
  );
};

export default Box;

const BoxWrapper = styled.div`
  border-radius: 10.733px;
  background: #fff;
  display: flex;
  min-width: 100%;
  width: 100%;
  max-height: 90vh;

  @media screen and (min-width: 550px) {
    margin: 10px 10% !important;
  }
`;
