/* eslint-disable no-unused-vars */
import React from "react";
import Userlayout from "../../reuseables/Userlayout";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import CustomSelect from "../../reuseables/CustomSelect";
import CustomInput from "../../reuseables/CustomInput";
import { DatePicker, Input } from "@arco-design/web-react";
import Btn from "../../reuseables/Btn";
const TextArea = Input.TextArea;
function UploadBeneficiaryFiles() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  console.log(
    "🚀 ~ file: BeneficiaryDetails.jsx:19 ~ BeneficiaryDetails ~ id:",
    id
  );

  return (
    <Userlayout current="Document Upload" useBack={true}>
      <Content>
        <div className="cont">
          <div className="sec">
            <SectionThree>
              <div className="text">
                <p className="textheader">Document Type</p>

                <CustomSelect
                  options={[]}
                  styles={{ fontSize: "10px ! important" }}
                  placeholder="Photo ID Document"
                />

                <p className="textheader">Name on Document</p>
                <CustomInput
                  placeholder="Enter account number"
                  readonly={false}
                  onChange={(e) => setAccNum(e?.target?.value)}
                />

                <p className="textheader">Document Name</p>
                <CustomSelect
                  options={[]}
                  styles={{ fontSize: "10px ! important" }}
                  placeholder="Photo ID Document"
                />

                <p className="textheader">Issue Date</p>
                <DatePicker
                  onChange={(value) => {
                    //  setUser((prev) => {
                    //     return {...prev, ['dob']:value}
                    //  })
                  }}
                  locale="en"
                  name="dob"
                  className="inputdate"
                  style={{ width: "100%", paddingLeft: "-10px" }}
                  placeholder="pick a date"
                />
                <p className="textheader">Expiry Date</p>
                <DatePicker
                  onChange={(value) => {
                    //  setUser((prev) => {
                    //     return {...prev, ['dob']:value}
                    //  })
                  }}
                  locale="en"
                  name="dob"
                  className="inputdate"
                  style={{ width: "100%", paddingLeft: "-10px" }}
                  placeholder="pick a date"
                />
                <p className="textheader">Place of Issue</p>
                <CustomInput placeholder="Lagos island" readonly={false} />
                <p className="textheader">Date of Birth</p>
                <DatePicker
                  onChange={(value) => {
                    //  setUser((prev) => {
                    //     return {...prev, ['dob']:value}
                    //  })
                  }}
                  locale="en"
                  name="dob"
                  className="inputdate"
                  style={{ width: "100%", paddingLeft: "-10px" }}
                  placeholder="pick a date"
                />
                <p className="textheader">Comment</p>
                <TextArea
                  name="address"
                  className="textarea"
                  placeholder="Give comments ..."
                  style={{
                    minHeight: 64,
                    background: "transparent",
                    border: "1px solid #d8d8d8",
                    borderRadius: "8px",
                  }}
                />

                <Btn>Submit</Btn>
              </div>
            </SectionThree>
          </div>
        </div>
      </Content>
    </Userlayout>
  );
}
const Content = styled.div`
  width: 100%;
  /* background-color: #fff; */
  margin: 0 auto;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 40em) {
    width: 100%;
  }

  .cont {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* width: 100%;
        border: 1px solid green;
         margin: 0 auto; */
  }
  .sec {
    padding-top: 10px;
    overflow-y: scroll;
  }
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

    .inputdate {
      padding: 1.3rem;
      border-radius: 8px;
      outline: none;
      border: 1px solid var(--gray-300, #d0d5dd);
      background: #ffffff;
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

  .arco-picker .arco-picker-size-default .inputdate {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid var(--gray-300, #d0d5dd);
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

export default UploadBeneficiaryFiles;
