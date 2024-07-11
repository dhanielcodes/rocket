/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import CountryDropdown from "../../reuseables/CountryList";
import CountryFlag from "react-country-flag";
import { Input } from "@arco-design/web-react";

import { useMutation, useQuery } from "@tanstack/react-query";
const Option = Select.Option;
import Select from "react-select";
import CustomSelect from "../../reuseables/CustomSelect";
import { InputStyle } from "../../styles/Input";
import {
  countries,
  cities,
  states,
  employment,
  profession,
} from "../../services/Auth";
import {
  nameEnquiry,
  createBeneficiary,
  getBanks,
  Payoutchannel,
  generateJourneyToken,
} from "../../services/Dashboard";
import {
  countries as testCountries,
  stateTest as testState,
  cityTest as cityTest,
  employment as employmentTest,
  profession as professionTest,
  BankTest as BankList,
  nameEnq as NameEqnquiry,
} from "../../../config/Test";
import CustomInput from "../../reuseables/CustomInput";
import Loader from "../../reuseables/Loader";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import { Link, useNavigate } from "react-router-dom";
import Agentlayout from "../../reuseables/AgentLayout";
import toast from "react-hot-toast";

function DocumentUploadAgent({ typee }) {
  const UserData = JSON.parse(localStorage.getItem("userDetails"));

  const { mutate, isLoading } = useMutation({
    mutationFn: generateJourneyToken,
    onSuccess: (data) => {
      //navigates("/agent/dashboard");
      // toast.error(data?.message);
      console.log(data);
      toast.success("Loading Journey Interface");
      localStorage.setItem("journeyToken", data);
      window.location.replace(window.location.origin + "/idscan.html");
    },
    onError: (data) => {
      console.log(data?.response?.data?.error);
      toast.error(data?.response?.data?.error);
    },
  });

  const [type, setType] = useState();

  const collectionType = (e) => {
    setType(e);
    localStorage.setItem("docType", e?.label);
  };
  const Lay = typee === "Agent" ? Agentlayout : Userlayout;
  const navigate = useNavigate();
  return (
    <Lay current="ID Upload" useBack={true}>
      <Content>
        <div className="cont">
          <div className="sec">
            <SectionThree>
              <div className="text">
                <div className="type">
                  <p className="textheader">Document Type</p>
                  <CustomSelect
                    onChange={collectionType}
                    options={[
                      {
                        id: 1,
                        label: "Drivers Licence",
                      },
                      {
                        id: 3,
                        label: "National ID",
                      },
                      {
                        id: 2,
                        label: "Passport",
                      },
                    ]}
                    styles={{ fontSize: "10px ! important" }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                }}
              >
                <button
                  disabled={!type}
                  onClick={() => {
                    navigate(
                      typee === "Agent"
                        ? "/agent/manual-upload"
                        : "/user/manual-upload"
                    );
                  }}
                >
                  Manual Upload
                </button>
                &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  onClick={() => {
                    mutate({
                      grant_type: "password",
                      UserName: "TRpoc_admin",
                      Password: "0RlWo7BZ4dx7KzSy",
                      area: "area",
                    });

                    localStorage.setItem(
                      "userIdM",
                      UserData?.data?.user?.userId
                    );
                  }}
                  disabled={!type}
                >
                  {isLoading ? "Generating Token..." : "Scan Document"}
                </button>
              </div>
            </SectionThree>
          </div>
        </div>
      </Content>
    </Lay>
  );
}

const Content = styled.div`
  width: 100%;
  /* background-color: #fff; */

  > * p {
    font-weight: 300;
  }

  @media screen and (max-width: 40em) {
    width: 100%;
  }

  .cont {
    /* border: 1px solid red; */
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-weight: 200;
    .sec {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    button {
      padding: 12px 35px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      margin-top: 20px;
      background: rgba(0, 168, 90, 1);
      color: white !important;

      &:hover {
        background: rgba(241, 149, 74, 1);
      }

      @media screen and (max-width: 40em) {
        margin-bottom: -30px;
      }
    }
  }
`;

const Header = styled.div`
  font-weight: light;
`;

const SectionThree = styled.div`
  border-radius: 10px;
  /* border: 1px solid red; */
  /* padding-inline: 1em; */
  color: var(--grey-400, #98a2b3);
  /* padding: 1em; */
  border-radius: 10px;
  /* box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; */
  .text {
    font-weight: bold;
    background-color: #fff;
    padding: 1.3em;
    font-size: 13px;
    border-radius: 10px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      color: #000;
      font-size: 500;
      font-weight: light;
    }
  }
  .css-13cymwt-control {
    padding: 3px;
    border-color: grey;
  }

  .type {
    padding-block: 1em;
  }

  .textheader {
    font-size: 15px;
    color: #000;
    font-weight: light;
    padding: 5px;
  }

  /* .arco-select-view-input{
    left:20px;
 } */

  .arco-select > .arco-select-view {
    /* height: 5% !important; */
    /* padding: 8px;
    border-radius: 8px;
    background: #FFF;
    border: 0.1px solid #98A2B3 ; */
  }

  .rates {
    display: flex;
    width: 100%;
    padding: 2em;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    @media screen and (max-width: 40em) {
      padding: 0 !important;
    }

    .pri,
    .sec {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        font-weight: 400;
        color: #000;
      }
    }

    > .pri img {
      width: 50px !important;
      vertical-align: middle;
      height: 50px !important;
      border-radius: 50%;
      @media screen and (max-width: 40em) {
        height: 50px !important;
        width: 50px !important;
      }
    }

    > .sec img {
      width: 50px !important;
      vertical-align: middle;
      height: 50px !important;
      border-radius: 50%;
      @media screen and (max-width: 40em) {
        height: 50px !important;
        width: 50px !important;
      }
    }
  }
  .css-13cymwt-control {
    background: linear-gradient(
        94.71deg,
        rgba(255, 255, 255, 0.16) 0%,
        rgba(255, 255, 255, 0.06) 99.4%
      ),
      linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)) !important;
    border-radius: 10px !important;
    outline: none !important;
    width: 100% !important;
    color: #ffffff !important;
    border-color: #98a2b3 !important;
  }

  .css-tj5bde-Svg {
    color: #000 !important;
  }
  .css-w9q2zk-Input2 {
    color: #ffffff !important;
  }
  .css-t3ipsp-control {
    width: 100% !important;
    border: none !important;
    outline: none !important;
  }
  .css-w9q2zk-Input2:after {
    /* color: #ffffff; */
  }
  #react-select-3-listbox {
    /* display: none !important; */
    width: 100% !important;
    margin: 0 !important;
    font-size: 12px !important;
    outline: none;
  }

  .flag {
    border-radius: 50% !important; /* Apply a circular border radius */
  }

  .css-inmdiq5-menu {
    width: 100% !important;
  }
  #react-select-3-listbox {
    color: #000 !important;
  }
  .css-13cymwt-control:focus {
    background: linear-gradient(
        94.71deg,
        rgba(255, 255, 255, 0.16) 0%,
        rgba(255, 255, 255, 0.06) 99.4%
      ),
      linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)) !important;
  }
  .css-1f43avz-a11yText-A11yText {
    background: transparent !important;
  }
  .arco-select-view-selector {
    padding: 4px;
    margin: -20px -12px;
  }
  .css-1u9des2-indicatorSeparator {
    display: none !important;
  }
`;

export default DocumentUploadAgent;
