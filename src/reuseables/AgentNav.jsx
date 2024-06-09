/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function AgentNav() {
  const navigate = useNavigate();
  const changeLocation = () => {
    navigate("/agent/dashboard");
  };

  const customersAllowedLinks = [
    "/agent/customers/details",
    "/agent/customers",
    "/agent/create/customers",
    "/agent/customers/upload",
  ];
  const dashboardAllowedLinks = ["/agent/dashboard", ""];
  const transactionsAllowedLinks = [
    "/agent/transactions/",
    "/agent/transactions/details",
  ];

  return (
    <NavCont>
      <NavContent>
        <Icon
          className={
            dashboardAllowedLinks.includes(window?.location?.pathname)
              ? "active"
              : "inactive"
          }
          onClick={() => navigate("/agent/dashboard")}
        >
          <svg
            width="33"
            height="46"
            viewBox="0 0 22 20"
            fill={
              window.location.pathname === "/agent/dashboard"
                ? "#00A85A"
                : "#909090"
            }
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4701 1.84011C10.6107 1.69966 10.8013 1.62077 11.0001 1.62077C11.1988 1.62077 11.3895 1.69966 11.5301 1.84011L20.2201 10.5301C20.2887 10.6038 20.3715 10.6629 20.4635 10.7039C20.5555 10.7449 20.6549 10.7669 20.7556 10.7687C20.8563 10.7705 20.9563 10.752 21.0497 10.7142C21.1431 10.6765 21.2279 10.6204 21.2991 10.5492C21.3703 10.4779 21.4265 10.3931 21.4642 10.2997C21.5019 10.2063 21.5204 10.1063 21.5187 10.0056C21.5169 9.90489 21.4949 9.80557 21.4539 9.71358C21.4129 9.62158 21.3538 9.53878 21.2801 9.47011L12.5911 0.780113C12.3821 0.571178 12.1341 0.405442 11.8611 0.292367C11.5881 0.179293 11.2956 0.121094 11.0001 0.121094C10.7046 0.121094 10.412 0.179293 10.139 0.292367C9.86605 0.405442 9.61801 0.571178 9.40908 0.780113L0.719081 9.47011C0.582527 9.61163 0.50702 9.80112 0.508821 9.99776C0.510621 10.1944 0.589587 10.3825 0.728709 10.5215C0.867831 10.6605 1.05598 10.7393 1.25263 10.7409C1.44928 10.7425 1.63869 10.6668 1.78008 10.5301L10.4701 1.84011Z"
              fill={
                window.location.pathname === "/agent/dashboard"
                  ? "#00A85A"
                  : "#909090"
              }
            />
            <path
              d="M11 3.43169L19.159 11.5907C19.189 11.6207 19.219 11.6487 19.25 11.6767V17.8747C19.25 18.9097 18.41 19.7497 17.375 19.7497H14C13.8011 19.7497 13.6103 19.6707 13.4697 19.53C13.329 19.3894 13.25 19.1986 13.25 18.9997V14.4997C13.25 14.3008 13.171 14.11 13.0303 13.9694C12.8897 13.8287 12.6989 13.7497 12.5 13.7497H9.5C9.30109 13.7497 9.11032 13.8287 8.96967 13.9694C8.82902 14.11 8.75 14.3008 8.75 14.4997V18.9997C8.75 19.1986 8.67098 19.3894 8.53033 19.53C8.38968 19.6707 8.19891 19.7497 8 19.7497H4.625C4.12772 19.7497 3.65081 19.5521 3.29917 19.2005C2.94754 18.8489 2.75 18.372 2.75 17.8747V11.6767C2.78111 11.6489 2.81146 11.6202 2.841 11.5907L11 3.42969V3.43169Z"
              fill={
                window.location.pathname === "/agent/dashboard"
                  ? "#00A85A"
                  : "#909090"
              }
            />
          </svg>
          <p>Home</p>
        </Icon>
        <Icon
          className={
            customersAllowedLinks.includes(window?.location?.pathname)
              ? "active"
              : "inactive"
          }
          onClick={() => navigate("/agent/customers")}
        >
          <svg
            width="33"
            height="46"
            viewBox="0 0 24 24"
            fill={
              window.location.pathname === "/agent/customers"
                ? "#00A85A"
                : "none"
            }
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1178 7.57528C20.1178 10.1021 18.3796 12.1506 16.2354 12.1506C14.0912 12.1506 12.3531 10.1021 12.3531 7.57528C12.3531 5.04842 14.0912 3 16.2354 3C18.3796 3 20.1178 5.04842 20.1178 7.57528Z"
              fill={
                window.location.pathname === "/agent/customers"
                  ? "#00A85A"
                  : "#909090"
              }
            />
            <path
              d="M24.0001 19.0135C24.0001 21.793 20.0473 20.8436 16.2354 20.8436C12.4236 20.8436 8.4707 21.793 8.4707 19.0135C8.4707 16.2339 12.4236 13.9807 16.2354 13.9807C20.0473 13.9807 24.0001 16.2339 24.0001 19.0135Z"
              fill={
                window.location.pathname === "/agent/customers"
                  ? "#00A85A"
                  : "#909090"
              }
            />
            <path
              d="M14.3295 6.83783C14.3295 9.78583 12.3384 12.1757 9.8824 12.1757C7.42636 12.1757 5.43534 9.78583 5.43534 6.83783C5.43534 3.88983 7.42636 1.5 9.8824 1.5C12.3384 1.5 14.3295 3.88983 14.3295 6.83783Z"
              fill="#909090"
            />
            <path
              d="M18.7765 20.1824C18.7765 23.4252 14.2487 22.3175 9.8824 22.3175C5.5161 22.3175 0.988281 23.4252 0.988281 20.1824C0.988281 16.9396 5.5161 14.3108 9.8824 14.3108C14.2487 14.3108 18.7765 16.9396 18.7765 20.1824Z"
              fill="#909090"
            />
            <path
              d="M14.3295 6.83783C14.3295 9.78583 12.3384 12.1757 9.8824 12.1757C7.42636 12.1757 5.43534 9.78583 5.43534 6.83783C5.43534 3.88983 7.42636 1.5 9.8824 1.5C12.3384 1.5 14.3295 3.88983 14.3295 6.83783Z"
              stroke="#FAFAFA"
              stroke-width="0.588235"
            />
            <path
              d="M18.7765 20.1824C18.7765 23.4252 14.2487 22.3175 9.8824 22.3175C5.5161 22.3175 0.988281 23.4252 0.988281 20.1824C0.988281 16.9396 5.5161 14.3108 9.8824 14.3108C14.2487 14.3108 18.7765 16.9396 18.7765 20.1824Z"
              stroke="#FAFAFA"
              stroke-width="0.588235"
            />
          </svg>
          <p>Customers</p>
        </Icon>
        <Icon
          onClick={() => navigate("/agent/update-rate")}
          className={
            window.location.pathname === "/agent/customers"
              ? "transfer"
              : "inactive transfer"
          }
        >
          <svg
            width="56"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="46" height="46" rx="23" fill="#00A85A" />
            <path
              d="M18.2469 16C18.3456 15.9994 18.4434 16.0183 18.5348 16.0557C18.6262 16.093 18.7093 16.148 18.7794 16.2175L23.2794 20.7175C23.3489 20.7876 23.4039 20.8707 23.4412 20.9621C23.4785 21.0534 23.4974 21.1513 23.4969 21.25C23.4981 21.3475 23.4802 21.4443 23.4444 21.535C23.3876 21.6731 23.2909 21.7912 23.1666 21.874C23.0424 21.9569 22.8962 22.0007 22.7469 22H20.4969V28.75C20.4969 28.9489 20.4178 29.1397 20.2772 29.2803C20.1365 29.421 19.9458 29.5 19.7469 29.5H16.7469C16.5479 29.5 16.3572 29.421 16.2165 29.2803C16.0759 29.1397 15.9969 28.9489 15.9969 28.75V22H13.7469C13.5985 21.9994 13.4537 21.9548 13.3307 21.8719C13.2077 21.7889 13.1121 21.6714 13.0559 21.5341C12.9997 21.3969 12.9855 21.246 13.015 21.1006C13.0446 20.9553 13.1165 20.822 13.2219 20.7175L17.7219 16.2175C17.8616 16.0789 18.0501 16.0008 18.2469 16Z"
              fill="white"
            />
            <path
              d="M28.4953 29.748C28.3966 29.7486 28.2988 29.7297 28.2074 29.6924C28.116 29.6551 28.0329 29.6001 27.9628 29.5305L23.4628 25.0305C23.3933 24.9605 23.3383 24.8774 23.301 24.786C23.2637 24.6946 23.2448 24.5968 23.2453 24.498C23.2441 24.4005 23.262 24.3037 23.2978 24.213C23.3546 24.0749 23.4513 23.9568 23.5756 23.874C23.6998 23.7912 23.846 23.7473 23.9953 23.748H26.2453V16.998C26.2453 16.7991 26.3243 16.6084 26.465 16.4677C26.6057 16.3271 26.7964 16.248 26.9953 16.248H29.9953C30.1942 16.248 30.385 16.3271 30.5257 16.4677C30.6663 16.6084 30.7453 16.7991 30.7453 16.998V23.748H32.9953C33.1437 23.7487 33.2885 23.7933 33.4115 23.8762C33.5345 23.9591 33.6301 24.0766 33.6863 24.2139C33.7425 24.3512 33.7567 24.502 33.7272 24.6474C33.6976 24.7928 33.6256 24.9261 33.5203 25.0305L29.0203 29.5305C28.8806 29.6691 28.6921 29.7472 28.4953 29.748Z"
              fill="white"
            />
          </svg>

          <p>Update Rate</p>
        </Icon>
        <Icon
          className={
            transactionsAllowedLinks.includes(window.location.pathname)
              ? "active"
              : "inactive"
          }
          onClick={() => navigate("/agent/transactions/")}
        >
          <svg
            width="33"
            height="46"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4915 3.00349C7.40153 2.86349 3.23153 6.95349 3.23153 12.0035H2.58151C2.13151 12.0035 1.73151 12.0035 2.23151 12.8535L3.88153 15.6535C4.08153 15.8535 4.39153 15.8535 4.59153 15.6535L6.09151 12.8535C6.16061 12.783 6.2073 12.6936 6.2257 12.5966C6.24409 12.4996 6.23336 12.3994 6.19486 12.3085C6.15636 12.2176 6.09182 12.1401 6.00936 12.0858C5.9269 12.0316 5.83023 12.0029 5.73151 12.0035H5.23153C5.23153 8.10349 8.41153 4.95349 12.3315 5.00349C16.0515 5.05349 19.1815 8.18349 19.2315 11.9035C19.2815 15.8135 16.1315 19.0035 12.2315 19.0035C10.6215 19.0035 9.13153 18.4535 7.95153 17.5235C7.76 17.3726 7.51968 17.2974 7.2763 17.3121C7.03292 17.3269 6.80344 17.4306 6.63153 17.6035C6.21153 18.0235 6.24153 18.7335 6.71153 19.0935C8.28266 20.336 10.2285 21.0092 12.2315 21.0035C17.2815 21.0035 21.3715 16.8335 21.2315 11.7435C21.1015 7.05349 17.1815 3.13349 12.4915 3.00349ZM11.9815 8.00349C11.5715 8.00349 11.2315 8.34349 11.2315 8.75349V12.4335C11.2315 12.7835 11.4215 13.1135 11.7215 13.2935L14.8415 15.1435C15.2015 15.3535 15.6615 15.2335 15.8715 14.8835C16.0815 14.5235 15.9615 14.0635 15.6115 13.8535L12.7315 12.1435V8.74349C12.7315 8.34349 12.3915 8.00349 11.9815 8.00349Z"
              fill="#909090"
            />
          </svg>
          <p>History</p>
        </Icon>
        <Icon
          className={
            window.location.pathname === "/agent/setting"
              ? "active"
              : "inactive"
          }
          onClick={() => navigate("/agent/setting")}
        >
          <svg
            width="33"
            height="46"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0124 2.25C12.7464 2.25846 13.4775 2.34326 14.1939 2.50304C14.5067 2.57279 14.7406 2.83351 14.7761 3.15196L14.9463 4.67881C15.0233 5.37986 15.6152 5.91084 16.3209 5.91158C16.5105 5.91188 16.6982 5.87238 16.8734 5.79483L18.2741 5.17956C18.5654 5.05159 18.9057 5.12136 19.1232 5.35362C20.1354 6.43464 20.8892 7.73115 21.3279 9.14558C21.4225 9.45058 21.3137 9.78203 21.0566 9.9715L19.8151 10.8866C19.461 11.1468 19.2518 11.56 19.2518 11.9995C19.2518 12.4389 19.461 12.8521 19.8159 13.1129L21.0585 14.0283C21.3156 14.2177 21.4246 14.5492 21.3299 14.8543C20.8914 16.2685 20.138 17.5649 19.1264 18.6461C18.9091 18.8783 18.569 18.9483 18.2777 18.8206L16.8714 18.2045C16.4691 18.0284 16.007 18.0542 15.6268 18.274C15.2466 18.4937 14.9935 18.8812 14.9452 19.3177L14.7761 20.8444C14.7413 21.1592 14.5124 21.4182 14.2043 21.4915C12.7558 21.8361 11.2467 21.8361 9.79828 21.4915C9.49015 21.4182 9.26129 21.1592 9.22643 20.8444L9.0576 19.32C9.00802 18.8843 8.75459 18.498 8.37467 18.279C7.99475 18.06 7.53345 18.0343 7.13244 18.2094L5.72582 18.8256C5.43446 18.9533 5.09428 18.8833 4.87703 18.6509C3.86487 17.5685 3.11144 16.2705 2.67344 14.8548C2.57911 14.5499 2.68811 14.2186 2.94509 14.0293L4.18842 13.1133C4.54256 12.8531 4.75172 12.4399 4.75172 12.0005C4.75172 11.561 4.54256 11.1478 4.18796 10.8873L2.94541 9.97285C2.68804 9.78345 2.57894 9.45178 2.67361 9.14658C3.11236 7.73215 3.86619 6.43564 4.87837 5.35462C5.09584 5.12236 5.43618 5.05259 5.72749 5.18056L7.12786 5.79572C7.53081 5.97256 7.99404 5.94585 8.37601 5.72269C8.75633 5.50209 9.00953 5.11422 9.05841 4.67764L9.22849 3.15196C9.26401 2.83335 9.49811 2.57254 9.81105 2.50294C10.5283 2.34342 11.2602 2.25865 12.0124 2.25ZM11.9999 8.99995C10.3431 8.99995 8.99994 10.3431 8.99994 12C8.99994 13.6568 10.3431 15 11.9999 15C13.6568 15 14.9999 13.6568 14.9999 12C14.9999 10.3431 13.6568 8.99995 11.9999 8.99995Z"
              fill="#909090"
            />
          </svg>
          <p>Settings</p>
        </Icon>
      </NavContent>
    </NavCont>
  );
}

