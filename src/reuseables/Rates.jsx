/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CountryDropdown from "./CountryList";
import CountryFlag from "react-country-flag";
import CustomInput from "./CustomInput";
import styled from "styled-components";
import AmountFormatter from "../reuseables/AmountFormatter";
import { useQuery } from "@tanstack/react-query";
import { Rates as Ratess } from "../services/Dashboard";
import { countryObjectsArray } from "../../config/CountryCodes";
import { countries } from "../services/Auth";

function Rates() {
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  console.log("🚀 ~ file: Dashboard.jsx:18 ~ Dashboard ~ Userdata:", Userdata);

  const countryFlags = [
    { code: "GB", label: "United Kingdom" },

    { code: "NG", label: "Nigeria" },
    // Add more countries as needed
  ];

  const defaultCountry = {
    label: "United Kingdom",
    value: "GB", // ISO country code for the UK
    flag: "", // URL to the UK flag image
    id: 232,
  };
  const defaultCountry2 = {
    label: "Nigeria",
    value: "NG", // ISO country code for the UK
    flag: "", // URL to the UK flag image
    id: 161,
  };

  const defaultCountrys = Userdata?.data?.user?.wallet.map((d) => {
    return {
      label: d?.country?.name,
      value: d?.country?.currencyCode,
      flag: "",
    };
  });

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [selectedCountry2, setSelectedCountry2] = useState(defaultCountry2);
  console.log(
    "🚀 ~ file: Rates.jsx:47 ~ Rates ~ selectedCountry:",
    selectedCountry
  );
  console.log(
    "🚀 ~ file: Rates.jsx:47 ~ Rates ~ selectedCountry2:",
    selectedCountry2
  );
  localStorage.setItem("country1", JSON.stringify(selectedCountry));
  localStorage.setItem("country2", JSON.stringify(selectedCountry2));

  const handleCountryChange = (selectedOption) => {
    const getC = JSON.parse(localStorage.getItem("countryList"));
    const newC = getC?.find(
      (d) => d?.name?.toLowerCase() === selectedOption?.label?.toLowerCase()
    );
    console.log("🚀 ~ file: Rates.jsx:55 ~ handleCountryChange ~ newC:", newC);
    localStorage.setItem("country1", JSON.stringify(newC));

    setSelectedCountry(selectedOption);
    updateCurrencyDetails(selectedOption.label);
  };

  const handleCountryChange2 = (selectedOption) => {
    console.log(
      "🚀 ~ file: Dashboard.jsx:37 ~ handleCountryChange ~ selectedOption:",
      selectedOption
    );
    const getC = JSON.parse(localStorage.getItem("countryList"));
    const newC = getC?.find(
      (d) => d?.name?.toLowerCase() === selectedOption?.label?.toLowerCase()
    );
    localStorage.setItem("country2", JSON.stringify(newC));
    setSelectedCountry2(selectedOption);
    updateCurrencyDetails2(selectedOption.label);
  };

  const [currencyDetails, setCurrencyDetails] = useState([]);
  const [currencyDetails2, setCurrencyDetails2] = useState([]);
  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);
  console.log(
    "🚀 ~ file: Dashboard.jsx:57 ~ Dashboard ~ currencyDetails:",
    currencyDetails
  );
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [Countries, setCountries] = useState(null);
  const [getrates, setRates] = useState(null);
  const [currentRates, setcurrentRates] = useState(null);
  const [currentCountry, setcurrentCountry] = useState(null);

  // Initial data setup on component mount
  useEffect(() => {
    updateCurrencyDetails(defaultCountry.label);
    updateCurrencyDetails2(defaultCountry2.label);
  }, []);

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
    queryKey: [
      getrates?.id || selectedCountry?.id,
      selectedCountry2?.id,
      amount,
      amount2,
    ],
    queryFn: Ratess,
    onSuccess: (data) => {
      localStorage.setItem("amount", JSON.stringify(data?.data));
      setcurrentRates(data?.data);
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  useEffect(() => {
    setcurrentRates(rates?.data);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  }, [selectedCountry, selectedCountry2]);

  const handleRatesChanges = (e) => {
    const { value } = e?.target;
    setAmount(value);
    localStorage.setItem("amount", JSON.stringify(rates?.data));
  };

  const {
    data: countrylist,
    isLoading: countrylistloading,
    refetch: refetchcountrylist,
  } = useQuery({
    queryKey: ["getCategoriess"],
    queryFn: countries,
    onSuccess: (data) => {
      setCountries(data?.data);
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  return (
    <div>
      <RateCont>
        <div className="cont1">
          <CountryDropdown
            value={selectedCountry}
            onChange={handleCountryChange}
            newOptions={countrylist?.data?.map((item) => {
              return {
                code: item?.currencyCode,
                value: item?.name,
                label: item?.name,
                id: item?.id,
                ...item,
              };
            })}
          />
          <CustomInput
            placeholder="amount"
            className="input"
            style={{
              borderRadius: "0px",
              borderSize: "0.5px",
              fontSize: "6px",
            }}
            onChange={(e) => handleRatesChanges(e)}
          />
        </div>
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
              <rect width="20" height="20" rx="10" fill="#D0D5DD" />
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
              <rect width="20" height="20" rx="10" fill="#D0D5DD" />
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
                <rect width="20" height="20" rx="10" fill="#D0D5DD" />
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
              <span>
                Rate{" "}
                <AmountFormatter
                  currency={currencyDetails[0]?.country?.currencyCode}
                  value={1}
                />{" "}
                ={" "}
              </span>
              <span style={{ fontSize: "11px" }}>
                <AmountFormatter
                  currency={currencyDetails[0]?.country?.currencyCode}
                  value={
                    currentRates?.conversionRate || currencyDetails[0]?.balance
                  }
                />
              </span>
            </h4>
            <div className="line2"></div>
            <h4>
              <span>
                Fee{" "}
                <AmountFormatter
                  currency={currencyDetails[0]?.country?.currencyCode}
                  value={0}
                />{" "}
                ={" "}
              </span>
              <AmountFormatter
                currency={currencyDetails[0]?.country?.currencyCode}
                value={currencyDetails[0]?.balance}
              />
            </h4>
            <div className="line2"></div>
            <h4>
              <span>
                Total to pay{" "}
                <AmountFormatter
                  currency={currencyDetails[0]?.country?.currencyCode}
                  value={1}
                />{" "}
                ={" "}
              </span>
              <span style={{ fontSize: "11px" }}>
                <AmountFormatter
                  currency={currencyDetails[0]?.country?.currencyCode}
                  value={
                    currentRates?.computedToAmount ||
                    currencyDetails[0]?.balance
                  }
                />
              </span>
            </h4>
            <div className="line2"></div>
          </div>
        </div>
        <div className="cont3">
          <CountryDropdown
            collectionStatus
            value={selectedCountry2}
            onChange={handleCountryChange2}
            newOptions={countrylist?.data?.map((item) => {
              return {
                code: item?.currencyCode,
                value: item?.name,
                label: item?.name,
                id: item?.id,
                ...item,
              };
            })}
          />
          <CustomInput
            placeholder="amount"
            className="input"
            style={{ borderRadius: "0px", borderSize: "0.5px" }}
            val={amount.length ? currentRates?.computedToAmount : ""}
          />
        </div>
      </RateCont>
    </div>
  );
}

const RateCont = styled.div`
  border-radius: 10px;
  padding: 2em;
  background-color: #fff;

  .cont1,
  .cont3 {
    display: flex;
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
    background-color: #d0d5dd;
  }

  .line2 {
    height: 18px;
    width: 3px;
    /* background-color: #D0D5DD; */
  }
`;

export default Rates;
