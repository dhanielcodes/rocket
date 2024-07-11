/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

function OneLayout({ children, current, useBack, showNotif = true }) {
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="main">
        <Header current={current} useBack={useBack} showNotif={showNotif} />
        <div className="cont">
          <div className="space"></div>

          {children}
          <div className="space"></div>
        </div>
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
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: #41ff8d9b;
      border-radius: 30px;
    }
  }

  .cont {
    height: 80vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 0px;
    }
    ::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: #41ff8d9b;
      border-radius: 30px;
    }
  }
  .space {
    height: 7vh;
  }
`;

export default OneLayout;
