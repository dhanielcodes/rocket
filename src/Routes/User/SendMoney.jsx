/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import Stepses from "../../reuseables/Stepses";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Input, Space } from "@arco-design/web-react";
import { Avatar, Typography, Tabs } from "@arco-design/web-react";
import FormattedDate from "../../reuseables/FormattedDate";
import { Dropdown, Menu, Divider } from "@arco-design/web-react";
import { IconDown, IconMoreVertical } from "@arco-design/web-react/icon";
import Btn from "../../reuseables/Btn";
import {
  GetDetails,
  Paymentchannel,
  Payoutchannel,
  Rates,
  TransferPurpose,
  sendMoney,
} from "../../services/Dashboard";
import {
  Paychannels as testpaymentchannel,
  Transferpurpose as testtransferpurpose,
  payoutchannels as payoutchannels,
  rates as testrate,
} from "../../../config/Test";
import { useQuery, useMutation } from "@tanstack/react-query";
import CustomSelect from "../../reuseables/CustomSelect";
import CustomInput from "../../reuseables/CustomInput";
import CountryDropdown from "../../reuseables/CountryList";
import CountryFlag from "react-country-flag";
import RateComponent from "../../reuseables/Rates";
import Total from "../../reuseables/Total";
import Checktrnx from "../../images/checktnx.svg";
import { Tooltip } from "@arco-design/web-react";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import { useLocation } from "react-router-dom";
import Iframe from "../../reuseables/PaymentLinks";
import Modals from "../../reuseables/Modals";
import { countryObjectsArray } from "../../../config/CountryCodes";
import AmountFormatter from "../../reuseables/AmountFormatter";
const { Text } = Typography;
const TextArea = Input.TextArea;

const InputSearch = Input.Search;
const TabPane = Tabs.TabPane;

const Droplist = ({ id, onNavigate }) => (
  //   <Menu.Item key='1' onClick={() => onNavigate(id)}>
  <Menu>
    <IconMoreVertical />
    <Menu.Item
      key="1"
      onClick={(id) => onNavigate(`/user/beneficiary/details?id=${id}`)}
    >
      <span>
        <svg
          width="30"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0653 12.8512 14.2174 12.5 13.3334 12.5H6.66671C5.78265 12.5 4.93481 12.8512 4.30968 13.4763C3.68456 14.1014 3.33337 14.9493 3.33337 15.8333V17.5M13.3334 5.83333C13.3334 7.67428 11.841 9.16667 10 9.16667C8.15909 9.16667 6.66671 7.67428 6.66671 5.83333C6.66671 3.99238 8.15909 2.5 10 2.5C11.841 2.5 13.3334 3.99238 13.3334 5.83333Z"
            stroke="#464F60"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      View Details
    </Menu.Item>
    <Menu.Item key="2">
      <svg
        width="30"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.1666 2.5009C14.3855 2.28203 14.6453 2.10842 14.9313 1.98996C15.2173 1.87151 15.5238 1.81055 15.8333 1.81055C16.1428 1.81055 16.4493 1.87151 16.7353 1.98996C17.0213 2.10842 17.2811 2.28203 17.5 2.5009C17.7188 2.71977 17.8924 2.97961 18.0109 3.26558C18.1294 3.55154 18.1903 3.85804 18.1903 4.16757C18.1903 4.4771 18.1294 4.7836 18.0109 5.06956C17.8924 5.35553 17.7188 5.61537 17.5 5.83424L6.24996 17.0842L1.66663 18.3342L2.91663 13.7509L14.1666 2.5009Z"
          stroke="#464F60"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Edit
    </Menu.Item>
    <Menu.Item key="3">
      <svg
        width="30"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.83337 14.1673L14.1667 5.83398M14.1667 5.83398H5.83337M14.1667 5.83398V14.1673"
          stroke="#464F60"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Send Money
    </Menu.Item>
    <Menu.Item
      key="4"
      onClick={(id) => onNavigate(`/user/beneficiary/upload?id=${id}`)}
    >
      <svg
        width="30"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_151_25216)">
          <path
            d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
            stroke="#464F60"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_151_25216">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      ID Upload
    </Menu.Item>
    <Menu.Item key="5">
      <svg
        width="30"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6667 1.66602H5.00004C4.55801 1.66602 4.13409 1.84161 3.82153 2.15417C3.50897 2.46673 3.33337 2.89065 3.33337 3.33268V16.666C3.33337 17.108 3.50897 17.532 3.82153 17.8445C4.13409 18.1571 4.55801 18.3327 5.00004 18.3327H15C15.4421 18.3327 15.866 18.1571 16.1786 17.8445C16.4911 17.532 16.6667 17.108 16.6667 16.666V6.66602M11.6667 1.66602L16.6667 6.66602M11.6667 1.66602V6.66602H16.6667M13.3334 10.8327H6.66671M13.3334 14.166H6.66671M8.33337 7.49935H6.66671"
          stroke="#464F60"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      View Document
    </Menu.Item>
    <Menu.Item key="6" style={{ color: "red" }}>
      <svg
        width="30"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 4.99935H3.16667M3.16667 4.99935H16.5M3.16667 4.99935V16.666C3.16667 17.108 3.34226 17.532 3.65482 17.8445C3.96738 18.1571 4.39131 18.3327 4.83333 18.3327H13.1667C13.6087 18.3327 14.0326 18.1571 14.3452 17.8445C14.6577 17.532 14.8333 17.108 14.8333 16.666V4.99935H3.16667ZM5.66667 4.99935V3.33268C5.66667 2.89065 5.84226 2.46673 6.15482 2.15417C6.46738 1.84161 6.89131 1.66602 7.33333 1.66602H10.6667C11.1087 1.66602 11.5326 1.84161 11.8452 2.15417C12.1577 2.46673 12.3333 2.89065 12.3333 3.33268V4.99935M7.33333 9.16602V14.166M10.6667 9.16602V14.166"
          stroke="#D92D20"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Delete Document
    </Menu.Item>
  </Menu>
);

