/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CountryDropdown from "./CountryList";
import CountryFlag from "react-country-flag";
import CustomInput from "./CustomInput";
import styled from "styled-components";
import AmountFormatter from "../reuseables/AmountFormatter";
import { useQuery } from "@tanstack/react-query";
import {
  DashboardTodayRates,
  DashboardTodayRatesAgent,
  GetDetails,
  Rates as Ratess,
  agentCustomerGetRate,
} from "../services/Dashboard";
import { countryObjectsArray } from "../../config/CountryCodes";
import InputNumber from "rc-input-number";
import { CFormatter } from "../hooks/format";
import { FormatCorrect, FormatCorrect2 } from "../utils/format";
import { getUserCurrencies } from "../services/Auth";

function Rates({
  amount,
  setAmount,
  amount2,
  setAmount2,
  moneyData,
  change,
  setChange,
  setMoneyData,
  currentRates,
  setcurrentRates,
  selectedCountry,
  setSelectedCountry,
  selectedCountry2,
  setSelectedCountry2,
}) {
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  console.log("🚀 ~ file: Dashboard.jsx:18 ~ Dashboard ~ Userdata:", Userdata);

  const {
    data,
    isLoading: nameEnqLoading,
    refetch: refetchNameEnq,
  } = useQuery({
    queryKey: [Userdata?.data?.user?.userId, 0],
    queryFn: GetDetails,
    onSuccess: (data) => {
      return;
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      // Handle error logic
      console.error(err);
    },
  });

  const getC = JSON.parse(localStorage.getItem("currencyList"));
  const getC2 = data?.data?.allowMultiCurrencyTrading
    ? JSON.parse(localStorage.getItem("currencyList"))
    : JSON.parse(localStorage.getItem("userCurrencyList"));

  console.log(
    "🚀 ~ file: Rates.jsx:47 ~ Rates ~ selectedCountry:",
    selectedCountry
  );
  console.log(
    "🚀 ~ file: Rates.jsx:47 ~ Rates ~ selectedCountry2:",
    selectedCountry2
  );

  localStorage.setItem(
    "country1",
    JSON.stringify(
      selectedCountry ||
        getC2
          ?.filter((item) => item?.isSending)
          ?.map((item) => {
            return {
              value: item?.name,
              label: item?.name,
              ...item,
            };
          })?.[0]
    )
  );
  localStorage.setItem(
    "country2",
    JSON.stringify(
      selectedCountry2 ||
        getC
          ?.filter((item) => item?.isReceiving)
          ?.map((item) => {
            return {
              value: item?.name,
              label: item?.name,
              ...item,
            };
          })?.[1]
    )
  );

  const handleCountryChange = (selectedOption) => {
    const getC = data?.data?.allowMultiCurrencyTrading
      ? JSON.parse(localStorage.getItem("currencyList"))
      : JSON.parse(localStorage.getItem("userCurrencyList"));
    const newC = getC?.find(
      (d) => d?.name?.toLowerCase() === selectedOption?.label?.toLowerCase()
    );
    console.log(selectedOption);
    console.log("🚀 ~ file: Rates.jsx:55 ~ handleCountryChange ~ newC:", newC);
    localStorage.setItem("country1", JSON.stringify(selectedOption));

    setSelectedCountry(selectedOption);
    updateCurrencyDetails(selectedOption.label);
  };

  const handleCountryChange2 = (selectedOption) => {
    console.log(
      "🚀 ~ file: Dashboard.jsx:37 ~ handleCountryChange ~ selectedOption:",
      selectedOption
    );

    const getC = JSON.parse(localStorage.getItem("currenyList"));
    const newC = getC?.find(
      (d) => d?.name?.toLowerCase() === selectedOption?.label?.toLowerCase()
    );
    localStorage.setItem("country2", JSON.stringify(selectedOption));
    setSelectedCountry2(selectedOption);
    updateCurrencyDetails2(selectedOption.label);
  };

  const [currencyDetails, setCurrencyDetails] = useState([]);
  const [currencyDetails2, setCurrencyDetails2] = useState([]);
  console.log(
    "🚀 ~ file: Dashboard.jsx:57 ~ Dashboard ~ currencyDetails:",
    currencyDetails
  );
  const [dashboardDetails, setDashboardDetails] = useState(null);

  const updateCurrencyDetails = (countryLabel) => {
    const defaultDetails = Userdata?.data?.user?.wallet?.filter(
      (d) => d?.country?.name === countryLabel
    );
    setCurrencyDetails([...defaultDetails]);

    const transactionVolume = Userdata?.data?.user?.transactionVolume;
    const transactionArray = Object.keys(transactionVolume)
      .map((currencyCode) => ({
        currencyCode,
        ...transactionVolume[currencyCode],
      }))
      .find((d) => d?.currencyCode == defaultDetails[0]?.country?.currencyCode);

    setDashboardDetails(transactionArray);
  };
  const updateCurrencyDetails2 = (countryLabel) => {
    const defaultDetails = Userdata?.data?.user?.wallet?.filter(
      (d) => d?.country?.name === countryLabel
    );
    setCurrencyDetails2([...defaultDetails]);

    const transactionVolume = Userdata?.data?.user?.transactionVolume;
    const transactionArray = Object.keys(transactionVolume)
      .map((currencyCode) => ({
        currencyCode,
        ...transactionVolume[currencyCode],
      }))
      .find((d) => d?.currencyCode == defaultDetails[0]?.country?.currencyCode);

    setDashboardDetails(transactionArray);
  };

  const dataObject = {};
  currencyDetails?.forEach((item) => {
    dataObject["id"] = item;
  });

  console.log(
    "🚀 ~ file: Rates.jsx:105 ~ Rates ~ currencyDetails2:",
    currencyDetails2
  );

  const dataObject2 = {};
  currencyDetails2?.forEach((item) => {
    dataObject2["id"] = item;
  });
  console.log("🚀 ~ file: Rates.jsx:104 ~ Rates ~ dataObject2:", dataObject2);

  const {
    data: rates,
    isLoading: Ratesloading,
    refetch: RatesnameEnq,
  } = useQuery({
    queryKey: change
      ? [selectedCountry2?.id, selectedCountry?.id, amount2, amount]
      : [selectedCountry?.id, selectedCountry2?.id, amount, amount2],
    queryFn: Userdata?.data?.user?.agentId ? agentCustomerGetRate : Ratess,
    onSuccess: (data) => {
      console.log(data, "jklssds");
      if (data?.data === "") {
        localStorage.setItem("amount", JSON.stringify({}));
      } else {
        localStorage.setItem("amount", JSON.stringify(data?.data));
        setMoneyData(data?.data);
      }
      if (data?.status) {
        setcurrentRates(data?.data);
      }
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  /*   useEffect(() => {
    setcurrentRates(rates?.data);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  }, [selectedCountry, selectedCountry2]); */

  const handleRatesChanges = (e) => {
    setAmount(e);
    setAmount2(e * currentRates?.conversionRate);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  };

  const handleRatesChanges2 = (e) => {
    setAmount2(e);
    setAmount(e * currentRates?.conversionRate);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  };

  const handleRatesChangesdiv = (e) => {
    setAmount(e);
    setAmount2(e / currentRates?.conversionRate);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  };

  const handleRatesChangesdiv2 = (e) => {
    setAmount2(e);
    setAmount(e / currentRates?.conversionRate);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  };

  useEffect(() => {
    if (change) {
      setAmount(amount2 * currentRates?.conversionRate);
    } else {
      setAmount2(amount * currentRates?.conversionRate);
    }
  }, [currentRates?.conversionRate]);

  return (
    <div>
      <RateCont>
        <img
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            width: "30px",
            transition: "all .5s",
            transform: `translate(-100%, -60%) rotateX(${
              change ? "180deg" : "0deg"
            })`,
            cursor: "pointer",
            opacity: "0.7",
          }}
          onClick={() => {
            setChange(!change);
          }}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6klEQVR4nO2bS2rDMBBA5wJNe4sWuuhRumqxbNpFjxEKzqLQMzQUWjCxTFZzxCKnn8Q0jiR/ZjTSgCGL4PCeI1nMB4BjVMUCtFpBk5ft56gCn86gzl5Aq8/2arJX+Li9gCjhdUwS8Ah8FBLwBLxoCWgJL1ICOsKLkoCe8CIk4ED4oCXgSPBBSsCR4YOSgBPBByEBJ4ZnLQFngmcpAWeGZyUBieDZSNBqRQb/KyEv6QQ0eRm3gKpYQGO9BNYOYHbfNb9Nnk1Cq31gDXV2bS1gW1xCnb+dXP/bu3NgEdgrYQdvwlaAiT4JrOD7JfzBuwo4JoEl/P8SDuF9BHQlsIY/2BjVI2zUFXTDR4AJcy+dP9BveEPDV4CY0FIE1NmzBchSrgDtCZIEqPQPgLQEVNoDIG2CKr0FIL0GVToHQDoIqehOgkuvIzS70FJOdL4RhYBqosSGuSf7xAbupbbq7B2a+5vBAnZZ4TWPio5rcrMrwVXAPvzPxVICEqS32UhAwgIHuYQq9hKXTlXe0uGpCqzyIoNGB/KKDxK2upDDUzY7sYGnaHdjBz9nwyNb+DlaXtnDT9n0HAz8FG3vwcGPOfgQLPwYoy/Bww8ZfhID7zP+Jg7eZQBSLLzNCKx4+L4h6Gjg4TvabFJech6D/wIleS6dySZ03AAAAABJRU5ErkJggg=="
        />
        {change ? (
          <div className="cont3">
            <CountryDropdown
              rate
              collectionStatus
              style={{
                width: "100%",
              }}
              value={selectedCountry2}
              setValue={setSelectedCountry2}
              onChange={handleCountryChange2}
              newOptions={getC?.map((item) => {
                return {
                  code: item?.currencyCode,
                  value: item?.name,
                  label: item?.name,
                  id: item?.id,
                  ...item,
                };
              })}
            />
            <InputNumber
              className="input"
              step={0}
              style={{
                borderSize: "0.5px",
                fontSize: "6px",
                borderRadius: "0  0 10px",
                padding: "13px",
                border: "1px solid #ccc",
                background: "#ffffff",
                color: "#000000",
                width: "100%",
                backgroundColor: "transparent",
              }}
              formatter={(value) => {
                return FormatCorrect(value, selectedCountry2?.code);
              }}
              onChange={(newValue) => {
                handleRatesChanges2(`${newValue}`);
              }}
              value={Number(amount2) || 0}
            />
          </div>
        ) : (
          <div className="cont1">
            <CountryDropdown
              rate
              setValue={setSelectedCountry}
              value={selectedCountry}
              onChange={handleCountryChange}
            />
            <InputNumber
              className="input"
              step={0}
              style={{
                borderSize: "0.5px",
                fontSize: "6px",
                borderRadius: "0  0 10px",
                padding: "13px",
                border: "1px solid #ccc",
                width: "100%",
                background: "#ffffff",
                color: "#000000",
              }}
              onChange={(newValue) => {
                console.log("Change:", `${newValue}`);
                handleRatesChanges(`${newValue}`);
              }}
              value={Number(amount) || 0}
              formatter={(value) => {
                return FormatCorrect(value, selectedCountry?.code);
              }}
            />
            {/*  <CustomInput
            placeholder="amount"
            className="input"
            style={{
              borderRadius: "0px",
              borderSize: "0.5px",
              fontSize: "6px",
            }}
            onChange={(e) => {
              handleRatesChanges3(e);
              console.log(e.target.value);
            }}
          /> */}
          </div>
        )}
        <div className="cont2">
          <div className="cont2content">
            <div className="lines"></div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" rx="10" fill="#00a85a46" />
              <g clip-path="url(#clip0_400_9816)">
                <path
                  d="M6.81792 5.75739C6.52502 5.4645 6.05015 5.4645 5.75726 5.75739C5.46436 6.05029 5.46436 6.52516 5.75726 6.81805L8.93923 10L5.75729 13.182C5.46439 13.4749 5.46439 13.9497 5.75729 14.2426C6.05018 14.5355 6.52505 14.5355 6.81795 14.2426L9.99989 11.0607L13.1819 14.2427C13.4748 14.5356 13.9496 14.5356 14.2425 14.2427C14.5354 13.9498 14.5354 13.4749 14.2425 13.182L11.0606 10L14.2426 6.81802C14.5355 6.52512 14.5355 6.05025 14.2426 5.75736C13.9497 5.46446 13.4748 5.46446 13.1819 5.75736L9.99989 8.93937L6.81792 5.75739Z"
                  fill="#464F60"
                />
              </g>
              <defs>
                <clipPath id="clip0_400_9816">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(2 2)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="lines"></div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" rx="10" fill="#00a85a46" />
              <rect
                x="4"
                y="11"
                width="2"
                height="12"
                rx="1"
                transform="rotate(-90 4 11)"
                fill="#464F60"
              />
            </svg>
            <div className="lines"></div>

            <div className="te">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" rx="10" fill="#00a85a46" />
                <rect
                  x="4"
                  y="9"
                  width="2"
                  height="12"
                  rx="1"
                  transform="rotate(-90 4 9)"
                  fill="#464F60"
                />
                <rect
                  x="4"
                  y="13"
                  width="2"
                  height="12"
                  rx="1"
                  transform="rotate(-90 4 13)"
                  fill="#464F60"
                />
              </svg>
              <div></div>
            </div>
            <div className="lines"></div>
          </div>
          <div className="sidecontenr">
            <div className="line2"></div>
            <h4>
              <span>Rate = </span>
              <span style={{ fontSize: "11px" }}>
                <AmountFormatter
                  currency={
                    change ? selectedCountry?.code : selectedCountry2?.code
                  }
                  value={
                    currentRates?.agentRate ||
                    currentRates?.conversionRate ||
                    currencyDetails[0]?.balance ||
                    0
                  }
                />
              </span>
            </h4>
            <div className="line2"></div>
            <h4>
              <span>Fee = </span>

              <span style={{ fontSize: "13px" }}>
                <AmountFormatter
                  currency={
                    change ? selectedCountry2?.code : selectedCountry?.code
                  }
                  value={currentRates?.transitionFee || 0}
                />
              </span>
            </h4>
            <div className="line2"></div>
            <h4>
              <span>Total to pay = </span>
              <span style={{ fontSize: "11px" }}>
                <AmountFormatter
                  currency={
                    change ? selectedCountry2?.code : selectedCountry?.code
                  }
                  value={
                    change
                      ? Number(amount2) + currentRates?.transitionFee || 0
                      : Number(amount) + currentRates?.transitionFee || 0
                  }
                />
              </span>
            </h4>
            <div className="line2"></div>
          </div>
        </div>
        {change ? (
          <div className="cont1">
            <CountryDropdown
              rate
              value={selectedCountry}
              setValue={setSelectedCountry}
              onChange={handleCountryChange}
              newOptionsnew={true}
              newOptions={getC2?.map((item) => {
                return {
                  code: item?.currencyCode,
                  value: item?.name,
                  label: item?.name,
                  id: item?.id,
                  ...item,
                };
              })}
            />
            <InputNumber
              className="input"
              step={0}
              style={{
                borderSize: "0.5px",
                fontSize: "6px",
                borderRadius: "0  0 10px",
                padding: "13px",
                border: "1px solid #ccc",
                width: "100%",
                background: "#ffffff",
                color: "#000000",
              }}
              onChange={(newValue) => {
                console.log("Change:", `${newValue}`);
                handleRatesChangesdiv(`${newValue}`);
              }}
              value={Number(amount) || 0}
              formatter={(value) => {
                return FormatCorrect(value, selectedCountry?.code);
              }}
            />
            {/*  <CustomInput
            placeholder="amount"
            className="input"
            style={{
              borderRadius: "0px",
              borderSize: "0.5px",
              fontSize: "6px",
            }}
            onChange={(e) => {
              handleRatesChanges3(e);
              console.log(e.target.value);
            }}
          /> */}
          </div>
        ) : (
          <div className="cont3">
            <CountryDropdown
              rate
              collectionStatus
              style={{
                width: "100%",
              }}
              value={selectedCountry2}
              setValue={setSelectedCountry2}
              onChange={handleCountryChange2}
              newOptionsnew={true}
              newOptions={getC?.map((item) => {
                return {
                  code: item?.currencyCode,
                  value: item?.name,
                  label: item?.name,
                  id: item?.id,
                  ...item,
                };
              })}
            />
            <InputNumber
              className="input"
              step={0}
              style={{
                borderSize: "0.5px",
                fontSize: "6px",
                borderRadius: "0  0 10px",
                padding: "13px",
                border: "1px solid #ccc",
                background: "#ffffff",
                color: "#000000",
                width: "100%",
                backgroundColor: "transparent",
              }}
              formatter={(value) => {
                return FormatCorrect(value, selectedCountry2?.code);
              }}
              onChange={(newValue) => {
                handleRatesChangesdiv2(`${newValue}`);
              }}
              value={Number(amount2) || 0}
            />
          </div>
        )}
      </RateCont>
    </div>
  );
}

const RateCont = styled.div`
  .rc-input-number {
    border: 3px solid #00a85a44 !important;
    border-left: none !important;
  }
  border-radius: 40px;
  padding: 2em;
  background-color: #fff;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  box-shadow: 1px -1px 198px -56px rgba(0, 168, 90, 0.75);
  -webkit-box-shadow: 1px -1px 198px -56px rgba(0, 168, 90, 0.75);
  -moz-box-shadow: 1px -1px 198px -56px rgba(0, 168, 90, 0.75);
  border: 6px solid #00a85a46;
  .rc-input-number-input {
    background: #fff;
    border: none;
    color: black;
    width: 100%;
  }

  .cont1,
  .cont3 {
    display: grid;
    grid-template-columns: 2.7fr 4fr;

    width: 100%;
    .css-13cymwt-control {
      /* padding: 10px; */
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 0px;
      border-top-left-radius: 10px;
      border-top-right-radius: 0px;
      border-right: none;
      border-width: 1.5px;
    }

    .input {
      padding: 8px !important;
      /* border-bottom-left-radius: 10px; */
      /* border-top-left-radius: 10px; */
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
      /* border: none !important; */

      &::placeholder {
        font-size: 12px;
      }
    }
  }
  .cont2 {
    display: flex;
    /* flex-direction: column; */
    /* align-items: flex-start; */
    /* align-items: center; */
    /* justify-content: space-evenly; */
    width: 80%;
    margin: 0 auto;
    gap: 20px;

    .cont2content {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* border: 1px solid red;å */
    }

    .sidecontenr {
      /* border: 1px solid red;å */
      width: 300px;
      > h4 {
        font-weight: 500;
      }
    }

    .tecont {
      width: 100%;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
    }
    .te {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .lines {
    height: 18px;
    width: 3px;
    background-color: #00a85aa0;
  }

  .line2 {
    height: 18px;
    width: 3px;
    /* background-color: #D0D5DD; */
  }
`;

export default Rates;

/* 
import React, { useState, useEffect } from "react";
import CountryDropdown from "./CountryList";
import CountryFlag from "react-country-flag";
import CustomInput from "./CustomInput";
import styled from "styled-components";
import AmountFormatter from "../reuseables/AmountFormatter";
import { useQuery } from "@tanstack/react-query";
import {
  DashboardTodayRates,
  DashboardTodayRatesAgent,
  GetDetails,
  Rates as Ratess,
  agentCustomerGetRate,
} from "../services/Dashboard";
import { countryObjectsArray } from "../../config/CountryCodes";
import InputNumber from "rc-input-number";
import { CFormatter } from "../hooks/format";
import { FormatCorrect, FormatCorrect2 } from "../utils/format";
import { getUserCurrencies } from "../services/Auth";

function Rates({
  amount,
  setAmount,
  amount2,
  setAmount2,
  moneyData,
  change,
  setChange,
  setMoneyData,
  currentRates,
  setcurrentRates,
  selectedCountry,
  setSelectedCountry,
  selectedCountry2,
  setSelectedCountry2,
}) {
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  console.log("🚀 ~ file: Dashboard.jsx:18 ~ Dashboard ~ Userdata:", Userdata);

  const {
    data,
    isLoading: nameEnqLoading,
    refetch: refetchNameEnq,
  } = useQuery({
    queryKey: [Userdata?.data?.user?.userId, 0],
    queryFn: GetDetails,
    onSuccess: (data) => {
      return;
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const getC = JSON.parse(localStorage.getItem("currencyList"));
  const getC2 = data?.data?.allowMultiCurrencyTrading
    ? JSON.parse(localStorage.getItem("currencyList"))
    : JSON.parse(localStorage.getItem("userCurrencyList"));

  console.log(
    "🚀 ~ file: Rates.jsx:47 ~ Rates ~ selectedCountry:",
    selectedCountry
  );
  console.log(
    "🚀 ~ file: Rates.jsx:47 ~ Rates ~ selectedCountry2:",
    selectedCountry2
  );

  localStorage.setItem(
    "country1",
    JSON.stringify(
      selectedCountry ||
        getC2
          ?.filter((item) => item?.isSending)
          ?.map((item) => {
            return {
              value: item?.name,
              label: item?.name,
              ...item,
            };
          })?.[0]
    )
  );
  localStorage.setItem(
    "country2",
    JSON.stringify(
      selectedCountry2 ||
        getC
          ?.filter((item) => item?.isReceiving)
          ?.map((item) => {
            return {
              value: item?.name,
              label: item?.name,
              ...item,
            };
          })?.[1]
    )
  );

  const handleCountryChange = (selectedOption) => {
    const getC = data?.data?.allowMultiCurrencyTrading
      ? JSON.parse(localStorage.getItem("currencyList"))
      : JSON.parse(localStorage.getItem("userCurrencyList"));
    const newC = getC?.find(
      (d) => d?.name?.toLowerCase() === selectedOption?.label?.toLowerCase()
    );
    console.log(selectedOption);
    console.log("🚀 ~ file: Rates.jsx:55 ~ handleCountryChange ~ newC:", newC);
    localStorage.setItem("country1", JSON.stringify(selectedOption));

    setSelectedCountry(selectedOption);
    updateCurrencyDetails(selectedOption.label);
  };

  const handleCountryChange2 = (selectedOption) => {
    console.log(
      "🚀 ~ file: Dashboard.jsx:37 ~ handleCountryChange ~ selectedOption:",
      selectedOption
    );

    const getC = JSON.parse(localStorage.getItem("currenyList"));
    const newC = getC?.find(
      (d) => d?.name?.toLowerCase() === selectedOption?.label?.toLowerCase()
    );
    localStorage.setItem("country2", JSON.stringify(selectedOption));
    setSelectedCountry2(selectedOption);
    updateCurrencyDetails2(selectedOption.label);
  };

  const [currencyDetails, setCurrencyDetails] = useState([]);
  const [currencyDetails2, setCurrencyDetails2] = useState([]);
  console.log(
    "🚀 ~ file: Dashboard.jsx:57 ~ Dashboard ~ currencyDetails:",
    currencyDetails
  );
  const [dashboardDetails, setDashboardDetails] = useState(null);

  const updateCurrencyDetails = (countryLabel) => {
    const defaultDetails = Userdata?.data?.user?.wallet?.filter(
      (d) => d?.country?.name === countryLabel
    );
    setCurrencyDetails([...defaultDetails]);

    const transactionVolume = Userdata?.data?.user?.transactionVolume;
    const transactionArray = Object.keys(transactionVolume)
      .map((currencyCode) => ({
        currencyCode,
        ...transactionVolume[currencyCode],
      }))
      .find((d) => d?.currencyCode == defaultDetails[0]?.country?.currencyCode);

    setDashboardDetails(transactionArray);
  };
  const updateCurrencyDetails2 = (countryLabel) => {
    const defaultDetails = Userdata?.data?.user?.wallet?.filter(
      (d) => d?.country?.name === countryLabel
    );
    setCurrencyDetails2([...defaultDetails]);

    const transactionVolume = Userdata?.data?.user?.transactionVolume;
    const transactionArray = Object.keys(transactionVolume)
      .map((currencyCode) => ({
        currencyCode,
        ...transactionVolume[currencyCode],
      }))
      .find((d) => d?.currencyCode == defaultDetails[0]?.country?.currencyCode);

    setDashboardDetails(transactionArray);
  };

  const dataObject = {};
  currencyDetails?.forEach((item) => {
    dataObject["id"] = item;
  });

  console.log(
    "🚀 ~ file: Rates.jsx:105 ~ Rates ~ currencyDetails2:",
    currencyDetails2
  );

  const dataObject2 = {};
  currencyDetails2?.forEach((item) => {
    dataObject2["id"] = item;
  });
  console.log("🚀 ~ file: Rates.jsx:104 ~ Rates ~ dataObject2:", dataObject2);

  const {
    data: rates,
    isLoading: Ratesloading,
    refetch: RatesnameEnq,
  } = useQuery({
    queryKey: change
      ? [selectedCountry2?.id, selectedCountry?.id, amount2, amount]
      : [selectedCountry?.id, selectedCountry2?.id, amount, amount2],
    queryFn: Userdata?.data?.user?.agentId ? agentCustomerGetRate : Ratess,
    onSuccess: (data) => {
      console.log(data, "jklssds");
      if (data?.data === "") {
        localStorage.setItem("amount", JSON.stringify({}));
      } else {
        localStorage.setItem("amount", JSON.stringify(data?.data));
        setMoneyData(data?.data);
      }
      if (data?.status) {
        setcurrentRates(data?.data);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });


  const handleRatesChanges = (e) => {
    setAmount(e);
    setAmount2(e * currentRates?.conversionRate);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  };

  const handleRatesChanges2 = (e) => {
    setAmount2(e);
    setAmount(e * currentRates?.conversionRate);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  };

  const handleRatesChangesdiv = (e) => {
    setAmount(e);
    setAmount2(e / currentRates?.conversionRate);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  };

  const handleRatesChangesdiv2 = (e) => {
    setAmount2(e);
    setAmount(e / currentRates?.conversionRate);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  };

  useEffect(() => {
    if (change) {
      setAmount(amount2 * currentRates?.conversionRate);
    } else {
      setAmount2(amount * currentRates?.conversionRate);
    }
  }, [currentRates?.conversionRate]);

  return (
    <div>
      <RateCont>
        <img
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            width: "30px",
            transition: "all .5s",
            transform: `translate(-100%, -60%) rotateX(${
              change ? "180deg" : "0deg"
            })`,
            cursor: "pointer",
            opacity: "0.7",
          }}
          onClick={() => {
            setChange(!change);
          }}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6klEQVR4nO2bS2rDMBBA5wJNe4sWuuhRumqxbNpFjxEKzqLQMzQUWjCxTFZzxCKnn8Q0jiR/ZjTSgCGL4PCeI1nMB4BjVMUCtFpBk5ft56gCn86gzl5Aq8/2arJX+Li9gCjhdUwS8Ah8FBLwBLxoCWgJL1ICOsKLkoCe8CIk4ED4oCXgSPBBSsCR4YOSgBPBByEBJ4ZnLQFngmcpAWeGZyUBieDZSNBqRQb/KyEv6QQ0eRm3gKpYQGO9BNYOYHbfNb9Nnk1Cq31gDXV2bS1gW1xCnb+dXP/bu3NgEdgrYQdvwlaAiT4JrOD7JfzBuwo4JoEl/P8SDuF9BHQlsIY/2BjVI2zUFXTDR4AJcy+dP9BveEPDV4CY0FIE1NmzBchSrgDtCZIEqPQPgLQEVNoDIG2CKr0FIL0GVToHQDoIqehOgkuvIzS70FJOdL4RhYBqosSGuSf7xAbupbbq7B2a+5vBAnZZ4TWPio5rcrMrwVXAPvzPxVICEqS32UhAwgIHuYQq9hKXTlXe0uGpCqzyIoNGB/KKDxK2upDDUzY7sYGnaHdjBz9nwyNb+DlaXtnDT9n0HAz8FG3vwcGPOfgQLPwYoy/Bww8ZfhID7zP+Jg7eZQBSLLzNCKx4+L4h6Gjg4TvabFJech6D/wIleS6dySZ03AAAAABJRU5ErkJggg=="
        />
        {change ? (
          <div className="cont3">
            <CountryDropdown
              rate
              collectionStatus
              style={{
                width: "100%",
              }}
              value={selectedCountry2}
              setValue={setSelectedCountry2}
              onChange={handleCountryChange2}
              newOptions={getC?.map((item) => {
                return {
                  code: item?.currencyCode,
                  value: item?.name,
                  label: item?.name,
                  id: item?.id,
                  ...item,
                };
              })}
            />
            <InputNumber
              className="input"
              step={0}
              style={{
                borderSize: "0.5px",
                fontSize: "6px",
                padding: "13px",
                border: "1px solid #ccc",
                background: "#ffffff",
                color: "#000000",
                width: "100%",
                backgroundColor: "transparent",
              }}
              formatter={(value) => {
                return FormatCorrect(value, selectedCountry2?.code);
              }}
              onChange={(newValue) => {
                handleRatesChanges2(`${newValue}`);
              }}
              value={Number(amount2) || 0}
            />
          </div>
        ) : (
          <div className="cont1">
            <CountryDropdown
              rate
              setValue={setSelectedCountry}
              value={selectedCountry}
              onChange={handleCountryChange}
            />
            <InputNumber
              className="input"
              step={0}
              style={{
                borderSize: "0.5px",
                fontSize: "6px",
                padding: "13px",
                border: "1px solid #ccc",
                width: "100%",
                background: "#ffffff",
                color: "#000000",
              }}
              onChange={(newValue) => {
                console.log("Change:", `${newValue}`);
                handleRatesChanges(`${newValue}`);
              }}
              value={Number(amount) || 0}
              formatter={(value) => {
                return FormatCorrect(value, selectedCountry?.code);
              }}
            />
        
          </div>
        )}
        <div className="cont2">
          <div className="cont2content">
            <div className="lines"></div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" rx="10" fill="#00a85a46" />
              <g clip-path="url(#clip0_400_9816)">
                <path
                  d="M6.81792 5.75739C6.52502 5.4645 6.05015 5.4645 5.75726 5.75739C5.46436 6.05029 5.46436 6.52516 5.75726 6.81805L8.93923 10L5.75729 13.182C5.46439 13.4749 5.46439 13.9497 5.75729 14.2426C6.05018 14.5355 6.52505 14.5355 6.81795 14.2426L9.99989 11.0607L13.1819 14.2427C13.4748 14.5356 13.9496 14.5356 14.2425 14.2427C14.5354 13.9498 14.5354 13.4749 14.2425 13.182L11.0606 10L14.2426 6.81802C14.5355 6.52512 14.5355 6.05025 14.2426 5.75736C13.9497 5.46446 13.4748 5.46446 13.1819 5.75736L9.99989 8.93937L6.81792 5.75739Z"
                  fill="#464F60"
                />
              </g>
              <defs>
                <clipPath id="clip0_400_9816">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(2 2)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="lines"></div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" rx="10" fill="#00a85a46" />
              <rect
                x="4"
                y="11"
                width="2"
                height="12"
                rx="1"
                transform="rotate(-90 4 11)"
                fill="#464F60"
              />
            </svg>
            <div className="lines"></div>

            <div className="te">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" rx="10" fill="#00a85a46" />
                <rect
                  x="4"
                  y="9"
                  width="2"
                  height="12"
                  rx="1"
                  transform="rotate(-90 4 9)"
                  fill="#464F60"
                />
                <rect
                  x="4"
                  y="13"
                  width="2"
                  height="12"
                  rx="1"
                  transform="rotate(-90 4 13)"
                  fill="#464F60"
                />
              </svg>
              <div></div>
            </div>
            <div className="lines"></div>
          </div>
          <div className="sidecontenr">
            <div className="line2"></div>
            <h4>
              <span>Rate = </span>
              <span style={{ fontSize: "11px" }}>
                <AmountFormatter
                  currency={
                    change ? selectedCountry?.code : selectedCountry2?.code
                  }
                  value={
                    currentRates?.agentRate ||
                    currentRates?.conversionRate ||
                    currencyDetails[0]?.balance ||
                    0
                  }
                />
              </span>
            </h4>
            <div className="line2"></div>
            <h4>
              <span>Fee = </span>

              <span style={{ fontSize: "13px" }}>
                <AmountFormatter
                  currency={
                    change ? selectedCountry2?.code : selectedCountry?.code
                  }
                  value={currentRates?.transitionFee || 0}
                />
              </span>
            </h4>
            <div className="line2"></div>
            <h4>
              <span>Total to pay = </span>
              <span style={{ fontSize: "11px" }}>
                <AmountFormatter
                  currency={
                    change ? selectedCountry2?.code : selectedCountry?.code
                  }
                  value={
                    change
                      ? Number(amount2) + currentRates?.transitionFee || 0
                      : Number(amount) + currentRates?.transitionFee || 0
                  }
                />
              </span>
            </h4>
            <div className="line2"></div>
          </div>
        </div>
        {change ? (
          <div className="cont1">
            <CountryDropdown
              rate
              value={selectedCountry}
              setValue={setSelectedCountry}
              onChange={handleCountryChange}
              newOptionsnew={true}
              newOptions={getC2?.map((item) => {
                return {
                  code: item?.currencyCode,
                  value: item?.name,
                  label: item?.name,
                  id: item?.id,
                  ...item,
                };
              })}
            />
            <InputNumber
              className="input"
              step={0}
              style={{
                borderSize: "0.5px",
                fontSize: "6px",
                padding: "13px",
                border: "1px solid #ccc",
                width: "100%",
                background: "#ffffff",
                color: "#000000",
              }}
              onChange={(newValue) => {
                console.log("Change:", `${newValue}`);
                handleRatesChangesdiv(`${newValue}`);
              }}
              value={Number(amount) || 0}
              formatter={(value) => {
                return FormatCorrect(value, selectedCountry?.code);
              }}
            />
        
          </div>
        ) : (
          <div className="cont3">
            <CountryDropdown
              rate
              collectionStatus
              style={{
                width: "100%",
              }}
              value={selectedCountry2}
              setValue={setSelectedCountry2}
              onChange={handleCountryChange2}
              newOptionsnew={true}
              newOptions={getC?.map((item) => {
                return {
                  code: item?.currencyCode,
                  value: item?.name,
                  label: item?.name,
                  id: item?.id,
                  ...item,
                };
              })}
            />
            <InputNumber
              className="input"
              step={0}
              style={{
                borderSize: "0.5px",
                fontSize: "6px",
                padding: "13px",
                border: "1px solid #ccc",
                background: "#ffffff",
                color: "#000000",
                width: "100%",
                backgroundColor: "transparent",
              }}
              formatter={(value) => {
                return FormatCorrect(value, selectedCountry2?.code);
              }}
              onChange={(newValue) => {
                handleRatesChangesdiv2(`${newValue}`);
              }}
              value={Number(amount2) || 0}
            />
          </div>
        )}
      </RateCont>
    </div>
  );
}

const RateCont = styled.div`
  .rc-input-number {
    border: 3px solid #00a85a44 !important;
  }
  border-radius: 40px;
  padding: 2em;
  background-color: #fff;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  box-shadow: 1px -1px 198px -56px rgba(0, 168, 90, 0.75);
  -webkit-box-shadow: 1px -1px 198px -56px rgba(0, 168, 90, 0.75);
  -moz-box-shadow: 1px -1px 198px -56px rgba(0, 168, 90, 0.75);
  border: 6px solid #00a85a46;
  .rc-input-number-input {
    background: #fff;
    border: none;
    color: black;
    width: 100%;
  }

  .cont1,
  .cont3 {
    display: grid;
    grid-template-columns: 2.9fr 4fr;
    grid-gap: 10px;

    width: 100%;
    .css-13cymwt-control {
      border-radius: 10px !important;
      border-right: none;
      border-width: 1.5px;
    }

    .input {
      padding: 8px !important;

      border-radius: 10px !important;

      &::placeholder {
        font-size: 12px;
      }
    }
  }
  .cont2 {
    display: flex;
    width: 80%;
    margin: 0 auto;
    gap: 20px;

    .cont2content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .sidecontenr {
      width: 300px;
      > h4 {
        font-weight: 500;
      }
    }

    .tecont {
      width: 100%;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
    }
    .te {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .lines {
    height: 18px;
    width: 3px;
    background-color: #00a85aa0;
  }

  .line2 {
    height: 18px;
    width: 3px;
  }
`;

export default Rates;


 */
