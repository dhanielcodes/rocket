/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import { Input, Space } from "@arco-design/web-react";
import { Avatar, Typography } from "@arco-design/web-react";
import { Dropdown, Menu, Divider } from "@arco-design/web-react";
import { IconDown, IconMoreVertical } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import FormattedDate from "../../reuseables/FormattedDate";
import { GetDetails } from "../../services/Dashboard";

const Droplist = ({ id, onNavigate }) => (
  //   <Menu.Item key='1' onClick={() => onNavigate(id)}>
  <Menu>
    <IconMoreVertical />
    <Menu.Item
      key="1"
      onClick={(id) => onNavigate(`/user/beneficiary/details?id=${id}`)}
    >
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
    <Menu.Item
      key="4"
      onClick={(id) => onNavigate(`/user/beneficiary/upload?id=${id}`)}
    >
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
    <Menu.Item key="5">
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
    <Menu.Item key="6" style={{ color: "red" }}>
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

const handleNavigate = (id) => {
  const navigate = useNavigate();
  navigate(`/user/beneficiary/details?id=${id}`);
};

const InputSearch = Input.Search;

function Beneficiary() {
  const Userdata = JSON.parse(localStorage?.getItem("userDetails"));
  const BeneList = Userdata?.data.user.beneficiaries;

  // useEffect(() => {

  // },[Userdata])

  const {
    data: newDetails,
    isLoading: newDetailsloading,
    refetch: refetchnewDetails,
  } = useQuery({
    queryKey: [Userdata?.data?.user?.userId],
    queryFn: GetDetails,
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      // navigate("/")
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });
  console.log(
    "🚀 ~ file: Beneficiary.jsx:108 ~ Beneficiary ~ newDetails:",
    newDetails
  );

  // localStorage.setItem("userDetails",newDetails)

  const navigate = useNavigate();

  // const goBack = () => {
  //   navigate(-1); // This navigates back to the previous page in the navigation stack.
  // };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredBeneList, setFilteredBeneList] = useState(BeneList);

  const handleSearch = (event) => {
    const keyword = event;
    setSearchKeyword(keyword);

    // Filter the beneficiary list based on the keyword
    const filteredList = BeneList.filter((bene) => {
      const lowerKeyword = keyword.toLowerCase();

      // Check if any field in the beneficiary object contains the keyword
      return Object.values(bene).some((value) =>
        String(value).toLowerCase().includes(lowerKeyword)
      );
    });

    setFilteredBeneList(filteredList);
  };

  return (
    <Userlayout current="Beneficiary">
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
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate("/user/create/beneficiary")}
            style={{ cursor: "pointer" }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 11C20.6213 11 21.125 11.5037 21.125 12.125V18.875H27.875C28.4963 18.875 29 19.3787 29 20C29 20.6213 28.4963 21.125 27.875 21.125H21.125V27.875C21.125 28.4963 20.6213 29 20 29C19.3787 29 18.875 28.4963 18.875 27.875V21.125H12.125C11.5037 21.125 11 20.6213 11 20C11 19.3787 11.5037 18.875 12.125 18.875H18.875V12.125C18.875 11.5037 19.3787 11 20 11Z"
              fill="#00A85A"
            />
          </svg>
        </Header>
        <BeneficiaryCont>
          {filteredBeneList?.map((d) => {
            return (
              <Link
                key={d.id}
                className="box"
                to={`/user/beneficiary/details?id=${d.id}`}
                style={{ color: "#000", textDecoration: "none" }}
              >
                <Box>
                  <Avatar className="av">
                    {`${d?.beneficiaryName?.split(" ")[0][0]} ${
                      d?.beneficiaryName?.split(" ")[1][0]
                    }`}
                    12
                  </Avatar>

                  <div className="text">
                    <h5>{d?.beneficiaryName}</h5>
                    <p>{d?.beneficiaryPhoneNumber}</p>
                    {/* <p>{d?.beneficiaryBank?.accountNumber.length ? "Bank" : "Pick Up"}</p> */}
                    <p>
                      createOn : <FormattedDate dateString={d?.dateCreated} />
                    </p>
                  </div>
                  <div className="options">
                    <Dropdown
                      droplist={
                        <Droplist id={d.id} onNavigate={handleNavigate} />
                      }
                      position="bl"
                      on
                    >
                      <Link style={{ marginRight: 40 }}>
                        <IconMoreVertical
                          style={{ fontSize: 15, marginLeft: 6, color: "#000" }}
                        />
                      </Link>
                    </Dropdown>
                  </div>
                </Box>
              </Link>
            );
          })}
        </BeneficiaryCont>
      </Content>
    </Userlayout>
  );
}

const Content = styled.div`
  width: 100%;
  /* background-color: #fff; */
  padding-inline: 1em;
  margin: 0 auto;
  height: 100%;

  @media screen and (max-width: 40em) {
    width: 100%;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 1em;
  /* height:100px ; */
  /* padding-block: 20px; */
  /* border: 1px solid red; */
  height: 10%;

  .arco-input-inner-wrapper {
    background-color: #fff;

    padding: 5px;
    border: 0.8px solid var(--gray-300, #d0d5dd);
    border-radius: 50px;
  }
  .arco-input-inner-wrapper .arco-input {
    padding-left: 23px;
  }
`;

const BeneficiaryCont = styled.div`
  overflow-y: scroll;
  padding-inline: 1em;
  /* border: 1px solid red; */
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .box {
    background-color: #fff;
    padding: 1em;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    margin: 0 auto;

    .text {
      display: inline-flex;
      flex-direction: column;
      gap: 4px;
      letter-spacing: 1;
      flex: 1;

      h5 {
        font-size: 13px;
      }

      p {
        font-size: x-small;
        font-weight: light;
      }
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
  gap: 10px;
  justify-content: space-around;
  width: 100%;
  .av {
    background: rgba(0, 168, 90, 1);

    /* width: 50%;
        height: 50%; */
  }
`;

export default Beneficiary;
