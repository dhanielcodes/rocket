/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import countryList from "react-select-country-list";
import CountryFlag from "react-country-flag";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { countryObjectsArray } from "../../config/CountryCodes";
import { getCurrencies } from "../services/Auth";
const CountryDropdownNormal = ({
  value,
  onChange,
  style,
  defaultValue,
  option,
  setValue,
  disabled,
  collectionStatus = false,
}) => {
  const options = option || countryList().getData();

  return (
    <CountyCont>
      <Select
        value={value}
        onChange={onChange}
        options={options}
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
            {country.label}
          </span>
        )}
        styles={{
          option: (styles) => ({
            ...styles,
            display: "flex",
            alignItems: "center",
            color: "#000",
            fontSize: "30px",
            //   border:"0.1px solid #d8d8d8",
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

export default CountryDropdownNormal;
