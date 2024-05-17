/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import countryList from "react-select-country-list";
import CountryFlag from "react-country-flag";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { countryObjectsArray } from "../../config/CountryCodes";
import { getCurrencies, getUserCurrencies } from "../services/Auth";
import {
  DashboardTodayRates,
  DashboardTodayRatesAgent,
  GetDetails,
} from "../services/Dashboard";
const CountryDropdown = ({
  value,
  onChange,
  style,
  defaultValue,
  option,
  setValue,
  disabled,
  collectionStatus = false,
  rate = false,
  newOptionsnew = false,
}) => {
  const options = option || [];
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));

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
    hdj?.data
      ?.map((item) => {
        return {
          ...item?.fromCurrency,
        };
      })
      ?.filter((item) =>
        data?.data?.allowMultiCurrencyTrading
          ? item
          : item?.code === Userdata?.data?.user?.country?.currencyCode
      )
      ?.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.code === value.code && t.name === value.name)
      ) ||
    hdjl?.data
      ?.map((item) => {
        return {
          ...item?.fromCurrency,
        };
      })
      ?.filter((item) =>
        data?.data?.allowMultiCurrencyTrading
          ? item
          : item?.code === Userdata?.data?.user?.country?.currencyCode
      )
      ?.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.code === value.code && t.name === value.name)
      );

  console.log(newSetRates, "fdfdd");

  const newSetRates2 =
    hdj?.data
      ?.map((item) => {
        return {
          ...item?.toCurrency,
        };
      })
      ?.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.code === value.code && t.name === value.name)
      ) ||
    hdjl?.data
      ?.map((item) => {
        return {
          ...item?.toCurrency,
        };
      })
      ?.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.code === value.code && t.name === value.name)
      );

  console.log(newSetRates, newSetRates2, "newds");
  useEffect(() => {
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
  console.log(data?.data?.allowMultiCurrencyTrading, "dkld");

  useEffect(() => {
    if (newOptionsnew) {
      setValue(newSetRates2?.[0]);
    } else {
      setValue(newSetRates?.[0]);
    }
  }, [hdj || hdjl]);

  return (
    <CountyCont $rate={rate}>
      <Select
        value={value}
        onChange={onChange}
        options={
          newOptionsnew
            ? newSetRates2
            : newSetRates
            ? collectionStatus
              ? newOptionsnew
                ? newSetRates2
                    ?.map((item) => {
                      return {
                        code: item?.currencyCode,
                        value: item?.name,
                        label: item?.name,
                        id: item?.id,
                        ...item,
                      };
                    })
                    ?.filter((item) => item.isReceiving)
                : newSetRates
                    ?.map((item) => {
                      return {
                        code: item?.currencyCode,
                        value: item?.name,
                        label: item?.name,
                        id: item?.id,
                        ...item,
                      };
                    })
                    ?.filter((item) => item.isReceiving)
              : newOptionsnew
              ? newSetRates2
                  ?.map((item) => {
                    return {
                      code: item?.currencyCode,
                      value: item?.name,
                      label: item?.name,
                      id: item?.id,
                      ...item,
                    };
                  })
                  ?.filter((item) => item.isSending)
              : newSetRates
                  ?.map((item) => {
                    return {
                      code: item?.currencyCode,
                      value: item?.name,
                      label: item?.name,
                      id: item?.id,
                      ...item,
                    };
                  })
                  ?.filter((item) => item.isSending)
            : options
        }
        defaultValue={defaultValue}
        isDisabled={disabled}
        getOptionLabel={(country) => (
          <span
            className="countryName"
            style={{ fontSize: "16px", display: "flex", alignItems: "center" }}
            onClick={() => {
              console.log(country?.code, country.currency);
            }}
          >
            <ReactCountryFlag
              countryCode={country?.code?.slice(0, 2)}
              title={country.code}
              style={{
                marginRight: "1px",
                borderRadius: "10000000px",
              }}
              svg
            />{" "}
            &nbsp;
            {country.code}
          </span>
        )}
        styles={{
          option: (styles) => ({
            ...styles,
            display: "flex",
            alignItems: "center",
            color: "#000",
            fontSize: "30px",

            //   backgroundColor:"#e4e4e4",
            //   borerRadius:"18px"
          }),
          menuList: (styles) => ({
            ...styles,
            display: "flex",
            backgroundColor: "#FFF",
            flexDirection: "column",
            // gap:"10px",
            color: "#FFF",
            borerRadius: "18px",
            alignItems: "center",
          }),

          singleValue: (styles) => ({
            ...styles,
            display: "flex",
            color: "#000",
            width: "100%",
            alignItems: "center",
            "> svg": {
              marginRight: "8px",
              borderRadius: "50%",
            },
          }),
        }}
      />
    </CountyCont>
  );
};

const CountyCont = styled.div`
  width: 100%;
  border-radius: 10px;
  .css-13cymwt-control {
    border: ${(props) => (props.$rate ? "3px solid #00a85a44 !important" : "")};
  }
  .flag {
    @media screen and (max-width: 40em) {
      font-size: 20px;
    }
    font-size: 30px;
    border-radius: 50% !important;
    margin-top: 5px;
    /* border: 1px solid rgba(5, 142, 78, 1); */
  }
  .countryName {
    /* font-weight: bold !important ; */
  }
  .dropdown:focus {
    color: black;
  }
`;

export default CountryDropdown;
