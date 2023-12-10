import React from "react";
import styled from "styled-components";
import Select from "react-select";

export default function AppSelect({
  label,
  value,
  onChange,
  options,
  defaultValue,
  optionLabel,
  disabled,
}) {
  return (
    <NewSelect className="name">
      {label && <label>{label}</label>}
      <Select
        value={value}
        onChange={onChange}
        options={options}
        defaultValue={defaultValue}
        isDisabled={disabled}
        getOptionLabel={(provider) => (
          <span className="countryName" style={{ fontSize: "16px" }}>
            {provider.label}
          </span>
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
            flexDirection: "column",
            // gap:"10px",
            color: "#FFF",
            width: "100%",
            alignItems: "center",
          }),

          singleValue: (styles) => ({
            ...styles,
            display: "flex",
            width: "100%",
            color: "#000",
            alignItems: "center",
            borderRadius: "8px",
            padding: "3px",
            "> svg": {
              marginRight: "8px",
              borderRadius: "50%",
            },
          }),
        }}
      />
    </NewSelect>
  );
}

const NewSelect = styled.div`
  margin-top: 20px;
  .select {
    padding: 20px;
  }

  .css-13cymwt-control {
    border-radius: 8px;
    padding: 3px;
  }
`;
