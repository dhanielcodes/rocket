/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import Stepses from "../../reuseables/Stepses";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Input, Space } from "@arco-design/web-react";
import { Avatar, Typography, Tabs } from "@arco-design/web-react";
import FormattedDate from "../../reuseables/FormattedDate";
import { Dropdown, Menu, Divider } from "@arco-design/web-react";
import { IconDown, IconMoreVertical } from "@arco-design/web-react/icon";
import Btn from "../../reuseables/Btn";
import {
  Paymentchannel,
  Payoutchannel,
  Rates,
  TodayRates,
  TodayRatesAgent,
  TodayRatesAgent2,
  TodayRatesAgentUpdateRate,
  TransferPurpose,
  getAgentRates,
  sendMoney,
  updateRate,
} from "../../services/Dashboard";
import {
  Paychannels as testpaymentchannel,
  Transferpurpose as testtransferpurpose,
  payoutchannels as payoutchannels,
  rates as testrate,
} from "../../../config/Test";
import { useQuery, useMutation } from "@tanstack/react-query";
import CustomSelect from "../../reuseables/CustomSelect";
import CustomInput from "../../reuseables/CustomInput";
import CountryDropdown from "../../reuseables/CountryList";
import CountryFlag from "react-country-flag";
import RateComponent from "../../reuseables/Rates";
import Total from "../../reuseables/Total";
import Checktrnx from "../../images/checktnx.svg";
import { Tooltip } from "@arco-design/web-react";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import { useLocation } from "react-router-dom";
import Iframe from "../../reuseables/PaymentLinks";
import Modals from "../../reuseables/Modals";
import { countryObjectsArray } from "../../../config/CountryCodes";
import AmountFormatter from "../../reuseables/AmountFormatter";
import Agentlayout from "../../reuseables/AgentLayout";
import { countries } from "../../services/Auth";
import CountryListAgent from "../../reuseables/CountryListAgent";
import toast from "react-hot-toast";
import InputNumber from "rc-input-number";
const { Text } = Typography;
const TextArea = Input.TextArea;

const InputSearch = Input.Search;
const TabPane = Tabs.TabPane;

