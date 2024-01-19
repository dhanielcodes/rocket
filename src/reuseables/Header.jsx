/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { styled } from "styled-components";
import Logo from "../images/logotext.svg";
import { IconNotification } from "@arco-design/web-react/icon";
import { Badge, Space } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";

function Header({ current, useBack }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This navigates back to the previous page in the navigation stack.
  };

  return (
    <HeaderCont>
      <div className="headercont">
        <div className="logo">
          {useBack ? (
            <div className="backward" onClick={goBack}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.66675 16.3639L25.6667 16.3639"
                  stroke="#464F60"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.7332 24.3974L5.66649 16.3654L13.7332 8.33203"
                  stroke="#464F60"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {/* <p>back</p> */}
            </div>
          ) : (
            <img src={Logo} />
          )}
        </div>
        {current && <h4 className="headercurrent">{current}</h4>}
        <div className="notifi">
          <Badge count={3} offset={[1, -1]}>
            <IconNotification
              style={{
                color: "#00A85A",
                fill: "#00A85A",
                fontSize: 28,
                verticalAlign: -3,
              }}
            />
          </Badge>
        </div>
      </div>
    </HeaderCont>
  );
}

const HeaderCont = styled.div`
  height: 7vh;
  position: sticky;
  /* top: 20px; */
  z-index: 9999;
  left: 0;
  right: 0;
  // border: 1px solid red;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  .headercont {
    width: 100%;
    display: flex;
    align-items: center;
    // justify-content: space-around;
    justify-content: space-between;
    padding: 0 7.5%;
    // width: 100%;
    padding-top: 10px;
    height: 100%;
    /* border: 2px solid green; */

    .headercurrent {
      @media screen and (max-width: 40em) {
        width: 100%;
        text-align: center;
      }
      width: 100%;
      text-align: center;
    }

    .logo {
      // width: 61%;
      display: inline-flex;
      justify-content: flex-end;
      flex-direction: row;

      @media screen and (max-width: 40em) {
        justify-content: flex-start;
        padding-inline: 10px;
      }

      img {
        height: 60px;
        padding-block: 10px;
      }
    }

    .notifi {
      // width: 50%;
      display: inline-flex;
      justify-content: center;
      /* padding-inline:8rem; */
      @media screen and (max-width: 40em) {
        padding-inline: 2rem;
      }
    }
  }
`;
export default Header;
