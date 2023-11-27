/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Input, Link, Space } from "@arco-design/web-react";
import Logo from "../images/logo.svg";
import Left from "../images/left.svg";
import { InputStyle } from "../styles/Input";
import { CenterElement } from "../styles/CenterEle";
import { Checkbox } from "@arco-design/web-react";
import Btn from "../reuseables/Btn";
import { Switch, Timeline, Typography } from "@arco-design/web-react";
import { DatePicker } from "@arco-design/web-react";
import { Select } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import {
  countries,
  cities,
  states,
  employment,
  profession,
} from "../services/Auth";
import {
  countries as testCountries,
  stateTest as testState,
  cityTest as cityTest,
  employment as employmentTest,
  profession as professionTest,
} from "../../config/Test";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Kyc from "../reuseables/Kyc";
import toast from "react-hot-toast";
import Autocomplete from "react-google-autocomplete";
import { LocationInput } from "../reuseables/LocationInput";

const Option = Select.Option;
const TextArea = Input.TextArea;

const TimelineItem = Timeline.Item;
function Register() {
  const handleChange = (value, i) => {
    const { name } = i.target;

    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [reverse, setReverse] = useState(false);
  const [step1, setstep1] = useState(true);
  const [step2, setstep2] = useState(false);
  const [step3, setstep3] = useState(false);
  const [selectedCountry, setselectedCountry] = useState("");
  const [emp, setemp] = useState("");
  const [prof, setprof] = useState("");
  const [SelectState, setSelectState] = useState("");
  const [SelectCity, setSelectCity] = useState("");
  const [countryDetails, setCountryDetails] = useState();
  const [stateDetails, setStateDetails] = useState();
  const [cityDetails, setCityDetails] = useState();
  // const [cityDetails, setCityDetails] = useState();

  const [user, setUser] = useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    postcode: "",
    countryId: "",
    stateId: "",
    cityId: "",
    employmentStatusId: "",
    professionId: "",
    companyName: "",
    onboardingSource: "Web",
  });

  console.log("🚀 ~ file: Register.jsx:44 ~ Register ~ user:", user);

  const {
    data: countrylist,
    isLoading: countrylistloading,
    refetch: refetchcountrylist,
  } = useQuery({
    queryKey: ["getCategories"],
    queryFn: countries,
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const {
    data: statelist,
    isLoading: statelistloading,
    refetch: refetchstatelist,
  } = useQuery({
    //   queryKey: [countryDetails?.id,0],
    queryFn: states(countryDetails?.id || 0, 1),
    onSuccess: (data) => {},
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
    },
  });
  const [City, setCity] = useState([]);

  // const { data:citylist,isLoading:citylistloading,refetch:refetchcitylist } = useQuery({

  // //   queryKey: [countryDetails?.id,0],
  //     queryFn: cities(countryDetails?.id,stateDetails?.id,0),
  //     onSuccess:(data) => {
  //         console.log("🚀 ~ file: Register.jsx:109 ~ Register ~ data:", data)
  //         setCity(data?.data)
  //     },
  //     // refetchInterval: 10000, // fetch data every 10 seconds
  //     onError: (err) => {
  //     //   setMessage(err.response.data.detail || err.message);
  //     //   setOpen(true);
  //     },
  // });

  console.log("🚀 ~ file: Register.jsx:115 ~ Register ~ City:", City);

  const {
    data: employmentlist,
    isLoading: employmentlistloading,
    refetch: refetchemploymentlist,
  } = useQuery({
    //   queryKey: [countryDetails?.id,0],
    queryFn: employment,
    onSuccess: (data) => {
      setEmployment(data);
    },

    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
    },
  });

  const {
    data: professionlist,
    isLoading: professionlistloading,
    refetch: refetchprofessionlist,
  } = useQuery({
    //   queryKey: [countryDetails?.id,0],
    queryFn: profession,
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
    },
  });

  const [Countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const [State, setState] = useState([]);
  const [Employment, setEmployment] = useState([]);
  const [Proffession, setProffession] = useState([]);
  const [address, setAddress] = useState(false);

  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://apidoc.transferrocket.co.uk/getcountries`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          "🚀 ~ file: Register.jsx:157 ~ useEffect ~ response:",
          data
        );
        setCountries(data.data);
      })
      .catch((error) => console.log("error", error));
  }, [countryDetails?.id]);
  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://apidoc.transferrocket.co.uk/getstates?countryId=${countryDetails?.id}&stateId=0`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          "🚀 ~ file: Register.jsx:157 ~ useEffect ~ response:",
          data
        );
        setState(data.data);
      })
      .catch((error) => console.log("error", error));
  }, [countryDetails?.id]);

  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://apidoc.transferrocket.co.uk/getcities?countryId=${countryDetails?.id}&stateId=${stateDetails?.id}&citiId=0`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          "🚀 ~ file: Register.jsx:156 ~ useEffect ~ response:",
          data
        );
        setCity(data?.data);
      })
      .catch((error) => console.log("error", error));
  }, [SelectState]);

  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://apidoc.transferrocket.co.uk/getemploymentstatus`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          "🚀 ~ file: Register.jsx:156 ~ useEffect ~ response:",
          data
        );
        setEmployment(data?.data);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://apidoc.transferrocket.co.uk/getprofession`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          "🚀 ~ file: Register.jsx:156 ~ useEffect ~ response:",
          data
        );
        setProffession(data?.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // Function to navigate back

  const CountryOption = [...Countries?.map((d) => d?.name)];
  const StateOption = [...State?.map((d) => d?.name)];
  console.log(
    "🚀 ~ file: Register.jsx:173 ~ Register ~ StateOption:",
    StateOption
  );
  const EmploymentOption = [...Employment.map((d) => d?.name)];
  const ProffessionOption = [...Proffession.map((d) => d?.name)];
  const CityOption = [...City?.map((d) => d?.name)];
  console.log(
    "🚀 ~ file: Register.jsx:220 ~ Register ~ CityOption:",
    CityOption
  );

  const handleSelectCountry = (e) => {
    const getCountryDetails = Countries.find((d) => d?.name === e);
    setCountryDetails(getCountryDetails && getCountryDetails);
    setselectedCountry(getCountryDetails?.name);
    console.log(
      "🚀 ~ file: Register.jsx:78 ~ handleSelectCountry ~ e:",
      selectedCountry
    );
    setUser((prev) => {
      return { ...prev, ["countryId"]: getCountryDetails?.id };
    });
  };

  const handleSelectState = (e) => {
    setSelectState(e);
    const getStateDetails = State.find((d) => d.name === e);
    setUser((prev) => {
      return { ...prev, ["stateId"]: getStateDetails?.id };
    });
    setStateDetails(getStateDetails && getStateDetails);
  };
  const handleSelectProf = (e) => {
    const getStateDetails = Proffession.find((d) => d.name === e);
    setUser((prev) => {
      return { ...prev, ["professionId"]: getStateDetails?.id };
    });
    setprof(e);
  };
  const handleSelectEmp = (e) => {
    const getStateDetails = Employment.find((d) => d.name === e);
    setemp(e);
    setUser((prev) => {
      return { ...prev, ["employmentStatusId"]: getStateDetails?.id };
    });
  };
  const handleSelectCity = (e) => {
    setSelectCity(e);
    const getCityDetails = City.find((d) => d.name === e);
    setCityDetails(getCityDetails && getCityDetails);
    setUser((prev) => {
      return { ...prev, ["cityId"]: getCityDetails.id };
    });
  };
  const newAddress = address;

  const handleStepThree = async () => {
    if (
      user?.postcode &&
      newAddress?.description &&
      user?.employmentStatusId &&
      user?.professionId &&
      user?.companyName &&
      user?.phone
    ) {
      setstep1(false);
      setstep2(false);
      setstep3(true);

      const requestOptions = {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify({
          firstName: user?.firstName,
          surName: user?.surName,
          email: user?.email,
          password: user?.password,
          phone: user?.phone,
          address: newAddress?.description,
          postcode: user?.postcode,
          employmentStatusId: user?.employmentStatusId,
          professionId: user?.professionId,
          companyName: user?.companyName,
          onboardingSource: user?.onboardingSource,
          country: {
            id: user?.countryId,
          },
          state: {
            id: user?.stateId,
          },
          city: {
            id: user?.cityId,
          },
        }),
      };

      fetch(`https://apidoc.transferrocket.co.uk/signup`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(
            "🚀 ~ file: Register.jsx:156 ~ useEffect ~ response:",
            data
          );
          if (data.status) {
            navigate("/");
            toast.success(data?.message);
          } else {
            toast.error(data?.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      toast.error("Fill all fields required");
    }
  };
  const handleStepTwo = () => {
    if (
      user?.firstName &&
      user?.surName &&
      user?.countryId &&
      user?.stateId &&
      user?.cityId &&
      user?.phone
    ) {
      setstep1(false);
      setstep2(false);
      setstep3(true);
    } else {
      toast.error("Fill all fields required");
    }
  };
  const handleStepOne = () => {
    if (user?.email && user?.password) {
      setstep1(false);
      setstep2(true);
    } else {
      toast.error("Fill all fields required");
    }
  };

  const handleBackStepThree = () => {
    setstep3(false);
    setstep2(true);
  };
  const handleBackStepTwo = () => {
    setstep1(true);
    setstep2(false);
  };

  console.log(newAddress);
  return (
    <LoginCotainer>
      <div className="flex">
        <div className="side1"></div>
        <div className="side2 fade-In">
          {step1 && (
            <Center>
              <div>
                <div className="signup">
                  <div className="signupcontent">
                    <div className="navigation">
                      <Link
                        href="/"
                        style={{
                          color: "var(--primary-color)",
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <img src={Left} />
                        <p>Back</p>
                      </Link>
                    </div>
                    <div className="signuptext">
                      <span className="span">Already have an account?</span>
                      <Link href="/" style={{ color: "var(--primary-color)" }}>
                        Sign in
                      </Link>
                    </div>
                  </div>
                  <br />
                  <div className="timeline">
                    <Timeline
                      direction="horizontal"
                      dotColor="var(--primary-color)"
                      reverse={reverse}
                    >
                      <TimelineItem
                        className="lines"
                        dotColor="var(--primary-color)"
                      ></TimelineItem>
                      <TimelineItem
                        className="lines"
                        dotColor="var(--primary-color)"
                      ></TimelineItem>
                      <TimelineItem
                        className="lines"
                        dotColor="var(--primary-color)"
                      ></TimelineItem>
                    </Timeline>
                  </div>
                </div>
                <div className="signupheadtext">
                  <p>Step 1 of 3</p>
                  <h1>What’s your email address?</h1>
                  <p>Please enter your details.</p>
                </div>

                <div className="inputform">
                  <div>
                    <span className="span">Email</span>
                    <InputStyle>
                      <Input
                        name="email"
                        onChange={handleChange}
                        className="input"
                        style={{ borderRadius: "8px;", width: "100%" }}
                        placeholder="Enter your Email"
                      />
                    </InputStyle>
                  </div>

                  <div>
                    <span className="span">Password</span>
                    <InputStyle>
                      <Input.Password
                        name="password"
                        className="input"
                        style={{ width: "100%" }}
                        placeholder="Enter your Password"
                      />
                    </InputStyle>
                  </div>

                  <div>
                    <span className="span">Confirm Password</span>
                    <InputStyle>
                      <Input.Password
                        onChange={handleChange}
                        name="password"
                        className="input"
                        style={{ width: "100%" }}
                        placeholder="Enter your Password"
                      />
                    </InputStyle>

                    <br />
                    <span className="smalltext">
                      Password must contain at least one uppercase letter, one
                      special character, one number and must be 8 characters
                      long.
                    </span>
                  </div>

                  <div>
                    <span className="span">Referral Code</span>
                    <Input
                      className="inputpass"
                      style={{}}
                      placeholder="Enter referral code"
                    />
                  </div>
                  <div>
                    <Btn
                      clicking={handleStepOne}
                      disabled={false}
                      o
                      styles={{
                        width: "100%",
                        background: "var(--primary-color)",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "0.8em",
                      }}
                    >
                      Continue
                    </Btn>
                  </div>
                </div>
              </div>
            </Center>
          )}

          {step2 && (
            <Center>
              <div className="signup">
                <div className="signupcontent">
                  <div className="navigation">
                    <Link
                      onClick={handleBackStepTwo}
                      style={{
                        color: "var(--primary-color)",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <img src={Left} />
                      <p>Back</p>
                    </Link>
                  </div>
                  <div className="signuptext">
                    <span className="span">Already have an account?</span>
                    <Link href="/" style={{ color: "var(--primary-color)" }}>
                      Sign in
                    </Link>
                  </div>
                </div>
                <br />
                <div className="timeline">
                  <Timeline
                    direction="horizontal"
                    dotColor="var(--primary-color)"
                    reverse={reverse}
                  >
                    <TimelineItem
                      className="lines"
                      dotColor="var(--primary-color)"
                      lineColor="var(--primary-color)"
                    ></TimelineItem>
                    <TimelineItem
                      className="lines"
                      dotColor="var(--primary-color)"
                    ></TimelineItem>
                    <TimelineItem
                      className="lines"
                      dotColor="var(--primary-color)"
                    ></TimelineItem>
                  </Timeline>
                </div>
              </div>
              <div className="signupheadtext">
                <p>Step 2 of 3</p>
                <h1>Personal Information</h1>
                <p>Please enter your details.</p>
              </div>

              <div className="inputform makescroll">
                <div>
                  <span className="span">First Name</span>
                  {/* <InputStyle > */}
                  <Input
                    name="firstName"
                    onChange={handleChange}
                    className="input"
                    style={{ borderRadius: "8px;" }}
                    placeholder="Enter your Frist name"
                  />
                  {/* </InputStyle> */}
                </div>
                <div>
                  <span className="span">Last Name</span>
                  <InputStyle>
                    <Input
                      name="surName"
                      onChange={handleChange}
                      className="input"
                      style={{ borderRadius: "8px;" }}
                      placeholder="Enter your Last Name"
                    />
                  </InputStyle>
                </div>

                <div>
                  <span className="span">Country</span>
                  {/* <InputStyle > */}
                  {/* <Select name="countryId" style={{height:"30px"}} onChange={handleSelectCountry} showSearch  value={"Nigeria"} placeholder='Please select a Country'  allowClear>
                                    <p>{selectedCountry}</p>
                                        {CountryOption.map((option, index) => (
                                            <Option key={option} value={option}>
                                            {option}
                                            </Option>
                                        ))}
                                    </Select> */}
                  <Select
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
                  />
                  {/* </InputStyle> */}
                </div>
                <div>
                  <span className="span">State</span>

                  <Select
                    name="stateId"
                    styles={{
                      padding: "0px !important",
                      // You can add custom styles here if needed
                    }}
                    options={StateOption}
                    value={SelectState} // Pass the selected option to the value prop
                    onChange={handleSelectState} // Handle option selection
                    placeholder="Please select a State"
                    showSearch
                    isClearable={true} // Allow clearing the selected option
                  />
                  {/* </InputStyle> */}
                </div>
                <div>
                  <Select
                    name="cityId"
                    styles={{
                      padding: "0px !important",
                      // You can add custom styles here if needed
                    }}
                    options={CityOption}
                    value={SelectCity} // Pass the selected option to the value prop
                    onChange={handleSelectCity} // Handle option selection
                    placeholder="Please select a city"
                    showSearch
                    isClearable={true} // Allow clearing the selected option
                  />
                </div>
                <div>
                  <span className="span">Mobile Number</span>
                  <InputStyle>
                    <Input
                      name="phone"
                      type="number"
                      onChange={(value) => {
                        console.log(user, "nsosd");
                        if (value?.length > 10) {
                          setUser((prev) => {
                            return {
                              ...prev,
                              phone: `${
                                countryDetails?.telephoneCode
                              }${value.slice(1, 11)}`,
                            };
                          });
                        } else {
                          setUser((prev) => {
                            return {
                              ...prev,
                              phone: `${countryDetails?.telephoneCode}${value}`,
                            };
                          });
                        }
                      }}
                      addBefore={countryDetails?.telephoneCode}
                      className="input"
                      style={{
                        borderRadius: "8px;",
                        height: "42px",
                        padding: "5px",
                      }}
                      placeholder="+44 000-000-0000"
                    />
                  </InputStyle>
                </div>
                <div>
                  <Btn
                    clicking={handleStepTwo}
                    styles={{
                      width: "100%",
                      background: "var(--primary-color)",
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "0.8em",
                    }}
                  >
                    Continue
                  </Btn>
                </div>
              </div>
            </Center>
          )}
          {step3 && (
            <Center>
              <div className="signup">
                <div className="signupcontent">
                  <div className="navigation">
                    <Link
                      onClick={handleBackStepThree}
                      style={{
                        color: "var(--primary-color)",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <img src={Left} />
                      <p>Back</p>
                    </Link>
                  </div>
                  <div className="signuptext">
                    <span className="span">Already have an account?</span>
                    <Link style={{ color: "var(--primary-color)" }}>
                      Sign in
                    </Link>
                  </div>
                </div>
                <br />
                <div className="timeline">
                  <Timeline
                    direction="horizontal"
                    dotColor="var(--primary-color)"
                    reverse={reverse}
                  >
                    <TimelineItem
                      className="lines"
                      dotColor="var(--primary-color)"
                      lineColor="var(--primary-color)"
                    ></TimelineItem>
                    <TimelineItem
                      className="lines"
                      dotColor="var(--primary-color)"
                      lineColor="var(--primary-color)"
                    ></TimelineItem>
                    <TimelineItem
                      className="lines"
                      dotColor="var(--primary-color)"
                      lineColor="var(--primary-color)"
                    ></TimelineItem>
                  </Timeline>
                </div>
              </div>
              <div className="signupheadtext">
                <p>Step 3 of 3</p>
                <h1>Lastly, Your Address</h1>
                <p>Please enter your details.</p>
              </div>
              <div className="inputform makescroll">
                <div>
                  <span className="span">Postcode</span>
                  <InputStyle>
                    <Input
                      name="postcode"
                      onChange={handleChange}
                      className="input"
                      style={{ borderRadius: "8px;" }}
                      placeholder="Enter your Postcode"
                    />
                  </InputStyle>
                </div>
                <div>
                  <span className="span">Address</span>

                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    {(address && (
                      <div
                        className="input"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {address?.description}
                        <span
                          onClick={() => {
                            setUser((prev) => {
                              return { ...prev, ["address"]: "" };
                            });
                            setAddress(false);
                          }}
                          style={{
                            position: "absolute",
                            top: "20%",
                            fontSize: "17px",
                            right: "10px",
                            cursor: "pointer",
                          }}
                        >
                          &#x2715;
                        </span>
                      </div>
                    )) || (
                      <InputStyle>
                        <LocationInput
                          setAddress={setAddress}
                          address={address}
                          onClick={() => {
                            console.log(newAddress);
                            setUser((prev) => {
                              return {
                                ...prev,
                                ["address"]: newAddress?.description,
                              };
                            });
                          }}
                          className="input"
                        />
                      </InputStyle>
                    )}
                  </div>
                </div>
                {address && <br />}
                {/*  <div>
                  <span className="span">Address: 1</span>
                  <InputStyle>
                    <TextArea
                      name="address"
                      onChange={handleChange}
                      className="textarea"
                      placeholder="Please enter ..."
                      style={{ minHeight: 64, background: "transparent" }}
                    />
                  </InputStyle>
                </div>
                <div>
                  <span className="span">Address: 2</span>
                  <InputStyle>
                    <TextArea
                      name="address"
                      onChange={handleChange}
                      className="textarea"
                      placeholder="Please enter ..."
                      style={{ minHeight: 64, background: "transparent" }}
                    />
                  </InputStyle>
                </div> */}
                <div>
                  {/* <InputStyle >
                                        <Select  name='cityId' style={{height:"30px"}} onChange={handleSelectCity} showSearch  value={cityDetails?.name && cityDetails?.name } placeholder='Please select a Country'  allowClear>
                                            {CityOption.map((option, index) => (
                                            <Option key={option} disabled={index === 3} value={option}>
                                                {option}
                                            </Option>
                                            ))}
                                        </Select> */}

                  {/* </InputStyle> */}
                </div>

                <div>
                  <span className="span">Employment Status</span>
                  {/* <InputStyle >
                                        <Select name="employmentStatusId" style={{height:"30px"}} onChange={handleSelectCountry} showSearch  value={selectedCountry && selectedCountry } placeholder='Please select a Country'  allowClear>
                                            {EmploymentOption.map((option, index) => (
                                            <Option key={option} disabled={index === 3} value={option}>
                                                {option}
                                            </Option>
                                            ))}
                                        </Select>
                                    </InputStyle> */}

                  <Select
                    name="cityId"
                    styles={{
                      padding: "0px !important",
                      // You can add custom styles here if needed
                    }}
                    options={EmploymentOption}
                    value={emp} // Pass the selected option to the value prop
                    // onChange={handleSelectCity} // Handle option selection
                    onChange={handleSelectEmp}
                    placeholder="Please select a Employment"
                    showSearch
                    isClearable={true} // Allow clearing the selected option
                  />
                </div>
                <div>
                  <span className="span">Profession</span>
                  {/* <InputStyle >
                                    <Select name="professionId" placeholder='Select Proffession' style={{borderRadius:'8px;',height:"20px",background:"none"}}   allowClear showSearch>
                                        {ProffessionOption.map((option, index) => (
                                        <Option key={option} disabled={index === 3} value={option}>
                                            {option}
                                        </Option>
                                        ))}
                                    </Select>
                                    </InputStyle> */}
                  <Select
                    name="cityId"
                    styles={{
                      padding: "0px !important",
                      // You can add custom styles here if needed
                    }}
                    options={ProffessionOption}
                    value={prof} // Pass the selected option to the value prop
                    // onChange={handleSelectCity} // Handle option selection
                    onChange={handleSelectProf}
                    placeholder="Please select a Profession"
                    showSearch
                    isClearable={true} // Allow clearing the selected option
                  />
                </div>
                <div>
                  <span className="span">Company Name</span>
                  <InputStyle>
                    <Input
                      name="companyName"
                      onChange={handleChange}
                      className="input"
                      style={{ borderRadius: "8px;" }}
                      placeholder="Enter your Last Name"
                    />
                  </InputStyle>
                </div>
                <div>
                  <Btn
                    clicking={handleStepThree}
                    styles={{
                      width: "100%",
                      background: "var(--primary-color)",
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "0.8em",
                    }}
                  >
                    All Set Submit
                  </Btn>
                </div>
              </div>
            </Center>
          )}
        </div>
      </div>
    </LoginCotainer>
  );
}

const LoginCotainer = styled.div`
  height: 100vh;
  overflow: hidden;

  .input {
    padding: 0.7em;
    border-radius: 8px;
    outline: none;
    border: 0.1px solid var(--gray-300, #d0d5dd);
    background: #ffffff;
  }
  .inputpass {
    margin: 0;
    padding: 0.7em;
    border-radius: 8px;
    outline: none;
    border: 0.1px solid var(--gray-300, #d0d5dd);
    background: #ffffff;
  }
  .inputdate {
    padding: 1.3rem;
    border-radius: 8px;
    outline: none;
    border: 1px solid var(--gray-300, #d0d5dd);
    background: #ffffff;
  }

  .flex {
    display: flex;
    overflow: hidden;
    height: 100%;

    @media screen and (max-width: 980px) {
      .side1 {
        display: none;
      }
      .side2 {
        background: #fcfcfc;
        width: 100%;
        flex: 1;
      }
    }

    .side1 {
      width: 50%;
      height: 100%;
      background: var(--Primary-Colour, #00a85a);
    }
    .side2 {
      background: #fcfcfc;
      width: 50%;
      height: 100%;
      overflow-y: scroll;

      .signuptext {
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
        flex: 2;
      }

      .makescroll {
        height: 65%;

        overflow-y: scroll;
        > ::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
  .show {
    display: initial;
  }
  .hide {
    display: none;
  }
`;

const Center = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  gap: 10px;
  overflow-x: hidden;
  padding: 40px;

  .span {
    font-weight: 500;
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }

  .logintext {
    display: flex;

    flex-direction: column;
    h1 {
      margin-block: 0;
    }
    p {
      color: var(--small-color-font);
    }
  }

  .inputpass {
    /* background-color: red !important;  */
  }
  input[type="password"] {
    padding: 0;
    background-color: #ffffff;
  }
  .arco-input-password {
    width: 95%;
  }
  .arco-input-group {
    background-color: #ffffff;
    z-index: 1;
  }

  .inputform {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    .arco-select-view {
      background: #ffffff;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--gray-300, #d0d5dd);
    }

    .phonenum {
      /* position: relative; */
      /* margin-top: -5px; */
    }
  }

  .signupheadtext {
    width: 100%;

    p {
      margin: 0 0;
    }
  }
  .signup {
    width: 100%;

    .signupcontent {
      display: flex;
      justify-content: space-between;

      width: 100%;

      .navigation {
        flex: 1;
      }
    }

    .signuptext {
      width: 100%;
      display: inline-flex;
      justify-content: flex-end;
      flex: 1;
      font-size: 12px;
      align-items: center;
    }

    .timeline {
      /* border: 1px solid red; */

      width: 147%;
      .arco-timeline .arco-timeline-left {
        width: 100%;
      }
      .lines {
        width: 100%;
        /* width: 500px; */
      }
    }
  }
`;

export default Register;
