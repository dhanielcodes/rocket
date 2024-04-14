/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import { Avatar, Typography } from "@arco-design/web-react";
import Checktrnx from "../../images/checktnx.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GetDetails,
  Tranx,
  TranxId,
  confirmPayment,
} from "../../services/Dashboard";
import moment from "moment";
import AmountFormatter from "../../reuseables/AmountFormatter";
import Btn from "../../reuseables/Btn";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import Agentlayout from "../../reuseables/AgentLayout";

function CustomerDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access the 'id' query parameter
  const id = queryParams.get("id");
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  const {
    data,
    isLoading: nameEnqLoading,
    refetch: refetchNameEnq,
  } = useQuery({
    queryKey: [id],
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
  const transactionList = data?.data;
  console.log(transactionList);

  // useEffect to run when the component mounts
  useEffect(() => {
    // Fetch data when the component mounts or 'id' changes
    refetchNameEnq();
  }, [id, refetchNameEnq]);

  const [open, setOpen] = useState(false);
  const [getmsg, setmsg] = useState("");
  const [getlink, setlink] = useState("");
  const [status, setStatus] = useState("");

  const [showBtn, setShowBtn] = useState(false);

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: confirmPayment,
    onSuccess: (data) => {
      console.log("🚀 ~ file: Login.jsx:61 ~ Login ~ data:", data?.data);
      if (!data.status) {
        setOpen(true);
        setmsg(data?.message);
      } else {
        setlink(data?.data);
        setOpen(true);
        setmsg(data?.message);

        if (
          new RegExp(
            "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
          ).test(data?.data)
        ) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }

        setStatus(true);
      }
    },
    onError: (data) => {
      console.log("🚀 ~ file: SendMoney.jsx:286 ~ SendMoney ~ data:", data);

      // setShow(true)
      // setInfo(data)
      // setTimeout(() => {
      //     //  seterr("")
      // }, 2000)
      return;
    },
  });

  return (
    <Agentlayout current="Customer Details" useBack={true}>
      <Content>
        <div className="cont">
          <Header>
            <br />
            <Avatar
              className="av"
              style={{
                width: "60px",
                height: "60px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                }}
              >{`${transactionList?.firstName?.split(" ")[0][0]} `}</p>
            </Avatar>

            <p>
              {transactionList?.firstName} {transactionList?.surName}
            </p>
            <br />
          </Header>
          <Details>
            <h3 className="detailsinfo">Personal Details</h3>
            <div className="detailscont">
              <div className="details">
                <h5>Customer First Name</h5>
                <p>{transactionList?.firstName}</p>
              </div>
              <div className="details">
                <h5>Customer Last Name</h5>
                <p>{transactionList?.surName}</p>
              </div>
              <div className="details">
                <h5>Customer Country</h5>
                <p>{transactionList?.country?.name}</p>
              </div>
              <div className="details">
                <h5>Customer City</h5>
                <p>{transactionList?.city?.name}</p>
              </div>
              <div className="details">
                <h5>Customer Address</h5>
                <p>{transactionList?.address}</p>
              </div>
              <div className="details">
                <h5>Customer User Id</h5>
                <p>{transactionList?.userId}</p>
              </div>
              <div className="details">
                <h5>Customer Email</h5>
                <p
                  style={{
                    wordBreak: "break-all",
                  }}
                >
                  {transactionList?.email}
                </p>
              </div>
            </div>

            <h3 className="detailsinfo">Other Details</h3>
            <div className="detailscont">
              <div className="details">
                <h5>Customer Phone</h5>
                <p>{transactionList?.phone}</p>
              </div>

              <div className="details">
                <h5>Customer Reference</h5>
                <p>{transactionList?.reference}</p>
              </div>
            </div>
          </Details>
        </div>
      </Content>
    </Agentlayout>
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
  height: 35%;

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

  .actionbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;

    button {
      padding: 15px 35px;
      border: 0.1px solid rgba(90, 99, 118, 1);
      border-radius: 4px;

      @media screen and (max-width: 40em) {
        margin-bottom: -10px;
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

export default CustomerDetails;
