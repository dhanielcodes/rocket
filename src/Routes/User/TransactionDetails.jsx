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
import { Tranx, TranxId, confirmPayment } from "../../services/Dashboard";
import moment from "moment";
import AmountFormatter from "../../reuseables/AmountFormatter";
import Btn from "../../reuseables/Btn";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import CustomTable from "../../reuseables/CustomTable";

function TransactionDetails() {
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
    queryFn: TranxId,
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
  const [showModal, setShowModal] = useState(false);
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
    <Userlayout current="Transactions Details" useBack={true}>
      <Content>
        {open && (
          <ReusableModal
            isOpen={open}
            onClose={() => {
              setOpen(!open);
              setShowBtn(false);
            }}
          >
            {status === true ? (
              <>
                <Msg type={true}>{getmsg}</Msg>

                {showBtn && (
                  <Btn
                    clicking={() => {
                      window.location.replace(getlink);
                    }}
                    styles={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    Proceed to Paymennt
                  </Btn>
                )}
              </>
            ) : (
              <>
                <Msg>{getmsg}</Msg>
                {getmsg === "You are yet to complete your KYC." ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Btn
                      styles={{
                        width: "100%",
                        marginRight: "10px",
                        padding: "8px",
                        fontWeight: "600",
                      }}
                      clicking={() => navigate("/upload")}
                      size={30}
                    >
                      CONTINUE TO KYC{" "}
                    </Btn>
                    &nbsp; &nbsp;
                    <Btn
                      styles={{
                        width: "100%",
                        marginRight: "10px",
                        padding: "8px",
                        fontWeight: "600",
                        background: "#b0b0b0",
                      }}
                      clicking={() => {
                        navigate("/user/dashboard");
                      }}
                      size={30}
                    >
                      CANCEL{" "}
                    </Btn>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </ReusableModal>
        )}

        {
          <ReusableModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(!showModal);
            }}
          >
            <>
              <span
                style={{
                  fontSize: "15px",
                  color: "#757575",
                }}
              >
                Bank Details to transfer to
              </span>
              <br />
              <h2>
                Bank -{" "}
                <b>{transactionList?.systemOfflinePaymentBank?.bankName}</b>
              </h2>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <h4>
                Account Name -{" "}
                <b>{transactionList?.systemOfflinePaymentBank?.accountName}</b>
              </h4>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>

              <h3>
                Account Number -{" "}
                <b>
                  {transactionList?.systemOfflinePaymentBank?.accountNumber}
                </b>
              </h3>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>

              <h3>
                Sort Code -{" "}
                <b>{transactionList?.systemOfflinePaymentBank?.sortCode}</b>
              </h3>
            </>
          </ReusableModal>
        }
        <div className="cont">
          <Header>
            <p>
              {moment(transactionList?.paymentDate).format(
                "DD MMM YYYY: hh:mm a"
              )}
            </p>

            {nameEnqLoading ? (
              ""
            ) : transactionList?.paymentStatus === "Deposited" ? (
              <img src={Checktrnx} />
            ) : transactionList?.paymentStatus === "Pending" ? (
              <svg
                width="62"
                height="62"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="26"
                  cy="26"
                  r="25"
                  transform="rotate(-74.6597 26 26)"
                  fill="#F2994A"
                />
                <path
                  d="M22.4409 31.1983L31.2167 19.0333"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.8661 29.8165L22.4411 31.1987L21.0944 22.7672"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : transactionList?.paymentStatus?.toLowerCase() === "on-hold" ? (
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="34.6484"
                  cy="34.6482"
                  r="24.5"
                  transform="rotate(45 34.6484 34.6482)"
                  fill="#FF9900"
                />
                <path
                  d="M42.9737 24.2023C42.5233 24.2023 42.0961 24.3019 41.7116 24.4791C41.4508 23.0738 40.2166 22.006 38.7368 22.006C38.272 22.006 37.8315 22.1116 37.4375 22.2997C37.1112 20.9808 35.9183 20 34.5 20C33.0817 20 31.8888 20.9809 31.5625 22.2997C31.1686 22.1116 30.728 22.006 30.2632 22.006C28.5944 22.006 27.2368 23.3636 27.2368 25.0323V32.43C26.8659 32.2674 26.4566 32.1766 26.0263 32.1766C24.3576 32.1766 23 33.5342 23 35.2029V41.4263C23 45.7983 26.5569 49.3553 30.9289 49.3553H38.0711C42.443 49.3553 46 45.7983 46 41.4263V27.2286C46 25.5598 44.6424 24.2023 42.9737 24.2023ZM44.1842 41.4263C44.1842 44.7971 41.4418 47.5395 38.0711 47.5395H30.9289C27.5582 47.5395 24.8158 44.7971 24.8158 41.4263V35.2029C24.8158 34.5354 25.3588 33.9924 26.0263 33.9924C26.6938 33.9924 27.2368 34.5354 27.2368 35.2029V40.045H29.0526V25.0323C29.0526 24.3649 29.5957 23.8218 30.2632 23.8218C30.9306 23.8218 31.4737 24.3649 31.4737 25.0323V34.5976H33.2895V23.0263C33.2895 22.3588 33.8325 21.8158 34.5 21.8158C35.1675 21.8158 35.7105 22.3588 35.7105 23.0263V34.5976H37.5263V25.0323C37.5263 24.3649 38.0694 23.8218 38.7368 23.8218C39.4043 23.8218 39.9474 24.3649 39.9474 25.0323V34.5976H41.7632V27.2285C41.7632 26.5611 42.3062 26.018 42.9737 26.018C43.6412 26.018 44.1842 26.5611 44.1842 27.2285V41.4263Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="34.6484"
                  cy="34.6482"
                  r="24.5"
                  transform="rotate(45 34.6484 34.6482)"
                  fill="#FF0000"
                />
                <rect
                  x="46.6689"
                  y="43.1335"
                  width="4"
                  height="28"
                  rx="2"
                  transform="rotate(135 46.6689 43.1335)"
                  fill="white"
                />
                <rect
                  x="26.8701"
                  y="45.9619"
                  width="4"
                  height="28"
                  rx="2"
                  transform="rotate(-135 26.8701 45.9619)"
                  fill="white"
                />
              </svg>
            )}

            <p>Transaction {transactionList?.paymentStatus}</p>
            <small>{transactionList?.sn}</small>
          </Header>
          <Details>
            <h3 className="detailsinfo">Personal Details</h3>
            <div className="detailscont">
              <div className="details">
                <h5>Beneficiary Name</h5>
                <p>{transactionList?.beneficiaryName}</p>
              </div>
              <div className="details">
                <h5>Beneficiary Country</h5>
                <p>{transactionList?.beneficiaryCountry}</p>
              </div>
              <div className="details">
                <h5>Beneficiary Bank</h5>
                <p>{transactionList?.beneficiaryBankName}</p>
              </div>
              <div className="details">
                <h5>Beneficiary Account Number</h5>
                <p>{transactionList?.beneficiaryBankAccountNumber}</p>
              </div>
              <div className="details">
                <h5>Amount</h5>
                <p>
                  <AmountFormatter
                    value={transactionList?.receivedAmount}
                    currency={transactionList?.senderCurrency}
                  />
                </p>
              </div>
              <div className="details">
                <h5>Transition Fee</h5>
                <p>{transactionList?.transitionFee}</p>
              </div>
              <div className="details">
                <h5>Sender Name</h5>
                <p>{transactionList?.senderName}</p>
              </div>
              <div className="details">
                <h5>Mobile number</h5>
                <p>{transactionList?.beneficiaryPhone}</p>
              </div>

              <div className="details">
                <h5>Collection Type</h5>
                <p>{transactionList?.collectionType}</p>
              </div>
              <div className="details">
                <h5>payment Type</h5>
                <p>{transactionList?.paymentType}</p>
              </div>
              <div className="details">
                <h5>paymentRef</h5>
                <p>{transactionList?.paymentRef}</p>
              </div>
              <div className="details">
                <h5>transaction Source</h5>
                <p>{transactionList?.transactionSource}</p>
              </div>
            </div>

            <h3 className="detailsinfo">Bank Details</h3>
            <div className="detailscont">
              <div className="details">
                <h5>AccontName</h5>
                <p>{transactionList?.beneficiaryName}</p>
              </div>

              <div className="details">
                <h5>RefrenceNo</h5>
                <p>
                  {transactionList?.paymentRef}
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_382_1718)">
                        <path
                          d="M16.667 7.49935H9.16699C8.24652 7.49935 7.50033 8.24554 7.50033 9.16602V16.666C7.50033 17.5865 8.24652 18.3327 9.16699 18.3327H16.667C17.5875 18.3327 18.3337 17.5865 18.3337 16.666V9.16602C18.3337 8.24554 17.5875 7.49935 16.667 7.49935Z"
                          fill="#667085"
                        />
                        <path
                          d="M4.98832 12.0112C4.54629 12.0112 3 12.0112 2.15515 12.0112C1.84259 11.6986 1.66699 11.2747 1.66699 10.8327V3.33268C1.66699 2.89065 1.84259 2.46673 2.15515 2.15417C2.46771 1.84161 2.89163 1.66602 3.33366 1.66602H10.8337C11.2757 1.66602 11.6996 1.84161 12.0122 2.15417C12.3247 2.46673 12.5003 2.89065 12.5003 3.33268V4.16602M9.16699 7.49935H16.667C17.5875 7.49935 18.3337 8.24554 18.3337 9.16602V16.666C18.3337 17.5865 17.5875 18.3327 16.667 18.3327H9.16699C8.24652 18.3327 7.50033 17.5865 7.50033 16.666V9.16602C7.50033 8.24554 8.24652 7.49935 9.16699 7.49935Z"
                          stroke="#667085"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_382_1718">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </p>
              </div>
            </div>

            {transactionList?.paymentStatus === "Pending" ? (
              transactionList?.systemOfflinePaymentBank ? (
                ""
              ) : (
                <Btn
                  clicking={() => {
                    mutate(transactionList?.paymentRef);
                  }}
                >
                  {isLoading ? "submitting..." : "Continue"}
                </Btn>
              )
            ) : (
              ""
            )}

            {transactionList?.paymentStatus === "Pending"
              ? transactionList?.systemOfflinePaymentBank && (
                  <Btn
                    clicking={() => {
                      setShowModal(true);
                    }}
                  >
                    Proceed to make Payment
                  </Btn>
                )
              : ""}
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

export default TransactionDetails;
