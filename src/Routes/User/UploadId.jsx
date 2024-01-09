import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import Userlayout from "../../reuseables/Userlayout";
import Centeredbox from "../../reuseables/Centeredbox";
//
import { Carousel } from "@arco-design/web-react";
//
import carousel1 from "../../assets/carousel1.svg";
import carousel2 from "../../assets/carousel2.svg";
import carousel3 from "../../assets/carousel3.svg";
import progress from "../../assets/progress.svg";
import { Link } from "react-router-dom";
import OneLayout from "../../reuseables/OneLayout";

// function CameraApp() {
//   const videoRef = useRef(null);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error('Error accessing the camera:', error);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   return (
//     <div>
//       <h1>Camera App</h1>
//       <button onClick={startCamera}>Start Camera</button>
//       <button onClick={stopCamera}>Stop Camera</button>
//       <video ref={videoRef} autoPlay playsInline />
//     </div>
//   );
// }

// export default CameraApp;

const UploadId = () => {
  // const capture = useCallback(() => {
  //     const imageSrc = webcamRef.current.getScreenshot();
  //     setImgSrc(imageSrc);
  //   }, [webcamRef]);

  const userData = JSON.parse(localStorage.getItem("userDetails"));

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const imageSrc = [carousel1, carousel2, carousel3];

  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);
  const [indicatorType, setIndicatorType] = useState("dot");
  const [indicatorPosition, setIndicatorPosition] = useState("bottom");
  const mediaQery = {
    "@media (max-width:200px)": {
      width: "100px",
    },
  };
  return (
    <OneLayout>
      <Centeredbox>
        {/* carousel */}
        <UploadIdBox>
          <div className="topdet">
            <div className="proparent">
              <img src={progress} alt="" />
            </div>
            <p className="step">Step 1 of 2</p>
            <div className="id">ID Scan</div>
            <p className="scan">3 golden Rule for document Capture</p>
          </div>

          <div className="carousel">
            <Carousel
              // autoPlay
              // animation="card"
              // showArrow="line"
              // indicatorPosition="never"
              // style={{ width: "100%", color: "#000" }}
              autoPlay
              indicatorType={indicatorType}
              indicatorPosition={indicatorPosition}
              showArrow="never"
              style={{ width: "100%", height: 340, marginTop: "20px" }}
            >
              {/* {[<img src={carousel1} alt="" />, "hhhhh"]?.map((d, index) => (
                    <div  className="carou" key={index}>{d}</div>
                    ))} */}
              {imageSrc.map((src, index) => (
                <div key={index}>
                  <img src={src} style={{ width: "100%", height: "100%" }} />
                </div>
              ))}
            </Carousel>
          </div>
          {userData?.data?.user?.role?.id === 6 ? (
            <Link to="/user/upload">
              <div className="btns">
                <p>Continue</p>
              </div>
            </Link>
          ) : (
            <Link to="/agent/upload">
              <div className="btns">
                <p>Continue</p>
              </div>
            </Link>
          )}
        </UploadIdBox>
      </Centeredbox>
    </OneLayout>
  );
};

export default UploadId;

const UploadIdBox = styled.div`
  .arco-carousel-indicator-wrapper-bottom {
    background: none;
  }
  .carousel {
    max-width: 450px;
  }
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  .topdet {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    .proparent {
      max-width: 500px;
      margin: 5px 0;
      img {
        width: 100%;
      }
    }

    .step {
      font-family: General Sans;
      font-size: 12px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
      color: #667085;
    }
    .id {
      font-size: 14px;
      font-weight: 500;
      text-align: left;
    }
    .scan {
      font-size: 12px;
      font-weight: 500;
      text-align: left;
      color: #344054;
    }
  }
  .carou {
    border: 2px solid green;
    margin: 10px 0;
    height: 380px;
  }
  .btns {
    border-radius: 8px;
    border: 1px solid #00a85a;
    background: #00a85a;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    padding: 10px;
    text-align: center;
    margin: 10px 0 0;
  }
`;
