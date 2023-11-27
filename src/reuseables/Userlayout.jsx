/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { styled } from "styled-components";
import Header from "./Header";
import Nav from "./Nav";

function Userlayout({ children, current, useBack }) {
  return (
    <Layout>
      <div className="main">
        <Header current={current} useBack={useBack} />
        <div className="cont">
          <div className="space"></div>

          {children}
          <div className="space"></div>
        </div>

        {window.location.pathname !== "/upload" && <Nav />}
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  height: 100vh;
  background: #f2f2f2;
  padding: 0;
  margin: 0;

  .main {
    max-width: 440px;
    width: 100%;
    margin: 0 auto;
  }

  .cont {
    height: 80vh;
    overflow-y: scroll;
  }
  .space {
    height: 7vh;
  }
`;

export default Userlayout;