function SendMoney() {
  const navigates = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    if (id) {
      setCurrent(2);
    }
  }, [id]);

  const [current, setCurrent] = useState(id ? 2 : 1);
  const handleNavigate = (id) => {
    const navigate = useNavigate();
    navigate(`/user/beneficiary/details?id=${id}`);
  };

  const [currentTab, setCurrentTab] = useState(1);
  const [paymentlink, SetPaymentLink] = useState(false);
  const [currentArr, setCurrentArr] = useState([]);

  const one = 1;
  const two = 2;
  const three = 3;
  const four = 4;

  const {
    data: paymentchannel,
    isLoading: paymentchannelloading,
    refetch: refetchpaymentchannel,
  } = useQuery({
    // queryKey: ["nameEnq"],
    queryFn: Paymentchannel,
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  console.log(paymentchannel, "paymentchannel");

  const {
    data: payout,
    isLoading: payoutloading,
    refetch: refetchpayout,
  } = useQuery({
    // queryKey: ["nameEnq"],
    queryFn: Payoutchannel,
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const {
    data: tranxpurpose,
    isLoading: tranxpurposeloading,
    refetch: refetchtranxpurpose,
  } = useQuery({
    // queryKey: ["nameEnq"],
    queryFn: TransferPurpose,
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const addtoPchannel = {
    id: 0,
    name: "Pay",
    status: true,
    description: "Bank Transfer",
  };

  const [pchannel, setpchannel] = useState(
    paymentchannel?.data || testpaymentchannel?.data
  );
  const [payouts, setpayouts] = useState(payout?.data || payoutchannels?.data);
  console.log("🚀 ~ file: SendMoney.jsx:157 ~ SendMoney ~ payouts:", payouts);

  const mappedPurpose = testtransferpurpose?.data?.map((d) => {
    return {
      label: d?.name,
      name: d?.id,
    };
  });
  const [transferpurpose, settransferpurpose] = useState(
    tranxpurpose || mappedPurpose
  );
  console.log(
    "🚀 ~ file: SendMoney.jsx:134 ~ SendMoney ~ transferpurpose:",
    transferpurpose
  );

  const getLocals = (name) => {
    console.log(name, "localsss");
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : [];
  };

  const getBeneF = getLocals("userBeneficiaryId") || [];
  const getNote = getLocals("note") || [];
  const payoutC = getLocals("payoutChannelId") || [];
  const paychannel = getLocals("paymentChannelId") || [];
  const money = getLocals("amount") || [];
  const pcode = getLocals("promoCode") || [];
  const purposes = getLocals("purpose") || [];
  const note = getLocals("note") || [];

  const country1 = getLocals("country1") || [];
  const country2 = getLocals("country2") || [];

  console.log("currentArr:", currentArr);
  console.log("current:", pchannel);

  console.log(params.get("statusMessage"));

  const handleStep = () => {
    localStorage.setItem(
      "paymentChannelId",
      JSON.stringify({
        id: paymentchannel?.data.find((d) => d?.name == "Pay With Bank")?.id,
        name: paymentchannel?.data.find((d) => d?.name == "Pay With Bank")
          ?.name,
      })
    );
    localStorage.setItem(
      "payoutChannelId",
      JSON.stringify({
        id: payoutchannels?.data.find((d) => d?.name == "Direct To Bank")?.id,
        name: payoutchannels?.data.find((d) => d?.name == "Direct To Bank")
          ?.name,
      })
    );
    setCurrent((prev) => {
      localStorage.setItem("steps", prev + 1);
      return prev + 1;
    });
    // if (current === 4) {
    //   setCurrent(4);
    // } else {
    // }

    // setCurrentArr((prev) => {
    //   if (prev.length < 4) {
    //     return [...prev, current]; // Use the spread operator to create a new array
    //   } else {
    //     return prev;
    //   }
    // });
  };

  const navigate = useNavigate();

  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  const c1 = JSON.parse(localStorage.getItem("country1"));
  const c2 = JSON.parse(localStorage.getItem("country2"));
  const BeneList = Userdata?.data.user.beneficiaries;

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

  // const goBack = () => {
  //   navigate(-1); // This navigates back to the previous page in the navigation stack.
  // };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredBeneList, setFilteredBeneList] = useState(BeneList);
  const [selectedBene, setselectedBene] = useState();
  const [isSelected, setisSelected] = useState(false);
  const [promocode, setPromoCode] = useState("");
  const [selectedItems, setSelectedItems] = useState({
    id: paymentchannel?.data.find((d) => d?.name == "Pay With Bank")?.id,
    name: paymentchannel?.data.find((d) => d?.name == "Pay With Bank")?.name,
  });
  const [selectedItems2, setSelectedItems2] = useState(null);
  const [selected3, setSelected3] = useState({
    id: payoutchannels?.data.find((d) => d?.name == "Direct To Bank")?.id,
    name: payoutchannels?.data.find((d) => d?.name == "Direct To Bank")?.name,
  });
  const [status, setStatus] = useState(false);

  const beneficiary = JSON.parse(localStorage.getItem("userBeneficiaryId"));
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const handleSearch = (event) => {
    const keyword = event;
    setSearchKeyword(keyword);

    // Filter the beneficiary list based on the keyword
    const filteredList = BeneList.filter((bene) => {
      const lowerKeyword = keyword.toLowerCase();

      // Check if any field in the beneficiary object contains the keyword
      return Object.values(bene).some((value) =>
        String(value).toLowerCase().includes(lowerKeyword)
      );
    });

    setFilteredBeneList(filteredList);
  };

  const getCurrencyOne = Userdata?.data?.user?.wallet?.find(
    (d) => d?.country?.name === c1?.label
  );
  console.log(
    "🚀 ~ file: SendMoney.jsx:267 ~ SendMoney ~ getCurrencyOne:",
    getCurrencyOne
  );
  const getCurrencyTwo = Userdata?.data?.user?.wallet?.find(
    (d) => d?.country?.name === c2?.label
  );
  console.log(
    "🚀 ~ file: SendMoney.jsx:269 ~ SendMoney ~ getCurrencyTwo:",
    getCurrencyTwo
  );

  const handleSelectBeneId = (id, name, all) => {
    console.log("🚀 ~ file: SendMoney.jsx:155 ~ handleSelect ~ id:", id, name);
    setSelectedItems(id);
    localStorage.setItem(
      "userBeneficiaryId",
      JSON.stringify({ id, name: name, ...all })
    );
  };

  const [pre1, setPre1] = useState({
    id: paymentchannel?.data.find((d) => d?.name == "Pay With Bank")?.id,
    name: paymentchannel?.data.find((d) => d?.name == "Pay With Bank")?.name,
  });
  const [pre2, setPre2] = useState("Direct To Bank");
  const handleSelect = (id, name) => {
    console.log("🚀 ~ file: SendMoney.jsx:155 ~ handleSelect ~ id:", id, name);
    setSelectedItems(id);
    setPre1({ name, id });
    localStorage.setItem("paymentChannelId", JSON.stringify({ id, name }));
  };
  /* 
  localStorage.setItem(
    "paymentChannelId",
    JSON.stringify({
      id: paymentchannel?.data.find((d) => d?.name == "Pay With Bank")?.id,
      name: paymentchannel?.data.find((d) => d?.name == "Pay With Bank")?.name,
    })
  );
  localStorage.setItem(
    "payoutChannelId",
    JSON.stringify({
      id: payoutchannels?.data.find((d) => d?.name == "Direct To Bank")?.id,
      name: payoutchannels?.data.find((d) => d?.name == "Direct To Bank")?.name,
    })
  ); */
  const handleSelect2 = (id, name) => {
    console.log("🚀 ~ file: SendMoney.jsx:155 ~ handleSelect ~ id:", id, name);
    setPre2({ name, id });
    localStorage.setItem("payoutChannelId", JSON.stringify({ id, name: name }));
    setSelectedItems2(id);
    setSelected3({ name, id });
  };

  const defaultCountry = {
    label: "United Kingdom",
    value: "GB", // ISO country code for the UK
    id: 232, // URL to the UK flag image
  };

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [open, setOpen] = useState(false);
  const [getmsg, setmsg] = useState("");
  const [getlink, setlink] = useState("");

  const [showBtn, setShowBtn] = useState(false);

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: sendMoney,
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
  console.log("🚀 ~ file: SendMoney.jsx:306 ~ SendMoney ~ getlink:", getlink);

  // const sendObj = {
  //     "userId":  Userdata?.data?.user?.userId,
  //     "userBeneficiaryId": getBeneF?.id,
  //     "fromCountryId": money?.localCurrencyId,
  //     "toCountryId": money?.foreignCurrencyId,
  //     "amount": money?.fromAmount,
  //     "paymentChannelId": paychannel?.id,
  //     "walletId": 1,
  //     "payoutChannelId": payoutC?.id,
  //     "purpose":purposes,
  //     "note": getNote,
  //     "source": "Web",
  //     "promoCode": Number(pcode),
  //     "redirectURL" : "http://localhost:5174/user/sendmoney?status"
  // }

  const sendObj = {
    userId: userDetails?.data?.user?.userId,
    userBeneficiaryId: params.get("id") || beneficiary?.id,
    fromCurrencyId: country1?.id,
    toCurrencyId: country2?.id,
    amount: money?.fromAmount,
    paymentChannelId: paychannel?.id,
    walletId: 0,
    payoutChannelId: payoutC?.id,
    purpose: purposes,
    note: note,
    transactionSource: "Web",
    promoCode: "",
    redirectURL: `${window.location.origin}/user/sendmoney`,
    source: "web",
  };

  const handleSendMoney = () => {
    // const getBeneF = getLocals("userBeneficiaryId");
    // const getNote = getLocals("note");
    // const payoutC = getLocals("payoutChannelId");
    // const paychannel = getLocals("paymentChannelId");
    // const money = getLocals("amount");
    // const pcode = getLocals("promoCode");
    // const purposes = getLocals("purpose")
    SetPaymentLink(!paymentlink);

    mutate(sendObj);
  };

  const statusCode = params.get("statusCode");

  console.log(statusCode === "2", "statusCode");

  console.log(
    newDetails?.data?.beneficiaries.find((d) => d?.id == params.get("id")),
    "selsld"
  );

  const userBene = newDetails?.data?.beneficiaries.find(
    (d) => d?.id == params.get("id")
  );

  return (
    <Userlayout current="Send Money" useBack={true}>
      <Content>
        {open && (
          <ReusableModal
            isOpen={open}
            onClose={() => {
              setOpen(!open);
              setCurrent(1);
              localStorage.removeItem("purpose");
              localStorage.removeItem("country1");
              localStorage.removeItem("country2");
              localStorage.removeItem("walletID");
              localStorage.removeItem("userBeneficiaryId");
              localStorage.removeItem("payoutChannelId");
              localStorage.removeItem("paymentChannelId");
              localStorage.removeItem("amount");
              localStorage.removeItem("note");
              setSelected3(null);
              setSelectedItems(null);
              setSelectedCountry(null);
              setSelectedItems2(null);
              setisSelected(null);
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
        {statusCode === "2" && (
          <ReusableModal
            isOpen={statusCode === "2"}
            onClose={() => {
              navigate("/user/sendmoney");
              localStorage.removeItem("amount");
            }}
          >
            <Msg type={true}>{params.get("statusMessage")}</Msg>
          </ReusableModal>
        )}
        <div className="cont">
          {current === 1 && (
            <>
              <Stepses step={[1]} />
              <div className="header">
                <h5>Beneficiary</h5>
                <p>Select beneficiary from the below</p>
              </div>
              <Header>
                <InputSearch
                  allowClear
                  placeholder="Enter keyword to search"
                  style={{ width: 300 }}
                  className="input"
                  onChange={handleSearch}
                />
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => navigate("/user/create/beneficiary")}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 11C20.6213 11 21.125 11.5037 21.125 12.125V18.875H27.875C28.4963 18.875 29 19.3787 29 20C29 20.6213 28.4963 21.125 27.875 21.125H21.125V27.875C21.125 28.4963 20.6213 29 20 29C19.3787 29 18.875 28.4963 18.875 27.875V21.125H12.125C11.5037 21.125 11 20.6213 11 20C11 19.3787 11.5037 18.875 12.125 18.875H18.875V12.125C18.875 11.5037 19.3787 11 20 11Z"
                    fill="#00A85A"
                  />
                </svg>
              </Header>

              <BeneficiaryCont>
                {newDetails?.data?.beneficiaries?.map((d) => {
                  const isSelected = selectedItems === d?.id;
                  return (
                    <div
                      key={d.id}
                      className="box"
                      style={{ color: "#000", textDecoration: "none" }}
                      onClick={() =>
                        handleSelectBeneId(d?.id, d?.beneficiaryName, d)
                      }
                    >
                      <Box>
                        <Avatar className="av">
                          {`${d?.beneficiaryName?.split(" ")[0][0]} ${
                            d?.beneficiaryName?.split(" ")[1][0]
                          }`}
                        </Avatar>

                        <div className="text">
                          <h5>{d?.beneficiaryName}</h5>
                          <p>{d?.beneficiaryPhoneNumber}</p>
                          {/* <p>{d?.beneficiaryBank?.accountNumber.length ? "Bank" : "Pick Up"}</p> */}
                          <p>
                            createOn :{" "}
                            <FormattedDate dateString={d?.dateCreated} />
                          </p>
                        </div>
                        <div className="options">
                          {isSelected ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.466535"
                                y="0.466535"
                                width="15.0669"
                                height="15.0669"
                                rx="6.99803"
                                fill="#169D07"
                              />
                              <path
                                d="M11.1104 5.66797L6.83379 9.94454L4.88989 8.00065"
                                stroke="white"
                                strokeWidth="1.55512"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <rect
                                x="0.466535"
                                y="0.466535"
                                width="15.0669"
                                height="15.0669"
                                rx="6.99803"
                                stroke="#169D07"
                                strokeWidth="0.933071"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.466535"
                                y="0.466535"
                                width="15.0669"
                                height="15.0669"
                                rx="6.99803"
                                fill="white"
                              />
                              <rect
                                x="0.466535"
                                y="0.466535"
                                width="15.0669"
                                height="15.0669"
                                rx="6.99803"
                                stroke="#D0D5DD"
                                strokeWidth="0.933071"
                              />
                            </svg>
                          )}
                        </div>
                      </Box>
                    </div>
                  );
                })}
              </BeneficiaryCont>

              <div className="btn">
                {selectedItems && (
                  <Btn disabled={!selectedItems && true} clicking={handleStep}>
                    Continue
                  </Btn>
                )}
              </div>
            </>
          )}
          {current === 2 && (
            <>
              <Stepses step={[1, 2]} />
              <div className="header">
                <h5>Enter Amount</h5>
                <p>How much do you want to send?</p>
              </div>
              {/* <BeneficiaryCont2> */}
              {/* </BeneficiaryCont2> */}
              <BeneficiaryCont>
                <RateComponent />
                <div className="longcont">
                  <p className="payby">You pay by</p>
                  {paymentchannel?.data
                    ?.filter((item) => item.status)
                    ?.map((d) => {
                      const isSelected = pre1?.id === d?.id;

                      console.log(isSelected, selectedItems, d, "dsdsdsd");
                      return (
                        <div
                          key={d.id}
                          className="box"
                          style={{
                            color: `${
                              isSelected ? "rgba(22, 157, 7, 1)" : "#000"
                            }`,
                            textDecoration: "none",
                            border: `${
                              isSelected
                                ? "0.5px solid rgba(22, 157, 7, 1)"
                                : "1px solid rgba(233, 237, 245, 1)"
                            }`,
                          }}
                          onClick={() => handleSelect(d?.id, d?.name)}
                        >
                          <Box>
                            {/* <Avatar className="av"> */}
                            {isSelected ? (
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="40"
                                  height="40"
                                  rx="20"
                                  fill="#00A85A"
                                />
                                <path
                                  d="M19.0445 11.9691C19.3219 11.7722 19.6566 11.666 20.0001 11.666C20.3436 11.666 20.6782 11.7722 20.9556 11.9691L27.8269 16.8453C28.7316 17.4864 28.2658 18.8774 27.1473 18.8801H12.8519C11.7334 18.8774 11.2686 17.4864 12.1723 16.8453L19.0436 11.9691H19.0445ZM20.926 15.5029C20.926 15.2642 20.8285 15.0352 20.6548 14.8663C20.4812 14.6975 20.2457 14.6026 20.0001 14.6026C19.7545 14.6026 19.519 14.6975 19.3454 14.8663C19.1717 15.0352 19.0742 15.2642 19.0742 15.5029C19.0742 15.7417 19.1717 15.9707 19.3454 16.1396C19.519 16.3084 19.7545 16.4033 20.0001 16.4033C20.2457 16.4033 20.4812 16.3084 20.6548 16.1396C20.8285 15.9707 20.926 15.7417 20.926 15.5029ZM19.3056 24.2812H17.4538V19.7795H19.3056V24.2812ZM22.5464 24.2812H20.6945V19.7795H22.5464V24.2812ZM26.0186 24.2812H23.9353V19.7795H26.0186V24.2812ZM26.2501 25.1815H13.7501C13.1975 25.1815 12.6676 25.3949 12.2769 25.7748C11.8862 26.1547 11.6667 26.67 11.6667 27.2073V27.6574C11.6667 28.0311 11.9779 28.3327 12.3612 28.3327H27.639C27.8231 28.3327 27.9998 28.2615 28.13 28.1349C28.2603 28.0083 28.3334 27.8365 28.3334 27.6574V27.2073C28.3334 26.67 28.1139 26.1547 27.7232 25.7748C27.3325 25.3949 26.8026 25.1815 26.2501 25.1815ZM16.0649 24.2812H13.9816V19.7795H16.0649V24.2812Z"
                                  fill="white"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="40"
                                  height="40"
                                  rx="20"
                                  fill="#00A85A"
                                />
                                <path
                                  d="M27.8119 20.752H24.0935C23.6108 20.752 23.1479 20.9437 22.8065 21.2851C22.4652 21.6264 22.2734 22.0893 22.2734 22.5721C22.2734 23.0548 22.4652 23.5177 22.8065 23.8591C23.1479 24.2004 23.6108 24.3922 24.0935 24.3922H27.8119C28.0603 24.3915 28.2983 24.2925 28.4739 24.1168C28.6496 23.9412 28.7486 23.7032 28.7493 23.4548V21.6893C28.7491 21.4408 28.6503 21.2025 28.4745 21.0267C28.2988 20.851 28.0604 20.7522 27.8119 20.752ZM24.6341 23.5891C24.366 23.5861 24.1098 23.4774 23.9213 23.2867C23.7327 23.096 23.627 22.8387 23.627 22.5705C23.627 22.3023 23.7327 22.045 23.9213 21.8543C24.1098 21.6636 24.366 21.5549 24.6341 21.5519C24.9023 21.5549 25.1584 21.6636 25.347 21.8543C25.5355 22.045 25.6413 22.3023 25.6413 22.5705C25.6413 22.8387 25.5355 23.096 25.347 23.2867C25.1584 23.4774 24.9023 23.5861 24.6341 23.5891Z"
                                  fill="white"
                                />
                                <path
                                  d="M25.2866 15.6087L24.0087 13.5559C23.8042 13.2299 23.4818 12.9953 23.1087 12.901C22.7356 12.8067 22.3406 12.86 22.0057 13.0497C21.9808 13.0622 17.9031 15.6087 17.9031 15.6087H25.2866Z"
                                  fill="white"
                                />
                                <path
                                  d="M24.0938 25.1719C20.6453 25.0415 20.6453 20.0965 24.0938 19.9687H27.25V17.9531C27.2493 17.5389 27.0845 17.1419 26.7916 16.849C26.4987 16.5561 26.1017 16.3913 25.6875 16.3906H12.8125C12.3983 16.3913 12.0013 16.5561 11.7084 16.849C11.4155 17.1419 11.2507 17.5389 11.25 17.9531V27.1656C11.2501 27.58 11.4148 27.9773 11.7078 28.2703C12.0008 28.5633 12.3981 28.728 12.8125 28.7281H25.6875C26.1019 28.728 26.4992 28.5633 26.7922 28.2703C27.0852 27.9773 27.2499 27.58 27.25 27.1656V25.1719C26.8678 25.1693 24.5322 25.1737 24.0938 25.1719Z"
                                  fill="white"
                                />
                                <path
                                  d="M16.4309 15.6094C16.4309 15.6094 21.5691 12.3886 21.6865 12.3347C21.2509 11.7882 20.7228 11.2673 19.9742 11.2724C19.7262 11.2644 19.4793 11.3081 19.2491 11.4006C19.0189 11.4931 18.8104 11.6324 18.6369 11.8098L14.8779 15.6094C15.2656 15.6056 16.0492 15.6121 16.4309 15.6094Z"
                                  fill="white"
                                />
                                <path
                                  d="M24.634 22.1758C24.5306 22.1774 24.4321 22.2196 24.3595 22.2932C24.287 22.3669 24.2463 22.4661 24.2463 22.5695C24.2463 22.6729 24.287 22.7721 24.3595 22.8458C24.4321 22.9194 24.5307 22.9616 24.634 22.9632C24.7374 22.9616 24.836 22.9194 24.9085 22.8458C24.981 22.7721 25.0217 22.6729 25.0217 22.5695C25.0217 22.4661 24.981 22.3669 24.9085 22.2932C24.836 22.2196 24.7374 22.1774 24.634 22.1758Z"
                                  fill="white"
                                />
                              </svg>
                            )}
                            {/* </Avatar> */}

                            <div className="text">
                              <h5>{d?.name}</h5>
                              <p>{d?.description}</p>
                            </div>
                            <div className="options">
                              {isSelected ? (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="0.466535"
                                    y="0.466535"
                                    width="15.0669"
                                    height="15.0669"
                                    rx="6.99803"
                                    fill="#169D07"
                                  />
                                  <path
                                    d="M11.1104 5.66797L6.83379 9.94454L4.88989 8.00065"
                                    stroke="white"
                                    strokeWidth="1.55512"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <rect
                                    x="0.466535"
                                    y="0.466535"
                                    width="15.0669"
                                    height="15.0669"
                                    rx="6.99803"
                                    stroke="#169D07"
                                    strokeWidth="0.933071"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="0.466535"
                                    y="0.466535"
                                    width="15.0669"
                                    height="15.0669"
                                    rx="6.99803"
                                    fill="white"
                                  />
                                  <rect
                                    x="0.466535"
                                    y="0.466535"
                                    width="15.0669"
                                    height="15.0669"
                                    rx="6.99803"
                                    stroke="#D0D5DD"
                                    strokeWidth="0.933071"
                                  />
                                </svg>
                              )}
                            </div>
                          </Box>
                        </div>
                      );
                    })}
                </div>
                <div className="longcont">
                  <p>Collection Type</p>
                  {payoutchannels?.data?.map((d) => {
                    const isSelected = selected3?.name === d?.name;
                    return (
                      <div
                        key={d.id}
                        className="box"
                        style={{
                          color: `${
                            isSelected ? "rgba(22, 157, 7, 1)" : "#000"
                          }`,
                          textDecoration: "none",
                          border: `${
                            isSelected
                              ? "0.5px solid rgba(22, 157, 7, 1)"
                              : "1px solid rgba(233, 237, 245, 1)"
                          }`,
                        }}
                        onClick={() => handleSelect2(d?.id, d?.name)}
                      >
                        <Box>
                          {/* <Avatar className="av"> */}
                          {isSelected ? (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="40"
                                height="40"
                                rx="20"
                                fill="#00A85A"
                              />
                              <path
                                d="M19.0445 11.9691C19.3219 11.7722 19.6566 11.666 20.0001 11.666C20.3436 11.666 20.6782 11.7722 20.9556 11.9691L27.8269 16.8453C28.7316 17.4864 28.2658 18.8774 27.1473 18.8801H12.8519C11.7334 18.8774 11.2686 17.4864 12.1723 16.8453L19.0436 11.9691H19.0445ZM20.926 15.5029C20.926 15.2642 20.8285 15.0352 20.6548 14.8663C20.4812 14.6975 20.2457 14.6026 20.0001 14.6026C19.7545 14.6026 19.519 14.6975 19.3454 14.8663C19.1717 15.0352 19.0742 15.2642 19.0742 15.5029C19.0742 15.7417 19.1717 15.9707 19.3454 16.1396C19.519 16.3084 19.7545 16.4033 20.0001 16.4033C20.2457 16.4033 20.4812 16.3084 20.6548 16.1396C20.8285 15.9707 20.926 15.7417 20.926 15.5029ZM19.3056 24.2812H17.4538V19.7795H19.3056V24.2812ZM22.5464 24.2812H20.6945V19.7795H22.5464V24.2812ZM26.0186 24.2812H23.9353V19.7795H26.0186V24.2812ZM26.2501 25.1815H13.7501C13.1975 25.1815 12.6676 25.3949 12.2769 25.7748C11.8862 26.1547 11.6667 26.67 11.6667 27.2073V27.6574C11.6667 28.0311 11.9779 28.3327 12.3612 28.3327H27.639C27.8231 28.3327 27.9998 28.2615 28.13 28.1349C28.2603 28.0083 28.3334 27.8365 28.3334 27.6574V27.2073C28.3334 26.67 28.1139 26.1547 27.7232 25.7748C27.3325 25.3949 26.8026 25.1815 26.2501 25.1815ZM16.0649 24.2812H13.9816V19.7795H16.0649V24.2812Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="40"
                                height="40"
                                rx="20"
                                fill="#00A85A"
                              />
                              <path
                                d="M27.8119 20.752H24.0935C23.6108 20.752 23.1479 20.9437 22.8065 21.2851C22.4652 21.6264 22.2734 22.0893 22.2734 22.5721C22.2734 23.0548 22.4652 23.5177 22.8065 23.8591C23.1479 24.2004 23.6108 24.3922 24.0935 24.3922H27.8119C28.0603 24.3915 28.2983 24.2925 28.4739 24.1168C28.6496 23.9412 28.7486 23.7032 28.7493 23.4548V21.6893C28.7491 21.4408 28.6503 21.2025 28.4745 21.0267C28.2988 20.851 28.0604 20.7522 27.8119 20.752ZM24.6341 23.5891C24.366 23.5861 24.1098 23.4774 23.9213 23.2867C23.7327 23.096 23.627 22.8387 23.627 22.5705C23.627 22.3023 23.7327 22.045 23.9213 21.8543C24.1098 21.6636 24.366 21.5549 24.6341 21.5519C24.9023 21.5549 25.1584 21.6636 25.347 21.8543C25.5355 22.045 25.6413 22.3023 25.6413 22.5705C25.6413 22.8387 25.5355 23.096 25.347 23.2867C25.1584 23.4774 24.9023 23.5861 24.6341 23.5891Z"
                                fill="white"
                              />
                              <path
                                d="M25.2866 15.6087L24.0087 13.5559C23.8042 13.2299 23.4818 12.9953 23.1087 12.901C22.7356 12.8067 22.3406 12.86 22.0057 13.0497C21.9808 13.0622 17.9031 15.6087 17.9031 15.6087H25.2866Z"
                                fill="white"
                              />
                              <path
                                d="M24.0938 25.1719C20.6453 25.0415 20.6453 20.0965 24.0938 19.9687H27.25V17.9531C27.2493 17.5389 27.0845 17.1419 26.7916 16.849C26.4987 16.5561 26.1017 16.3913 25.6875 16.3906H12.8125C12.3983 16.3913 12.0013 16.5561 11.7084 16.849C11.4155 17.1419 11.2507 17.5389 11.25 17.9531V27.1656C11.2501 27.58 11.4148 27.9773 11.7078 28.2703C12.0008 28.5633 12.3981 28.728 12.8125 28.7281H25.6875C26.1019 28.728 26.4992 28.5633 26.7922 28.2703C27.0852 27.9773 27.2499 27.58 27.25 27.1656V25.1719C26.8678 25.1693 24.5322 25.1737 24.0938 25.1719Z"
                                fill="white"
                              />
                              <path
                                d="M16.4309 15.6094C16.4309 15.6094 21.5691 12.3886 21.6865 12.3347C21.2509 11.7882 20.7228 11.2673 19.9742 11.2724C19.7262 11.2644 19.4793 11.3081 19.2491 11.4006C19.0189 11.4931 18.8104 11.6324 18.6369 11.8098L14.8779 15.6094C15.2656 15.6056 16.0492 15.6121 16.4309 15.6094Z"
                                fill="white"
                              />
                              <path
                                d="M24.634 22.1758C24.5306 22.1774 24.4321 22.2196 24.3595 22.2932C24.287 22.3669 24.2463 22.4661 24.2463 22.5695C24.2463 22.6729 24.287 22.7721 24.3595 22.8458C24.4321 22.9194 24.5307 22.9616 24.634 22.9632C24.7374 22.9616 24.836 22.9194 24.9085 22.8458C24.981 22.7721 25.0217 22.6729 25.0217 22.5695C25.0217 22.4661 24.981 22.3669 24.9085 22.2932C24.836 22.2196 24.7374 22.1774 24.634 22.1758Z"
                                fill="white"
                              />
                            </svg>
                          )}
                          {/* </Avatar> */}

                          <div className="text">
                            <h5>{d?.name}</h5>
                            <p>{d?.description}</p>
                          </div>
                          <div className="options">
                            {isSelected ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.466535"
                                  y="0.466535"
                                  width="15.0669"
                                  height="15.0669"
                                  rx="6.99803"
                                  fill="#169D07"
                                />
                                <path
                                  d="M11.1104 5.66797L6.83379 9.94454L4.88989 8.00065"
                                  stroke="white"
                                  strokeWidth="1.55512"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <rect
                                  x="0.466535"
                                  y="0.466535"
                                  width="15.0669"
                                  height="15.0669"
                                  rx="6.99803"
                                  stroke="#169D07"
                                  strokeWidth="0.933071"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.466535"
                                  y="0.466535"
                                  width="15.0669"
                                  height="15.0669"
                                  rx="6.99803"
                                  fill="white"
                                />
                                <rect
                                  x="0.466535"
                                  y="0.466535"
                                  width="15.0669"
                                  height="15.0669"
                                  rx="6.99803"
                                  stroke="#D0D5DD"
                                  strokeWidth="0.933071"
                                />
                              </svg>
                            )}
                          </div>
                        </Box>
                      </div>
                    );
                  })}
                </div>
                <div className="btn">
                  {getLocals("userBeneficiaryId") && selectedItems && (
                    <Btn clicking={handleStep}>Continue</Btn>
                  )}
                  {/* <Btn clicking={handleStep}>Continue</Btn> */}
                </div>
              </BeneficiaryCont>
            </>
          )}
          {current === 3 && (
            <>
              <Stepses step={[1, 2, 3]} />
              <div className="header">
                <h5>Additional Details</h5>
                <p>Please fill in the details</p>
              </div>
              <BeneficiaryCont>
                <div className="longcont longcont1" style={{ padding: "2em" }}>
                  <p className="">Select purpose of transfer</p>
                  <CustomSelect
                    options={mappedPurpose}
                    placeholder="Family support"
                    onChange={(e) =>
                      localStorage.setItem("purpose", JSON.stringify(e?.label))
                    }
                  />
                  <p>Transaction note</p>
                  <TextArea
                    name="address"
                    className="textarea"
                    placeholder="Enter comments ..."
                    style={{
                      minHeight: 104,
                      background: "transparent",
                      border: "1px solid #d8d8d8",
                      borderRadius: "8px",
                    }}
                    onChange={(e) =>
                      localStorage.setItem("note", JSON.stringify(e))
                    }
                  />
                </div>
                {/* </BeneficiaryCont> */}
                {/* <BeneficiaryCont> */}
                <div className="longcont" style={{ padding: "2em" }}>
                  <div className="tabs">
                    <div
                      className="pane"
                      onClick={() => setCurrentTab(1)}
                      style={{
                        color: `${
                          currentTab === 1
                            ? "#00A85A"
                            : "rgba(152, 162, 179, 1)"
                        }`,
                        borderBottomColor: `${
                          currentTab === 1
                            ? "#00A85A"
                            : "rgba(152, 162, 179, 1)"
                        }`,
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.53865 5.65355C6.53865 4.48047 7.00465 3.35545 7.83414 2.52596C8.66363 1.69647 9.78865 1.23047 10.9617 1.23047C12.1348 1.23047 13.2598 1.69647 14.0893 2.52596C14.9188 3.35545 15.3848 4.48047 15.3848 5.65355C15.3848 4.48047 15.8508 3.35545 16.6803 2.52596C17.5098 1.69647 18.6348 1.23047 19.8079 1.23047C20.981 1.23047 22.106 1.69647 22.9355 2.52596C23.765 3.35545 24.231 4.48047 24.231 5.65355V5.66416C24.231 5.78801 24.231 6.14185 24.1637 6.53816H27.7694C28.2386 6.53816 28.6887 6.72456 29.0205 7.05636C29.3522 7.38815 29.5387 7.83816 29.5387 8.30739V10.0766C29.5387 10.5459 29.3522 10.9959 29.0205 11.3277C28.6887 11.6595 28.2386 11.8459 27.7694 11.8459H3.00019C2.53096 11.8459 2.08095 11.6595 1.74915 11.3277C1.41736 10.9959 1.23096 10.5459 1.23096 10.0766V8.30739C1.23096 7.83816 1.41736 7.38815 1.74915 7.05636C2.08095 6.72456 2.53096 6.53816 3.00019 6.53816H6.60588C6.55915 6.24921 6.53666 5.95686 6.53865 5.66416V5.65355ZM8.42819 6.53816H13.6156V5.65355C13.6156 5.30504 13.5469 4.95994 13.4136 4.63796C13.2802 4.31598 13.0847 4.02343 12.8383 3.77699C12.5918 3.53056 12.2993 3.33508 11.9773 3.20171C11.6553 3.06834 11.3102 2.9997 10.9617 2.9997C10.6132 2.9997 10.2681 3.06834 9.94614 3.20171C9.62416 3.33508 9.33161 3.53056 9.08517 3.77699C8.83874 4.02343 8.64326 4.31598 8.50989 4.63796C8.37652 4.95994 8.30788 5.30504 8.30788 5.65355C8.30788 5.80393 8.31142 6.13832 8.3875 6.41432C8.39813 6.4565 8.41172 6.49789 8.42819 6.53816ZM17.154 6.53816H22.3414C22.3577 6.49782 22.3713 6.45645 22.3821 6.41432C22.4582 6.13832 22.4617 5.80393 22.4617 5.65355C22.4617 4.9497 22.1821 4.27469 21.6844 3.77699C21.1867 3.2793 20.5117 2.9997 19.8079 2.9997C19.104 2.9997 18.429 3.2793 17.9313 3.77699C17.4336 4.27469 17.154 4.9497 17.154 5.65355V6.53816ZM27.7694 13.6151V26.8843C27.7694 27.5882 27.4898 28.2632 26.9921 28.7609C26.4944 29.2586 25.8194 29.5382 25.1156 29.5382H17.154V13.6151H27.7694ZM5.65403 29.5382C4.95019 29.5382 4.27517 29.2586 3.77748 28.7609C3.27979 28.2632 3.00019 27.5882 3.00019 26.8843V13.6151H13.6156V29.5382H5.65403Z"
                          fill={
                            currentTab === 1
                              ? "#00A85A"
                              : "rgba(152, 162, 179, 1)"
                          }
                        />
                      </svg>
                      <p>Use promo code</p>
                    </div>
                    <div
                      onClick={() => setCurrentTab(2)}
                      className="pane"
                      style={{
                        color: `${
                          currentTab === 2
                            ? "#00A85A"
                            : "rgba(152, 162, 179, 1)"
                        }`,
                        borderBottomColor: `${
                          currentTab === 2
                            ? "#00A85A"
                            : "rgba(152, 162, 179, 1)"
                        }`,
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28.4997 17.1992H22.5497C21.7773 17.1992 21.0365 17.5061 20.4903 18.0523C19.9441 18.5985 19.6372 19.3393 19.6372 20.1117C19.6372 20.8842 19.9441 21.625 20.4903 22.1712C21.0365 22.7174 21.7773 23.0242 22.5497 23.0242H28.4997C28.8972 23.0231 29.278 22.8647 29.5591 22.5836C29.8401 22.3025 29.9985 21.9217 29.9997 21.5242V18.6992C29.9994 18.3015 29.8413 17.9201 29.56 17.6389C29.2788 17.3577 28.8974 17.1995 28.4997 17.1992ZM23.4147 21.7392C22.9856 21.7343 22.5757 21.5605 22.274 21.2553C21.9723 20.9501 21.8031 20.5383 21.8031 20.1092C21.8031 19.6801 21.9724 19.2683 22.2741 18.9631C22.5758 18.658 22.9857 18.4841 23.4148 18.4792C23.8439 18.4841 24.2537 18.658 24.5554 18.9631C24.8571 19.2683 25.0263 19.6801 25.0263 20.1092C25.0263 20.5384 24.8571 20.9502 24.5554 21.2553C24.2537 21.5605 23.8438 21.7344 23.4147 21.7392Z"
                          fill={
                            currentTab === 2
                              ? "#00A85A"
                              : "rgba(152, 162, 179, 1)"
                          }
                        />
                        <path
                          d="M24.46 8.97409L22.415 5.68909C22.0878 5.16747 21.572 4.79215 20.975 4.64127C20.378 4.49039 19.7458 4.57558 19.21 4.87909C19.17 4.89909 12.645 8.97409 12.645 8.97409H24.46Z"
                          fill={
                            currentTab === 2
                              ? "#00A85A"
                              : "rgba(152, 162, 179, 1)"
                          }
                        />
                        <path
                          d="M22.55 24.2746C17.0325 24.0659 17.0325 16.1541 22.5501 15.9496H27.6V12.7246C27.5989 12.0619 27.3352 11.4266 26.8666 10.958C26.398 10.4894 25.7627 10.2257 25.1 10.2246H4.5C3.83729 10.2257 3.20204 10.4894 2.73344 10.958C2.26483 11.4266 2.00109 12.0619 2 12.7246V27.4646C2.00024 28.1276 2.26371 28.7633 2.7325 29.2321C3.20129 29.7009 3.83703 29.9644 4.5 29.9646H25.1C25.763 29.9644 26.3987 29.7009 26.8675 29.2321C27.3363 28.7633 27.5998 28.1276 27.6 27.4646V24.2746C26.9885 24.2705 23.2515 24.2776 22.55 24.2746Z"
                          fill={
                            currentTab === 2
                              ? "#00A85A"
                              : "rgba(152, 162, 179, 1)"
                          }
                        />
                        <path
                          d="M10.2902 8.97461C10.2902 8.97461 18.5122 3.82076 18.7001 3.73461C18.0031 2.86011 17.1581 2.02654 15.9601 2.03469C15.5633 2.0219 15.1682 2.09174 14.7998 2.23977C14.4314 2.38781 14.0978 2.61081 13.8202 2.89461L7.80518 8.97461C8.42546 8.96861 9.67943 8.97896 10.2902 8.97461Z"
                          fill={
                            currentTab === 2
                              ? "#00A85A"
                              : "rgba(152, 162, 179, 1)"
                          }
                        />
                        <path
                          d="M23.4153 19.4785C23.2499 19.4811 23.0921 19.5486 22.976 19.6664C22.86 19.7843 22.7949 19.9431 22.7949 20.1085C22.7949 20.2739 22.86 20.4327 22.9761 20.5506C23.0921 20.6685 23.2499 20.736 23.4153 20.7385C23.5807 20.736 23.7385 20.6685 23.8545 20.5506C23.9706 20.4327 24.0356 20.2739 24.0356 20.1085C24.0356 19.9431 23.9706 19.7843 23.8545 19.6664C23.7384 19.5486 23.5807 19.4811 23.4153 19.4785Z"
                          fill={
                            currentTab === 2
                              ? "#00A85A"
                              : "rgba(152, 162, 179, 1)"
                          }
                        />
                      </svg>
                      <p>Use wallet</p>
                    </div>
                  </div>
                  {currentTab === 1 && (
                    <>
                      <p>Promo Code</p>
                      <CustomInput
                        placeholder="Enter Promo Code"
                        onChange={(e) => {
                          setPromoCode(e?.target?.value);
                          localStorage.setItem(
                            "promoCode",
                            JSON.stringify(e?.target?.value)
                          );
                        }}
                      />
                      {/* <br/> */}
                      {promocode.length > 0 && <Btn>Apply</Btn>}

                      <Btn styles={{ backgroundColor: "#fff" }}>
                        View Promo codes
                      </Btn>
                    </>
                  )}
                  {currentTab === 2 && (
                    <>
                      <div className="wall">
                        <div className="balance">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.518 12.9004H17.0555C16.4761 12.9004 15.9205 13.1305 15.5109 13.5402C15.1012 13.9498 14.8711 14.5054 14.8711 15.0848C14.8711 15.6641 15.1012 16.2197 15.5109 16.6294C15.9205 17.039 16.4761 17.2691 17.0555 17.2691H21.518C21.8161 17.2683 22.1017 17.1495 22.3125 16.9387C22.5233 16.7279 22.6421 16.4422 22.643 16.1441V14.0254C22.6427 13.7271 22.5241 13.4411 22.3132 13.2302C22.1023 13.0192 21.8163 12.9006 21.518 12.9004ZM17.7042 16.3054C17.3824 16.3017 17.075 16.1713 16.8487 15.9425C16.6224 15.7136 16.4955 15.4047 16.4955 15.0829C16.4955 14.761 16.6225 14.4522 16.8487 14.2233C17.075 13.9944 17.3824 13.864 17.7043 13.8604C18.0261 13.864 18.3335 13.9945 18.5598 14.2233C18.786 14.4522 18.9129 14.7611 18.9129 15.0829C18.9129 15.4048 18.786 15.7136 18.5597 15.9425C18.3334 16.1713 18.026 16.3017 17.7042 16.3054Z"
                              fill="#00A85A"
                            />
                            <path
                              d="M18.4882 6.73008L16.9545 4.26633C16.709 3.87512 16.3222 3.59363 15.8744 3.48047C15.4267 3.36731 14.9525 3.4312 14.5507 3.65883C14.5207 3.67383 9.62695 6.73008 9.62695 6.73008H18.4882Z"
                              fill="#00A85A"
                            />
                            <path
                              d="M17.0556 18.2074C12.9174 18.0509 12.9174 12.117 17.0556 11.9637H20.8431V9.54492C20.8422 9.04789 20.6444 8.57145 20.293 8.22C19.9415 7.86854 19.4651 7.67074 18.9681 7.66992H3.51807C3.02104 7.67074 2.5446 7.86854 2.19314 8.22C1.84169 8.57145 1.64388 9.04789 1.64307 9.54492V20.5999C1.64325 21.0971 1.84085 21.574 2.19244 21.9255C2.54403 22.2771 3.02084 22.4747 3.51807 22.4749H18.9681C19.4653 22.4747 19.9421 22.2771 20.2937 21.9255C20.6453 21.574 20.8429 21.0971 20.8431 20.5999V18.2074C20.3845 18.2043 17.5817 18.2097 17.0556 18.2074Z"
                              fill="#00A85A"
                            />
                            <path
                              d="M7.86033 6.73145C7.86033 6.73145 14.0269 2.86606 14.1678 2.80145C13.645 2.14557 13.0113 1.5204 12.1128 1.52651C11.8152 1.51691 11.5188 1.56929 11.2425 1.68032C10.9663 1.79134 10.7161 1.95859 10.5078 2.17145L5.99658 6.73145C6.4618 6.72695 7.40227 6.73471 7.86033 6.73145Z"
                              fill="#00A85A"
                            />
                            <path
                              d="M17.7045 14.6094C17.5805 14.6113 17.4621 14.6619 17.3751 14.7503C17.288 14.8387 17.2393 14.9578 17.2393 15.0819C17.2393 15.206 17.2881 15.325 17.3751 15.4134C17.4622 15.5018 17.5805 15.5525 17.7045 15.5544C17.8286 15.5525 17.9469 15.5018 18.034 15.4134C18.121 15.325 18.1698 15.2059 18.1698 15.0819C18.1698 14.9578 18.121 14.8387 18.0339 14.7503C17.9469 14.6619 17.8286 14.6113 17.7045 14.6094Z"
                              fill="#00A85A"
                            />
                          </svg>
                          <h2>*098.00</h2>
                        </div>
                        <div className="d">
                          <CountryDropdown value={selectedCountry} />
                        </div>
                      </div>

                      <CustomInput placeholder="Enter Promo Code" />
                      <br />
                      <Btn>Apply</Btn>
                      <Btn styles={{ backgroundColor: "#fff" }}>
                        View Promo codes
                      </Btn>
                    </>
                  )}
                </div>

                {/* <Total amount={money?.fromAmount} />
                            <Total amount={money?.computedToAmount}/> */}
                <div className="btn">
                  <Btn clicking={handleStep}>Continue</Btn>
                </div>
              </BeneficiaryCont>
            </>
          )}
          {current === 4 && (
            <>
              <Stepses step={[1, 2, 3, 4]} />
              <div className="header">
                <h5>Review</h5>
                <p>Please check remittance order details below</p>
              </div>
              <BeneficiaryCont>
                <Details>
                  <div className="detailscont">
                    <div className="details">
                      <h5>Beneficiary Name</h5>
                      <p>
                        {(getBeneF && getBeneF?.name) ||
                          userBene?.beneficiaryName}
                      </p>
                    </div>

                    <div className="details">
                      <h5>Beneficiary Bank</h5>
                      <p>
                        {(getBeneF && getBeneF?.beneficiaryBank?.bankName) ||
                          userBene?.beneficiaryBank?.bankName}
                      </p>
                    </div>
                    <div className="details">
                      <h5>Beneficiary Account Number</h5>
                      <p>
                        {(getBeneF &&
                          getBeneF?.beneficiaryBank?.accountNumber) ||
                          userBene?.beneficiaryBank?.accountNumber}
                      </p>
                    </div>
                    <div className="details">
                      <h5>Note</h5>
                      <p>{getNote}</p>
                    </div>
                    <div className="details">
                      <h5>Payout Channel</h5>
                      <p>{payoutC?.name}</p>
                    </div>
                    <div className="details">
                      <h5>Payment Channel</h5>
                      <p>{paychannel?.name}</p>
                    </div>
                    <div className="details">
                      <h5>Promo Code</h5>
                      <p>{pcode}</p>
                    </div>
                    <div className="details">
                      <h5>Purpose</h5>
                      <p>{purposes}</p>
                    </div>
                  </div>

                  {/* <div className='actionbtn'>
                     <button>Upload Id</button>
                     <button>Send Money</button>
                </div> */}
                  <Total
                    currency={country1?.code}
                    amount={money && money?.totalAmountToPay}
                  />
                  <Total
                    currency={country2?.code}
                    text={"Total amount you'll be receiving"}
                    amount={money && money?.computedToAmount}
                  />

                  {/*   {paymentlink && (
                    <div
                      style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent backdrop
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: "100000",
                      }}
                    >
                      {getlink?.length > 0 && (
                        <div style={{ minWidth: "80vw", Height: "100vh" }}>
                          <div
                            onClick={() => {
                              setlink("");
                              SetPaymentLink(false);
                            }}
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.686)", // Semi-transparent backdrop
                              color: "#000000",
                              width: "fit-content",
                              marginBottom: "10px",
                              padding: "10px",
                              zIndex: "1",
                              cursor: "pointer",
                            }}
                          >
                            Close Gateway
                          </div>

                          <Iframe
                            src={getlink}
                            width={"100%"}
                            height={"600px"}
                          />
                        </div>
                      )}
                    </div>
                  )} */}
                  <Btn className="btn" clicking={handleSendMoney}>
                    {" "}
                    {isLoading ? "loading...." : "Submit Transfer"}
                  </Btn>
                </Details>
              </BeneficiaryCont>
            </>
          )}
          {current === 5 && (
            <>
              <Stepses step={[1, 2, 3, 4, 5]} />
              <div className="cont">
                <Header>
                  <img src={Checktrnx} />
                  <h3>Your transfer request is submitted</h3>
                  <p>
                    We are waiting for a payment of <br /> 20.00GBP to our bank
                    account below
                  </p>
                  <small>TX2647329384</small>
                </Header>
                <Details>
                  <div className="detailscont">
                    <h3 className="detailsinfo">Personal Details</h3>
                    <div className="details">
                      <h5>Beneficiary Name</h5>
                      <p>{getBeneF && getBeneF?.name}</p>
                    </div>

                    <div className="details">
                      <h5>Date of Birth</h5>
                      <p>2000</p>
                    </div>
                    <div className="details">
                      <h5>Mobile number</h5>
                      <p>2000</p>
                    </div>
                    <div className="details">
                      <h5>Address</h5>
                      <p>2000</p>
                    </div>
                    <div className="details">
                      <h5>Address</h5>
                      <p>2000</p>
                    </div>
                    <div className="details">
                      <h5>Address</h5>
                      <p>2000</p>
                    </div>
                  </div>

                  <div className="detailscont">
                    <h3 className="detailsinfo">Bank Details</h3>
                    <div className="details">
                      <h5>AccontName</h5>
                      <p>Bada Sulaimon</p>
                    </div>
                    <div className="details">
                      <h5>AccontNumber</h5>
                      <p>000153835252</p>
                    </div>
                    <div className="details">
                      <h5>Bank Name</h5>
                      <p>Unity Bank</p>
                    </div>
                    <div className="details">
                      <h5>RefrenceNo</h5>
                      <p>
                        555525
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

                  {/* <div className='actionbtn'>
                     <button>Upload Id</button>
                     <button>Send Money</button>
                </div> */}
                </Details>
              </div>
            </>
          )}
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

  .btn {
    width: 80%;
    margin: 20px auto;
    /* margin-block: 20px; */
    button {
      width: 100%;
    }
    > &:hover {
      background: rgba(241, 149, 74, 1);
    }
  }

  .header {
    /* display: none; */
    padding-inline: 2.5em;
    h5 {
      font-size: 20px;
    }

    p {
      /* font-weight: 300; */
    }
  }

  @media screen and (max-width: 40em) {
    width: 100%;
  }

  .cont {
    height: 100%;
    /* overflow-y: scroll; */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* border: 1px solid green; */
    width: 100%;
    /* width: 30vw;
         margin: 0 auto; */

    font-weight: 300;

    .header {
      /* display: none; */
      padding-inline: 2.5em;
      h5 {
        font-size: 20px;
      }

      p {
        /* font-weight: 300; */
      }
    }

    .btn {
      width: 80%;
      margin: 20px auto;
      /* margin-block: 20px; */
      button {
        width: 100%;
      }
      > &:hover {
        background: rgba(241, 149, 74, 1);
      }
    }
  }
  .sec {
    padding-top: 10px;
    overflow-y: scroll;
  }
`;

const Box = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-around;
  width: 100%;
  .av {
    background: rgba(0, 168, 90, 1);

    /* width: 50%;
        height: 50%; */
  }
`;

const BeneficiaryCont2 = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1em;
`;

const Details = styled.div`
  /* height: 85%; */
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
      font-weight: 400;
      text-align: center;
      color: rgba(51, 59, 74, 1);
    }

    .details {
      padding: 5px 8px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(233, 237, 245, 1);
      font-weight: lighter;
      &:last-child {
        border-bottom: none;
      }

      h5 {
        color: rgba(102, 112, 133, 1);
        font-weight: 300;
        font-size: 13px;
      }
      p {
        font-weight: 250 !important;
        font-size: 14px;
      }
    }
  }
`;

const BeneficiaryCont = styled.div`
  overflow-y: scroll;
  padding-inline: 1em;
  /* border: 1px solid red; */
  /* height: 90%; */
  display: flex;
  flex-direction: column;
  gap: 10px;

  .arco-tabs-header-title-active,
  .arco-tabs-header-title-active:hover {
    color: #00a85a;
  }
  .longcont1 {
    gap: 15px !important;
  }
  .longcont {
    background-color: #fff;
    border-radius: 10px;
    padding: 1em 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .wall {
      display: flex;
      gap: 20px;
      /* justify-content: space-around; */
      width: 90%;
      margin: 0 auto;
      align-items: center;
      .css-13cymwt-control {
        border-radius: 20px;
      }
      .balance {
        width: 80%;
        display: flex;
        gap: 10px;
        /* justify-content: space-around; */
        padding: 10px;
        background: rgba(0, 168, 90, 0.1);
        border-radius: 29.571px;
        align-items: center;
        /* margin-inline-start: 10px; */

        h2 {
          font-weight: 500;
          color: #00a85a;
        }
      }
    }

    .tabs {
      display: flex;
      width: 100%;
      padding: 10px 2px;
      cursor: pointer;
      /* gap: 20px; */

      .pane {
        display: flex;
        gap: 17px;

        @media screen and (max-width: 40em) {
          gap: 5px;
        }

        align-items: center;
        padding-block-end: 10px;
        border-bottom: 3px solid #d7d7d7;
        flex: 1;
      }
    }

    .payby {
      padding-inline: 1em;
      /* padding-block: 10px; */
    }

    .box {
      border: 1px solid rgba(233, 237, 245, 1);
    }
  }

  .activebox {
    border: 1px solid green;
  }

  .box {
    padding-inline: 3em;
    background-color: #fff;
    padding: 1em;
    border-radius: 8px;
    display: flex;
    gap: 20px;
    width: 90%;
    margin: 0 auto;
    height: 80px;

    .text {
      display: inline-flex;
      flex-direction: column;
      gap: 2px;
      letter-spacing: 1;
      flex: 1;
      /* padding: 1em; */

      h5 {
        font-size: 13px;
        font-weight: 350;
      }

      p {
        font-size: x-small;
        font-weight: light;
      }
    }

    /* .arco-icon-more-vertical{
        display: none;
    }
     */
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  /* flex-direction:column; */
  align-items: center;
  padding-inline: 1em;
  text-align: center;
  gap: 2px;
  /* height:100px ; */
  /* padding-block: 20px; */
  /* border: 1px solid red; */
  /* height: 10%; */

  .arco-input-inner-wrapper {
    background-color: #fff;

    padding: 5px;
    border: 0.8px solid var(--gray-300, #d0d5dd);
    border-radius: 50px;
  }
  .arco-input-inner-wrapper .arco-input {
    padding-left: 23px;
  }
`;

export default SendMoney;
