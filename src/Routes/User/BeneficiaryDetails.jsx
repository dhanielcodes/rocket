/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import { Avatar, Typography } from "@arco-design/web-react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

function BeneficiaryDetails() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access the 'id' query parameter
  const id = queryParams.get("id");
  console.log(
    "🚀 ~ file: BeneficiaryDetails.jsx:19 ~ BeneficiaryDetails ~ id:",
    id
  );
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  const BeneList = Userdata?.data.user.beneficiaries?.filter(
    (d) => d?.id === Number(id)
  )[0];
  localStorage.setItem(
    "userBeneficiaryId",
    JSON.stringify({ id: id, name: BeneList?.beneficiaryName })
  );

  return (
    <Userlayout current="Beneficiary Details" useBack={true}>
      <Content>
        <div className="cont">
          <Header>
            <Avatar className="av">{`${BeneList?.beneficiaryName[0]}`}</Avatar>
            <p>{BeneList?.beneficiaryName}</p>
          </Header>
          <Details>
            <h3 className="detailsinfo">Personal Details</h3>
            <div className="detailscont">
              <div className="details">
                <h5>Beneficiary Name</h5>
                <p>{BeneList?.beneficiaryName}</p>
              </div>
              <div className="details">
                <h5>Date of Birth</h5>
                <p>2000</p>
              </div>
              <div className="details">
                <h5>Mobile number</h5>
                <p>{BeneList?.beneficiaryPhoneNumber}</p>
              </div>
            </div>
            {BeneList?.beneficiaryBank?.accountNumber != null &&
              BeneList?.beneficiaryBank?.accountNumber !== "" && (
                <div>
                  <h3 className="detailsinfo">Bank Details</h3>
                  <div className="detailscont">
                    <div className="details">
                      <h5>Account Name</h5>
                      <p>Bada Sulaimon</p>
                    </div>
                    <div className="details">
                      <h5>Account Number</h5>
                      <p>{BeneList?.beneficiaryBank?.accountNumber}</p>
                    </div>
                    <div className="details">
                      <h5>Bank Name</h5>
                      <p>Unity Bank</p>
                    </div>
                  </div>
                </div>
              )}

            <div className="actions">
              <div className="actionbtn">
                <button
                  onClick={() => navigate(`/user/beneficiary/upload?id=${id}`)}
                >
                  Upload Id
                </button>
                <button
                  className="send"
                  onClick={() => navigate(`/user/sendmoney?id=${id}`)}
                >
                  Send Money
                </button>
              </div>
            </div>
          </Details>
        </div>
      </Content>
    </Userlayout>
  );
}

const Content = styled.div`
  width: 100%;
  /* background-color: #fff; */
  padding-inline: 1em;
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
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* padding-block: 10px; */
  gap: 10px;
  height: 15%;

  .av {
    background: rgba(0, 168, 90, 1);
    padding: 10px;
  }

  p {
    font-weight: 500;
    font-size: 18px;
  }
`;

const Details = styled.div`
  height: 85%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 10px;
  .actions {
    @media screen and (max-width: 40em) {
      /* padding-top: 120px; */

      /* padding: 7px 20px; */
    }
  }

  .actionbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
    /* height: 100%; */

    .send {
      &:hover {
        background: rgba(241, 149, 74, 1);
        border: none;
      }
    }

    button {
      padding: 15px 35px;
      border: 0.1px solid rgba(90, 99, 118, 1);
      border-radius: 4px;
      cursor: pointer;

      @media screen and (max-width: 40em) {
        margin-bottom: 30px;
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
      color: rgba(51, 59, 74, 1);
      /* padding: 10px; */
    }

    .details {
      padding: 10px 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(233, 237, 245, 1);
      &:last-child {
        border-bottom: none;
      }
      h5 {
        color: rgba(102, 112, 133, 1);
        font-weight: 400;
        font-size: 16px;
      }
      p {
        font-weight: 450;
        font-size: 14px;
      }
    }
  }
`;

export default BeneficiaryDetails;
