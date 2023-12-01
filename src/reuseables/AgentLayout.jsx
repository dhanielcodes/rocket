/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import Nav from "./Nav";
import AgentNav from "./AgentNav";
import { useNavigate } from "react-router-dom";

function Agentlayout({ children, current, useBack }) {
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  const navigate = useNavigate();

  useEffect(() => {
    if (Userdata?.data?.user?.role?.id === 6) {
      navigate("/user/dashboard");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="main">
        <Header current={current} useBack={useBack} />
        <div className="cont">
          <div className="space"></div>
          {children}
          <div className="space"></div>
        </div>
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

export default Agentlayout;
