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
}) {
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
  const {
    data,
    isLoading: nameEnqLoading,
    refetch: refetchNameEnq,
  } = useQuery({
    queryKey: [Userdata?.data?.user?.userId],
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
  const {
    data: currenciess,
    refetch,
    isFetching: isLoading2,
  } = useQuery({
    queryKey: [Userdata?.data?.user?.userId],
    queryFn: getUserCurrencies,
    enabled: false,
    onSuccess: (data) => {
      if (data?.status) {
        localStorage.setItem(
          "userCurrencyList",
          JSON.stringify(
            data?.data?.map((item) => {
              return {
                ...item,
              };
            })
          )
        );
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const { data: hdj, refetch: refetchNew } = useQuery({
    queryKey: [Userdata?.data?.user?.role?.id, Userdata?.data?.user?.userId],
    queryFn: DashboardTodayRates,
    enabled: false,
    onSuccess: (data) => {
      //setCountries(data?.data);
      if (data?.status) {
        localStorage.setItem(
          "newCurrencyList",
          JSON.stringify(
            data?.data?.map((item) => {
              return {
                ...item,
              };
            })
          )
        );
      }
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const { data: hdjl, refetch: refetchNew2 } = useQuery({
    queryKey: [
      Userdata?.data?.user?.agentId || Userdata?.data?.user?.userId,
      Userdata?.data?.user?.userId,
    ],
    queryFn: DashboardTodayRatesAgent,
    enabled: false,
    onSuccess: (data) => {
      //setCountries(data?.data);
      if (data?.status) {
        localStorage.setItem(
          "newCurrencyList",
          JSON.stringify(
            data?.data?.map((item) => {
              return {
                ...item,
              };
            })
          )
        );
      }
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });
  const newSetRates =
    hdj?.data?.map((item) => {
      return {
        ...item?.fromCurrency,
      };
    }) ||
    hdjl?.data?.map((item) => {
      return {
        ...item?.fromCurrency,
      };
    });

  console.log(newSetRates, "newds");
  useEffect(() => {
    refetch([Userdata?.data?.user?.userId]);
    if (Userdata?.data?.user?.role?.id === 5) {
      refetchNew2([
        Userdata?.data?.user?.agentId || Userdata?.data?.user?.userId,
        Userdata?.data?.user?.userId,
      ]);
    } else if (Userdata?.data?.user?.agentId) {
      refetchNew2([
        Userdata?.data?.user?.agentId || Userdata?.data?.user?.userId,
        Userdata?.data?.user?.userId,
      ]);
    } else {
      refetchNew([
        Userdata?.data?.user?.role?.id,
        Userdata?.data?.user?.userId,
      ]);
    }
    //eslint-disable-next-line
  }, []);

  const getC = JSON.parse(localStorage.getItem("currencyList"));
  const getC2 = data?.data?.allowMultiCurrencyTrading
    ? JSON.parse(localStorage.getItem("currencyList"))
    : JSON.parse(localStorage.getItem("userCurrencyList"));

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCountry2, setSelectedCountry2] = useState();
  console.log(
    "🚀 ~ file: Rates.jsx:47 ~ Rates ~ selectedCountry:",
    selectedCountry
  );
  console.log(
    "🚀 ~ file: Rates.jsx:47 ~ Rates ~ selectedCountry2:",
    selectedCountry2
  );
  useEffect(() => {
    setSelectedCountry(
      getC2
        ?.filter((item) => item?.isSending)
        .filter(
          (item) => item?.code === Userdata?.data?.user?.country?.currencyCode
        )
        ?.map((item) => {
          return {
            code: item?.currencyCode,
            value: item?.name,
            label: item?.name,
            id: item?.id,
            ...item,
          };
        })?.[0]
    );
    setSelectedCountry2(
      getC
        ?.filter((item) => item?.isReceiving)
        .filter(
          (item) => item?.code !== Userdata?.data?.user?.country?.currencyCode
        )
        ?.map((item) => {
          return {
            code: item?.currencyCode,
            value: item?.name,
            label: item?.name,
            id: item?.id,
            ...item,
          };
        })?.[0]
    );
  }, []);
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
    localStorage.setItem("country2", JSON.stringify(newC));
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
  const [getrates, setRates] = useState(null);
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
            transform: `translate(-100%, -60%) rotate(${
              change ? "180deg" : "0deg"
            })`,
            cursor: "pointer",
            opacity: "0.7",
          }}
          onClick={() => {
            setChange(!change);
          }}
          src="data:image/png;base64,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"
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
              onChange={handleCountryChange2}
              callback={newSetRates}
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
              value={selectedCountry}
              onChange={handleCountryChange}
              callback={newSetRates}
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
              callback={newSetRates}
              onChange={handleCountryChange}
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
              callback={newSetRates}
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