const NavCont = styled.div`
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 440px;
  z-index: 20;

  > ::-webkit-scrollbar {
    display: none !important ;
  }
`;

const NavContent = styled.div`
  width: 100%;

  @media screen and (max-width: 40em) {
    /* display: none; */
    width: 90%;
  }

  margin: 0 auto;
  border-top: 0.2px solid #909090;
  height: 100%;
  display: flex;
  z-index: 0;
  justify-content: space-around;

  .transfer {
    margin-top: -20px;
    border-top: none;
    font-weight: bold;
    color: rgba(144, 144, 144, 1);
  }

  .active {
    border-top: #00a85a 2px solid;
    z-index: 99999;
    margin-top: -1.5px;
    vertical-align: middle;
    color: #00a85a;
    font-weight: bold;
    /* padding-block: 5px; */
    display: flex;
    flex-direction: column;
  }

  .inactive {
    border: none;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-weight: bold;
    color: rgba(144, 144, 144, 1);

    > p {
      text-align: center;
    }
  }
`;

const Icon = styled.div`
  /* border: 1px solid red; */
  /* display: inline-flex; */
  /* padding: 5px; */
  text-align: center;
  /* display: inline-flex;
    flex-direction: column;
    justify-content: center; */
  z-index: 99999;
  /* margin-top: -1.5px; */
  /* padding-block: 5px; */

  svg {
    margin-left: 3px;
  }

  p {
    /* display: none; */
    font-size: 10px;
    text-align: center;
  }
`;

export default AgentNav;
