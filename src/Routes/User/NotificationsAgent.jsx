/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Input, Skeleton, Space } from "@arco-design/web-react";
import { Avatar, Typography } from "@arco-design/web-react";
import { Dropdown, Menu, Divider } from "@arco-design/web-react";
import {
  IconDown,
  IconMoreVertical,
  IconAlignCenter,
} from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tranx, Tranx2, notifs, updateNotif } from "../../services/Dashboard";
import { Transactions as Trnx } from "../../../config/Test";
import { useQuery, useMutation } from "@tanstack/react-query";
import AmountFormatter from "../../reuseables/AmountFormatter";
import moment from "moment";
import Agentlayout from "../../reuseables/AgentLayout";

const Droplist = (
  <Menu>
    <IconMoreVertical />
    <Menu.Item key="1" onClick={() => useNavigate("/user/beneficiary/details")}>
      <span>
        <svg
          width="30"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0653 12.8512 14.2174 12.5 13.3334 12.5H6.66671C5.78265 12.5 4.93481 12.8512 4.30968 13.4763C3.68456 14.1014 3.33337 14.9493 3.33337 15.8333V17.5M13.3334 5.83333C13.3334 7.67428 11.841 9.16667 10 9.16667C8.15909 9.16667 6.66671 7.67428 6.66671 5.83333C6.66671 3.99238 8.15909 2.5 10 2.5C11.841 2.5 13.3334 3.99238 13.3334 5.83333Z"
            stroke="#464F60"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      View Details
    </Menu.Item>
    <Menu.Item key="2">
      <svg
        width="30"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.1666 2.5009C14.3855 2.28203 14.6453 2.10842 14.9313 1.98996C15.2173 1.87151 15.5238 1.81055 15.8333 1.81055C16.1428 1.81055 16.4493 1.87151 16.7353 1.98996C17.0213 2.10842 17.2811 2.28203 17.5 2.5009C17.7188 2.71977 17.8924 2.97961 18.0109 3.26558C18.1294 3.55154 18.1903 3.85804 18.1903 4.16757C18.1903 4.4771 18.1294 4.7836 18.0109 5.06956C17.8924 5.35553 17.7188 5.61537 17.5 5.83424L6.24996 17.0842L1.66663 18.3342L2.91663 13.7509L14.1666 2.5009Z"
          stroke="#464F60"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Edit
    </Menu.Item>
    <Menu.Item key="3">
      <svg
        width="30"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.83337 14.1673L14.1667 5.83398M14.1667 5.83398H5.83337M14.1667 5.83398V14.1673"
          stroke="#464F60"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Send Money
    </Menu.Item>
    <Menu.Item key="3">
      <svg
        width="30"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_151_25216)">
          <path
            d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
            stroke="#464F60"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_151_25216">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      ID Upload
    </Menu.Item>
    <Menu.Item key="3">
      <svg
        width="30"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6667 1.66602H5.00004C4.55801 1.66602 4.13409 1.84161 3.82153 2.15417C3.50897 2.46673 3.33337 2.89065 3.33337 3.33268V16.666C3.33337 17.108 3.50897 17.532 3.82153 17.8445C4.13409 18.1571 4.55801 18.3327 5.00004 18.3327H15C15.4421 18.3327 15.866 18.1571 16.1786 17.8445C16.4911 17.532 16.6667 17.108 16.6667 16.666V6.66602M11.6667 1.66602L16.6667 6.66602M11.6667 1.66602V6.66602H16.6667M13.3334 10.8327H6.66671M13.3334 14.166H6.66671M8.33337 7.49935H6.66671"
          stroke="#464F60"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      View Document
    </Menu.Item>
    <Menu.Item key="3" style={{ color: "red" }}>
      <svg
        width="30"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 4.99935H3.16667M3.16667 4.99935H16.5M3.16667 4.99935V16.666C3.16667 17.108 3.34226 17.532 3.65482 17.8445C3.96738 18.1571 4.39131 18.3327 4.83333 18.3327H13.1667C13.6087 18.3327 14.0326 18.1571 14.3452 17.8445C14.6577 17.532 14.8333 17.108 14.8333 16.666V4.99935H3.16667ZM5.66667 4.99935V3.33268C5.66667 2.89065 5.84226 2.46673 6.15482 2.15417C6.46738 1.84161 6.89131 1.66602 7.33333 1.66602H10.6667C11.1087 1.66602 11.5326 1.84161 11.8452 2.15417C12.1577 2.46673 12.3333 2.89065 12.3333 3.33268V4.99935M7.33333 9.16602V14.166M10.6667 9.16602V14.166"
          stroke="#D92D20"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Delete Document
    </Menu.Item>
  </Menu>
);

