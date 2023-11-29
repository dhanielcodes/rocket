import React, { useState } from "react";
import { TiEye } from "react-icons/ti";
import { styled } from "styled-components";

function AppInput({
  placeholder,
  value,
  onChange,
  width,
  type,
  name,
  padding,
  disabled,
  defaultValue,
}) {
  const [ntype, setType] = useState("password");
  return (
    <Content>
      <div className="top">
        <input
          style={{ width: width, padding: padding }}
          type={type === "password" ? ntype : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          onKeyDown={(evt) => {
            if (type === "number") {
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault();
            }
          }}
        />
      </div>
      {/* HELLO */}
      {type === "password" && (
        <TiEye
          onClick={() => {
            if (ntype === "password") {
              setType("text");
            } else {
              setType("password");
            }
          }}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        />
      )}
    </Content>
  );
}

export default AppInput;
const Content = styled.div`
  position: relative;
  width: 100%;

  .top {
    padding: 0;
  }

  .top input {
    padding: 12px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid gainsboro;
    font-size: 14px;
    color: #000000;
    font-weight: 500;
    background-color: white;
  }
  .top ::placeholder {
    font-size: 14px;
    color: #7b7b7b;
    font-weight: 500;
  }
`;
