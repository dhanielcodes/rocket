/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
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
