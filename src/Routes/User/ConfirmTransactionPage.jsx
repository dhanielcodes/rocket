/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import { Avatar, Typography } from "@arco-design/web-react";
import Checktrnx from "../../images/checktnx.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Tranx, TranxId, confirmPayment } from "../../services/Dashboard";
import moment from "moment";
import AmountFormatter from "../../reuseables/AmountFormatter";
import Btn from "../../reuseables/Btn";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import CanvasDraw from "react-canvas-draw";
import toast from "react-hot-toast";
import Logo from "../../images/logotext.svg";

function ConfirmTransactionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [params] = useSearchParams();

  // Access the 'id' query parameter

  const id = queryParams.get("tid") || queryParams.get("tfId");

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
  const [open, setOpen] = useState(false);
  const [getmsg, setmsg] = useState("");
  const [getlink, setlink] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const canvasDraw = useRef();
  const statusCode = params.get("statusCode");

  console.log(statusCode === "2", "statusCode");
  // useEffect to run when the component mounts
  useEffect(() => {
    // Fetch data when the component mounts or 'id' changes
    refetchNameEnq();
  }, [id, refetchNameEnq]);

  return (
    <Content>
      <div className="cont">
        <Header>
          <img src={Logo} />

          <p>
            {moment(transactionList?.paymentDate).format(
              "DD MMM YYYY: hh:mm a"
            )}
          </p>

          <p>Transaction {transactionList?.paymentStatus}</p>
          <small>{transactionList?.sn}</small>
        </Header>
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
        {statusCode && (
          <ReusableModal
            isOpen={statusCode}
            onClose={() => {
              navigate("/");
              localStorage.removeItem("amount");
            }}
          >
            <Msg type={statusCode === "0" ? true : false}>
              {params.get("statusMessage")}
            </Msg>
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
                <b>
                  {transactionList?.systemOfflinePaymentBank?.bankName}{" "}
                  <svg
                    onClick={() => {
                      navigator.clipboard.writeText(
                        transactionList?.systemOfflinePaymentBank?.bankName
                      );
                      toast.success("Copied!");
                    }}
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                      fill="#00A85A"
                    />
                    <path
                      d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                      stroke="#00A85A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </b>
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
                <b>
                  {transactionList?.systemOfflinePaymentBank?.accountName}{" "}
                  <svg
                    onClick={() => {
                      navigator.clipboard.writeText(
                        transactionList?.systemOfflinePaymentBank?.accountName
                      );
                      toast.success("Copied!");
                    }}
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                      fill="#00A85A"
                    />
                    <path
                      d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                      stroke="#00A85A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </b>
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
                  {transactionList?.systemOfflinePaymentBank?.accountNumber}{" "}
                  <svg
                    onClick={() => {
                      navigator.clipboard.writeText(
                        transactionList?.systemOfflinePaymentBank?.accountNumber
                      );
                      toast.success("Copied!");
                    }}
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                      fill="#00A85A"
                    />
                    <path
                      d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                      stroke="#00A85A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
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
                <b>
                  {transactionList?.systemOfflinePaymentBank?.sortCode}{" "}
                  <svg
                    onClick={() => {
                      navigator.clipboard.writeText(
                        transactionList?.systemOfflinePaymentBank?.sortCode
                      );
                      toast.success("Copied!");
                    }}
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                      fill="#00A85A"
                    />
                    <path
                      d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                      stroke="#00A85A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </b>
              </h3>
            </>
          </ReusableModal>
        }
        <Details>
          <h3 className="detailsinfo">Personal Details</h3>
          <div className="detailscont">
            <div className="details">
              <h5>Beneficiary Name</h5>
              <p>
                {transactionList?.userBeneficiary?.beneficiaryBank?.accountName}
              </p>
            </div>
            <div className="details">
              <h5>Beneficiary Country</h5>
              <p>
                {transactionList?.userBeneficiary?.beneficiaryCountry?.name}
              </p>
            </div>
            <div className="details">
              <h5>Beneficiary Bank</h5>
              <p>
                {transactionList?.userBeneficiary?.beneficiaryBank?.bankName}
              </p>
            </div>

            <div className="details">
              <h5>Beneficiary Account Number</h5>
              <p>
                {
                  transactionList?.userBeneficiary?.beneficiaryBank
                    ?.accountNumber
                }
              </p>
            </div>
            <div className="details">
              <h5>Sending Amount</h5>
              <p>
                <AmountFormatter
                  value={transactionList?.paymentAmount}
                  currency={transactionList?.senderCurrency}
                />
              </p>
            </div>
            <div className="details">
              <h5>Transition Fee</h5>
              <p>
                <AmountFormatter
                  value={transactionList?.transitionFee}
                  currency={transactionList?.beneficiaryCurrency}
                />
              </p>
            </div>
            <div className="details">
              <h5>Received Amount</h5>
              <p>
                <AmountFormatter
                  value={transactionList?.receivedAmount}
                  currency={transactionList?.beneficiaryCurrency}
                />
              </p>
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
              <h5>Payment Ref.</h5>
              <p>
                {transactionList?.paymentRef}
                <span>
                  <svg
                    onClick={() => {
                      navigator.clipboard.writeText(
                        transactionList?.paymentRef
                      );
                      toast.success("Ref Copied!");
                    }}
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

          {/*  <div>Signature</div>
          <CanvasDraw
            ref={canvasDraw}
            canvasWidth={"100%"}
            canvasHeight={200}
          />
          <button
            onClick={() => {
              canvasDraw.current.eraseAll();
            }}
            style={{
              padding: "10px",
              width: "200px",
            }}
          >
            Erase
          </button> */}

          {transactionList?.paymentStatus === "Pending" ? (
            transactionList?.systemOfflinePaymentBank ? (
              ""
            ) : (
              <Btn
                clicking={() => {
                  mutate(id);
                }}
              >
                {isLoading ? "submitting..." : "Submit"}
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
  );
}

const Content = styled.div`
  width: 100%;
  /* background-color: #fff; */
  padding: 30px;
  margin: 0 auto;

  @media screen and (max-width: 40em) {
    width: 100%;
  }

  .cont {
    height: 100%;
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
        font-size: 13px;
      }
      p {
        font-weight: 450;
        font-size: 13px;
      }
    }
  }
`;

export default ConfirmTransactionPage;