const InputSearch = Input.Search;

function NotificationsAgent() {
  const [userData, setUserData] = useState(null);
  const UserData = JSON.parse(localStorage.getItem("userDetails"));
  const [newData, setNewData] = useState();
  const { data: nameEnq, isLoading: namEnqloading } = useQuery({
    queryKey: [UserData?.data?.user?.userId],
    queryFn: Tranx,
    onSuccess: (data) => {
      setNewData(data?.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [transactionsList, setTransactionsList] = useState();
  const [loading, setLoading] = useState(false);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const data = await notifs(UserData?.data?.user?.userId);
      console.log(data, "freoms");
      setTransactionsList(data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const markNotif = async (id) => {
    setLoading(true);
    try {
      const data = await updateNotif({
        id,
        status: "Read",
      });
      console.log(data, "freoms");
      setLoading(false);
      getTransactions();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const transactions = nameEnq?.data;

  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(
      localStorage.getItem("userDetails")
    );
    setUserData(userDataFromLocalStorage);

    getTransactions();
  }, []);

  console.log(nameEnq, "nameEnq");

  const [transactionList, setTransactionList] = useState(
    nameEnq?.data || Trnx?.data
  );

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(
    transactionList && transactionList
  );
  const [sortOrder, setSortOrder] = useState("asc"); // or 'desc' for descending
  const [showFilterOptions, setshowFilterOptions] = useState(false);
  const [filterby, setFilerby] = useState("");

  // const objectKeys = Object.keys(filteredData[0]);
  const objectKeys =
    filteredData && filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // Function to handle search
  const handleSearch = (e) => {
    const keyword = e?.toLowerCase();
    setSearchKeyword(keyword);
  };

  const handlesorts = () => {
    setshowFilterOptions(!showFilterOptions);
  };
  const handleSort = (key) => {
    const sortedData = [...filteredData];

    if (sortOrder === "asc") {
      sortedData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setSortOrder("desc");
    } else {
      sortedData.sort((a, b) => (a[key] < b[key] ? 1 : -1));
      setSortOrder("asc");
    }

    setFilteredData(sortedData);
  };

  return (
    <Agentlayout current="Notifications" useBack={true}>
      <Content>
        <Header>
          <InputSearch
            allowClear
            placeholder="Enter keyword to search"
            style={{ width: 300 }}
            className="input"
            onChange={handleSearch}
          />

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handlesorts}
          >
            <path
              d="M3 7H21"
              stroke="#5A6376"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M6 12H18"
              stroke="#5A6376"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M10 17H14"
              stroke="#5A6376"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </Header>
        {showFilterOptions && (
          <div className="filteroptions">
            {Object.keys(filteredData[0]).map((key) => (
              <p onClick={(key) => handleSort(key)} key={key}>
                {key}
              </p>
            ))}
          </div>
        )}
        <div className="head">
          <p>Today</p>
        </div>
        <br />
        <AuditStyle>
          <div>
            <div className="audit_cont">
              {loading ? (
                <div
                  style={{
                    padding: "0 20px",
                  }}
                >
                  <Skeleton />
                  <br />
                  <br />
                  <Skeleton />
                  <br />
                  <br />
                  <Skeleton />
                </div>
              ) : (
                transactionsList === 0 && (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    No Notifications.
                  </div>
                )
              )}
              {(transactionsList &&
                transactionsList?.map((item) => {
                  return loading ? (
                    ""
                  ) : (
                    <div
                      className="audit"
                      style={{
                        background: item?.status === "UnRead" ? "#f3f9fe" : "",
                      }}
                      onClick={() => {
                        markNotif(item?.id);
                      }}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1601_37742)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.9997 3.33398C10.7947 3.33398 3.33301 10.7957 3.33301 20.0007C3.33301 29.2057 10.7947 36.6673 19.9997 36.6673C29.2047 36.6673 36.6663 29.2057 36.6663 20.0007C36.6663 10.7957 29.2047 3.33398 19.9997 3.33398ZM14.1663 15.834C14.1663 15.0679 14.3172 14.3094 14.6104 13.6017C14.9035 12.8939 15.3332 12.2509 15.8749 11.7092C16.4166 11.1675 17.0596 10.7378 17.7674 10.4447C18.4751 10.1515 19.2336 10.0007 19.9997 10.0007C20.7657 10.0007 21.5243 10.1515 22.232 10.4447C22.9397 10.7378 23.5828 11.1675 24.1245 11.7092C24.6661 12.2509 25.0958 12.8939 25.389 13.6017C25.6821 14.3094 25.833 15.0679 25.833 15.834C25.833 17.3811 25.2184 18.8648 24.1245 19.9588C23.0305 21.0527 21.5468 21.6673 19.9997 21.6673C18.4526 21.6673 16.9688 21.0527 15.8749 19.9588C14.7809 18.8648 14.1663 17.3811 14.1663 15.834ZM30.4297 28.3073C29.1821 29.8767 27.596 31.1439 25.79 32.0143C23.9839 32.8847 22.0045 33.3359 19.9997 33.334C17.9948 33.3359 16.0154 32.8847 14.2094 32.0143C12.4033 31.1439 10.8173 29.8767 9.56967 28.3073C12.2713 26.369 15.958 25.0007 19.9997 25.0007C24.0413 25.0007 27.728 26.369 30.4297 28.3073Z"
                            fill="#B7B7B7"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1601_37742">
                            <rect width="40" height="40" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <div
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        <b>{item?.transactionType}</b>
                        <div
                          style={{
                            color: "#667085",
                            margin: "6px 0",
                          }}
                        >
                          {item?.message}
                        </div>
                        <div>
                          {moment(item?.dateSent).format(
                            "DD-MMM-YYYY : hh:mma"
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })) ||
                ""}
            </div>
          </div>
        </AuditStyle>{" "}
      </Content>
    </Agentlayout>
  );
}

const Content = styled.div`
  width: 100%;
  /* background-color: #fff; */
  margin: 0 auto;
  height: 100%;

  @media screen and (max-width: 40em) {
    width: 100%;
  }

  .filteroptions {
    display: flex;
    width: 90%;
    margin: 0 auto;
    gap: 8px;
    flex-wrap: wrap;
    padding: 10px;
    p {
      color: grey;
    }
    > p:nth-of-type(even) {
      border: 1px solid #00a85a;
      border-radius: 5px;
      padding: 5px 5px;
      background-color: #fff;
      cursor: pointer;
      &:hover {
        background: #00a85a;
        color: #000;
      }
    }
    > p:nth-of-type(odd) {
      background-color: #fff;
      border: 1px solid rgba(241, 149, 74, 1);
      border-radius: 5px;
      padding: 5px;
      cursor: pointer;
      &:hover {
        background: rgba(241, 149, 74, 1);
        color: #000;
      }
    }
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height:100px ; */
  /* padding-block: 20px; */
  /* border: 1px solid red; */
  height: 10%;
  gap: 10px;

  .arco-input-inner-wrapper {
    background-color: #fff;

    padding: 5px;
    border: 0.8px solid var(--gray-300, #d0d5dd);
    border-radius: 50px;
  }
`;
const AuditStyle = styled.div`
  border-radius: 16px;
  background-color: white;
  overflow: hidden;
  padding: 40px 0;
  .audit {
    padding: 20px;
    display: flex;
    align-items: center;
    border-top: 1px solid #e7e7e7;
    cursor: pointer;
  }
`;

const BeneficiaryCont = styled.div`
  overflow-y: scroll;
  /* border: 1px solid red; */
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;

  .head {
    width: 100%;
    /* padding: 1em; */
    margin: 0 auto;
  }

  .box {
    background-color: #fff;
    padding: 1.2em;
    border-radius: 8px;
    display: flex;
    gap: 10px;
    width: 100% !important;

    /* border: 0.3px solid green; */
    margin: 0 auto;
    width: 90%;

    @media screen and (max-width: 40em) {
      width: 100%;
    }

    .text {
      display: inline-flex;
      flex-direction: column;
      /* gap: 4px; */
      letter-spacing: 1;
      font-size: 12;
      /* flex: 1; */
    }
    .options {
      text-align: end;
      /* height: 100%; */
      font-size: 12px;
      align-items: center;
    }

    /* .arco-icon-more-vertical{
        display: none;
    }
     */
  }
`;
const Box = styled.div`
  align-items: center;
  display: flex;
  /* gap: 24px; */
  justify-content: space-around;
  width: 100%;
  height: 90px;
  /* padding-inline: 1em; */
  /* @media screen and (min-width: 90em){
        display: mone;
    } */
  .av {
    background: rgba(0, 168, 90, 1);

    /* width: 50%;
        height: 50%; */
  }
`;

export default NotificationsAgent;
