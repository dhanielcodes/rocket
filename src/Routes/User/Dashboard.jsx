/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import User from "../../images/user.svg";
import Wallet from "../../images/Wallet.svg";
import kite from "../../images/kite.svg";
import microphone from "../../images/microphone.svg";
import dashboardicon from "../../images/dashboardicon.svg";
import chooseplan from "../../images/chooseplan.png";
import withdrawfunds from "../../images/withdrawfunds.png";
import { Select } from "@arco-design/web-react";
import CountryDropdown from "../../reuseables/CountryList";
import CountryFlag from "react-country-flag";
import AmountFormatter from "../../reuseables/AmountFormatter";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  GetDetails,
  Rates,
  TodayRates,
  TodayRatesAgent2,
  TodayRatesType2,
  confirmKyc,
} from "../../services/Dashboard";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomInput from "../../reuseables/CustomInput";
import { countryObjectsArray } from "../../../config/CountryCodes";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import { getLocals } from "../../hooks/useSessionStorage";
import WalletList from "../../reuseables/WalletList";
import useScreenSize from "../../hooks/useScreenSize";

function Dashboard() {
  const navigate = useNavigate();
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  // const [currencyDetails, setCurrencyDetails] = useState([]);
  const [currencyDetails, setCurrencyDetails] = useState(null);
  const [getrates, setRates] = useState(null);
  const [currentRates, setcurrentRates] = useState(null);

  const { height } = useScreenSize();
  const [kyc, setKyc] = useState(false);

  console.log(
    "🚀 ~ file: Dashboard.jsx:34 ~ Dashboard ~ currentRates:",
    currentRates
  );
  const [amount, setamount] = useState(0);

  const getC = JSON.parse(localStorage.getItem("currencyList"));
  const c1 = getC
    ?.filter((item) => item?.isSending)
    ?.map((item) => {
      return {
        value: item?.name,
        label: item?.name,
        ...item,
      };
    })?.[0];
  const c2 = getC
    ?.filter((item) => item?.isReceiving)
    ?.map((item) => {
      return {
        value: item?.name,
        label: item?.name,
        ...item,
      };
    })?.[0];

  // Userdata?.data?.user?.userIdupdateCurrencyDetails

  const dataObject = {};
  currencyDetails?.forEach((item) => {
    dataObject["id"] = item;
  });
  console.log(
    "🚀 ~ file: Dashboard.jsx:37 ~ Dashboard ~ currencyDetails:",
    currencyDetails
  );

  const {
    data: rates,
    isLoading: Ratesloading,
    refetch: RatesnameEnq,
  } = useQuery({
    queryKey: [getrates?.id || dataObject?.id?.country?.id || c1?.id, c2?.id],
    queryFn: Userdata?.data?.user?.agentId ? TodayRatesAgent2 : TodayRatesType2,

    onSuccess: (data) => {
      setcurrentRates(data?.data);
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const {
    data: newDetails,
    isLoading: newDetailsloading,
    refetch: refetchnewDetails,
  } = useQuery({
    queryKey: [Userdata?.data?.user?.userId],
    queryFn: GetDetails,
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      // navigate("/")
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const [params] = useSearchParams();

  const {
    mutate,
    data: confirmData,
    isLoading: confirmLoading,
  } = useMutation({
    mutationFn: confirmKyc,
    // refetchInterval: 10000, // fetch data every 10 seconds
    onSuccess: (data) => {
      setKyc(true);
    },
    onError: (err) => {
      // navigate("/")
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });
  const jId = params.get("journeyId");
  useEffect(() => {
    if (jId) {
      mutate({
        JourneyId: params.get("journeyId"),
      });
    }
  }, [jId]);

  console.log(confirmData, "confirmData");
  console.log(
    "🚀 ~ file: Beneficiary.jsx:108 ~ Beneficiary ~ newDetails:",
    newDetails
  );

  const countryFlags = [c1, c2];

  const defaultCountry = {
    label: "United Kingdom",
    value: "GB", // ISO country code for the UK
    flag: "", // URL to the UK flag image
  };

  const defaultCountrys = Userdata?.data?.user?.wallet.map((d) => {
    return {
      label: d?.country?.name,
      value: d?.country?.currencyCode,
      flag: "",
    };
  });

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCountry2, setSelectedCountry2] = useState(defaultCountry);
  const [showbalance, setShowBalance] = useState(false);

  const handleRates = (e) => {
    setRates(e);
    setSelectedCountry(e);
  };

  const handleCountryChange = (selectedOption) => {
    console.log(
      "🚀 ~ file: Dashboard.jsx:37 ~ handleCountryChange ~ selectedOption:",
      selectedOption
    );
    console.log(selectedOption);
    setSelectedCountry2(selectedOption, "29202");
    updateCurrencyDetails(selectedOption.label);
  };

  const updateCurrencyDetails = (countryLabel) => {
    const defaultDetails = Userdata?.data?.user?.wallet?.filter(
      (d) => d?.country?.name === countryLabel
    );
    setCurrencyDetails([...defaultDetails]);

    const transactionVolume = Userdata?.data?.user?.transactionVolume;
    const transactionArray = Object.keys(transactionVolume)
      .map((currencyCode) => ({
        currencyCode,
        ...transactionVolume[currencyCode],
      }))
      .find((d) => d?.currencyCode == defaultDetails[0]?.country?.currencyCode);
    console.log(
      "🚀 ~ file: Dashboard.jsx:65 ~ transactionArray ~ transactionArray:",
      transactionArray
    );

    setDashboardDetails(transactionArray ?? transactionArray);
  };

  // Initialize currencyDetails and dashboardDetails
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [modal, setModal] = useState(true);

  // Initial data setup on component mount
  console.log(selectedCountry, "selec");
  useEffect(() => {
    updateCurrencyDetails(defaultCountry.label);
  }, []);
  console.log(getLocals("kycStatus"));
  const [wallet, selectedWallet] = useState();
  const wallets = Userdata?.data?.user?.wallet;

  return (
    <Userlayout>
      {/* <div>
        {selectedCountry && (
          <p>
            You selected: {selectedCountry.label}{' '}
            <img src={selectedCountry.flag} alt={selectedCountry.label} />
          </p>
        )}
      </div> */}

      <ReusableModal
        isOpen={kyc}
        onClose={() => {
          setKyc(false);
        }}
      >
        <Msg type={confirmData?.status}>{confirmData?.message}</Msg>
      </ReusableModal>

      {/*    {modal &&
          getLocals("kycStatus") &&
          newDetails?.data?.kycStatus === "Pending" && (
            <ReusableModal
              isOpen={modal}
              onClose={() => {
                setModal(false);
                localStorage.setItem("kycStatus", false);
              }}
            >
              {newDetails?.data?.kycStatus === "Pending" && (
                <Msg type={true}>Your Kyc is being process</Msg>
              )}
            </ReusableModal>
          )}
 */}
      <SectionOne>
        <div className="sel1">
          <div className="container">
            <img
              className="avatar"
              src={Userdata?.data?.user?.profileImageURL}
            />
            <FlexCol className="currencyselect">
              {/* <Select></Select> */}
              <WalletList
                value={wallet}
                onChange={(e) => {
                  selectedWallet(e);
                }}
              />
            </FlexCol>
          </div>

          <p>Wallet Balance</p>
          <div className="wallets">
            {wallets?.length ? (
              <>
                <h5>
                  {showbalance ? (
                    <AmountFormatter
                      currency={wallet?.code || 0}
                      value={wallet?.balance || 0}
                    />
                  ) : (
                    "****"
                  )}
                </h5>
                {showbalance ? (
                  <svg
                    onClick={() => setShowBalance(!showbalance)}
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0943 14.4995C11.0943 15.2841 11.406 16.0366 11.9608 16.5914C12.5156 17.1462 13.268 17.4579 14.0526 17.4579C14.8372 17.4579 15.5897 17.1462 16.1445 16.5914C16.6993 16.0366 17.011 15.2841 17.011 14.4995C17.011 13.7149 16.6993 12.9625 16.1445 12.4077C15.5897 11.8529 14.8372 11.5412 14.0526 11.5412C13.268 11.5412 12.5156 11.8529 11.9608 12.4077C11.406 12.9625 11.0943 13.7149 11.0943 14.4995ZM25.5214 13.8181C23.0174 8.54325 19.2323 5.88867 14.1583 5.88867C9.08156 5.88867 5.29912 8.54325 2.7951 13.8207C2.69467 14.0334 2.64258 14.2657 2.64258 14.5009C2.64258 14.7361 2.69467 14.9683 2.7951 15.181C5.29912 20.4558 9.0842 23.1104 14.1583 23.1104C19.235 23.1104 23.0174 20.4558 25.5214 15.1784C25.7248 14.7505 25.7248 14.2539 25.5214 13.8181ZM14.0526 19.1483C11.4852 19.1483 9.40381 17.0669 9.40381 14.4995C9.40381 11.9321 11.4852 9.85073 14.0526 9.85073C16.62 9.85073 18.7014 11.9321 18.7014 14.4995C18.7014 17.0669 16.62 19.1483 14.0526 19.1483Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => setShowBalance(!showbalance)}
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0531 17.4575C14.8377 17.4575 15.5902 17.1458 16.145 16.591C16.6998 16.0362 17.0114 15.2837 17.0114 14.4991C17.0114 14.4125 17.0075 14.3266 17.0001 14.2418L13.7958 17.4461C13.8806 17.4535 13.9662 17.4575 14.0531 17.4575ZM23.8452 5.34836L22.7168 4.22102C22.6772 4.18142 22.6234 4.15918 22.5674 4.15918C22.5114 4.15918 22.4577 4.18142 22.4181 4.22102L19.5305 7.10936C17.9376 6.29529 16.147 5.88825 14.1588 5.88825C9.08205 5.88825 5.29433 8.53226 2.79559 13.8203C2.69516 14.033 2.64307 14.2652 2.64307 14.5004C2.64307 14.7356 2.69516 14.9679 2.79559 15.1806C3.79403 17.2836 4.99629 18.9693 6.40238 20.2375L3.60808 23.0307C3.56848 23.0704 3.54624 23.1241 3.54624 23.1801C3.54624 23.2361 3.56848 23.2899 3.60808 23.3295L4.73568 24.4571C4.7753 24.4967 4.82903 24.5189 4.88505 24.5189C4.94107 24.5189 4.99479 24.4967 5.03442 24.4571L23.8452 5.64736C23.8648 5.62774 23.8804 5.60443 23.8911 5.57878C23.9017 5.55313 23.9072 5.52563 23.9072 5.49786C23.9072 5.47009 23.9017 5.44259 23.8911 5.41694C23.8804 5.39129 23.8648 5.36798 23.8452 5.34836ZM9.4043 14.4991C9.40422 13.6962 9.61213 12.9069 10.0078 12.2081C10.4034 11.5094 10.9733 10.9251 11.6619 10.512C12.3504 10.099 13.1343 9.87139 13.937 9.85134C14.7397 9.83128 15.5339 10.0195 16.2423 10.3976L14.958 11.6818C14.4401 11.516 13.8865 11.496 13.358 11.6241C12.8295 11.7522 12.3465 12.0234 11.9619 12.4079C11.5774 12.7925 11.3062 13.2755 11.1781 13.804C11.05 14.3325 11.07 14.8861 11.2358 15.4041L9.95159 16.6883C9.5912 16.0149 9.40317 15.2628 9.4043 14.4991Z"
                      fill="white"
                    />
                    <path
                      d="M25.5219 13.8184C24.5921 11.8603 23.4855 10.2636 22.202 9.02832L18.3947 12.8359C18.7156 13.6748 18.7868 14.5887 18.5995 15.4672C18.4122 16.3457 17.9746 17.1512 17.3395 17.7863C16.7043 18.4215 15.8988 18.8591 15.0204 19.0463C14.1419 19.2336 13.2279 19.1625 12.389 18.8415L9.15967 22.0709C10.6579 22.7641 12.3242 23.1108 14.1587 23.1108C19.2354 23.1108 23.0232 20.4668 25.5219 15.1787C25.6223 14.9661 25.6744 14.7338 25.6744 14.4986C25.6744 14.2634 25.6223 14.0311 25.5219 13.8184Z"
                      fill="white"
                    />
                  </svg>
                )}
              </>
            ) : (
              "No Active Wallets"
            )}
          </div>
        </div>

        <div className="dashboardcontent">
          <SectionThree>
            <div className="text">
              <p>Select country to view rates</p>
              <CountryDropdown
                removeNaira={true}
                value={selectedCountry}
                onChange={handleRates}
                setValue={setSelectedCountry}
              />
              {/* <CustomInput placeholder="Input Amount" onChange={(e) => console.log(e.target.value) } /> */}
              <div className="rates">
                <div className="pri">
                  <CountryFlag
                    countryCode={
                      selectedCountry?.code?.slice(0, 2) ||
                      c1?.code?.slice(0, 2)
                    }
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    svg
                  />
                  {/* <p>920.000 USD</p> */}
                  {/* <AmountFormatter currency={countryFlags[0].code} value={1}/> */}
                  <AmountFormatter
                    currency={
                      (currencyDetails && selectedCountry?.code) ||
                      c1?.code ||
                      0
                    }
                    value={1}
                  />
                  {/* <p>{rates?.data?.fromAmount}</p> */}
                </div>
                <div style={{ color: "#000" }}>=</div>
                <div className="sec">
                  <CountryFlag countryCode={c2?.code?.slice(0, 2)} svg />
                  {currentRates === "Unable to get rate." ? (
                    <div
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      No Rate Data
                    </div>
                  ) : (
                    <div>
                      <AmountFormatter
                        currency={c2?.code}
                        value={currentRates}
                      />
                    </div>
                  )}
                  {/* <p>920.000 NGN</p> */}
                </div>
              </div>
            </div>
          </SectionThree>
        </div>
      </SectionOne>

      <SectionTwo>
        <Box>
          <div
            className="action"
            style={{
              background: `url(${chooseplan})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "10px",
            }}
            onClick={() => navigate("/user/settings/wallet")}
          >
            <span>Wallet</span>
            <p>Fund your wallet easily</p>
            {/* <img src={Wallet} height="50px"/> */}
          </div>
        </Box>
        <Box>
          <div
            className="action"
            style={{
              background: `url(${withdrawfunds})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "10px",
            }}
            onClick={() => navigate("/user/sendmoney")}
          >
            <span>Send Money</span>
            <p>Quickly send money to your loved ones</p>
            {/* <img src={kite} height="50px"/> */}
          </div>
        </Box>
      </SectionTwo>

      <SectionFour>
        <div className="container">
          <img src={microphone} height="150px" />
          <div className="text">
            <h3>Refer & Earn </h3>
            <p>Refer a friend and earn £10</p>
          </div>

          <div className="copy">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#clip0_148_20088)">
                <path
                  d="M16.667 7.49935H9.16699C8.24652 7.49935 7.50033 8.24554 7.50033 9.16602V16.666C7.50033 17.5865 8.24652 18.3327 9.16699 18.3327H16.667C17.5875 18.3327 18.3337 17.5865 18.3337 16.666V9.16602C18.3337 8.24554 17.5875 7.49935 16.667 7.49935Z"
                  fill="#667085"
                />
                <path
                  d="M4.98832 12.0112C4.54629 12.0112 3 12.0112 2.15515 12.0112C1.84259 11.6986 1.66699 11.2747 1.66699 10.8327V3.33268C1.66699 2.89065 1.84259 2.46673 2.15515 2.15417C2.46771 1.84161 2.89163 1.66602 3.33366 1.66602H10.8337C11.2757 1.66602 11.6996 1.84161 12.0122 2.15417C12.3247 2.46673 12.5003 2.89065 12.5003 3.33268V4.16602M9.16699 7.49935H16.667C17.5875 7.49935 18.3337 8.24554 18.3337 9.16602V16.666C18.3337 17.5865 17.5875 18.3327 16.667 18.3327H9.16699C8.24652 18.3327 7.50033 17.5865 7.50033 16.666V9.16602C7.50033 8.24554 8.24652 7.49935 9.16699 7.49935Z"
                  stroke="#667085"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_148_20088">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>Code:N5EF720</p>
          </div>
        </div>
      </SectionFour>
    </Userlayout>
  );
}

const Content = styled.div`
  width: 100%;
  /* position: relative; */
  .dashboardamount h3 {
    font-weight: 400 !important;
  }

  /* border: 1px solid red; */
`;

const SectionOne = styled.div`
  .css-13cymwt-control {
    background: linear-gradient(
        94.71deg,
        rgba(255, 255, 255, 0.16) 0%,
        rgba(255, 255, 255, 0.06) 99.4%
      ),
      linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)) !important;
    border-radius: 20px !important;
    outline: none !important;
    width: 60% !important;
    color: #ffffff !important;
    border-color: hsl(0deg 0% 1.66% / 0%) !important;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #00a85a;
  }
  .css-tj5bde-Svg {
    color: #fff !important;
  }
  .css-w9q2zk-Input2 {
    color: #ffffff !important;
  }
  .css-t3ipsp-control {
    width: 60% !important;
    border: none !important;
  }
  .css-w9q2zk-Input2:after {
    /* color: #ffffff; */
  }
  #react-select-3-listbox {
    /* display: none !important; */
    width: 60% !important;
    margin: 0 !important;
    font-size: 12px !important;
    outline: none;
  }

  .flag {
    border-radius: 50% !important; /* Apply a circular border radius */
  }

  .css-inmdiq5-menu {
    width: 20% !important;
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

  .sel1 {
    background-color: #00a85a;
    height: 250px;
    padding: 1rem;
    text-align: center;
    font-size: 15px;
    color: #fff;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;

    p {
      font-weight: light;
      font-size: large;
      margin: 0 !important;
      padding: 10px;
    }

    .wallets {
      display: flex;
      justify-content: center;
      align-items: center;
      letter-spacing: 4px;
      text-align: center;

      h5 {
        /* font-size: larger; */
        font-weight: 500;
        font-size: 30px;
        margin: 0 !important;
      }
    }
  }
  .dashboardcontent {
    height: 300px;
    border-radius: 10px;
    background: #fff;
    width: 90%;
    margin: 0 auto;
    margin-top: -62px;
    font-weight: 300;
    .dashboard {
      padding: 1rem;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .dbox {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      p {
        font-weight: bolder;
        color: #98a2b3;
        font-size: 9px;
      }
      h3 {
        font-size: 20px;
      }
    }
    .dbox1 {
      border-right: 1px solid #e9edf5;
      border-bottom: 1px solid #e9edf5;
    }
    .dbox3 {
      border-right: 1px solid #e9edf5;
    }
    .dbox2 {
      border-bottom: 1px solid #e9edf5;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
    /* border: 1px solid red; */
  }

  .currencyselect {
    display: inline-flex;
    /* border: 1px solid red; */
    flex: 1;
    justify-content: center;
  }

  .welcome {
    font-size: 15px;
  }
  .welcomeName {
    font-size: 20px;
    font-weight: bolder;
  }
`;
const SectionTwo = styled.div`
  display: flex;
  /* width: 100%; */
  margin: 10px 0;
  padding-inline: 1em;
  border-radius: 10px;
  /* box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; */

  /* border: 1px solid green; */

  .boxtwo {
    /* background: #ECE8F6; */
    /* padding: 10px;
   border-radius: 10px; */
  }
`;
const SectionThree = styled.div`
  border-radius: 10px;
  /* border: 1px solid red; */
  padding-inline: 1em;
  color: var(--grey-400, #98a2b3);
  /* padding: 1em; */
  border-radius: 10px;
  /* box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; */
  .text {
    font-weight: bold;
    background-color: #fff;
    padding: 1em;
    font-size: 20px;
    border-radius: 10px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 18px;

    > p {
      font-weight: 500;
      font-size: 17px;
    }
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
const SectionFour = styled.div`
  padding-inline: 1em;

  /* box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; */
  .container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba(233, 237, 245, 1);
    width: 100%;
    padding-block: 20px;
    border-radius: 10px;
  }

  .text {
    text-align: center;
    margin: 12px 0px;
  }
  .copy {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 18px;
    border: 3px dotted grey;
    padding: 10px;
  }
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  /* border:1px solid green; */

  p {
    margin: 0;
    padding: 0;
  }
`;

const Box = styled.div`
  /* width: 50%; */
  flex: 1;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0);
  border-radius: 5px;
  background-position: 100px;
  /* background-color: #E8F6F2; */
  display: inline-flex;
  flex-direction: column;
  padding: 2px;
  border-radius: 10px;
  @media screen and (max-width: 40em) {
    /* height: 120px; */
    height: 120px;
    background-position: center;
    border-radius: 20px;
    box-shadow: 0px 3px 46px -3px rgba(0, 0, 0, 0.1) transparent;
  }

  .action {
    @media screen and (max-width: 40em) {
      /* height: 120px; */
      padding: 1em;
      height: 120px;
      background-position: center;
    }

    padding: 1em;
    height: 130px;
    background-repeat: no-repeat;

    span {
      font-weight: bold;
      font-size: 18px;
    }

    p {
      font-size: 12px;
      font-weight: lighter;
      @media screen and (max-width: 40em) {
        width: 100%;
      }

      width: 50%;
    }
  }

  > img {
    border: 1px solid red;
    height: 20px;
    justify-content: flex-end;
  }
  .text {
    padding: 10px;
  }
`;

export default Dashboard;
