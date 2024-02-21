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
      <Header current={current} useBack={useBack} />
      <br />
      <div className="cont">{children}</div>
      <div
        style={{
          height: "10vh",
          marginTop: "30px",
          background: "#F2F2F2",
        }}
      ></div>
      <AgentNav />
    </Layout>
  );
}

const Layout = styled.div`
  background: #f2f2f2;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  max-width: 420px;
  margin: auto;
  /*  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #41ff8d9b;
    border-radius: 30px;
  } */
`;

export default Agentlayout;
