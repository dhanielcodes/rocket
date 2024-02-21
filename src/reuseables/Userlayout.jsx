/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";

function Userlayout({ children, current, useBack }) {
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  const navigate = useNavigate();

  useEffect(() => {
    if (Userdata?.data?.user?.role?.id === 5) {
      navigate("/agent/dashboard");
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.removeItem("userBeneficiaryId");
    localStorage.removeItem("note");
    localStorage.removeItem("payoutChannelId");
    localStorage.removeItem("paymentChannelId");
    localStorage.removeItem("amount");
    localStorage.removeItem("promoCode");
    localStorage.removeItem("purpose");
    localStorage.removeItem("note");

    localStorage.removeItem("country1");
    localStorage.removeItem("country2");
    //eslint-disable-next-line
  }, [window.location.pathname]);

  const { height } = useScreenSize();

  return (
    <Layout>
      <Header current={current} useBack={useBack} />
      <br />
      <div className="cont">{children}</div>
      <div
        style={{
          height: "7vh",
          marginTop: "30px",
          background: "#F2F2F2",
        }}
      ></div>
      {window.location.pathname !== "/upload" && <Nav />}
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
  padding: 0 10px;
  /*  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #41ff8d9b;
    border-radius: 30px;
  } */
`;

export default Userlayout;
