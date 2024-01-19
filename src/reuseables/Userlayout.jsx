/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

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

  const layo = window.innerHeight;

  return (
    <Layout>
      <div
        className="main"
        style={{
          height: "100vh",
        }}
      >
        <Header current={current} useBack={useBack} />
        <div className="cont">{children}</div>
        {window.location.pathname !== "/upload" && <Nav />}
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  background: #f2f2f2;
  padding: 0;
  margin: 0;

  .main {
    max-width: 440px;
    width: 100%;
    margin: 0 auto;
    // height: 90vh;
  }
  .cont {
    height: 86vh;
    overflow: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: #41ff8d9b;
      border-radius: 30px;
    }
  }
`;

export default Userlayout;
