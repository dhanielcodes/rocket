/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import CountryFlag from "react-country-flag";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { countries } from "../services/Auth";
import { countryObjectsArray } from "../../config/CountryCodes";
import { getAgentRates } from "../services/Dashboard";
const CountryListAgent = ({
  value,
  onChange,
  setValue,
  style,
  defaultValue,
  removeNaira = false,
}) => {
  const [cList, setClist] = useState([]);
  const { data, isLoading, refetch } = useQuery({
    queryKey: [],
    queryFn: countries,
    onSuccess: (data) => {
      const mapped = data?.data?.map((d) => {
        return {
          value: d?.currencyCode,
          label: d?.name,
          id: d?.id,
        };
      });
      setClist;
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const { data: agentRates, isLoading: agentsLoading } = useQuery({
    queryKey: ["getAgentRates"],
    queryFn: getAgentRates,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      //   setOpen(true);
      console.log(err);
    },
  });

  console.log(agentRates);

  const options = countryList().getData();
  console.log(
    "🚀 ~ file: CountryList.jsx:13 ~ CountryDropdown ~ options:",
    options
  );
  // const newOptions =
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));

  const wallets = Userdata?.data?.user?.wallet;
  const optionsmap = wallets?.map((d) => {
    return {
      value: countryObjectsArray(d?.country?.name),
      label: d?.country?.name,
      id: d?.country?.id,
      code: d?.country?.currencyCode,
    };
  });
  const filteredUsers = wallets?.country?.filter((cname) =>
    optionsmap.includes(cname)
  );

  const newRates = agentRates?.data?.map((item) => {
    return {
      ...item,
      value:
        item?.fromCountryCurrency?.name +
        " to " +
        item?.toCountryCurrency?.name,
    };
  });

  function countInArray(array, key) {
    return [...new Map(array?.map((x) => [key(x), x])).values()];
  }

  console.log(countInArray(newRates, (it) => it?.value));

  return (
    <CountyCont>
      <Select
        value={value}
        onChange={onChange}
        options={countInArray(newRates, (it) => it?.value)}
        isSearchable={true}
        defaultValue={defaultValue}
        getOptionLabel={(country) => (
          <div
            className="dropdown"
            style={{ fontSize: "16px", display: "flex", alignItems: "center" }}
          >
            <div>
              <CountryFlag
                className="flag"
                countryCode={country.fromCountryCurrency?.currencyCode?.slice(
                  0,
                  2
                )}
                svg
              />{" "}
              &nbsp;
              <span className="countryName">
                {country.fromCountryCurrency?.name}
              </span>
            </div>
            &nbsp; &nbsp;
            <span className="countryName" style={{ fontWeight: "bold" }}>
              to
            </span>{" "}
            &nbsp;&nbsp;
            <div>
              <CountryFlag
                className="flag"
                countryCode={country.toCountryCurrency?.currencyCode?.slice(
                  0,
                  2
                )}
                svg
              />{" "}
              &nbsp;
              <span className="countryName">
                {country.toCountryCurrency?.name}
              </span>
            </div>
          </div>
        )}
        styles={{
          option: (styles) => ({
            ...styles,
            display: "flex",
            alignItems: "center",
            color: "#000",
            width: "100%",
            fontSize: "30px",
            //   border:"0.1px solid #d8d8d8",
            //   backgroundColor:"#e4e4e4",
            //   borerRadius:"18px"
          }),
          menuList: (styles) => ({
            ...styles,
            display: "flex",
            backgroundColor: "#FFF",
            width: "100%",
            flexDirection: "column",
            // gap:"10px",
            color: "#FFF",
            borerRadius: "18px",
            alignItems: "center",
          }),

          singleValue: (styles) => ({
            ...styles,
            display: "flex",
            width: "100%",
            color: "#000",
            alignItems: "center",
            "> svg": {
              marginRight: "8px",
              width: "40px",
              height: "40px",
              borderRadius: "10000px",
            },
          }),
        }}
      />
    </CountyCont>
  );
};

const CountyCont = styled.div`
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

export default CountryListAgent;
