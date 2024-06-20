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
import Agentlayout from "../../reuseables/AgentLayout";
import toast from "react-hot-toast";
import { updateProfilePicture } from "../../services/Auth";
import { useMutation } from "@tanstack/react-query";
import Profile from "../../assets/profile.png";

const AgentSettings = () => {
  const settingsMap = [
    {
      id: 0,
      title: "Your contact details",
      image: contact,
      path: "/agent/contact/details",
    },
    {
      id: 1,
      title: "Change Address",
      image: contact,
      path: "/agent/settings/address",
    },
    {
      id: 2,
      title: "Wallet",
      image: contact,
      path: "/agent/settings/wallet",
    },
    {
      id: 2,
      title: "Accounts",
      image: contact,
      path: "/agent/accounts",
    },
    /*   {
      id: 3,
      title: "Discounts",
      image: discount,
    }, */
    {
      id: 4,
      title: "ID Documents",
      image: document,
      path: "/agent/id/documents",
    },
    {
      id: 5,
      title: "Refer & Earn $10",
      image: contact,
    },
    /*   {
      id: 6,
      title: "Communication Preferences",
      image: contact,
    }, */
  ];
  const settingsMap2 = [
    {
      id: 0,
      title: "Change Password",
      image: changepassword,
      path: "/agent/settings/password",
    },
    {
      id: 1,
      title: "Our Bank Details",
      image: bankdetails,
      path: "/agent/settings/banks",
    },
    /*   {
      id: 2,
      title: "KYC Upload Help",
      image: contact,
    }, */
    /*   {
      id: 3,
      title: "Contact Us",
      image: discount,
    }, */
    /*  {
      id: 4,
      title: "FAQs",
      image: faqs,
    }, */
  ];
  const settingsMap3 = [
    /* {
      id: 1,
      title: "Delete My Account",
      image: delet,
    }, */
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
  const { mutate, isLoading } = useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success(data?.message + " " + "re login to see changes");
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      console.log(data);
      toast.error(data?.message);
    },
  });
  const navigate = useNavigate();
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));
  return (
    <Agentlayout>
      <Container>
        <InnerBox>
          <div className="user-info">
            <div
              className="pro-photo"
              style={{
                opacity: isLoading ? "0.4" : "1",
                pointerEvents: isLoading ? "none" : "all",
              }}
              onClick={handleUploadImage}
            >
              <img
                src={
                  Userdata?.data?.user?.profileImageURL?.includes("cloudinary")
                    ? Userdata?.data?.user?.profileImageURL
                    : Profile
                }
                alt=""
              />
              <input
                type="file"
                className="uploader"
                style={{ display: "none" }}
                onChange={(e) => {
                  const formData = new FormData();
                  formData.append("file", e?.target?.files[0]);
                  mutate(formData);
                }}
              />
            </div>
            <p
              className="proname"
              style={{
                fontSize: "18px",
              }}
            >
              {Userdata?.data?.user?.firstName}
            </p>
            <p
              className="copyreg"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://apidoc.transferrocket.co.uk/agentcustomersignup/${Userdata?.data?.user?.userId}`
                );
                toast.success("Your Agent Link Copied!");
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Click to copy your link
              </span>
              <img src={copy} alt="" />
            </p>
            <p
              className="copyreg"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigator.clipboard.writeText(Userdata?.data?.user?.userId);
                toast.success("Agent Code Copied!");
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
              Copy your code
              </span>
              <img src={copy} alt="" />
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
                window.location.pathname = "/";
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
    </Agentlayout>
  );
};

export default AgentSettings;

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
      width: 100px;
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
