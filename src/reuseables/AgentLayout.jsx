/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import Nav from "./Nav";
import AgentNav from "./AgentNav";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";

function Agentlayout({ children, current, useBack }) {
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  const navigate = useNavigate();

  useEffect(() => {
    if (Userdata?.data?.user?.role?.id === 6) {
      navigate("/user/dashboard");
    }
    //eslint-disable-next-line
  }, []);

  const { height } = useScreenSize();

  return (
    <Layout>
      <div
        className="main"
        style={{
          height: height - 100 + "px",
        }}
      >
        <Header current={current} useBack={useBack} />
        <div className="cont">{children}</div>
        <AgentNav />
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
    // height: 90vh;
    overflow: hidden;
    overflow-y: scroll;
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
    padding-top: 20px;
  }
`;

export default Agentlayout;
