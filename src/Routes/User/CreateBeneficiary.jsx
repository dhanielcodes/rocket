/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import CountryDropdown from "../../reuseables/CountryList";
import CountryFlag from "react-country-flag";
import { Input } from "@arco-design/web-react";

import { useMutation, useQuery } from "@tanstack/react-query";
const Option = Select.Option;
import Select from "react-select";
import CustomSelect from "../../reuseables/CustomSelect";
import { InputStyle } from "../../styles/Input";
import {
  countries,
  cities,
  states,
  employment,
  profession,
} from "../../services/Auth";
import {
  nameEnquiry,
  createBeneficiary,
  getBanks,
  Payoutchannel,
} from "../../services/Dashboard";
import {
  countries as testCountries,
  stateTest as testState,
  cityTest as cityTest,
  employment as employmentTest,
  profession as professionTest,
  BankTest as BankList,
  nameEnq as NameEqnquiry,
} from "../../../config/Test";
import CustomInput from "../../reuseables/CustomInput";
import Loader from "../../reuseables/Loader";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import { useNavigate } from "react-router-dom";
import { countryObjectsArray } from "../../../config/CountryCodes";
import CountryDropdownNormal from "../../reuseables/CountryListNormal";

function CreateBeneficiary() {
  const [accNum, setAccNum] = useState(null);
  const [info, setInfo] = useState(null);
  const [show, setShow] = useState(false);
  const [bankcode, setBankCode] = useState();
  const UserData = JSON.parse(localStorage.getItem("userDetails"));

  console.log(bankcode);

  const [countryDetails, setCountryDetails] = useState({
    regionId: 1,
    subRegionId: 3,
    telephoneCode: "234",
    currencyCode: "NGN",
    emoji: "??",
    status: false,
    id: 161,
    name: "Nigeria",
    longitude: "8",
    latitude: "10",
  });

  useEffect(() => {}, [accNum]);

  const {
    data: Banks,
    isLoading: BankListloading,
    refetch: refetchBankList,
  } = useQuery({
    // queryKey: ["nameEnq"],
    queryFn: getBanks,
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const [banks, setbanks] = useState(Banks?.data || BankList?.data);

  const banksSelection = Banks?.data?.map((d) => {
    return {
      name: d?.bankCode,
      label: d?.bankName,
      id: d?.bankId,
    };
  });

  const Selectoptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  const countryFlags = [
    { code: "GB", label: "United Kingdom" },

    { code: "NG", label: "Nigeria" },
    // Add more countries as needed
  ];

  const options = ["Beijing", "Shanghai", "Guangzhou", "Disabled"];
  const [Countries, setCountries] = useState();

  const {
    data: payout,
    isLoading: payoutloading,
    refetch: refetchpayout,
  } = useQuery({
    queryKey: ["Payoutchanneldd"],
    queryFn: Payoutchannel,
    onSuccess: (data) => {
      console.log(
        "🚀 ~ file: CreateBeneficiary.jsx:100 ~ CreateBeneficiary ~ data:",
        data
      );
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });
  console.log(
    "🚀 ~ file: CreateBeneficiary.jsx:110 ~ CreateBeneficiary ~ payout:",
    payout
  );

  const {
    data: countrylist,
    isLoading: countrylistloading,
    refetch: refetchcountrylist,
  } = useQuery({
    queryKey: ["countridess"],
    queryFn: countries,
    onSuccess: (data) => {
      setCountries(data?.data);
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  console.log(countrylist);

  const {
    data: nameEnq,
    isLoading: namEnqloading,
    refetch: refetchnameEnq,
  } = useQuery({
    queryKey: [bankcode?.name, accNum],
    queryFn: nameEnquiry,
    onSuccess: (data) => {
      console.log(
        "🚀 ~ file: CreateBeneficiary.jsx:93 ~ CreateBeneficiary ~ data:",
        data
      );
      setCreateBene((prev) => {
        return {
          userId: UserData?.data?.user?.userId,
          userBeneficiary: {
            beneficiaryCountry: {
              id: countryDetails?.id,
            },
            beneficiaryName: data?.data?.account_name,
            beneficiaryPhoneNumber: "",
            beneficiaryBank: {
              accountNumber: data?.data?.account_number,
              bankId: bankcode?.id,
            },
          },
        };
      });
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const [nameenquiry, setnameenquiry] = useState(nameEnq?.data);
  console.log(
    "🚀 ~ file: CreateBeneficiary.jsx:102 ~ CreateBeneficiary ~ nameenquiry:",
    nameEnq?.data
  );

  const [user, setUser] = useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    postcode: "",
    countryId: 161,
    stateId: 306,
    cityId: undefined,
    employmentStatusId: 1,
    professionId: 5,
    companyName: "",
    onboardingSource: "Web",
    agentId: 0,
  });

  //   const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [selectedCountry, setselectedCountry] = useState();
  const [type, setType] = useState();

  const handleSelectCountry = (e) => {
    console.log(
      "🚀 ~ file: CreateBeneficiary.jsx:105 ~ handleSelectCountry ~ e:",
      e
    );
    const getCountryDetails = Countries?.find(
      (d) => d?.name?.toLowerCase() === e?.label?.toLowerCase()
    );
    console.log(
      "🚀 ~ file: CreateBeneficiary.jsx:155 ~ handleSelectCountry ~ getCountryDetails:",
      getCountryDetails
    );
    setselectedCountry(e);

    setCountryDetails(getCountryDetails && getCountryDetails);
  };

  const EmploymentOption = [{ name: "Direct To Bank" }, { name: "Pick Up" }];

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const collectionType = (e) => {
    //   reset setCreateBene state to the useable one
    setType(e);
  };
  const navigate = useNavigate();
  const [createBene, setCreateBene] = useState({
    userId: "",
    userBeneficiary: {
      beneficiaryCountry: {
        id: countryDetails?.id,
      },
      beneficiaryName: nameEnq?.data?.account_name,
      beneficiaryPhoneNumber: nameenquiry?.phone,
      beneficiaryBank: {
        accountNumber: accNum,
        bankId: nameenquiry?.bank_id,
      },
    },

    // userId: 100,
    // userBeneficiary: {
    //     beneficiaryName: nameEnq?.data?.account_name,
    //     beneficiaryPhoneNumber: nameenquiry?.phone,
    //     beneficiaryBank: {
    //         accountNumber: accNum,
    //         bankId: nameenquiry?.bank_id
    //     }
    // }
  });
  console.log(
    "🚀 ~ file: CreateBeneficiary.jsx:165 ~ CreateBeneficiary ~ createBene:",
    createBene
  );

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: createBeneficiary,
    onSuccess: (data) => {
      console.log("🚀 ~ file: Login.jsx:61 ~ Login ~ data:", data);
      if (!data.status) {
        setInfo(data);
        setShow(true);
        // toast.error(data?.message)
      }
      setInfo(data);
      setShow(true);

      // localStorage.setItem("userDetails",JSON.stringify(UserTestData))
    },
    onError: (data) => {
      setShow(true);
      setInfo(data);
      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const createbeneficiary = (e) => {
    console.log(
      "🚀 ~ file: CreateBeneficiary.jsx:158 ~ createbeneficiary ~ createBene:",
      createBene
    );
    mutate(createBene);
  };

  return (
    <Userlayout current="Add Beneficiary Details" useBack={true}>
      <Content>
        <div className="cont">
          <Header>
            <h2>Collection Details</h2>
            <p>Please fill in the details below</p>
          </Header>
          <div className="sec">
            <SectionThree>
              <div className="text">
                <p className="textheader">Select country</p>

                <Select
                  value={selectedCountry}
                  onChange={handleSelectCountry}
                  options={countrylist?.data?.map((item) => {
                    return {
                      code: item?.currencyCode,
                      value: item?.name,
                      label: item?.name,
                      id: item?.id,
                      slug: countryObjectsArray(item?.name),
                      ...item,
                    };
                  })}
                  styles={{
                    option: (styles) => ({
                      ...styles,
                      display: "flex",
                      alignItems: "center",
                      color: "#000",
                      fontSize: "14px",
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
                {/*    <Select
                    name="countryId"
                    styles={{
                      padding: "0px !important",
                      // You can add custom styles here if needed
                    }}
                    options={CountryOption}
                    value={selectedCountry} // Pass the selected option to the value prop
                    onChange={handleSelectCountry} // Handle option selection
                    placeholder="Please select a Country"
                    showSearch
                    isClearable={true} // Allow clearing the selected option
                  /> */}
                <div className="type">
                  <p className="textheader">Select Collection Type</p>
                  <CustomSelect
                    defaultValue={type}
                    onChange={collectionType}
                    options={payout?.data?.map((item) => {
                      return {
                        name: item?.name,
                        label: item?.name,
                        value: item?.name,
                        ...item,
                      };
                    })}
                    styles={{ fontSize: "10px ! important" }}
                  />
                </div>
              </div>
            </SectionThree>
            <SectionThree>
              {type?.label === "Pick Up" ? (
                <div className="text">
                  <p>Full Name</p>
                  <CustomInput
                    placeholder="Enter Full Name"
                    readonly={false}
                    onChange={(e) =>
                      setCreateBene((prev) => {
                        return {
                          userBeneficiary: {
                            beneficiaryName: e.target.value,
                          },
                        };
                      })
                    }
                  />
                  <InputStyle>
                    <p style={{ paddingBlock: "10px" }}>Phone Number</p>
                    <Input
                      name="phone"
                      addBefore={countryDetails?.telephoneCode}
                      className="input"
                      style={{
                        borderRadius: "8px",
                        height: "42px",
                        padding: "5px",
                        border: "0.2px solid grey",
                      }}
                      placeholder="+44 000-000-0000"
                      onChange={(e) =>
                        setCreateBene((prev) => {
                          return {
                            // userId: "",
                            userBeneficiary: {
                              beneficiaryName:
                                prev?.userBeneficiary?.beneficiaryName,
                              beneficiaryPhoneNumber: e,
                              beneficiaryBank: {
                                accountNumber: "",
                                bankId: "",
                              },
                            },
                          };
                        })
                      }
                    />
                  </InputStyle>
                </div>
              ) : (
                <div className="text">
                  <p>Bank Name</p>
                  <Select
                    options={banksSelection}
                    placeholder="select your bank"
                    onChange={(e) => {
                      setBankCode(e);
                      setAccNum("");
                    }}
                    styles={{
                      option: (styles) => ({
                        ...styles,
                        display: "flex",
                        alignItems: "center",
                        color: "#000",
                        fontSize: "14px",
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
                  <p>Accont Number</p>
                  <CustomInput
                    placeholder="Enter account number"
                    readonly={false}
                    onChange={(e) => {
                      if (e.target.value?.length === 10) {
                        setAccNum(e?.target?.value);
                      }
                    }}
                  />
                  {info && (
                    <ReusableModal
                      isOpen={show}
                      onClose={() => {
                        navigate("/user/beneficiary");
                        setShow(false);
                      }}
                    >
                      <Msg type={info?.status}>{info?.message}</Msg>
                    </ReusableModal>
                  )}
                  {accNum && accNum.length > 1 ? (
                    <>
                      <p>Account Name</p>
                      {nameEnq?.data?.account_name ? (
                        <CustomInput
                          val={nameEnq?.data?.account_name}
                          placeholder="Account name displayed here"
                          readOnly={true}
                          style={{
                            background: "rgba(239, 239, 239, 1)",
                            border: "none",
                          }}
                        />
                      ) : (
                        <Loader style={{ textAlign: "center" }} />
                      )}
                    </>
                  ) : null}
                </div>
              )}
            </SectionThree>
            <button
              disabled={nameEnq?.data?.account_name ? false : true}
              onClick={createbeneficiary}
              style={{
                color: "white",
              }}
            >
              {isLoading ? (
                <Loader color="#fff" style={{ textAlign: "center" }} />
              ) : (
                "Submit"
              )}
            </button>
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

  > * p {
    font-weight: 300;
  }

  @media screen and (max-width: 40em) {
    width: 100%;
  }

  .cont {
    /* border: 1px solid red; */
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-weight: 200;
    .sec {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    button {
      padding: 12px 35px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background: rgba(0, 168, 90, 1);

      &:hover {
        background: rgba(241, 149, 74, 1);
      }

      @media screen and (max-width: 40em) {
        margin-bottom: -30px;
      }
    }
  }
`;

const Header = styled.div`
  font-weight: light;
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

export default CreateBeneficiary;
