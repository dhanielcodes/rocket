import React, { useRef } from "react";
import Userlayout from "../../reuseables/Userlayout";
import styled from "styled-components";
//
import contact from "../../assets/contact.svg";
import bankdetails from "../../assets/bankdetails.png";
import changepassword from "../../assets/changepassword.png";
import delet from "../../assets/delete.svg";
import discount from "../../assets/discount.png";
import document from "../../assets/documents.png";
import faqs from "../../assets/faqs.png";
import logout from "../../assets/logout.png";
import greaterthan from "../../assets/greaterthan.svg";
import copy from "../../assets/copy.svg";
//
import Box from "../../reuseables/Box";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const settingsMap = [
    {
      id: 0,
      title: "Your contact details",
      image: contact,
      path: "/customer/contact/details",
    },
    {
      id: 1,
      title: "Change Address",
      image: contact,
      path: "/user/settings/address",
    },
    {
      id: 2,
      title: "Wallet",
      image: contact,
      path: "/user/settings/wallet",
    },
    {
      id: 3,
      title: "Discounts",
      image: discount,
    },
    {
      id: 4,
      title: "ID Documents",
      image: document,
      path: "/user/id/documents",
    },
    {
      id: 5,
      title: "Refer & Earn $10",
      image: contact,
    },
    {
      id: 6,
      title: "Communication Preferences",
      image: contact,
    },
  ];
  const settingsMap2 = [
    {
      id: 0,
      title: "Change Password",
      image: changepassword,
      path: "/user/settings/password",
    },
    {
      id: 1,
      title: "Our Bank Details",
      image: bankdetails,
    },
    {
      id: 2,
      title: "KYC Upload Help",
      image: contact,
    },
    {
      id: 3,
      title: "Contact Us",
      image: discount,
    },
    {
      id: 4,
      title: "FAQs",
      image: faqs,
    },
  ];
  const settingsMap3 = [
    {
      id: 1,
      title: "Delete My Account",
      image: delet,
    },
  ];

  const handleUploadImage = (e) => {
    const parent = e.target.parentElement;
    const getInput = parent.querySelector(".uploader");
    getInput.click();
    getInput.addEventListener("change", (e) => {
      console.log(e);
    });
  };

  // Usage: Call handleUploadImage() when your image is clicked

  // Usage: Call handleUploadImage() when your image is clicked

  const navigate = useNavigate();
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  return (
    <Userlayout>
      <Container>
        <InnerBox>
          <div className="user-info">
            <div className="pro-photo" onClick={handleUploadImage}>
              <img src={Userdata?.data?.user?.idImageURL} alt="" />
              <input
                type="file"
                className="uploader"
                style={{ display: "none" }}
              />
            </div>
            <p className="proname">Korede Sulaimon</p>
            <p className="copyreg">
              {" "}
              <span>bit.ly/agentkorede</span>
              <img
                src={copy}
                alt=""
                onClick={() => navigator.clipboard.writeText("Copy")}
              />
            </p>
          </div>
          <p className="title">Profile Settings</p>
          <Box alignItems="flex-start" flexDirection="column">
            {settingsMap.map(({ title, image, path }, i) => (
              <div className="wrapper" key={i} onClick={() => navigate(path)}>
                <div className="left">
                  <img src={image} alt="" />
                  <span>{title}</span>
                </div>
                <div className="right">
                  <img src={greaterthan} alt="" />
                </div>
              </div>
            ))}
          </Box>
          <p className="title">Support & Security</p>
          <Box alignItems="flex-start" flexDirection="column">
            {settingsMap2.map(({ title, image, path }, i) => (
              <div className="wrapper" key={i} onClick={() => navigate(path)}>
                <div className="left">
                  <img src={image} alt="" />
                  <span>{title}</span>
                </div>
                <div className="right">
                  <img src={greaterthan} alt="" />
                </div>
              </div>
            ))}
          </Box>
          <p className="title"></p>
          <Box alignItems="flex-start" flexDirection="column">
            <div
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="wrapper"
            >
              <div className="left">
                <img src={logout} alt="" />
                <span className="outboard">Logout</span>
              </div>
              <div className="right">
                <img src={greaterthan} alt="" />
              </div>
            </div>
            {settingsMap3.map(({ title, image }, i) => (
              <div className="wrapper" key={i}>
                <div className="left">
                  <img src={image} alt="" />
                  <span className="outboard">{title}</span>
                </div>
                <div className="right">
                  <img src={greaterthan} alt="" />
                </div>
              </div>
            ))}
          </Box>
        </InnerBox>
      </Container>
    </Userlayout>
  );
};

export default Settings;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  // height: inherit;
  // border: 2px solid red;
`;

const InnerBox = styled.div`
  width: 100%;
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  justify-content: center;

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 3px;
    margin: 25px 0 10px;
    .pro-photo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      height: 100px;
      border-radius: 50%;
      border: 2px solid #00a85a;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .proname {
      color: #090814;
      font-size: 14px;
      font-weight: 500;
      line-height: 150%;
    }
    .copyreg {
      display: flex;
      align-items: center;
      gap: 5px;
      span {
        color: #00a85a;
      }
      color: #6b7280;
      font-size: 13px;
      font-weight: 500;
      line-height: 150%;
    }
  }

  .title {
    // width: 100%;
    min-width: 100%;
    color: #6b7280;
    font-size: 13px;
    font-weight: 500;
    line-height: 150%;
    margin-top: 20px;
  }

  .wrapper {
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #e9edf5;
    // border: 2px solid green;
    .left {
      display: flex;
      align-items: center;
      gap: 13px;
      span {
        color: #333b4a;
        font-size: 12px;
        font-weight: 500;
      }
      .outboard {
        color: #f04438;
      }
    }
  }
  .wrapper:last-child {
    border: none;
  }
`;