function UpdateRate() {
  const navigates = useNavigate();

  const getLocals = (name) => {
    console.log(name);
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : [];
  };
  const [amount, setAmount] = useState(null);
  const [fee, setFee] = useState(null);
  const [feeFixed, setFeeFixed] = useState(null);

  const Userdata = JSON.parse(localStorage.getItem("userDetails"));

  const [status, setStatus] = useState(false);
  const [type, setType] = useState();
  const [thresh, setThresh] = useState();

  const [selectedCountry, setSelectedCountry] = useState();
  const [open, setOpen] = useState(false);
  function percentage(num, per) {
    return (num / 100) * per;
  }
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: updateRate,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(
          `Rate for ${selectedCountry?.fromCurrency?.name} to ${selectedCountry?.toCurrency?.name} was updated successfully`
        );
        setAmount("");
        setFee("");
        setFeeFixed("");
        setThresh("");
        setSelectedCountry("");
        setType("");
        navigates("/agent/dashboard");
      } else {
        toast.error(data?.message);
      }
      console.log("🚀 ~ file: Login.jsx:61 ~ Login ~ data:", data?.data);
      console.log(data);
    },
    onError: (data) => {
      console.log("🚀 ~ file: SendMoney.jsx:286 ~ SendMoney ~ data:", data);

      // setShow(true)
      // setInfo(data)
      // setTimeout(() => {
      //     //  seterr("")
      // }, 2000)
      return;
    },
  });
  const {
    data: rates,
    isLoading: Ratesloading,
    refetch: RatesnameEnq,
  } = useQuery({
    queryKey: [selectedCountry],
    queryFn: TodayRatesAgentUpdateRate,
    onSuccess: (data) => {},
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  console.log(rates);
  const handleRates = (e) => {
    setSelectedCountry(e);
    console.log(e, "kdksdsdsd");
  };

  const countrySelected = selectedCountry;

  console.log(selectedCountry, "hskkhskk");

  return (
    <Agentlayout current="Send Money" useBack={true}>
      <Content>
        <div className="dashboardcontent">
          <SectionThree>
            <div className="text">
              <p>Select Rates</p>
              <CountryListAgent
                value={countrySelected}
                setValue={setSelectedCountry}
                onChange={handleRates}
              />
              {/* <CustomInput placeholder="Input Amount" onChange={(e) => console.log(e.target.value) } /> */}

              {selectedCountry && (
                <div className="rates">
                  <div className="pri">
                    <CountryFlag
                      countryCode={countrySelected?.fromCurrency?.code?.slice(
                        0,
                        2
                      )}
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      svg
                    />
                    <AmountFormatter
                      currency={countrySelected?.fromCurrency?.code}
                      value={1}
                    />
                    {/* <p>{rates?.data?.fromAmount}</p> */}
                  </div>
                  <div style={{ color: "#000" }}>=</div>
                  <div className="sec">
                    <CountryFlag
                      countryCode={countrySelected?.toCurrency?.code?.slice(
                        0,
                        2
                      )}
                      svg
                    />
                    <AmountFormatter
                      currency={countrySelected?.toCurrency?.code}
                      value={
                        countrySelected?.conversionRate ||
                        rates?.data[0]?.conversionRate ||
                        countrySelected?.rateUpdateValue ||
                        rates?.data[0]?.rateUpdateValue ||
                        0
                      }
                    />
                    {/* <p>920.000 NGN</p> */}
                  </div>
                </div>
              )}
              {countrySelected?.rateUpdateValue ? (
                <div>
                  <span>My Updated Rate</span>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <input
                      type={"number"}
                      disabled={true}
                      value={countrySelected?.rateUpdateValue}
                      onKeyDown={(evt) => {
                        ["e", "E", "+", "-", "=", "(", ")", "*", "&"].includes(
                          evt.key
                        ) && evt.preventDefault();
                      }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "inherit",
                        lineHeight: 1,
                        border: "1px solid #D0D5DD",
                        borderRadius: "6px",
                        color: "#000",
                        fontWeight: 300,
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </SectionThree>
          {selectedCountry && (
            <SectionThree>
              <div className="text" style={{ fontSize: "13px" }}>
                <div>
                  <span>Your New Rate</span>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <InputNumber
                      className="input"
                      style={{
                        borderSize: "0.5px",
                        fontSize: "6px",
                        borderRadius: "8px",
                        padding: "13px",
                        border: "1px solid #000000",
                        width: "100%",
                        background: "#ffffff",
                        color: "#000000",
                      }}
                      onKeyDown={(evt) => {
                        ["e", "E", "+", "-", "=", "(", ")", "*", "&"].includes(
                          evt.key
                        ) && evt.preventDefault();
                      }}
                      onChange={(newValue) => {
                        console.log("Change:", `${newValue}`);
                        setAmount(newValue);
                      }}
                      formatter={(value) => {
                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      }}
                    />
                  </div>
                </div>
                <div>
                  <span>Charge Base Amount</span>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <InputNumber
                      className="input"
                      style={{
                        borderSize: "0.5px",
                        fontSize: "6px",
                        borderRadius: "8px",
                        padding: "13px",
                        border: "1px solid #000000",
                        width: "100%",
                        background: "#ffffff",
                        color: "#000000",
                      }}
                      onKeyDown={(evt) => {
                        ["e", "E", "+", "-", "=", "(", ")", "*", "&"].includes(
                          evt.key
                        ) && evt.preventDefault();
                      }}
                      onChange={(newValue) => {
                        console.log("Change:", `${newValue}`);
                        setFeeFixed(newValue);
                      }}
                      formatter={(value) => {
                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      }}
                    />
                  </div>
                </div>
                <div>
                  <span>Charge Percentage</span>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <InputNumber
                      className="input"
                      style={{
                        borderSize: "0.5px",
                        fontSize: "6px",
                        borderRadius: "8px",
                        padding: "13px",
                        border: "1px solid #000000",
                        width: "100%",
                        background: "#ffffff",
                        color: "#000000",
                      }}
                      onKeyDown={(evt) => {
                        ["e", "E", "+", "-", "=", "(", ")", "*", "&"].includes(
                          evt.key
                        ) && evt.preventDefault();
                      }}
                      onChange={(newValue) => {
                        console.log("Change:", `${newValue}`);
                        setFee(newValue);
                      }}
                      formatter={(value) => {
                        return `% ${value}`;
                      }}
                    />
                  </div>
                </div>

                <div>
                  <span>Charge Percentage Threshold</span>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <InputNumber
                      className="input"
                      style={{
                        borderSize: "0.5px",
                        fontSize: "6px",
                        borderRadius: "8px",
                        padding: "13px",
                        border: "1px solid #000000",
                        width: "100%",
                        background: "#ffffff",
                        color: "#000000",
                      }}
                      onKeyDown={(evt) => {
                        ["e", "E", "+", "-", "=", "(", ")", "*", "&"].includes(
                          evt.key
                        ) && evt.preventDefault();
                      }}
                      onChange={(newValue) => {
                        console.log("Change:", `${newValue}`);
                        setThresh(newValue);
                      }}
                      formatter={(value) => {
                        return `% ${value}`;
                      }}
                    />
                  </div>
                </div>

                <div className="rates">
                  <div className="pri">
                    <CountryFlag
                      countryCode={selectedCountry?.fromCurrency?.code?.slice(
                        0,
                        2
                      )}
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      svg
                    />
                    <AmountFormatter
                      currency={selectedCountry?.fromCurrency?.code}
                      value={1}
                    />
                    {/* <p>{rates?.data?.fromAmount}</p> */}
                  </div>
                  <div style={{ color: "#000" }}>=</div>
                  <div className="sec">
                    <CountryFlag
                      countryCode={selectedCountry?.toCurrency?.code?.slice(
                        0,
                        2
                      )}
                      svg
                    />
                    <AmountFormatter
                      currency={selectedCountry?.toCurrency?.currencyCode}
                      value={amount || 0}
                    />
                    {/* <p>920.000 NGN</p> */}
                  </div>
                </div>
              </div>
              {amount && (
                <Btn
                  disabled={isLoading}
                  clicking={() => {
                    mutate({
                      agentId:
                        Userdata?.data?.user?.agentId ||
                        Userdata?.data?.user?.userId,
                      agentCurrentRate: {
                        id: selectedCountry?.id,
                        agentRate: amount, //Agent new rate
                        agentFeeFixedBaseAmount: feeFixed, //Agent fixed fee (in sending currency if amount isn't up to the percentage threshold
                        agentFeePercentage: fee, //Percetange of the sending amount if upto or equal to threshold
                        agentTransactionFeeThreshold: thresh, //Threshold to consider fee in perdewntage ....
                      },
                    });
                  }}
                  styles={{
                    width: "100%",
                    marginTop: "14px",
                  }}
                >
                  {isLoading ? "Updating..." : " Save Changes"}
                </Btn>
              )}
            </SectionThree>
          )}
        </div>
      </Content>
    </Agentlayout>
  );
}
const SectionThree = styled.div`
  border-radius: 10px;
  padding-inline: 1em;
  color: var(--grey-400, #98a2b3);
  margin-top: 10vh;
  border-radius: 10px;

  .input {
    /* border-bottom-left-radius: 10px; */
    /* border-top-left-radius: 10px; */

    /* border: none !important; */

    &::placeholder {
      font-size: 12px;
    }

    .rc-input-number-input {
      background: #fff;
      border: none;
      color: black;
      width: 100%;
    }
  }
  .text {
    font-weight: bold;
    background-color: #fff;
    padding: 1em;
    font-size: 20px;
    border-radius: 10px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 18px;

    > p {
      font-weight: 500;
      font-size: 17px;
    }
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
const Content = styled.div`
  height: 85vh;
  width: 100%;

  .dashboardcontent {
    height: 300px;
    border-radius: 10px;
    background: #fff;
    width: 90%;
    margin: 0 auto;
    margin-top: -62px;
    font-weight: 300;
    .dashboard {
      padding: 1rem;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .dbox {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      p {
        font-weight: bolder;
        color: #98a2b3;
        font-size: 9px;
      }
      h3 {
        font-size: 20px;
      }
    }
    .dbox1 {
      border-right: 1px solid #e9edf5;
      border-bottom: 1px solid #e9edf5;
    }
    .dbox3 {
      border-right: 1px solid #e9edf5;
    }
    .dbox2 {
      border-bottom: 1px solid #e9edf5;
    }
  }

  .btn {
    width: 80%;
    margin: 20px auto;
    /* margin-block: 20px; */
    button {
      width: 100%;
    }
    > &:hover {
      background: rgba(241, 149, 74, 1);
    }
  }

  .header {
    /* display: none; */
    padding-inline: 2.5em;
    h5 {
      font-size: 20px;
    }

    p {
      /* font-weight: 300; */
    }
  }

  @media screen and (max-width: 40em) {
    width: 100%;
  }

  .cont {
    height: 100%;
    /* overflow-y: scroll; */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* border: 1px solid green; */
    width: 100%;
    /* width: 30vw;
         margin: 0 auto; */

    font-weight: 300;

    .header {
      /* display: none; */
      padding-inline: 2.5em;
      h5 {
        font-size: 20px;
      }

      p {
        /* font-weight: 300; */
      }
    }

    .btn {
      width: 80%;
      margin: 20px auto;
      /* margin-block: 20px; */
      button {
        width: 100%;
      }
      > &:hover {
        background: rgba(241, 149, 74, 1);
      }
    }
  }
  .sec {
    padding-top: 10px;
    overflow-y: scroll;
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

const BeneficiaryCont2 = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1em;
`;

const Details = styled.div`
  /* height: 85%; */
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 10px;

  .actionbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;

    button {
      padding: 15px 35px;
      border: 0.1px solid rgba(90, 99, 118, 1);
      border-radius: 4px;

      @media screen and (max-width: 40em) {
        margin-bottom: -10px;
      }
    }
    button:nth-of-type(2) {
      background: rgba(0, 168, 90, 1);
    }
    button:nth-of-type(1) {
      background: #fff;
      color: rgba(90, 99, 118, 1);
    }
  }

  .detailscont {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1em;

    .detailsinfo {
      font-weight: 400;
      text-align: center;
      color: rgba(51, 59, 74, 1);
    }

    .details {
      padding: 5px 8px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(233, 237, 245, 1);
      font-weight: lighter;
      &:last-child {
        border-bottom: none;
      }

      h5 {
        color: rgba(102, 112, 133, 1);
        font-weight: 300;
        font-size: 13px;
      }
      p {
        font-weight: 250 !important;
        font-size: 14px;
      }
    }
  }
`;

const BeneficiaryCont = styled.div`
  overflow-y: scroll;
  padding-inline: 1em;
  /* border: 1px solid red; */
  /* height: 90%; */
  display: flex;
  flex-direction: column;
  gap: 10px;

  .arco-tabs-header-title-active,
  .arco-tabs-header-title-active:hover {
    color: #00a85a;
  }
  .longcont1 {
    gap: 15px !important;
  }
  .longcont {
    background-color: #fff;
    border-radius: 10px;
    padding: 1em 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .wall {
      display: flex;
      gap: 20px;
      /* justify-content: space-around; */
      width: 90%;
      margin: 0 auto;
      align-items: center;
      .css-13cymwt-control {
        border-radius: 20px;
      }
      .balance {
        width: 80%;
        display: flex;
        gap: 10px;
        /* justify-content: space-around; */
        padding: 10px;
        background: rgba(0, 168, 90, 0.1);
        border-radius: 29.571px;
        align-items: center;
        /* margin-inline-start: 10px; */

        h2 {
          font-weight: 500;
          color: #00a85a;
        }
      }
    }

    .tabs {
      display: flex;
      width: 100%;
      padding: 10px 2px;
      cursor: pointer;
      /* gap: 20px; */

      .pane {
        display: flex;
        gap: 17px;

        @media screen and (max-width: 40em) {
          gap: 5px;
        }

        align-items: center;
        padding-block-end: 10px;
        border-bottom: 3px solid #d7d7d7;
        flex: 1;
      }
    }

    .payby {
      padding-inline: 1em;
      /* padding-block: 10px; */
    }

    .box {
      border: 1px solid rgba(233, 237, 245, 1);
    }
  }

  .activebox {
    border: 1px solid green;
  }

  .box {
    padding-inline: 3em;
    background-color: #fff;
    padding: 1em;
    border-radius: 8px;
    display: flex;
    gap: 20px;
    width: 90%;
    margin: 0 auto;
    height: 80px;

    .text {
      display: inline-flex;
      flex-direction: column;
      gap: 2px;
      letter-spacing: 1;
      flex: 1;
      /* padding: 1em; */

      h5 {
        font-size: 13px;
        font-weight: 350;
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

const Header = styled.div`
  display: flex;
  justify-content: center;
  /* flex-direction:column; */
  align-items: center;
  padding-inline: 1em;
  text-align: center;
  gap: 2px;
  /* height:100px ; */
  /* padding-block: 20px; */
  /* border: 1px solid red; */
  /* height: 10%; */

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

export default UpdateRate;
